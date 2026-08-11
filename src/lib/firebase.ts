import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  onSnapshot,
  updateDoc
} from 'firebase/firestore';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User as FirebaseUser
} from 'firebase/auth';
import { Product, OrderDetails, OrderStatus, UserProfile, UserRole } from '../types';
import firebaseConfigJson from '../../firebase-applet-config.json';

const cleanEnv = (val?: string) => {
  if (!val) return undefined;
  const cleaned = val.trim().replace(/^["']|["']$/g, '');
  return cleaned || undefined;
};

const firebaseConfig = {
  apiKey: cleanEnv(import.meta.env.VITE_FIREBASE_API_KEY) || firebaseConfigJson.apiKey,
  authDomain: cleanEnv(import.meta.env.VITE_FIREBASE_AUTH_DOMAIN) || firebaseConfigJson.authDomain,
  projectId: cleanEnv(import.meta.env.VITE_FIREBASE_PROJECT_ID) || firebaseConfigJson.projectId,
  storageBucket: cleanEnv(import.meta.env.VITE_FIREBASE_STORAGE_BUCKET) || firebaseConfigJson.storageBucket,
  messagingSenderId: cleanEnv(import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID) || firebaseConfigJson.messagingSenderId,
  appId: cleanEnv(import.meta.env.VITE_FIREBASE_APP_ID) || firebaseConfigJson.appId,
  measurementId: cleanEnv(import.meta.env.VITE_FIREBASE_MEASUREMENT_ID) || firebaseConfigJson.measurementId,
};

// --- Validation: fail fast and loud instead of a cryptic Firestore error later ---
const requiredKeys: (keyof typeof firebaseConfig)[] = [
  'apiKey', 'authDomain', 'projectId', 'storageBucket', 'messagingSenderId', 'appId'
];
const missingKeys = requiredKeys.filter((k) => !firebaseConfig[k]);
if (missingKeys.length > 0) {
  throw new Error(
    `[firebase.ts] Missing required Firebase config values: ${missingKeys.join(', ')}. ` +
    `Check your .env file (VITE_FIREBASE_*) and firebase-applet-config.json.`
  );
}

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const firestoreDbId = cleanEnv(import.meta.env.VITE_FIREBASE_DATABASE_ID) || firebaseConfigJson.firestoreDatabaseId;

export const db = getFirestore(app, firestoreDbId);

export const auth = getAuth(app);

const PRODUCTS_COLLECTION = 'products';
const ORDERS_COLLECTION = 'orders';
const USERS_COLLECTION = 'users';

// User Profile Functions
export async function saveUserProfile(profile: UserProfile) {
  try {
    const userRef = doc(db, USERS_COLLECTION, profile.uid);
    await setDoc(userRef, profile, { merge: true });
  } catch (err: any) {
  }
}

export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  try {
    const userRef = doc(db, USERS_COLLECTION, uid);
    const snap = await getDoc(userRef);
    if (snap.exists()) {
      return snap.data() as UserProfile;
    }
    return null;
  } catch (err: any) {
    return null;
  }
}

// Subscribe to Products collection
export function subscribeToProducts(onData: (products: Product[]) => void) {
  const colRef = collection(db, PRODUCTS_COLLECTION);
  return onSnapshot(
    colRef,
    (snapshot) => {
      const items: Product[] = [];
      snapshot.forEach((docSnap) => {
        items.push(docSnap.data() as Product);
      });
      onData(items);
    },
    (err: any) => {
    }
  );
}

export type LogLevel = 'info' | 'warn' | 'error' | 'success';
export type LogCallback = (msg: string, level?: LogLevel) => void;

export interface SeedResult {
  success: boolean;
  writtenCount: number;
  logs: string[];
}

export interface FullSeedResult {
  success: boolean;
  totalWritten: number;
  productsWritten: number;
  ordersWritten: number;
  logs: string[];
}

function logSeed(msg: string, level: LogLevel = 'info', onLog?: LogCallback) {
  if (onLog) {
    onLog(msg, level);
  }
}

// Seed initial products if empty or main product missing
export async function seedProductsIfEmpty(
  initialProducts: Product[],
  force = false,
  onLog?: LogCallback
): Promise<SeedResult> {
  const accumulatedLogs: string[] = [];
  const handleLog = (msg: string, level: LogLevel = 'info') => {
    accumulatedLogs.push(`[${level.toUpperCase()}] ${msg}`);
    logSeed(msg, level, onLog);
  };

  if (!initialProducts || initialProducts.length === 0) {
    return { success: false, writtenCount: 0, logs: accumulatedLogs };
  }

  let shouldSeed = force;

  if (!force) {
    try {
      const colRef = collection(db, PRODUCTS_COLLECTION);
      const snapshot = await getDocs(colRef);
      const hasMainProduct = snapshot.docs.some(d => d.id === 'prod-rg-01');
      // Re-seed if empty, main product missing, or missing newer products added to local catalog
      shouldSeed = snapshot.empty || !hasMainProduct || snapshot.size < initialProducts.length;
    } catch (err: any) {
      handleLog(`Unable to check '${PRODUCTS_COLLECTION}': ${err?.message || err}`, 'warn');
      shouldSeed = true;
    }
  }

  if (!shouldSeed) {
    return { success: true, writtenCount: 0, logs: accumulatedLogs };
  }

  let writtenCount = 0;
  for (const prod of initialProducts) {
    try {
      await setDoc(doc(db, PRODUCTS_COLLECTION, prod.id), prod, { merge: true });
      writtenCount++;
    } catch (err: any) {
      handleLog(`Error writing product '${prod.id}': ${err?.message || err}`, 'error');
    }
  }

  if (writtenCount > 0) {
    return { success: true, writtenCount, logs: accumulatedLogs };
  } else {
    handleLog(`Failed to write any products to '${PRODUCTS_COLLECTION}'.`, 'error');
    return { success: false, writtenCount: 0, logs: accumulatedLogs };
  }
}

// Update or Save a single Product
export async function saveProductToFirestore(product: Product) {
  try {
    await setDoc(doc(db, PRODUCTS_COLLECTION, product.id), product);
  } catch (err: any) {
  }
}

// Update Product Stock
export async function updateProductStockInFirestore(productId: string, stockQuantity: number) {
  try {
    const ref = doc(db, PRODUCTS_COLLECTION, productId);
    await updateDoc(ref, {
      stockQuantity,
      isLowStock: stockQuantity > 0 && stockQuantity <= 5
    });
  } catch (err: any) {
  }
}

// Update Product Price
export async function updateProductPriceInFirestore(productId: string, price: number) {
  try {
    const ref = doc(db, PRODUCTS_COLLECTION, productId);
    await updateDoc(ref, { price });
  } catch (err: any) {
  }
}

// Subscribe to Orders collection
export function subscribeToOrders(onData: (orders: OrderDetails[]) => void) {
  const colRef = collection(db, ORDERS_COLLECTION);
  return onSnapshot(
    colRef,
    (snapshot) => {
      const items: OrderDetails[] = [];
      snapshot.forEach((docSnap) => {
        items.push(docSnap.data() as OrderDetails);
      });
      onData(items);
    },
    (err: any) => {
    }
  );
}

// Seed initial orders if empty or main order missing
export async function seedOrdersIfEmpty(
  initialOrders: OrderDetails[],
  force = false,
  onLog?: LogCallback
): Promise<SeedResult> {
  const accumulatedLogs: string[] = [];
  const handleLog = (msg: string, level: LogLevel = 'info') => {
    accumulatedLogs.push(`[${level.toUpperCase()}] ${msg}`);
    logSeed(msg, level, onLog);
  };

  if (!initialOrders || initialOrders.length === 0) {
    return { success: false, writtenCount: 0, logs: accumulatedLogs };
  }

  let shouldSeed = force;

  if (!force) {
    try {
      const colRef = collection(db, ORDERS_COLLECTION);
      const snapshot = await getDocs(colRef);
      const hasMainOrder = snapshot.docs.some(d => d.id === 'RG-2026-1001');
      shouldSeed = snapshot.empty || !hasMainOrder;
    } catch (err: any) {
      handleLog(`Unable to check '${ORDERS_COLLECTION}': ${err?.message || err}`, 'warn');
      shouldSeed = true;
    }
  }

  if (!shouldSeed) {
    return { success: true, writtenCount: 0, logs: accumulatedLogs };
  }

  let writtenCount = 0;
  for (const ord of initialOrders) {
    try {
      await setDoc(doc(db, ORDERS_COLLECTION, ord.orderId), ord, { merge: true });
      writtenCount++;
    } catch (err: any) {
      handleLog(`Error writing order '${ord.orderId}': ${err?.message || err}`, 'error');
    }
  }

  if (writtenCount > 0) {
    return { success: true, writtenCount, logs: accumulatedLogs };
  } else {
    handleLog(`Failed to write any orders to '${ORDERS_COLLECTION}'.`, 'error');
    return { success: false, writtenCount: 0, logs: accumulatedLogs };
  }
}

// Helper function to force seed all products and orders to Firestore
export async function forceSeedAllData(
  initialProducts: Product[],
  initialOrders: OrderDetails[],
  onLog?: LogCallback
): Promise<FullSeedResult> {
  const pResult = await seedProductsIfEmpty(initialProducts, true, onLog);
  const oResult = await seedOrdersIfEmpty(initialOrders, true, onLog);

  const totalWritten = pResult.writtenCount + oResult.writtenCount;
  const success = pResult.writtenCount > 0 || oResult.writtenCount > 0 || (pResult.success && oResult.success);

  return {
    success,
    totalWritten,
    productsWritten: pResult.writtenCount,
    ordersWritten: oResult.writtenCount,
    logs: [...pResult.logs, ...oResult.logs]
  };
}

// Create new Order in Firestore
export async function createOrderInFirestore(order: OrderDetails) {
  try {
    await setDoc(doc(db, ORDERS_COLLECTION, order.orderId), order);
  } catch (err: any) {
  }
}

// Update Order Status in Firestore
export async function updateOrderStatusInFirestore(orderId: string, status: OrderStatus) {
  try {
    const ref = doc(db, ORDERS_COLLECTION, orderId);
    await updateDoc(ref, { status });
  } catch (err: any) {
  }
}

// Update Order Tracking in Firestore
export async function updateOrderTrackingInFirestore(orderId: string, trackingNumber: string, courierPartner: string) {
  try {
    const ref = doc(db, ORDERS_COLLECTION, orderId);
    await updateDoc(ref, { trackingNumber, courierPartner });
  } catch (err: any) {
  }
}

// Subscribe to all users (for Admin role mapping)
export function subscribeToAllUsers(onData: (users: UserProfile[]) => void) {
  const colRef = collection(db, USERS_COLLECTION);
  return onSnapshot(
    colRef,
    (snapshot) => {
      const items: UserProfile[] = [];
      snapshot.forEach((docSnap) => {
        items.push(docSnap.data() as UserProfile);
      });
      onData(items);
    },
    (err: any) => {
    }
  );
}

// Update User Role in Firestore (Admin function)
export async function updateUserRoleInFirestore(uid: string, role: UserRole) {
  try {
    const ref = doc(db, USERS_COLLECTION, uid);
    await updateDoc(ref, { role });
  } catch (err: any) {
  }
}
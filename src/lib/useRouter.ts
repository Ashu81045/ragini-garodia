import { useState, useEffect, useCallback } from 'react';

export interface RouteInfo {
  path: string;
  view: 'home' | 'category' | 'product' | 'dashboard' | 'orders' | 'gallery' | 'stylist' | 'care';
  categorySlug?: string;
  productId?: string;
}

export function parsePath(pathname?: string): RouteInfo {
  const safePath = pathname || '/';
  const cleanPath = safePath.split('?')[0].split('#')[0];

  if (cleanPath === '/dashboard' || cleanPath === '/admin/inventory' || cleanPath === '/admin') {
    return { path: cleanPath, view: 'dashboard' };
  }

  if (cleanPath === '/orders' || cleanPath === '/track-order') {
    return { path: cleanPath, view: 'orders' };
  }

  if (cleanPath === '/gallery' || cleanPath === '/lookbook') {
    return { path: cleanPath, view: 'gallery' };
  }

  if (cleanPath === '/stylist' || cleanPath === '/ai-stylist') {
    return { path: cleanPath, view: 'stylist' };
  }

  if (cleanPath === '/care' || cleanPath === '/about') {
    return { path: cleanPath, view: 'care' };
  }

  if (cleanPath.startsWith('/product/')) {
    const productId = cleanPath.replace('/product/', '');
    return { path: cleanPath, view: 'product', productId };
  }

  if (cleanPath.startsWith('/category/')) {
    const categorySlug = cleanPath.replace('/category/', '');
    return { path: cleanPath, view: 'category', categorySlug };
  }

  return { path: '/', view: 'home' };
}

export function useRouter() {
  const [currentPath, setCurrentPath] = useState<string>(() => window.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = useCallback((path: string) => {
    if (window.location.pathname !== path) {
      window.history.pushState({}, '', path);
      setCurrentPath(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  const routeInfo = parsePath(currentPath);

  return {
    currentPath,
    routeInfo,
    navigate,
  };
}

import { Product } from '../types';

import raginiHeroImg from '../assets/images/ragini_gold_hero_1786370846007.jpg';
import raginiBanglesImg from '../assets/images/ragini_gold_bangles_1786370859091.jpg';
import goldBanglesImg from '../assets/images/gold_bangles_1786368239510.jpg';
import bridalLookbookImg from '../assets/images/bridal_lookbook_1786368204421.jpg';
import royalGoldHaramImg from '../assets/images/royal_gold_haram_1786468852100.jpg';
import goldDomeJhumkasImg from '../assets/images/gold_dome_jhumkas_1786468870052.jpg';
import goldChokerImg from '../assets/images/gold_choker_neckpiece_1786469294653.jpg';
import goldStatementRingImg from '../assets/images/gold_statement_ring_1786469309065.jpg';
import goldKadaBangleImg from '../assets/images/gold_kada_bangle_1786469372280.jpg';
import goldBridalSetImg from '../assets/images/gold_bridal_set_1786469385111.jpg';
import czDiamondRingImg from '../assets/images/cz_diamond_ring_1786368215628.jpg';

export const PRODUCTS: Product[] = [
  // ==================== 1. CHOKERS & NECKLACES (3 Products) ====================
  {
    id: 'prod-rg-01',
    name: "Ragini Garodia 'Aura' Molten Gold Sculptural Choker",
    category: 'chokers-necklaces',
    price: 5800,
    originalPrice: 7500,
    rating: 4.9,
    reviewCount: 84,
    stockQuantity: 15,
    images: [
      raginiHeroImg,
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1611591475168-3e9a7e371302?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=800'
    ],
    description: "Inspired by the raw fluid movement of molten metals, this statement collar choker is hand-cast in 18kt gold-plated brass with Ragini Garodia's signature organic hammered texture.",
    specifications: {
      baseMetal: '18kt Gold-Plated Recycled Jewelers Brass',
      plating: '18K Heavy Micron Gold Plating (Anti-Tarnish)',
      stoneType: 'None (Sculptural Molten Metal Finish)',
      closureType: 'Adjustable Hook & Link Extension Chain',
      weight: '85g',
      hypoallergenic: true,
      antiTarnish: true,
      goldPurity: '18K Micron Seal • Conscious Plastic-Free Creation'
    },
    tags: ['Ragini Garodia', 'Molten Gold', 'Choker', '18K Gold Plated', 'Best Seller'],
    isBestSeller: true,
    featuredInLookbook: true,
    reviews: [
      {
        id: 'rev-rg-1',
        userName: 'Aanya Kapoor',
        rating: 5,
        date: '2026-08-04',
        comment: 'The molten texture is stunning! Received so many compliments at the fashion week gala.',
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'prod-rg-07',
    name: "Ragini Garodia 'Lumina' Hand-Hammered Gold Collar Neckpiece",
    category: 'chokers-necklaces',
    price: 7800,
    originalPrice: 9900,
    rating: 5.0,
    reviewCount: 35,
    stockQuantity: 8,
    isLowStock: true,
    images: [
      goldChokerImg,
      'https://images.unsplash.com/photo-1611591475168-3e9a7e371302?auto=format&fit=crop&q=80&w=800',
      raginiHeroImg,
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=800'
    ],
    description: "Regal rigid collar necklace featuring hand-chiseled gold facets that catch light with every gesture. Coated in anti-tarnish protective lacquer for enduring luster.",
    specifications: {
      baseMetal: 'Recycled Jewelers Brass',
      plating: '18K High-Micron Gold Plating',
      stoneType: 'None (Hand-Hammered Facets)',
      closureType: 'Hinged Back Lock',
      weight: '110g',
      hypoallergenic: true,
      antiTarnish: true,
      goldPurity: '18K Micron Polish'
    },
    tags: ['Ragini Garodia', 'Collar Necklace', 'Hand-Hammered', '18K Gold', 'New Arrival'],
    isNewArrival: true,
    featuredInLookbook: true,
    reviews: [
      {
        id: 'rev-rg-7',
        userName: 'Shilpa Shetty',
        rating: 5,
        date: '2026-08-03',
        comment: 'Pure runway glamour! Wore it with an ivory saree and it stole the show.',
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'prod-rg-12',
    name: "Ragini Garodia 'Kalyani' 22K Royal Repoussé Coin Choker",
    category: 'chokers-necklaces',
    price: 6400,
    originalPrice: 8200,
    rating: 4.9,
    reviewCount: 42,
    stockQuantity: 12,
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=800',
      goldChokerImg,
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1611591475168-3e9a7e371302?auto=format&fit=crop&q=80&w=800'
    ],
    description: "Centuries of royal heritage distilled into a collar choker adorned with micro repoussé coin charms forged in 22K micro gold plating with zero plastic stones.",
    specifications: {
      baseMetal: 'Jewelers Brass Base',
      plating: '22K Heavy Micro Gold Plated',
      stoneType: 'None (100% Micro Coin Carvings)',
      closureType: 'Adjustable Velvet Cord & Hook',
      weight: '92g',
      hypoallergenic: true,
      antiTarnish: true,
      goldPurity: '22K Micro Gold Seal'
    },
    tags: ['Ragini Garodia', 'Coin Choker', 'Repousse', '22K Gold Plated', 'Zero Stones'],
    reviews: []
  },

  // ==================== 2. EARRINGS & JHUMKAS (3 Products) ====================
  {
    id: 'prod-rg-15',
    name: "Ragini Garodia 'Devi' Royal 22K Grand Dome Filigree Jhumkas",
    category: 'earrings-jhumkas',
    price: 4800,
    originalPrice: 6500,
    rating: 5.0,
    reviewCount: 68,
    stockQuantity: 14,
    images: [
      goldDomeJhumkasImg,
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&q=80&w=800',
      raginiHeroImg
    ],
    description: "Traditional dome jhumkas featuring micro repoussé filigree patterns and dangling micro gold bead drops. Handcrafted in 22K micro gold plating with zero plastic stones.",
    specifications: {
      baseMetal: 'Jewelers Brass Base',
      plating: '22K Heavy Micro Gold Plated (Anti-Tarnish)',
      stoneType: 'None (100% Handcrafted Gold Filigree & Ghungroo Drops)',
      closureType: 'Screw Back Post with Ear Support Link',
      weight: '42g pair',
      hypoallergenic: true,
      antiTarnish: true,
      goldPurity: '22K Micro Gold Seal'
    },
    tags: ['Ragini Garodia', 'Jhumkas', '22K Gold', 'Temple Filigree', 'Best Seller'],
    isBestSeller: true,
    featuredInLookbook: true,
    reviews: [
      {
        id: 'rev-rg-15',
        userName: 'Priyanka Chopra J.',
        rating: 5,
        date: '2026-08-07',
        comment: 'Authentic royal South Indian filigree work. Absolutely stunning craftsmanship!',
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'prod-rg-03',
    name: "Ragini Garodia 'Cascada' Abstract Fluid Dangle Earrings",
    category: 'earrings-jhumkas',
    price: 3400,
    originalPrice: 4500,
    rating: 4.8,
    reviewCount: 51,
    stockQuantity: 18,
    images: [
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&q=80&w=800',
      goldDomeJhumkasImg,
      'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=800'
    ],
    description: "Sculptural multi-tier drop earrings shaped like cascading liquid gold ripples. Engineered to be surprisingly featherweight on the ears.",
    specifications: {
      baseMetal: 'Jewelers Brass Base',
      plating: '18K Anti-Tarnish Yellow Gold Micro-Plating',
      stoneType: 'None (Fluid Metal Ripples)',
      closureType: 'Hypoallergenic Push Back Post',
      weight: '24g pair',
      hypoallergenic: true,
      antiTarnish: true,
      goldPurity: '18K Gold Plated'
    },
    tags: ['Ragini Garodia', 'Dangle Earrings', 'Fluid Gold', 'Sculptural', 'New Arrival'],
    isNewArrival: true,
    reviews: []
  },
  {
    id: 'prod-rg-09',
    name: "Ragini Garodia 'Vortex' Chunky Sculptural Gold Hoops",
    category: 'earrings-jhumkas',
    price: 2900,
    originalPrice: 3800,
    rating: 4.8,
    reviewCount: 56,
    stockQuantity: 22,
    images: [
      'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=800',
      goldDomeJhumkasImg,
      raginiHeroImg
    ],
    description: "Chunky tapered hoop earrings featuring hand-hammered organic metal contours. Plated in 18kt warm yellow gold with secure click-top latch closure.",
    specifications: {
      baseMetal: 'Eco Brass Alloy',
      plating: '18K Warm Yellow Gold Polish',
      stoneType: 'None (Tapered Sculpted Metal)',
      closureType: 'Click-Top Latch',
      weight: '22g pair',
      hypoallergenic: true,
      antiTarnish: true,
      goldPurity: '18K Gold Plated'
    },
    tags: ['Ragini Garodia', 'Chunky Hoops', 'Sculptural', 'Daily Luxury'],
    reviews: []
  },

  // ==================== 3. BANGLES & KANGANS (3 Products) ====================
  {
    id: 'prod-rg-08',
    name: "Ragini Garodia 'Nebra' Handcrafted Organic Bangle Stack",
    category: 'bangles-kangans',
    price: 4600,
    originalPrice: 6200,
    rating: 4.9,
    reviewCount: 41,
    stockQuantity: 14,
    images: [
      raginiBanglesImg,
      goldBanglesImg,
      goldKadaBangleImg,
      'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&q=80&w=800'
    ],
    description: "Trio of undulating, hand-formed molten bangles designed to be stacked or worn separately. Crafted in 18kt gold-plated heavy brass.",
    specifications: {
      baseMetal: 'Brass Base',
      plating: '18K Micro Gold Finish',
      stoneType: 'None (Organic Undulating Metal)',
      closureType: 'Slip-On Bangle',
      weight: '90g (Set of 3)',
      hypoallergenic: true,
      antiTarnish: true,
      goldPurity: '18K Gold Plated'
    },
    tags: ['Ragini Garodia', 'Bangles', 'Organic Stack', '18K Gold', 'Best Seller'],
    isBestSeller: true,
    reviews: []
  },
  {
    id: 'prod-rg-17',
    name: "Ragini Garodia 'Rajwadi' Carved Peacock 22K Kangan Pair",
    category: 'bangles-kangans',
    price: 6800,
    originalPrice: 8900,
    rating: 5.0,
    reviewCount: 52,
    stockQuantity: 9,
    images: [
      goldKadaBangleImg,
      goldBanglesImg,
      raginiBanglesImg,
      'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&q=80&w=800'
    ],
    description: "Majestic hinged kada kangans featuring hand-engraved peacock head clasps and deep relief repoussé motifs in 22K micro gold plating.",
    specifications: {
      baseMetal: 'Jewelers Brass Base',
      plating: '22K Heavy Micro Gold Plating (3-Micron Seal)',
      stoneType: 'None (Carved Peacock Motif Clasps)',
      closureType: 'Screw Pin Safety Lock',
      weight: '115g pair',
      hypoallergenic: true,
      antiTarnish: true,
      goldPurity: '22K Micro Gold Seal'
    },
    tags: ['Ragini Garodia', 'Kangans', 'Peacock Kada', '22K Gold', 'New Arrival'],
    isNewArrival: true,
    featuredInLookbook: true,
    reviews: [
      {
        id: 'rev-rg-17',
        userName: 'Kareena Kapoor Khan',
        rating: 5,
        date: '2026-08-02',
        comment: 'The screw lock and peacock carving feel like inherited family heirloom gold.',
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'prod-rg-18',
    name: "Ragini Garodia 'Tarang' Hammered Heavy Gold Cuff Bangle",
    category: 'bangles-kangans',
    price: 3900,
    originalPrice: 5100,
    rating: 4.8,
    reviewCount: 31,
    stockQuantity: 16,
    images: [
      goldBanglesImg,
      goldKadaBangleImg,
      raginiBanglesImg,
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=800'
    ],
    description: "A wide structural gold cuff bangle with concave hammered wave facets that capture light brilliantly from every angle.",
    specifications: {
      baseMetal: 'Heavy Jewelers Brass',
      plating: '18K Satin Yellow Gold Finish',
      stoneType: 'None (100% Solid Faceted Metal)',
      closureType: 'Open Adjustable Cuff',
      weight: '70g',
      hypoallergenic: true,
      antiTarnish: true,
      goldPurity: '18K Gold Plated'
    },
    tags: ['Ragini Garodia', 'Gold Cuff', 'Hammered Bangle', 'Statement Wristwear'],
    reviews: []
  },

  // ==================== 4. RINGS & CUFFS (3 Products) ====================
  {
    id: 'prod-rg-05',
    name: "Ragini Garodia 'Solstice' Liquid Gold Wave Ring",
    category: 'rings-cuffs',
    price: 2600,
    originalPrice: 3500,
    rating: 4.9,
    reviewCount: 38,
    stockQuantity: 25,
    images: [
      goldStatementRingImg,
      czDiamondRingImg,
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&q=80&w=800'
    ],
    description: "Avant-garde liquid gold ring crafted in 18kt yellow gold-plated brass with a fluid wave form that hugs the finger comfortably.",
    specifications: {
      baseMetal: 'Brass Base',
      plating: '18K Yellow Gold Micro-Plating',
      stoneType: 'None (Sculpted Wave Metal)',
      closureType: 'Adjustable Comfort Band',
      weight: '14g',
      hypoallergenic: true,
      antiTarnish: true,
      goldPurity: '18K Gold Plated'
    },
    tags: ['Ragini Garodia', 'Wave Ring', 'Ring', 'Sculptural', 'Best Seller'],
    isBestSeller: true,
    reviews: [
      {
        id: 'rev-rg-6',
        userName: 'Mira Kapoor',
        rating: 5,
        date: '2026-07-18',
        comment: 'Sits so elegantly on the index finger. High fashion polish!',
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'prod-rg-21',
    name: "Ragini Garodia 'Maharani' Broad Carved Gold Armor Ring",
    category: 'rings-cuffs',
    price: 3200,
    originalPrice: 4200,
    rating: 4.9,
    reviewCount: 45,
    stockQuantity: 18,
    images: [
      czDiamondRingImg,
      goldStatementRingImg,
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&q=80&w=800'
    ],
    description: "Full-finger architectural armor ring with articulated gold joints allowing natural finger movement. Plated in 22K micro gold.",
    specifications: {
      baseMetal: 'Jewelers Brass Base',
      plating: '22K Micro Gold Plating',
      stoneType: 'Solitaire CZ Accent on Pure Sculpted Gold Armor',
      closureType: 'Dual Adjustable Inner Bands',
      weight: '26g',
      hypoallergenic: true,
      antiTarnish: true,
      goldPurity: '22K Micro Gold'
    },
    tags: ['Ragini Garodia', 'Armor Ring', 'Statement Ring', '22K Gold', 'New Arrival'],
    isNewArrival: true,
    featuredInLookbook: true,
    reviews: []
  },
  {
    id: 'prod-rg-02',
    name: "Ragini Garodia 'Aethel' Imperfect Textured Open Wrist Cuff",
    category: 'rings-cuffs',
    price: 3900,
    originalPrice: 5200,
    rating: 4.9,
    reviewCount: 62,
    stockQuantity: 20,
    images: [
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=800',
      goldStatementRingImg,
      raginiBanglesImg,
      'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&q=80&w=800'
    ],
    description: "Handcrafted open wrist cuff featuring undulating raw metal edges and a rich 18kt satin gold-plated polish.",
    specifications: {
      baseMetal: 'Eco-Friendly Brass Base',
      plating: '18K Satin Micro Gold Finish',
      stoneType: 'None (100% Solid Sculpted Metal)',
      closureType: 'Slightly Adjustable Open Cuff Band',
      weight: '65g',
      hypoallergenic: true,
      antiTarnish: true,
      goldPurity: '18K Gold Plated Brass'
    },
    tags: ['Ragini Garodia', 'Wrist Cuff', 'Textured Gold', 'Statement', 'Zero Stones'],
    reviews: []
  },

  // ==================== 5. CHAINS & HARAMS (3 Products) ====================
  {
    id: 'prod-rg-23',
    name: "Ragini Garodia 'Lakshmi' Heritage 22K Coin Haram",
    category: 'chains-harams',
    price: 9200,
    originalPrice: 12500,
    rating: 5.0,
    reviewCount: 76,
    stockQuantity: 6,
    isLowStock: true,
    images: [
      royalGoldHaramImg,
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=800',
      bridalLookbookImg,
      raginiHeroImg
    ],
    description: "A monumental 22K micro gold plated long coin haram composed of 108 individually carved Lakshmi gold coin medallions strung on heavy rope links.",
    specifications: {
      baseMetal: 'Jewelers Brass Base',
      plating: '22K Heavy Micro Gold Plated (3-Micron Anti-Tarnish)',
      stoneType: 'None (108 Solid Carved Gold Coin Medallions)',
      closureType: 'Adjustable Silk Dori & Hook Lock',
      weight: '165g',
      hypoallergenic: true,
      antiTarnish: true,
      goldPurity: '22K Micro Gold Seal'
    },
    tags: ['Ragini Garodia', 'Coin Haram', '22K Gold', 'Temple Haram', 'Best Seller'],
    isBestSeller: true,
    featuredInLookbook: true,
    reviews: [
      {
        id: 'rev-rg-23',
        userName: 'Sanya Malhotra',
        rating: 5,
        date: '2026-08-05',
        comment: 'Pure royal splendor! The coin weight and golden sheen look completely real.',
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'prod-rg-10',
    name: "Ragini Garodia 'Siren' Fluid Link Chain & Molten Slab Pendant",
    category: 'chains-harams',
    price: 3800,
    originalPrice: 4900,
    rating: 4.9,
    reviewCount: 33,
    stockQuantity: 19,
    images: [
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=800',
      royalGoldHaramImg,
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1611591475168-3e9a7e371302?auto=format&fit=crop&q=80&w=800'
    ],
    description: "Heavy-gauge fluid link chain suspending a signature raw molten gold slab pendant. Delivered in 100% plastic-free packaging.",
    specifications: {
      baseMetal: 'Jewelers Brass & Steel Base',
      plating: '18K Gold PVD & Micron Plating',
      stoneType: 'None (Raw Molten Gold Slab)',
      closureType: 'Lobster Claw Clasp',
      weight: '45g',
      hypoallergenic: true,
      antiTarnish: true,
      goldPurity: '18K Gold Finish'
    },
    tags: ['Ragini Garodia', 'Pendant Necklace', 'Molten Gold', 'New Arrival'],
    isNewArrival: true,
    reviews: []
  },
  {
    id: 'prod-rg-24',
    name: "Ragini Garodia 'Agnihotra' Multi-Layered Filigree Bead Chain",
    category: 'chains-harams',
    price: 6800,
    originalPrice: 8900,
    rating: 4.8,
    reviewCount: 29,
    stockQuantity: 11,
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=800',
      royalGoldHaramImg,
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=800',
      raginiHeroImg
    ],
    description: "Triple-layer long chain featuring carved gold fluted beads and filigree links. Perfect for grand sarees and royal wedding layering.",
    specifications: {
      baseMetal: 'Brass Base',
      plating: '22K Micro Gold Finish',
      stoneType: 'None (Carved Gold Fluted Beads)',
      closureType: 'S-Hook Closure',
      weight: '110g',
      hypoallergenic: true,
      antiTarnish: true,
      goldPurity: '22K Micro Gold'
    },
    tags: ['Ragini Garodia', 'Bead Chain', 'Triple Layer', '22K Gold'],
    reviews: []
  },

  // ==================== 6. BRIDAL ENSEMBLES (3 Products) ====================
  {
    id: 'prod-rg-27',
    name: "Ragini Garodia 'Rajkumari' 22K Royal Temple Bridal Set",
    category: 'bridal-ensembles',
    price: 18900,
    originalPrice: 24500,
    rating: 5.0,
    reviewCount: 41,
    stockQuantity: 4,
    isLowStock: true,
    images: [
      goldBridalSetImg,
      bridalLookbookImg,
      royalGoldHaramImg,
      goldDomeJhumkasImg
    ],
    description: "Comprehensive 4-piece bridal trousseau including Royal Repoussé Coin Choker, Lakshmi Long Haram, Dome Filigree Jhumkas, and Carved Mathapatti headpiece.",
    specifications: {
      baseMetal: 'Jewelers Brass Base',
      plating: '22K Heavy Micro Gold Plating (3-Micron Anti-Tarnish Guarantee)',
      stoneType: 'None (100% Zero Stone Pure Metal Artistry)',
      closureType: 'Silk Dori, Screw Back & Hook Clasp Locks',
      weight: '290g complete bridal set',
      hypoallergenic: true,
      antiTarnish: true,
      goldPurity: '22K Micro Gold Seal'
    },
    tags: ['Ragini Garodia', 'Bridal Set', 'Temple Jewelry', '22K Gold', 'Best Seller'],
    isBestSeller: true,
    featuredInLookbook: true,
    reviews: [
      {
        id: 'rev-rg-27',
        userName: 'Alia Bhatt',
        rating: 5,
        date: '2026-08-01',
        comment: 'Zero plastic stones means zero cheap glare. Pure 22K golden majesty for royal brides.',
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'prod-rg-11',
    name: "Ragini Garodia 'Empress' Grand Runway Sculptural Ensemble",
    category: 'bridal-ensembles',
    price: 14500,
    originalPrice: 18900,
    rating: 5.0,
    reviewCount: 22,
    stockQuantity: 5,
    isLowStock: true,
    images: [
      bridalLookbookImg,
      goldBridalSetImg,
      royalGoldHaramImg,
      goldDomeJhumkasImg
    ],
    description: "The ultimate Ragini Garodia couture collection. Includes the 'Aura' Molten Gold Choker, 'Cascada' Dangle Earrings, and 'Aethel' Imperfect Open Cuff in matching 18kt gold plated finish.",
    specifications: {
      baseMetal: '18kt Gold Plated Brass',
      plating: '18K High Micron Gold Seal',
      stoneType: 'None (Pure Hand-Sculpted Metal Craft)',
      closureType: 'Adjustable Hook & Post Locks',
      weight: '175g complete set',
      hypoallergenic: true,
      antiTarnish: true,
      goldPurity: '18K High Micron Gold'
    },
    tags: ['Ragini Garodia', 'Runway Ensemble', 'Couture Set', '18K Gold Plated', 'New Arrival'],
    isNewArrival: true,
    featuredInLookbook: true,
    reviews: []
  },
  {
    id: 'prod-rg-30',
    name: "Ragini Garodia 'Padmavati' Sovereign 22K Zero-Stone Bridal Masterpiece",
    category: 'bridal-ensembles',
    price: 22000,
    originalPrice: 28500,
    rating: 5.0,
    reviewCount: 15,
    stockQuantity: 2,
    isLowStock: true,
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=800',
      goldBridalSetImg,
      bridalLookbookImg,
      royalGoldHaramImg
    ],
    description: "The crown jewel of the Ragini Garodia atelier. A museum-grade 5-piece royal gold bridal set celebrating 100% unadulterated micro-gold metal purity.",
    specifications: {
      baseMetal: 'Heavy Jewelers Brass',
      plating: '22K Heavy Micro Gold Plated (Lifetime 3-Micron Seal)',
      stoneType: 'None (Zero Stone Metal Masterpiece)',
      closureType: 'Imperial Silk Dori & Heavy Locks',
      weight: '340g complete set',
      hypoallergenic: true,
      antiTarnish: true,
      goldPurity: '22K Micro Gold Seal'
    },
    tags: ['Ragini Garodia', 'Sovereign Bridal', 'Zero Stone Masterpiece', '22K Gold'],
    featuredInLookbook: true,
    reviews: []
  }
];

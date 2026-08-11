import { LookbookItem } from '../types';

import raginiHeroImg from '../assets/images/ragini_gold_hero_1786370846007.jpg';
import raginiBanglesImg from '../assets/images/ragini_gold_bangles_1786370859091.jpg';
import goldBanglesImg from '../assets/images/gold_bangles_1786368239510.jpg';

export const LOOKBOOK_ITEMS: LookbookItem[] = [
  {
    id: 'look-rg-molten-runway',
    title: 'Ragini Garodia Haute Sculptural Collection',
    subtitle: 'Molten Gold & Organic Imperfection',
    occasion: 'cocktail',
    image: raginiHeroImg,
    description: "Designed for high-fashion runways and gala evenings. Features Ragini Garodia's hand-cast 18kt gold-plated molten chokers, raw open wrist cuffs, and liquid drop earrings.",
    themeColor: '#7a2238',
    hotspots: [
      {
        xPercent: 50,
        yPercent: 48,
        productId: 'prod-rg-01',
        title: "Ragini Garodia 'Aura' Molten Gold Choker",
        price: 5800
      },
      {
        xPercent: 30,
        yPercent: 65,
        productId: 'prod-rg-02',
        title: "Ragini Garodia 'Aethel' Imperfect Open Cuff",
        price: 3900
      },
      {
        xPercent: 70,
        yPercent: 25,
        productId: 'prod-rg-03',
        title: "Ragini Garodia 'Cascada' Abstract Fluid Dangles",
        price: 3400
      }
    ]
  },
  {
    id: 'look-rg-baroque-luxe',
    title: 'Ragini Garodia Baroque & Molten Gold',
    subtitle: 'Natural Pearls & Sculpted Metal',
    occasion: 'festive',
    image: goldBanglesImg,
    description: "A harmonious synthesis of organic baroque freshwater pearls and raw 18kt gold-plated metal cups. Each piece is unique and handcrafted.",
    themeColor: '#8a4b12',
    hotspots: [
      {
        xPercent: 48,
        yPercent: 50,
        productId: 'prod-rg-04',
        title: "Ragini Garodia 'Eclipse' Baroque Pearl Drops",
        price: 4200
      }
    ]
  },
  {
    id: 'look-rg-everyday-statement',
    title: 'Ragini Garodia Everyday Avant-Garde',
    subtitle: 'Dual-Tone Waves & Hammered Hoops',
    occasion: 'casual',
    image: raginiBanglesImg,
    description: 'Contemporary 18kt gold and rhodium silver pieces crafted for conscious individuals. Plastic-free packaging, anti-tarnish, and lightweight.',
    themeColor: '#9d6852',
    hotspots: [
      {
        xPercent: 50,
        yPercent: 50,
        productId: 'prod-rg-05',
        title: "Ragini Garodia 'Solstice' Dual-Tone Wave Ring",
        price: 2600
      },
      {
        xPercent: 70,
        yPercent: 40,
        productId: 'prod-rg-09',
        title: "Ragini Garodia 'Vortex' Chunky Gold Hoops",
        price: 2900
      }
    ]
  }
];

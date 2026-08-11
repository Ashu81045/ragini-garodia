import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight, ShieldCheck, Crown } from 'lucide-react';
import raginiHeroImg from '../assets/images/ragini_gold_hero_1786370846007.jpg';
import raginiBanglesImg from '../assets/images/ragini_gold_bangles_1786370859091.jpg';
import bridalLookbookImg from '../assets/images/bridal_lookbook_1786368204421.jpg';

interface Slide {
  id: string;
  title: string;
  highlightText: string;
  subtitle: string;
  tagline: string;
  image: string;
  targetCategory: string; // The category or path to navigate to when clicked
  collectionName: string;
  badge: string;
  priceTag?: string;
}

interface HeroSliderProps {
  navigate: (path: string) => void;
}

// Configurable Slider Images and Collection Destinations
export const HERO_SLIDES: Slide[] = [
  {
    id: 'slide-1',
    title: 'Handcrafted Pure 22K',
    highlightText: 'Micro-Gold Chokers',
    subtitle: 'Exquisite 22K micro-gold plated statement chokers with 3-micron anti-tarnish guarantee and zero-stone purity.',
    tagline: 'Signature Heritage Series',
    image: raginiHeroImg,
    targetCategory: '/category/chokers-necklaces',
    collectionName: 'Chokers & Necklaces',
    badge: '100% Pure Micro Gold',
    priceTag: 'From ₹4,999'
  },
  {
    id: 'slide-2',
    title: 'Heritage Coin Harams &',
    highlightText: 'Royal Temple Chains',
    subtitle: 'Timeless 22K gold-plated long harams with carved coin motifs and heavy solid link craftsmanship.',
    tagline: 'Royal Bridal Edition',
    image: bridalLookbookImg,
    targetCategory: '/category/chains-harams',
    collectionName: 'Bridal Harams & Chains',
    badge: 'Zero Stones Purity',
    priceTag: 'From ₹8,500'
  },
  {
    id: 'slide-3',
    title: 'Textured Kangans &',
    highlightText: 'Imperfection Gold Cuffs',
    subtitle: 'Open wrist cuffs and textured bangles hand-carved in 18K satin micro-gold finish.',
    tagline: 'Artisan Bangle Craft',
    image: raginiBanglesImg,
    targetCategory: '/category/bangles-kangans',
    collectionName: 'Kangans & Bangles',
    badge: 'Hand-Carved Gold',
    priceTag: 'From ₹3,900'
  },
  {
    id: 'slide-4',
    title: 'Complete Haute Couture',
    highlightText: 'Bridal Ensembles',
    subtitle: 'Opulent multi-tiered gold sets crafted for grand weddings, sangeet galas, and regal receptions.',
    tagline: 'Imperial Bridal Collection',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=1200',
    targetCategory: '/category/bridal-ensembles',
    collectionName: 'Bridal Ensembles',
    badge: 'Haute Couture',
    priceTag: 'From ₹12,999'
  }
];

export const HeroSlider: React.FC<HeroSliderProps> = ({ navigate }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play timer
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const currentSlide = HERO_SLIDES[currentIndex];

  const handleSlideClick = (targetCategory: string) => {
    navigate(targetCategory);
  };

  return (
    <section 
      className="relative bg-[#2D1A20] text-rose-50 overflow-hidden border-b border-[#4A1525]"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Background Subtle Gradient & Glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#1A0C11] via-[#2D1A20] to-[#1A0C11] opacity-90" />
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#C5A059]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#8C2643]/20 rounded-full blur-3xl pointer-events-none" />

      {/* Main Slide Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[420px]">
          
          {/* Text Overlay & Details */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#4A1525]/80 border border-[#C5A059]/40 text-amber-200 text-xs font-bold tracking-wider uppercase backdrop-blur-sm">
              <Crown className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>{currentSlide.tagline} • {currentSlide.badge}</span>
            </div>

            {/* Headline */}
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
              {currentSlide.title}{' '}
              <span className="italic text-[#C5A059] block sm:inline">{currentSlide.highlightText}</span>
            </h1>

            {/* Subtitle */}
            <p className="text-rose-100/80 text-sm sm:text-base max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              {currentSlide.subtitle}
            </p>

            {/* Guarantees */}
            <div className="pt-1 flex flex-wrap items-center justify-center lg:justify-start gap-3 text-xs font-semibold text-amber-200">
              <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
                <span>3-Micron Anti-Tarnish Guarantee</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                <Sparkles className="w-4 h-4 text-[#C5A059]" />
                <span>Zero Stones Pure Gold Finish</span>
              </div>
            </div>

            {/* CTA Button linking to Collection */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                id={`hero-slide-cta-${currentSlide.id}`}
                onClick={() => handleSlideClick(currentSlide.targetCategory)}
                className="w-full sm:w-auto bg-[#C5A059] hover:bg-[#D4AF67] text-[#2D1A20] font-bold px-8 py-3.5 rounded-full text-xs sm:text-sm tracking-wider uppercase shadow-xl flex items-center justify-center gap-2 transition-all cursor-pointer transform hover:scale-105"
              >
                <span>Explore {currentSlide.collectionName}</span>
                <ArrowRight className="w-4 h-4 text-[#2D1A20]" />
              </button>

              <button
                onClick={() => navigate('/category/all')}
                className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-rose-50 font-bold px-6 py-3.5 rounded-full text-xs sm:text-sm border border-white/20 transition-all cursor-pointer"
              >
                View Full Catalog
              </button>
            </div>
          </div>

          {/* Image Slide Card (Clickable to Collection) */}
          <div className="lg:col-span-5 relative group">
            <div 
              onClick={() => handleSlideClick(currentSlide.targetCategory)}
              className="relative rounded-3xl overflow-hidden border border-[#C5A059]/40 shadow-2xl cursor-pointer transform transition-all duration-500 group-hover:scale-[1.02] group-hover:border-[#C5A059]"
            >
              <img
                src={currentSlide.image}
                alt={currentSlide.title}
                referrerPolicy="no-referrer"
                className="w-full h-80 sm:h-96 lg:h-[420px] object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A0C11] via-transparent to-transparent opacity-80" />

              {/* Floating Badge overlay */}
              <div className="absolute top-4 right-4 bg-[#2D1A20]/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#C5A059]/50 text-amber-300 text-xs font-bold shadow-lg">
                {currentSlide.priceTag}
              </div>

              {/* Hover Redirect Overlay */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-[#1A0C11]/90 backdrop-blur-md border border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#C5A059] block">
                    Click to Open Collection
                  </span>
                  <h3 className="font-serif text-sm font-bold text-white">
                    {currentSlide.collectionName}
                  </h3>
                </div>
                <div className="w-9 h-9 rounded-full bg-[#C5A059] text-[#2D1A20] flex items-center justify-center font-bold shadow-md group-hover:translate-x-1 transition-transform">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Carousel Navigation Arrows & Indicators */}
        <div className="pt-6 flex items-center justify-between border-t border-white/10 mt-6">
          {/* Slide Dots */}
          <div className="flex items-center gap-2">
            {HERO_SLIDES.map((slide, idx) => (
              <button
                key={slide.id}
                onClick={() => setCurrentIndex(idx)}
                className={`transition-all cursor-pointer ${
                  currentIndex === idx
                    ? 'w-8 h-2 bg-[#C5A059] rounded-full'
                    : 'w-2 h-2 bg-white/30 hover:bg-white/60 rounded-full'
                }`}
                title={`Go to slide ${idx + 1}: ${slide.collectionName}`}
              />
            ))}
          </div>

          {/* Slide Counter */}
          <div className="text-xs text-rose-200/70 font-mono tracking-widest">
            0{currentIndex + 1} / 0{HERO_SLIDES.length}
          </div>

          {/* Prev / Next Buttons */}
          <div className="flex items-center gap-2">
            <button
              id="hero-slider-prev-btn"
              onClick={goToPrev}
              className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-all cursor-pointer"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              id="hero-slider-next-btn"
              onClick={goToNext}
              className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-all cursor-pointer"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

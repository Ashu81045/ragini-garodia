import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

// Helper function to lazily initialize Gemini AI SDK
function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    return null;
  }
  return new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// API Route: AI Jewelry Stylist
app.post('/api/stylist', async (req, res) => {
  try {
    const { outfitType, outfitColor, necklineStyle, occasion, additionalNotes } = req.body;

    const ai = getGeminiClient();

    if (!ai) {
      // Fallback rule-based recommendation if GEMINI_API_KEY is not set
      let overallAdvice = `For a ${outfitColor || 'vibrant'} ${outfitType || 'outfit'} with a ${necklineStyle || 'classic'} neckline at a ${occasion || 'special event'}, pure 22K micro-gold plated jewelry provides timeless elegance without distracting stone colors.`;
      let matchingIds = ['prod-ragini-01', 'prod-ragini-02', 'prod-ragini-03'];
      let tips = [
        'Pure 22K micro-gold warm tones pair seamlessly with all fabrics from silk sarees to modern gowns.',
        'Choose statement filigree gold Jhumkas if your neckline is high or heavily embroidered.',
        'Stack textured 24K gold Kangans on one wrist for an effortless regal highlight.'
      ];

      if (occasion?.toLowerCase().includes('bridal') || occasion?.toLowerCase().includes('wedding')) {
        overallAdvice = `For grand wedding occasions, Ragini Garodia's pure 22K gold plated Rajwada bridal ensemble and coin haram create an unmatched royal silhouette against ${outfitColor} wedding attires.`;
        matchingIds = ['prod-ragini-06', 'prod-ragini-04', 'prod-ragini-02'];
        tips = [
          'Layer the 22K filigree choker close to the neck with the coin haram falling lower.',
          'Ragini Garodia micro-gold plating has a 3-micron anti-tarnish coating to withstand long wedding ceremonies.',
          'Pure metal craftsmanship ensures lightweight comfort without heavy gem weights.'
        ];
      } else if (outfitType?.toLowerCase().includes('saree') || outfitType?.toLowerCase().includes('kurti')) {
        overallAdvice = `Authentic 22K antique temple gold coins and dome jhumkas bring out traditional grace in silk sarees and festive kurtis.`;
        matchingIds = ['prod-ragini-04', 'prod-ragini-03', 'prod-ragini-02'];
        tips = [
          'Temple gold coin harams sit magnificently over high-neck blouses.',
          'Store in Ragini Garodia velvet pouches after wearing to keep micro-gold luster pristine.'
        ];
      }

      return res.json({
        overallAdvice,
        styleVibe: `${outfitColor || 'Pure Gold'} ${occasion || 'Grace'} Collection`,
        matchingProductIds: matchingIds,
        stylingTips: tips,
      });
    }

    const prompt = `You are a world-class High Fashion Fine Jewelry Stylist for "RAGINI GARODIA" (India-based 100% Pure Gold Plated Jewelry brand, zero stones).
The customer provided their outfit details:
- Outfit Type: ${outfitType || 'Festive / Ethnic Wear'}
- Outfit Color: ${outfitColor || 'Rich tone'}
- Neckline Style: ${necklineStyle || 'V-neck / Sweetheart'}
- Occasion: ${occasion || 'Grand Celebration'}
- Additional Notes: ${additionalNotes || 'None'}

Available Store Product IDs (All 100% Gold Plated, 0 Stones, Prices in ₹ INR):
1. 'prod-ragini-01': Royal 22K Gold Plated Filigree Choker Set (₹4,999, 22K Micro Gold, Filigree, Choker & Earrings)
2. 'prod-ragini-02': Maharani Textured 24K Gold Plated Kangans - Set of 4 (₹3,499, 24K Gold Plated, Anti-tarnish, Bangles)
3. 'prod-ragini-03': Gilded Temple Dome 22K Gold Plated Jhumka Earrings (₹1,899, 22K Temple Gold, Tiered Dome)
4. 'prod-ragini-04': Imperial Lakshmi Coin 22K Gold Plated Layered Haram (₹6,499, 22K Coin Haram, Multi-strand)
5. 'prod-ragini-05': Sculpted Lotus Matte 18K Gold Plated Statement Ring (₹1,299, 18K Satin Gold, Adjustable Ring)
6. 'prod-ragini-06': Rajwada Pure Gold Plated Grand Bridal Ensemble (₹12,999, Complete 4-Piece Pure Gold Bridal Set)
7. 'prod-ragini-07': Sleek Minimalist 18K Gold Plated Snake Chain (₹1,599, 18K Waterproof Gold PVD, Daily Wear)
8. 'prod-ragini-08': Hammered Gold Plated Statement Hoop Earrings (₹1,499, 18K Warm Gold, Organic Hammered Texture)

Analyze the outfit tone, color harmony, neckline geometry, and event formality. Recommend 2 to 4 product IDs that best complement this look with pure gold plated metal craftsmanship.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt,
      config: {
        systemInstruction: 'You are an expert luxury jewelry stylist for Ragini Garodia (pure gold plated jewelry, zero stones). Provide structured JSON recommendations.',
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            overallAdvice: {
              type: Type.STRING,
              description: 'Comprehensive styling recommendation explaining why pure gold plated choices work for this look.',
            },
            styleVibe: {
              type: Type.STRING,
              description: 'A catchy 3-4 word style theme name (e.g. "Royal 22K Gold Elegance").',
            },
            matchingProductIds: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'Array of exact product IDs matched from the available store catalog.',
            },
            stylingTips: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: '3 practical wearing & care styling tips for gold plated jewelry.',
            },
          },
          required: ['overallAdvice', 'styleVibe', 'matchingProductIds', 'stylingTips'],
        },
      },
    });

    const jsonText = response.text || '{}';
    const parsedData = JSON.parse(jsonText);
    res.json(parsedData);
  } catch (err: any) {
    console.error('Stylist API error:', err);
    res.status(500).json({
      error: 'Failed to generate styling advice',
      details: err.message,
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', brand: 'RAGINI GARODIA' });
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Ornate Luxe server running on http://localhost:${PORT}`);
  });
}

startServer();

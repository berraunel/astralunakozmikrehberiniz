import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// Initialize Gemini SDK with User-Agent header as required
const apiKey = process.env.GEMINI_API_KEY || '';
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Explicit download endpoint for project zip
app.get(['/astroloji101.zip', '/download-zip'], (_req, res) => {
  const filePath = path.resolve(__dirname, 'public', 'astroloji101.zip');
  res.setHeader('Content-Type', 'application/zip');
  res.setHeader('Content-Disposition', 'attachment; filename="astroloji101.zip"');
  res.sendFile(filePath, (err) => {
    if (err) {
      console.error('File send error:', err);
      res.status(404).send('Dosya bulunamadı');
    }
  });
});

// AI Astrologer Consultant Endpoint
app.post('/api/chat-astrologer', async (req, res) => {
  try {
    const { message, chartContext, conversationHistory } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Soru veya mesaj gereklidir.' });
    }

    if (!ai) {
      // Fallback if API key is not configured in environment
      return res.json({
        reply: `Sevgili yolcu, şu anda gökyüzü danışmanımız offline modda. Haritandaki verileri incelediğimde: ${
          chartContext ? `Güneşin ${chartContext.sunSign}, Yükselenin ${chartContext.ascSign} ve Ay burcun ${chartContext.moonSign} konumunda.` : 'Kendi doğum bilgilerini girdiğinde'
        } sana özel derin kozmik tavsiyeler üretebiliyorum. Lütfen sorunu veya keşfetmek istediğin ev konusunu panellerden incelemeye devam et.`,
      });
    }

    const systemPrompt = `Sen "AstraLogia" platformunun baş astrologu ve bilge danışmanısın.
Adın "Astra". Astrolojiye hiç bilgisi olmayan birinin bile kolayca anlayabileceği, mistik ama bir o kadar da psikolojik, şefkatli, motive edici ve gerçekçi bir üslupla konuşursun.
Kaderci, korkutucu veya felaket tellalı bir dil ASLA kullanmazsın. Astroloji bir kehanet değil, insanın kendi potansiyelini ve yaşam haritasını keşfetme aracıdır.

Kullanıcının Doğum Haritası Verileri:
${chartContext ? JSON.stringify(chartContext, null, 2) : 'Henüz harita hesaplanmadı veya genel bir astroloji sorusu soruldu.'}

Talimatlar:
1. Yanıtlarını Türkçe dilinde, zarif ve sıcak bir tonda ver.
2. Gezegenlerin ve evlerin anlamlarını sade, günlük yaşamdan somut örneklerle açıkla.
3. Yanıtında gereksiz karmaşık terimler kullanma; kullanırsan parantez içinde ne anlama geldiğini açıkla.
4. Okumayı kolaylaştırmak için kısa paragraflar ve madde işaretleri kullan.`;

    const contents: any[] = [];
    if (conversationHistory && Array.isArray(conversationHistory)) {
      for (const turn of conversationHistory.slice(-6)) {
        contents.push({
          role: turn.role === 'user' ? 'user' : 'model',
          parts: [{ text: turn.content }],
        });
      }
    }

    contents.push({
      role: 'user',
      parts: [{ text: message }],
    });

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: contents as any,
      config: {
        systemInstruction: systemPrompt,
      },
    });

    const reply = response.text || 'Göklerin fısıltısı bu anda sessiz kaldı, lütfen tekrar sorunuzu yöneltiniz.';
    return res.json({ reply });
  } catch (error: any) {
    console.error('Gemini Astrologer error:', error);
    return res.status(500).json({
      error: 'Astrolog yanıtı oluşturulurken bir hata oluştu.',
      details: error?.message || 'Bilinmeyen hata',
    });
  }
});

// Setup Vite middlewares in development or static serving in production
async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`AstraLogia server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();

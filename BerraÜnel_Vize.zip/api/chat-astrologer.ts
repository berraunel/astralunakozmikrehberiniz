import type { IncomingMessage, ServerResponse } from 'http';
import { GoogleGenAI } from '@google/genai';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message, chartContext, conversationHistory } = req.body || {};

    if (!message) {
      return res.status(400).json({ error: 'Soru veya mesaj gereklidir.' });
    }

    const apiKey = process.env.GEMINI_API_KEY || '';
    if (!apiKey) {
      return res.json({
        reply: `Sevgili yolcu, şu anda gökyüzü danışmanımız offline modda. Haritandaki verileri incelediğimde: ${
          chartContext ? `Güneşin ${chartContext.sunSign}, Yükselenin ${chartContext.ascSign} ve Ay burcun ${chartContext.moonSign} konumunda.` : 'Kendi doğum bilgilerini girdiğinde'
        } sana özel derin kozmik tavsiyeler üretebiliyorum. Lütfen sorunu veya keşfetmek istediğin ev konusunu panellerden incelemeye devam et.`,
      });
    }

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    const systemPrompt = `Sen "AstraLuna" platformunun bilge astrolog danışmanısın.
Adın "Astra". Astrolojiye hiç bilgisi olmayan birinin bile kolayca anlayabileceği, mistik ama bir o kadar da psikolojik, şefkatli, motive edici ve gerçekçi bir üslupla konuşursun.
Kaderci, korkutucu veya felaket tellalı bir dil ASLA kullanmazsın. Astroloji bir kehanet değil, insanın kendi potansiyelini ve yaşam haritasını keşfetme aracıdır.

Kullanıcının Doğum Haritası Verileri:
${chartContext ? JSON.stringify(chartContext, null, 2) : 'Genel bir astroloji sorusu soruldu.'}

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
    return res.status(200).json({ reply });
  } catch (error: any) {
    console.error('Gemini Astrologer error:', error);
    return res.status(500).json({
      error: 'Astrolog yanıtı oluşturulurken bir hata oluştu.',
      details: error?.message || 'Bilinmeyen hata',
    });
  }
}

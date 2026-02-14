import { GoogleGenAI, Tool } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// System instruction for the main analytical chatbot (MurodTarixchi)
const SYSTEM_INSTRUCTION_CHAT = `
Siz MurodTarixchi ismli professional tarixchi va akademik yordamchisiz.
Sizning vazifangiz: 8-sinf o'quvchilariga XIV-XV asrlar Osiyo tarixi, xususan Amir Temur davlati haqida chuqur, tahliliy va ilmiy ma'lumot berish.
Til: Faqat va faqat O'zbek tili (Kirill yoki Lotin alifbosi, lekin foydalanuvchi so'roviga qarab). Saytda Lotin alifbosi ishlatiladi.
Uslub: Akademik, jiddiy, lekin tushunarli. "Sohibqiron" deb atash shart.
Taqiq: Zamonaviy jargonlar, qisqa va yuzaki javoblar. Javoblar batafsil va mantiqiy bo'lishi kerak.
`;

// 1. Complex Chat & Analysis (Pro Model)
export const chatWithMurod = async (message: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview', // High intelligence for chat
      contents: message,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION_CHAT,
        temperature: 0.3, // More deterministic/academic
      }
    });
    return response.text || "Uzr, ma'lumotni tahlil qilishda xatolik yuz berdi.";
  } catch (error) {
    console.error("Chat error:", error);
    return "Tizimda vaqtincha nosozlik. Iltimos, keyinroq urinib ko'ring.";
  }
};

// 2. Deep State Comparison Generation (Pro Model)
export const generateComparisonAnalysis = async (state1: string, state2: string): Promise<string> => {
  const prompt = `
    Quyidagi ikki davlatni XIV-XV asrlar tarixiy kontekstida chuqur akademik taqqoslang: ${state1} va ${state2}.
    
    Talablar:
    1. Matn kamida 40 ta to'liq gapdan iborat bo'lishi SHART.
    2. Quyidagi yo'nalishlarni chuqur tahlil qiling:
       - Harbiy kuch va armiya tuzilishi
       - Davlat boshqaruvi va ma'muriy tizim
       - Iqtisodiy barqarorlik va savdo
       - Diplomatiya va tashqi siyosat
       - Madaniy va ilmiy rivojlanish
       - Uzoq muddatli barqarorlik va tarixiy ta'sir
       - Texnologik yutuqlar (qurol-yarog', qurilish, ishlab chiqarish)
       - Diniy ta'sir va siyosat
       - Muhim islohotlar va ularning samarasi
       - Jamiyatga ta'siri va ijtimoiy tuzilma
    3. Matn paragraflarga bo'lingan, o'qish uchun qulay bo'lsin.
    4. Xulosa qismi kuchli tahliliy fikr bilan yakunlansin.
    5. Faqat O'zbek tilida yozing.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: prompt,
    });
    return response.text || "Taqqoslama tahlilni yaratib bo'lmadi.";
  } catch (error) {
    console.error("Comparison generation error:", error);
    return "Tahlil jarayonida xatolik yuz berdi.";
  }
};

// 3. Search Grounding for Fact Checking (Flash with Google Search)
export const checkHistoricalFact = async (query: string): Promise<{text: string, sources: string[]}> => {
  try {
    // Define the tool correctly using the GoogleGenAI SDK format
    const searchTool: Tool = {
      googleSearch: {}
    };

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Tarixiy faktni tekshiring: ${query}. XIV-XV asrlar kontekstida javob bering.`,
      config: {
        tools: [searchTool],
      }
    });

    // Extract sources if available
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const sources = groundingChunks
      .map((chunk: any) => chunk.web?.uri)
      .filter((uri: string | undefined): uri is string => !!uri);

    return {
      text: response.text || "Ma'lumot topilmadi.",
      sources: sources
    };
  } catch (error) {
    console.error("Search error:", error);
    return { text: "Qidiruv xizmati ishlamayapti.", sources: [] };
  }
};

// 4. Fast Explanations (Flash-Lite)
export const getQuickExplanation = async (term: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-lite-preview-02-05',
      contents: `Tarixiy terminning qisqa va lo'nda izohini bering (O'zbek tilida): ${term}`,
    });
    return response.text || "Izoh mavjud emas.";
  } catch (error) {
    return "Tezkor izoh olishda xatolik.";
  }
};

// 5. Image Analysis (Pro Vision)
export const analyzeImage = async (base64Image: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: 'image/jpeg',
              data: base64Image
            }
          },
          {
            text: "Ushbu tarixiy eksponatni (tanga, miniatyura, qurol yoki qo'lyozma) tahlil qiling. Bu nima? Qaysi davrga (XIV-XV asrlar) va qaysi davlatga oid bo'lishi mumkin? Uning tarixiy ahamiyatini tushuntirib bering. Javobni akademik o'zbek tilida, aniq va tushunarli formatda bering."
          }
        ]
      }
    });
    return response.text || "Rasmni tahlil qilib bo'lmadi.";
  } catch (error) {
    console.error("Analysis error:", error);
    return "Tahlil jarayonida xatolik yuz berdi.";
  }
};
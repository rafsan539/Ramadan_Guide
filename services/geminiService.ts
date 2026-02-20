import { GoogleGenAI } from "@google/genai";
import { findAnswer } from "../utils/islamicKnowledge.js";

// Debug helper for API key
const getEnvironmentVariable = (key: keyof ImportMetaEnv): string => {
  try {
    const value = import.meta.env[key] || "";
    if (key === "VITE_GEMINI_API_KEY" && value) {
      console.log("[✓] VITE_GEMINI_API_KEY found:", value.substring(0, 10) + "...");
    }
    return value;
  } catch (e) {
    console.warn("[!] Could not read environment variable:", key);
    return "";
  }
};

const API_KEY = getEnvironmentVariable("VITE_GEMINI_API_KEY");

// Initialize client safely
let client: GoogleGenAI | null = null;

if (API_KEY && API_KEY.length > 10) {
  try {
    client = new GoogleGenAI({ apiKey: API_KEY });
    console.log("[✓] Gemini Client initialized");
  } catch (initError) {
    console.error("[✗] Failed to init client:", initError);
    client = null;
  }
} else {
  console.warn("[!] API Key missing or invalid");
}

export const askRamadanAssistant = async (prompt: string): Promise<string> => {
  try {
    console.log("[→] Processing question:", prompt.substring(0, 50));

    // FIRST - Try to find answer in local Islamic knowledge base
    const localAnswer = findAnswer(prompt);
    if (localAnswer) {
      console.log("[✓] Found answer in local knowledge base");
      return `**${prompt}**

${localAnswer.answer}

---

**📚 কুরআন এবং হাদিস রেফারেন্স:**
${localAnswer.references.map((ref) => `• ${ref}`).join("\n")}

---
*আল্লাহু আলিম - আল্লাহই সর্বজ্ঞ* 🌙`;
    }

    // If not found locally and API available, use Gemini
    if (client && API_KEY) {
      console.log("[→] Using Gemini API for:", prompt.substring(0, 40));

      const systemPrompt =
        'You are an expert Islamic scholar assistant. ALWAYS respond ONLY in Bengali (বাংলায়). ' +
        'For Ramadan topics specifically. ' +
        'For every response: (1) Cite specific Quranic verses with Surah and Ayah numbers, ' +
        '(2) Reference authentic Hadith with book names and Hadith numbers, ' +
        '(3) Be accurate and scholarly. Format responses with Markdown for clarity.';

      const fullPrompt = `${systemPrompt}\n\nUser question about Ramadan/Islam: ${prompt}`;

      const response = await client.models.generateContent({
        model: "gemini-2.0-flash",
        contents: fullPrompt,
      });

      const text = response.text || "";
      console.log("[✓] Response received from API");

      return (
        text ||
        "দুঃখিত, কোনো উত্তর পাওয়া যায়নি। অনুগ্রহ করে পরে চেষ্টা করুন।"
      );
    }

    // If not found locally and no API, provide helpful response
    console.log("[!] No answer found and no API available");
    return `দুঃখিত, আমার কাছে এই প্রশ্নের সরাসরি উত্তর নেই।

**আমি এই বিষয়গুলি সম্পর্কে সাহায্য করতে পারি:**
- রোজা ও রোজার নিয়ম
- নিয়ত করার পদ্ধতি
- সেহরি এবং ইফতার
- তারাবিহ নামাজ
- কুরআন তিলাওয়াত
- জাকাত ও ফিত্রা
- তাসবিহ এবং দোয়া

**আপনার প্রশ্নটি এই বিষয়গুলির সাথে সম্পর্কিত কিনা আবার চেষ্টা করুন।**

উদাহরণ: "রোজা সম্পর্কে বলবে?" লিখুন। 🤲`;
  } catch (error: any) {
    const errMsg = error?.message || String(error);
    console.error("[✗] Error:", errMsg);

    // Specific error handling
    if (
      errMsg.includes("401") ||
      errMsg.includes("UNAUTHENTICATED") ||
      errMsg.includes("invalid") ||
      errMsg.includes("API")
    ) {
      return `❌ **API Key অ-বৈধ বা মেয়াদ শেষ**

**দ্রুত সমাধান:**
1. https://aistudio.google.com/app/apikey খুলুন
2. পুরনো key ডিলিট করুন
3. নতুন API key তৈরি করুন
4. সম্পূর্ণ key কপি করুন
5. প্রজেক্টের \`.env\` ফাইলে পেস্ট করুন:
   \`VITE_GEMINI_API_KEY=নতুন_key_এখানে\`
6. **সার্ভার সম্পূর্ণ বন্ধ করুন এবং চালান:**
   \`npm run dev\`
7. ব্রাউজার সম্পূর্ণ ক্লোজ করে আবার খুলুন`;
    }

    if (errMsg.includes("429") || errMsg.includes("RESOURCE_EXHAUSTED")) {
      return "⏱️ **হার সীমা অতিক্রম করেছি।** ২ মিনিট অপেক্ষা করুন এবং পুনরায় চেষ্টা করুন।";
    }

    if (errMsg.includes("network") || errMsg.includes("fetch")) {
      return "🌐 **ইন্টারনেট সংযোগ দুর্বল।** আপনার নেটওয়ার্ক পরীক্ষা করুন এবং আবার চেষ্টা করুন।";
    }

    return `⚠️ **অপ্রত্যাশিত ত্রুটি:** ${errMsg}`;
  }
};

export const getBengaliPronunciations = async (
  ayahs: { text: string; numberInSurah: number }[],
  retries: number = 3,
  delay: number = 2000
): Promise<Record<string, string>> => {
  // Silently skip if API key or client not available
  if (!client || !API_KEY) {
    console.log("[i] Pronunciation generation skipped - no credentials");
    return {};
  }

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const prompt = `Generate Bengali transliteration (উচ্চারণ) ONLY for these Quranic ayahs. 
Return ONLY a JSON object. No other text.

Ayahs:
${ayahs.map((a) => `${a.numberInSurah}: ${a.text}`).join("\n")}

Format: {"1": "বিসমিল্লাহির রহমানির রহিম", "2": "..."}`;

      const response = await client.models.generateContent({
        model: "gemini-2.0-flash",
        contents: prompt,
      });

      let responseText = response.text || "{}";

      // Clean markdown if present
      responseText = responseText
        .replace(/```json\n?/g, "")
        .replace(/```\n?/g, "")
        .trim();

      const result = JSON.parse(responseText);
      console.log("[✓] Generated pronunciations for", Object.keys(result).length, "ayahs");
      return result;
    } catch (error: any) {
      const isRateLimit =
        error?.status === 429 ||
        error?.message?.includes("429") ||
        error?.message?.includes("RESOURCE_EXHAUSTED");

      if (isRateLimit && attempt < retries) {
        console.log(`[!] Rate limited. Retrying in ${delay}ms... (${attempt + 1}/${retries})`);
        await new Promise((r) => setTimeout(r, delay));
        delay *= 2;
        continue;
      }

      console.error("[✗] Pronunciation error:", error?.message);
      return {};
    }
  }

  return {};
};

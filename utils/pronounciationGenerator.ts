import { getBengaliPronunciations } from '../services/geminiService';

const QURAN_API_BASE = 'https://api.alquran.cloud/v1';

export interface GenerationProgress {
  totalSurahs: number;
  processedSurahs: number;
  status: string;
}

export const initializePronunciationsForAllSurahs = async (
  onProgress?: (progress: GenerationProgress) => void
) => {
  try {
    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your-gemini-api-key-here') {
      console.warn('Gemini API key not configured. Pronunciations will use pre-generated data only.');
      return false;
    }

    // 1. Fetch all surahs
    const surahsRes = await fetch(`${QURAN_API_BASE}/surah`);
    const surahsData = await surahsRes.json();
    const totalSurahs = surahsData.data.length;

    // 2. For each surah, check if pronunciations are cached
    for (let i = 0; i < totalSurahs; i++) {
      const surahNum = i + 1;
      const cacheKey = `quran_pronunciation_${surahNum}`;
      const cachedData = localStorage.getItem(cacheKey);
      
      if (!cachedData) {
        // Need to fetch this surah's pronunciations
        try {
          const arabicRes = await fetch(`${QURAN_API_BASE}/surah/${surahNum}`);
          const arabicData = await arabicRes.json();
          const ayahs = arabicData.data.ayahs;

          // Chunk ayahs (process 15 at a time to respect API rate limits)
          const chunkSize = 15;
          const pronunciations: Record<string, string> = {};

          for (let j = 0; j < ayahs.length; j += chunkSize) {
            const chunk = ayahs.slice(j, Math.min(j + chunkSize, ayahs.length));
            
            try {
              const result = await getBengaliPronunciations(
                chunk.map((ayah: any) => ({
                  text: ayah.text,
                  numberInSurah: ayah.numberInSurah,
                }))
              );

              // Merge results
              Object.assign(pronunciations, result);

              // Add delay between requests to avoid rate limiting
              await new Promise(resolve => setTimeout(resolve, 1000));
            } catch (error) {
              console.error(`Error fetching pronunciations for Surah ${surahNum} chunk:`, error);
              // Continue with other chunks/surahs
            }
          }

          // Save to cache
          if (Object.keys(pronunciations).length > 0) {
            localStorage.setItem(cacheKey, JSON.stringify(pronunciations));
          }
        } catch (error) {
          console.error(`Error processing Surah ${surahNum}:`, error);
          // Continue with next surah
        }
      }

      // Report progress
      if (onProgress) {
        onProgress({
          totalSurahs,
          processedSurahs: surahNum,
          status: `Processing Surah ${surahNum} of ${totalSurahs}...`,
        });
      }

      // Delay between surahs
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    console.log('All surahs pronunciations generated and cached!');
    return true;
  } catch (error) {
    console.error('Error in initializePronunciationsForAllSurahs:', error);
    return false;
  }
};

export const checkPronunciationCache = (surahNumber: number): boolean => {
  const cacheKey = `quran_pronunciation_${surahNumber}`;
  return localStorage.getItem(cacheKey) !== null;
};

export const getCachedPronunciations = (surahNumber: number): Record<string, string> | null => {
  const cacheKey = `quran_pronunciation_${surahNumber}`;
  const cached = localStorage.getItem(cacheKey);
  return cached ? JSON.parse(cached) : null;
};

export const clearPronunciationCache = () => {
  const keys = Object.keys(localStorage);
  keys.forEach(key => {
    if (key.startsWith('quran_pronunciation_')) {
      localStorage.removeItem(key);
    }
  });
  console.log('Pronunciation cache cleared!');
};

export const getGenerationProgress = (): { cached: number; total: number; percentage: number } => {
  let cachedCount = 0;
  const keys = Object.keys(localStorage);
  keys.forEach(key => {
    if (key.startsWith('quran_pronunciation_')) {
      cachedCount++;
    }
  });
  return {
    cached: cachedCount,
    total: 114, // Total number of surahs
    percentage: Math.round((cachedCount / 114) * 100),
  };
};

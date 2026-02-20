
export interface Surah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
}

export interface Ayah {
  number: number;
  text: string;
  numberInSurah: number;
  juz: number;
  manzil: number;
  page: number;
  ruku: number;
  hizbQuarter: number;
  sajda: boolean;
  translation?: string;
  pronunciation?: string;
}

export interface Hadith {
  id: number;
  category: 'fasting' | 'taraweeh' | 'laylatul-qadr' | 'zakat' | 'dua';
  arabic: string;
  pronunciation: string;
  bangla: string;
  reference: string;
}

export interface District {
  id: string;
  name: string;
  sahariOffset: number; // minutes from Dhaka for Sahari
  iftarOffset: number;  // minutes from Dhaka for Iftar
}

export interface DailyTime {
  ramadan: number;
  date: string;
  sahari: string;
  iftar: string;
}

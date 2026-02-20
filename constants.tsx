
import { District, Hadith, DailyTime } from './types';

export const DISTRICTS: District[] = [
  { id: 'dhaka', name: 'ঢাকা', sahariOffset: 0, iftarOffset: 0 },
  { id: 'faridpur', name: 'ফরিদপুর', sahariOffset: 2, iftarOffset: 3 },
  { id: 'gazipur', name: 'গাজীপুর', sahariOffset: 0, iftarOffset: 0 },
  { id: 'gopalganj', name: 'গোপালগঞ্জ', sahariOffset: 3, iftarOffset: 4 },
  { id: 'kishoreganj', name: 'কিশোরগঞ্জ', sahariOffset: -2, iftarOffset: -1 },
  { id: 'madaripur', name: 'মাদারীপুর', sahariOffset: 1, iftarOffset: 2 },
  { id: 'manikganj', name: 'মানিকগঞ্জ', sahariOffset: 1, iftarOffset: 2 },
  { id: 'munshiganj', name: 'মুন্সীগঞ্জ', sahariOffset: -1, iftarOffset: -1 },
  { id: 'narayanganj', name: 'নারায়ণগঞ্জ', sahariOffset: -1, iftarOffset: -1 },
  { id: 'narsingdi', name: 'নরসিংদী', sahariOffset: -2, iftarOffset: -1 },
  { id: 'rajbari', name: 'রাজবাড়ী', sahariOffset: 3, iftarOffset: 3 },
  { id: 'shariatpur', name: 'শরীয়তপুর', sahariOffset: 0, iftarOffset: 1 },
  { id: 'tangail', name: 'টাঙ্গাইল', sahariOffset: 2, iftarOffset: 1 },
  { id: 'bogura', name: 'বগুড়া', sahariOffset: 4, iftarOffset: 3 },
  { id: 'joypurhat', name: 'জয়পুরহাট', sahariOffset: 6, iftarOffset: 4 },
  { id: 'naogaon', name: 'নওগাঁ', sahariOffset: 7, iftarOffset: 5 },
  { id: 'natore', name: 'নাটোর', sahariOffset: 6, iftarOffset: 5 },
  { id: 'chapai_nawabganj', name: 'চাঁপাইনবাবগঞ্জ', sahariOffset: 9, iftarOffset: 7 },
  { id: 'pabna', name: 'পাবনা', sahariOffset: 5, iftarOffset: 5 },
  { id: 'rajshahi', name: 'রাজশাহী', sahariOffset: 7, iftarOffset: 6 },
  { id: 'sirajganj', name: 'সিরাজগঞ্জ', sahariOffset: 4, iftarOffset: 3 },
  { id: 'dinajpur', name: 'দিনাজপুর', sahariOffset: 9, iftarOffset: 5 },
  { id: 'gaibandha', name: 'গাইবান্ধা', sahariOffset: 6, iftarOffset: 2 },
  { id: 'kurigram', name: 'কুড়িগ্রাম', sahariOffset: 7, iftarOffset: 1 },
  { id: 'lalmonirhat', name: 'লালমনিরহাট', sahariOffset: 8, iftarOffset: 2 },
  { id: 'nilphamari', name: 'নীলফামারী', sahariOffset: 9, iftarOffset: 3 },
  { id: 'panchagarh', name: 'পঞ্চগড়', sahariOffset: 11, iftarOffset: 5 },
  { id: 'rangpur', name: 'রংপুর', sahariOffset: 7, iftarOffset: 2 },
  { id: 'thakurgaon', name: 'ঠাকুরগাঁও', sahariOffset: 2, iftarOffset: 5 }, // Calibrated to user screenshot: Sahari 5:20, Iftar 6:03
  { id: 'barguna', name: 'বরগুনা', sahariOffset: 2, iftarOffset: 4 },
  { id: 'barisal', name: 'বরিশাল', sahariOffset: 1, iftarOffset: 2 },
  { id: 'bhola', name: 'ভোলা', sahariOffset: -1, iftarOffset: 0 },
  { id: 'jhalokati', name: 'ঝালকাঠি', sahariOffset: 2, iftarOffset: 3 },
  { id: 'patuakhali', name: 'পটুয়াখালী', sahariOffset: 2, iftarOffset: 3 },
  { id: 'pirojpur', name: 'পিরোজপুর', sahariOffset: 3, iftarOffset: 4 },
  { id: 'bandarban', name: 'বান্দরবান', sahariOffset: -4, iftarOffset: -6 },
  { id: 'brahmanbaria', name: 'ব্রাহ্মণবাড়িয়া', sahariOffset: -3, iftarOffset: -2 },
  { id: 'chandpur', name: 'চাঁদপুর', sahariOffset: -2, iftarOffset: 0 },
  { id: 'chattogram', name: 'চট্টগ্রাম', sahariOffset: -5, iftarOffset: -7 },
  { id: 'cumilla', name: 'কুমিল্লা', sahariOffset: -3, iftarOffset: -2 },
  { id: 'coxs_bazar', name: 'কক্সবাজার', sahariOffset: -6, iftarOffset: -8 },
  { id: 'feni', name: 'ফেনী', sahariOffset: -4, iftarOffset: -3 },
  { id: 'khagrachari', name: 'খাগড়াছড়ি', sahariOffset: -4, iftarOffset: -6 },
  { id: 'lakshmipur', name: 'লক্ষ্মীপুর', sahariOffset: -3, iftarOffset: -1 },
  { id: 'noakhali', name: 'নোয়াখালী', sahariOffset: -3, iftarOffset: -1 },
  { id: 'rangamati', name: 'রাঙ্গামাটি', sahariOffset: -4, iftarOffset: -7 },
  { id: 'habiganj', name: 'হবিগঞ্জ', sahariOffset: -5, iftarOffset: -3 },
  { id: 'moulvibazar', name: 'মৌলভীবাজার', sahariOffset: -6, iftarOffset: -4 },
  { id: 'sunamganj', name: 'সুনামগঞ্জ', sahariOffset: -6, iftarOffset: -2 },
  { id: 'sylhet', name: 'সিলেট', sahariOffset: -7, iftarOffset: -4 },
  { id: 'bagerhat', name: 'বাগেরহাট', sahariOffset: 4, iftarOffset: 5 },
  { id: 'chuadanga', name: 'চুয়াডাঙ্গা', sahariOffset: 7, iftarOffset: 8 },
  { id: 'jessore', name: 'যশোর', sahariOffset: 5, iftarOffset: 7 },
  { id: 'jhenaidah', name: 'ঝিনাইদহ', sahariOffset: 5, iftarOffset: 6 },
  { id: 'khulna', name: 'খুলনা', sahariOffset: 4, iftarOffset: 6 },
  { id: 'kushtia', name: 'কুষ্টিয়া', sahariOffset: 6, iftarOffset: 6 },
  { id: 'magura', name: 'মাগুরা', sahariOffset: 4, iftarOffset: 5 },
  { id: 'meherpur', name: 'মেহেরপুর', sahariOffset: 8, iftarOffset: 8 },
  { id: 'narail', name: 'নড়াইল', sahariOffset: 4, iftarOffset: 5 },
  { id: 'satkhira', name: 'সাতক্ষীরা', sahariOffset: 6, iftarOffset: 8 },
  { id: 'jamalpur', name: 'জামালপুর', sahariOffset: 2, iftarOffset: 1 },
  { id: 'mymensingh', name: 'ময়মনসিংহ', sahariOffset: 1, iftarOffset: 0 },
  { id: 'netrokona', name: 'নেত্রকোণা', sahariOffset: -1, iftarOffset: -1 },
  { id: 'sherpur', name: 'শেরপুর', sahariOffset: 2, iftarOffset: 1 },
].sort((a, b) => a.name.localeCompare(b.name, 'bn'));

export const HADITHS: Hadith[] = [
  {
    id: 1,
    category: 'fasting',
    arabic: 'مَنْ صَامَ رَمَضَانَ إِيمَانًا وَاحْتِسَابًا غُفِرَ لَهُ مَا تَقَدَّمَ مِنْ ذَنْبِهِ',
    pronunciation: 'মান স্বমা রমাদ্বানা ঈমানাউঁ ওয়াহতিসাবান গুফিরা লাহূ মা তাক্বাদ্দামা মিং যামবিহ।',
    bangla: 'যে ব্যক্তি ঈমানের সাথে সওয়াবের আশায় রমজানের রোজা পালন করবে, তার পূর্ববর্তী সমস্ত গুনাহ ক্ষমা করে দেওয়া হবে।',
    reference: 'সহীহ বুখারী, হাদিস নম্বর: ৩৮'
  },
  {
    id: 2,
    category: 'taraweeh',
    arabic: 'مَنْ قَامَ رَمَضَانَ إِيمَانًا وَاحْتِسَابًا غُفِرَ لَهُ مَا تَقَدَّমَ مِنْ ذَنْبِهِ',
    pronunciation: 'মান ক্বামা রমাদ্বানা ঈমানাউঁ ওয়াহতিসাবান গুফিরা লাহূ মা তাক্বাদ্দামা মিং যামবিহ।',
    bangla: 'যে ব্যক্তি ঈমানের সাথে সওয়াবের আশায় রমজানের রাতে কিয়াম (তারাবীহ) করবে, তার পূর্ববর্তী সমস্ত গুনাহ ক্ষমা করে দেওয়া হবে।',
    reference: 'সহীহ বুখারী, হাদিস নম্বর: ৩৭'
  },
  {
    id: 3,
    category: 'laylatul-qadr',
    arabic: 'تَحَرَّوْا لَيْلَةَ الْقَدْرِ فِي الْوِتْرِ مِنَ الْعَشْرِ الأَوَاخِرِ مِنْ رَمَضَانَ',
    pronunciation: 'তাহাররাও লাইলাতাল ক্বাদরি ফিল বিতরি মিনাল আশরিল আওয়াখিরি মিং রমাদ্বান।',
    bangla: 'তোমরা রমজানের শেষ দশকের বেজোড় রাতগুলোতে লাইলাতুল কদর তালাশ করো।',
    reference: 'সহীহ বুখারী, হাদিস নম্বর: ২০১৭'
  },
  {
    id: 4,
    category: 'fasting',
    arabic: 'لِكُلِّ شَيْءٍ زَكَاةٌ وَزَكَاةُ الْجَسَدِ الصَّوْمُ',
    pronunciation: 'লিকুল্লি শাইয়িন যাকাতুন ওয়া যাকাতুল জাসাদিস স্বাওম।',
    bangla: 'প্রত্যেক বস্তুর যাকাত আছে, আর শরীরের যাকাত হলো রোজা।',
    reference: 'সুনানে ইবনে মাজাহ, হাদিস নম্বর: ১৭৪৫'
  },
  {
    id: 5,
    category: 'zakat',
    arabic: 'بُنِيَ الإِسْلاَمُ عَلَى خَمْسٍ شَهَادَةِ أَنْ لاَ إِلَهَ إِلاَّ اللَّهُ وَأَنَّ مُحَمَّدًا رَسُولُ اللَّهِ وَإِقَامِ الصَّلاَةِ وَإِيتَاءِ الزَّكَاةِ وَالْحَجِّ وَصَوْمِ رَمَضَانَ',
    pronunciation: 'বুনিয়াল ইসলামু আলা খামসিন- শাহাদাতি আল্লা ইলাহা ইল্লাল্লাহু ওয়া আন্না মুহাম্মাদার রাসুলুল্লাহি ওয়া ইক্বামিস স্বালাতি ওয়া ইতায়িয যাকাতিল হাজ্জি ওয়া স্বাওমি রমাদ্বান।',
    bangla: 'ইসলাম পাঁচটি স্তম্ভের ওপর প্রতিষ্ঠিত। ১. এই সাক্ষ্য দেওয়া যে, আল্লাহ ছাড়া কোনো ইলাহ নেই এবং মুহাম্মদ (সা.) আল্লাহর রাসুল, ২. নামাজ কায়েম করা, ৩. যাকাত প্রদান করা, ৪. হজ করা এবং ৫. রমজানের রোজা রাখা।',
    reference: 'সহীহ বুখারী, হাদিস নম্বর: ৮'
  },
  {
    id: 6,
    category: 'dua',
    arabic: 'الدُّعَاءُ هُوَ الْعِبَادَةُ',
    pronunciation: 'আদ-দুয়াউ হুয়াল ইবাদাহ।',
    bangla: 'দোয়াই হলো ইবাদত।',
    reference: 'সুনানে আবু দাউদ, হাদিস নম্বর: ১৪৭৯'
  },
  {
    id: 7,
    category: 'dua',
    arabic: 'ثَلَاثُ دَعَوَاتٍ لَا تُرَدُّ دَعْوَةُ الْوَالِدِ وَدَعْوَةُ الصَّائِمِ وَدَعْوَةُ الْمُسَافِرِ',
    pronunciation: 'সালাসাতু দাওয়াতিন লা তুরাদ্দু- দাওয়াতুল ওয়ালিদি ওয়া দাওয়াতুস স্বায়িমি ওয়া দাওয়াতুল মুসাফির।',
    bangla: 'তিন ব্যক্তির দোয়া ফিরিয়ে দেওয়া হয় না: পিতার দোয়া, রোজাদারের দোয়া এবং মুসাফিরের দোয়া।',
    reference: 'সুনানে বায়হাকী, হাদিস নম্বর: ৬৬৩২'
  }
];

export const HADITH_BOOKS = [
  { 
    name: 'সহীহ বুখারী', 
    englishName: 'Sahih al-Bukhari', 
    author: 'ইমাম বুখারী (র.)',
    desc: 'ইসলামের ইতিহাসে বিশুদ্ধতম হাদিস গ্রন্থ।',
    link: 'https://ihadis.com/bukhari' 
  },
  { 
    name: 'সহীহ মুসলিম', 
    englishName: 'Sahih Muslim', 
    author: 'ইমাম মুসলিম (র.)',
    desc: 'সহীহ বুখারীর পরেই যার স্থান এবং নির্ভরযোগ্যতা সর্বজনবিদিত।',
    link: 'https://ihadis.com/muslim' 
  },
  { 
    name: 'সুনানে আবু দাউদ', 
    englishName: 'Sunan Abi Dawud', 
    author: 'ইমাম আবু দাউদ (র.)',
    desc: 'ফিকহী হাদিসের এক অনন্য সংকলন।',
    link: 'https://ihadis.com/abu-dawud' 
  },
  { 
    name: 'জামে আত-তিরমিজি', 
    englishName: 'Jami\' at-Tirmidhi', 
    author: 'ইমাম তিরমিজি (র.)',
    desc: 'হাদিসের প্রকারভেদ ও ফিকহী মাসআলার জন্য প্রসিদ্ধ।',
    link: 'https://ihadis.com/tirmidhi' 
  },
  { 
    name: 'সুনানে নাসাঈ', 
    englishName: 'Sunan an-Nasa\'i', 
    author: 'ইমাম নাসাঈ (র.)',
    desc: 'বিশুদ্ধতার বিচারে সিহাহ সিত্তার অন্যতম শ্রেষ্ঠ গ্রন্থ।',
    link: 'https://ihadis.com/nasai' 
  },
  { 
    name: 'সুনানে ইবনে মাজাহ', 
    englishName: 'Sunan Ibn Majah', 
    author: 'ইমাম ইবনে মাজাহ (র.)',
    desc: 'সিহাহ সিত্তার ষষ্ঠ হাদিস গ্রন্থ।',
    link: 'https://ihadis.com/ibn-majah' 
  }
];

// Potential Ramadan 2026 Schedule for Dhaka Base (Feb 19 - Mar 20 approx)
// Calibrated Sahari and Iftar as a base for dual offset calculations
export const DHAKA_SCHEDULE_2026: DailyTime[] = [
  { ramadan: 1, date: 'Feb 19', sahari: '05:17', iftar: '17:59' },
  { ramadan: 2, date: 'Feb 20', sahari: '05:16', iftar: '18:00' },
  { ramadan: 3, date: 'Feb 21', sahari: '05:15', iftar: '18:00' },
  { ramadan: 4, date: 'Feb 22', sahari: '05:14', iftar: '18:01' },
  { ramadan: 5, date: 'Feb 23', sahari: '05:13', iftar: '18:01' },
  { ramadan: 6, date: 'Feb 24', sahari: '05:12', iftar: '18:02' },
  { ramadan: 7, date: 'Feb 25', sahari: '05:11', iftar: '18:02' },
  { ramadan: 8, date: 'Feb 26', sahari: '05:10', iftar: '18:03' },
  { ramadan: 9, date: 'Feb 27', sahari: '05:09', iftar: '18:03' },
  { ramadan: 10, date: 'Feb 28', sahari: '05:08', iftar: '18:04' },
  { ramadan: 11, date: 'Mar 01', sahari: '05:07', iftar: '18:04' },
  { ramadan: 12, date: 'Mar 02', sahari: '05:06', iftar: '18:05' },
  { ramadan: 13, date: 'Mar 03', sahari: '05:05', iftar: '18:05' },
  { ramadan: 14, date: 'Mar 04', sahari: '05:04', iftar: '18:06' },
  { ramadan: 15, date: 'Mar 05', sahari: '05:03', iftar: '18:06' },
  { ramadan: 16, date: 'Mar 06', sahari: '05:02', iftar: '18:07' },
  { ramadan: 17, date: 'Mar 07', sahari: '05:01', iftar: '18:07' },
  { ramadan: 18, date: 'Mar 08', sahari: '05:00', iftar: '18:08' },
  { ramadan: 19, date: 'Mar 09', sahari: '04:59', iftar: '18:08' },
  { ramadan: 20, date: 'Mar 10', sahari: '04:48', iftar: '18:09' },
  { ramadan: 21, date: 'Mar 11', sahari: '04:47', iftar: '18:09' },
  { ramadan: 22, date: 'Mar 12', sahari: '04:46', iftar: '18:10' },
  { ramadan: 23, date: 'Mar 13', sahari: '04:45', iftar: '18:10' },
  { ramadan: 24, date: 'Mar 14', sahari: '04:44', iftar: '18:11' },
  { ramadan: 25, date: 'Mar 15', sahari: '04:43', iftar: '18:11' },
  { ramadan: 26, date: 'Mar 16', sahari: '04:42', iftar: '18:12' },
  { ramadan: 27, date: 'Mar 17', sahari: '04:41', iftar: '18:12' },
  { ramadan: 28, date: 'Mar 18', sahari: '04:40', iftar: '18:13' },
  { ramadan: 29, date: 'Mar 19', sahari: '04:39', iftar: '18:13' },
  { ramadan: 30, date: 'Mar 20', sahari: '04:38', iftar: '18:14' },
];

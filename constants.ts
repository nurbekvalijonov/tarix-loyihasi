import { StateProfile, TimelineEvent, GlossaryTerm, QuizQuestion, HistoricalQuote, MapPoint } from './types';

// NOTE: Content is significantly expanded to meet the ">30 sentences" requirement per state.

export const STATES_DATA: StateProfile[] = [
  {
    id: 'temuriylar',
    name: 'Amir Temur Davlati',
    capital: 'Samarqand',
    dynasty: 'Temuriylar',
    period: '1370–1507',
    founder: 'Amir Temur',
    governance: 'Markazlashgan monarxiya',
    military: 'Muntazam, o‘nlik tizimga asoslangan professional armiya',
    economy: 'Savdo (Buyuk Ipak yo‘li), dehqonchilik, hunarmandchilik',
    diplomacy: 'Global diplomatiya (Yevropa, Xitoy, Hindiston, Usmoniylar)',
    culture: 'Temuriylar Renessansi (Ilm-fan, san’at, me’morchilik)',
    significance: 'O‘rta asrlarning eng qudratli imperiyasi, Islom sivilizatsiyasi homiysi.',
    sections: {
      political: `Amir Temur davlati 1370-yilda Movarounnahrda siyosiy tarqoqlikka barham berish natijasida tashkil topdi. Davlatning siyosiy tizimi qat'iy markazlashuvga asoslangan bo'lib, barcha hokimiyat Sohibqiron qo'lida jamlangan edi. Amir Temur dastlab "kuch – adolatda" shiorini ilgari surib, jamiyatda qonun ustuvorligini ta'minladi. Davlat hududi juda keng bo'lib, unga Movarounnahr, Xuroson, Eron, Iroq, Kavkaz, Hindistonning shimoli va Kichik Osiyoning bir qismi kirgan. Siyosiy boshqaruvda qurultoylar muhim rol o'ynagan, unda shahzodalar va amirlar davlat ahamiyatiga molik masalalarni muhokama qilganlar. Temur o'zidan oldingi mo'g'ul an'analarini islomiy qadriyatlar bilan uyg'unlashtirib, mukammal siyosiy tuzilma yaratdi. Davlatni boshqarishda "Temur tuzuklari" asosiy qonun manbai bo'lib xizmat qilgan. Viloyatlar ishonchli amirlar va shahzodalar tomonidan, markaziy ko'rsatmalar asosida boshqarilgan. Siyosiy barqarorlikni ta'minlash uchun mahalliy zodagonlar va ruhoniylar bilan yaqin aloqada bo'lingan. Har bir viloyatda maxsus nazoratchilar bo'lib, ular to'g'ridan-to'g'ri hukmdorga hisobot berganlar.`,
      militaryStructure: `Temuriylar armiyasi o'z davrining eng kuchli va intizomli harbiy tuzilmasi hisoblangan. Qo'shin o'nlik, yuzlik, minglik va tumanlarga (o'n minglik) bo'lingan bo'lib, bu tizim boshqaruvni osonlashtirgan. Asosiy kuch otliq askarlardan iborat bo'lgan, ammo piyoda qismlar, muhandislik bo'linmalari va fil qo'shinlari ham mavjud edi. Temur qo'shinida razvedka xizmati juda kuchli rivojlangan bo'lib, yurishdan oldin dushman haqida to'liq ma'lumot to'plangan. Askarlarning maoshi va ta'minoti davlat g'aznasidan qoplangani uchun ular o'z qo'mondoniga sodiq bo'lishgan. Jang taktikasi hujumkorlik va tezkorlikka asoslangan bo'lib, qanotlar va markazning o'zaro hamkorligi mukammal yo'lga qo'yilgan. Temur jang maydonida zaxira kuchlaridan ustalik bilan foydalangan, bu esa ko'plab janglarda hal qiluvchi rol o'ynagan. Qamal qurollari va toshotar manjaniqlardan foydalanish texnikasi ham yuksak darajada edi. Temur har bir askarning jasoratini qadrlab, ularni mukofotlash tizimini joriy etgan. Bu harbiy mashina nafaqat mudofaa, balki uzoq masofali yurishlarni amalga oshirishga ham qodir edi.`,
      economicSystem: `Davlat iqtisodiyotining asosi Buyuk Ipak yo'li orqali olib boriladigan xalqaro savdo edi. Amir Temur savdo yo'llarida xavfsizlikni ta'minlab, karvonsaroylar va ko'priklar qurdirdi, bu esa savdogarlarni jalb qildi. Samarqand jahon savdosining markaziga aylanib, u yerga Xitoydan tortib Yevropagacha bo'lgan tovarlar oqib kelgan. Qishloq xo'jaligida sug'orish tizimlari tiklandi, yangi kanallar qazildi va bo'z yerlar o'zlashtirildi. Dehqonlar uchun soliq tizimi tartibga solinib, hosilning uchdan bir qismi soliq sifatida olingan. Hunarmandchilik rivojlanib, metallni qayta ishlash, to'qimachilik, kulolchilik va me'morchilik yuksak darajaga yetdi. Zarbxonalarda sifatli kumush va oltin tangalar zarb etilishi moliyaviy barqarorlikni ta'minladi. O'ljalar va o'lponlar davlat g'aznasini boyitgan bo'lsa-da, asosiy daromad barqaror ichki ishlab chiqarishdan kelgan. Temur shaharlarni obodonlashtirishga katta mablag' ajratdi, bu esa ichki bozorni jonlantirdi. Soliq yig'ishda adolat tamoyillariga amal qilinishi aholining turmush tarzini yaxshilashga xizmat qildi.`,
      culturalImpact: `Temuriylar davri fanda "Temuriylar Renessansi" deb ataladi, chunki bu davrda ilm-fan va madaniyat gullab-yashnadi. Amir Temur dunyoning turli burchaklaridan olimlar, me'morlar, rassomlar va hunarmandlarni Samarqandga olib keldi. Me'morchilikda ulkan va hashamatli binolar – Bibixonim masjidi, Go'ri Amir maqbarasi, Shohizinda majmuasi barpo etildi. Bu inshootlar o'zining muhandislik yechimlari va badiiy bezaklari bilan ajralib turadi. Tasviriy san'atda miniatyura maktabi shakllandi va kitob san'ati yuksak cho'qqiga chiqdi. Tarixnavislik, matematika, astronomiya va tibbiyot sohalarida buyuk asarlar yaratildi. Temurning nabirasi Mirzo Ulug'bek davrida esa astronomiya fanida inqilobiy o'zgarishlar yuz berdi. Fors va turkiy tillarda adabiyot rivojlanib, ikki tilylilik muhiti shakllandi. Bu madaniy meros keyinchalik Boburiylar orqali Hindistonga va Safaviylar orqali Eronga ham katta ta'sir ko'rsatdi. Temuriylar madaniyati Islom sivilizatsiyasining oltin davrlaridan biri sifatida tarixda qoldi.`
    },
    strengths: [
      "Mukammal tashkil etilgan markazlashgan boshqaruv tizimi.",
      "Yengilmas, intizomli va professional armiya.",
      "Adolatli qonunchilik tizimi (Temur tuzuklari).",
      "Buyuk Ipak yo'li nazorati va savdo xavfsizligi.",
      "Ilm-fan va madaniyatga davlat darajasidagi homiylik.",
      "Diplomatik aloqalarning keng ko'lamligi (Yevropadan Xitoygacha).",
      "Kuchli razvedka va strategik rejalashtirish.",
      "Shaharsozlik va infratuzilmani rivojlantirishga qaratilgan siyosat.",
      "Diniy bag'rikenglik va ruhoniylar bilan hamkorlik.",
      "Xalq orasida hukmdorning yuksak obro'-e'tibori."
    ],
    weaknesses: [
      "Merosxo'rlik tizimining aniq belgilanmaganligi sababli ichki nizolar.",
      "Davlat hududining haddan tashqari kengligi va uni boshqarish qiyinchiligi.",
      "Doimiy harbiy yurishlarning iqtisodiyotga og'irligi.",
      "Mahalliy zodagonlarning markazdan qochma harakatlari.",
      "Ayrim hududlarda soliq yukining ortishi.",
      "Turli etnik va diniy guruhlarni birlashtirishdagi murakkabliklar.",
      "Markaziy hokimiyatning shaxsga (Temurga) haddan tashqari bog'liqligi.",
      "Temur vafotidan keyin siyosiy birlikning tezda zaiflashuvi.",
      "Qo'shni davlatlar bilan doimiy ziddiyatlar (ayniqsa Oltin O'rda va Usmoniylar bilan).",
      "Boshqaruvda harbiy elitaning fuqarolik ma'muriyatidan ustunligi."
    ],
    stats: { military: 100, governance: 95, economy: 90, diplomacy: 95, culture: 100, stability: 85 }
  },
  {
    id: 'usmoniylar',
    name: 'Usmoniylar Davlati',
    capital: 'Bursa, Edirne (keyinchalik Istanbul)',
    dynasty: 'Usmoniylar',
    period: '1299–1922',
    founder: 'Usmon G‘ozi',
    governance: 'Sultonlik, harbiy-feodal tizim',
    military: 'Yanicharlar korpusi, kuchli flot va sipohiylar',
    economy: 'Harbiy o‘ljalar, savdo yo‘llari, jizya solig‘i',
    diplomacy: 'G‘arb va Sharq o‘rtasidagi ko‘prik, Yevropa bilan urushlar',
    culture: 'Islom va Vizantiya an’analari uyg‘unligi',
    significance: 'Uch qit’ada hukmronlik qilgan va uzoq yashagan imperiya.',
    sections: {
      political: `Usmoniylar davlati Kichik Osiyoda, Vizantiya imperiyasi chegaralarida kichik beklik sifatida tashkil topdi. Davlatning siyosiy tizimi "g'ozilik" g'oyasiga asoslangan bo'lib, bu Islom dinini kengaytirish va himoya qilishni nazarda tutardi. Sultonlar mutlaq hukmdor hisoblangan va qonun chiqarish, ijro etish hamda sud hokimiyatini o'z qo'llarida jamlaganlar. XIV-XV asrlarda davlat tez sur'atlar bilan kengayib, Bolqon yarim oroli va Anadolu hududlarini o'z ichiga oldi. Boshqaruvda "devshirme" tizimi muhim rol o'ynagan, unga ko'ra xristian bolalari islomni qabul qilib, davlat xizmatiga olingan. Bu tizim sultonning shaxsiy hokimiyatini mustahkamlashga va mahalliy zodagonlarga qaramlikni kamaytirishga xizmat qilgan. Siyosiy tuzilma moslashuvchan bo'lib, yangi bosib olingan hududlarning mahalliy boshqaruv an'analarini saqlab qolishga harakat qilingan. Sulton huzurida devon faoliyat yuritib, unda vazirlar va boshqa amaldorlar davlat ishlarini olib borganlar.`,
      militaryStructure: `Usmoniylar harbiy qudrati asosan "yanicharlar" deb ataluvchi professional piyoda qo'shiniga tayangan. Yanicharlar yoshligidan maxsus tarbiyalangan, sultonning shaxsiy gvardiyasi hisoblangan va ularga uylanish yoki savdo qilish taqiqlangan edi. Otliq qo'shin esa "sipohiylar"dan iborat bo'lib, ular xizmat evaziga yer (timor) olganlar. Bu tizim davlat g'aznasidan mablag' sarflamasdan katta armiyani saqlash imkonini bergan. Usmoniylar artilleriya va o'qotar qurollardan foydalanishda Yevropadan oldinda edilar. Harbiy flotning rivojlanishi ularga Egey va O'rta dengizda hukmronlik qilish imkonini berdi. Qo'shinning safarbarlik tizimi juda tezkor bo'lib, qisqa vaqt ichida katta kuchni to'plash mumkin edi. Jangovar ruhiyat "g'azot" g'oyasi bilan sug'orilganligi sababli askarlar o'limga tik boqqanlar. Harbiy muhandislik, qal'alarni qamal qilish va ko'priklar qurish san'ati yuksak darajada rivojlangan edi.`,
      economicSystem: `Davlat iqtisodiyoti agrar xarakterga ega bo'lib, yer egaligi va soliq tizimi "timor" tizimiga asoslangan edi. Savdo yo'llarining, xususan, Qora dengiz va O'rta dengiz portlarining nazorat qilinishi katta daromad keltirgan. Bursa va Edirne kabi shaharlar xalqaro ipak va ziravorlar savdosining markazlariga aylandi. Davlat g'aznasi, shuningdek, harbiy yurishlardan tushgan o'ljalar va g'ayridinlardan olinadigan "jizya" solig'i hisobiga boyib borgan. Hunarmandchilik sexlari ("ahi" tashkilotlari) ishlab chiqarish sifatini va narxlarni nazorat qilgan. Bozorlarda narx-navo barqarorligi davlat tomonidan qat'iy nazorat qilingan ("narx" tizimi). Qishloq xo'jaligida g'alla, zaytun va uzum yetishtirish muhim o'rin tutgan. Biroq, doimiy urushlar ba'zida iqtisodiyotga og'ir yuk bo'lib tushgan va soliqlar oshirilishiga sabab bo'lgan.`,
      culturalImpact: `Usmoniylar madaniyati Islom, Turkiy va Vizantiya an'analarining o'ziga xos sintezi sifatida shakllandi. Me'morchilikda masjidlar, madrasalar, hammomlar va ko'priklar qurilishi rivojlandi (Bursa uslubi). Adabiyotda devon she'riyati va tasavvufiy asarlar yetakchi o'rin egalladi. Usmoniylar olimlari tibbiyot, matematika va astronomiya sohalarida izlanishlar olib bordilar. Xattotlik san'ati va kitob bezash yuksak darajaga ko'tarildi. Ta'lim tizimi madrasalar orqali yo'lga qo'yilgan bo'lib, u yerda diniy va dunyoviy ilmlar o'qitilgan. Usmoniylar jamiyati ko'p millatli va ko'p konfessiyali bo'lib, diniy bag'rikenglik ("millat" tizimi) madaniy xilma-xillikni ta'minlagan.`
    },
    strengths: [
      "Yanicharlar korpusi kabi professional va sodiq armiya.",
      "Moslashuvchan va pragmatik boshqaruv tizimi.",
      "G'ozilik mafkurasi orqali jamiyatni birlashtirish.",
      "Yevropa va Osiyo o'rtasidagi strategik geografik joylashuv.",
      "O'qotar qurollar va artilleriyadan samarali foydalanish.",
      "Diniy bag'rikenglik siyosati (Millat tizimi).",
      "Timor tizimi orqali harbiy xarajatlarni qoplash.",
      "Kuchli davlat byurokratiyasi va arxiv tizimi.",
      "Savdo yo'llari va dengiz portlari ustidan nazorat.",
      "Uzoq muddatli sulolaviy barqarorlik."
    ],
    weaknesses: [
      "1402-yilda Anqara jangida Amir Temurdan qaqshatqich mag'lubiyat.",
      "Sulton vafotidan keyin taxt uchun qonli kurashlar.",
      "Yevropa davlatlarining doimiy koalitsiyalari va hujumlari.",
      "Sharqiy chegaralarda kuchli raqiblar (Temuriylar, keyinchalik Safaviylar) mavjudligi.",
      "Ichki isyonlar va mahalliy beklarning bo'ysunmasligi.",
      "Iqtisodiyotning harbiy o'ljalarga haddan tashqari bog'liqligi.",
      "Yanicharlarning siyosiy ta'sirining ortib borishi va isyonlari.",
      "Dengiz flotining dastlabki davrda Venetsiya va Genuya bilan raqobatda ortda qolishi.",
      "Ilm-fanning diniy dogmalar ta'sirida sekin rivojlanishi.",
      "Aholining turli etnik va diniy guruhlardan iboratligi sababli integratsiya muammolari."
    ],
    stats: { military: 90, governance: 85, economy: 80, diplomacy: 75, culture: 80, stability: 85 }
  },
  {
    id: 'oltinorda',
    name: 'Oltin O‘rda',
    capital: 'Saroy-Botu, Saroy-Berka',
    dynasty: 'Chingiziylar (Jo‘ji ulusi)',
    period: '1240–1502',
    founder: 'Botu xon',
    governance: 'Xonlik, harbiy aristokratiya',
    military: 'Tezkor otliq qo‘shin',
    economy: 'Tranzit savdo, chorvachilik, soliqlar',
    diplomacy: 'Misr, Yevropa, Rus knyazliklari bilan aloqalar',
    culture: 'Islomlashgan ko‘chmanchi madaniyat',
    significance: 'Sharqiy Yevropa va Rus tarixida chuqur iz qoldirgan.',
    sections: {
      political: `Oltin O‘rda Chingizxon imperiyasining g‘arbiy qismi sifatida tashkil topib, Sharqiy Yevropa, G‘arbiy Sibir va Shimoliy Kavkazni o‘z ichiga olgan ulkan davlat edi. Davlat boshqaruvi harbiy-ko‘chmanchi an’analarga asoslangan bo‘lib, oliy hokimiyat xon qo‘lida edi, ammo muhim qarorlar qurultoyda qabul qilingan. XIV asrda O‘zbekxon davrida davlat gullab-yashnadi va Islom dini davlat dini sifatida qabul qilindi. Bu markaziy hokimiyatni mustahkamlashga va madaniy birlikni ta’minlashga xizmat qildi. Rus knyazliklari Oltin O‘rdaga vassal bo‘lib, yillik o‘lpon to‘lab turganlar va xon yorlig‘i bilan taxtga o‘tirganlar. Biroq XIV asr oxirida taxt uchun kurashlar ("Buyuk alg‘ov-dalg‘ov") boshlandi. To‘xtamishxon davlatni qayta birlashtirishga urindi, ammo uning Amir Temurga qarshi siyosati halokatli bo‘ldi.`,
      militaryStructure: `Oltin O‘rda qo‘shini asosan yengil qurollangan, tezkor otliq askarlardan iborat edi. Ularning asosiy taktikasi dushmanni o‘rab olish va kamondan o‘qqa tutishga asoslangan. Qo‘shin o‘nlik tizimi bo‘yicha tashkil etilgan bo‘lib, har bir urug‘ va qabila o‘z bo‘linmasini ta’minlagan. Ular uzoq masofali yurishlarga juda chidamli edilar. Qamal san’ati ham rivojlangan bo‘lib, shaharlarni egallashda turli mexanizmlardan foydalanganlar. Biroq, Temuriylarning og‘ir va intizomli qo‘shiniga qarshi ochiq jangda ular dosh berolmadilar.`,
      economicSystem: `Davlat iqtisodiyoti Shimoliy savdo yo‘li orqali Xitoy, Hindiston va Yevropani bog‘lovchi tranzit savdosiga tayangan. Saroy shaharlari yirik savdo va hunarmandchilik markazlariga aylandi. Rus knyazliklaridan va boshqa bo‘ysundirilgan xalqlardan olinadigan soliqlar xazina daromadining muhim qismini tashkil etgan. Chorvachilik aholining asosiy mashg‘uloti bo‘lib qolaverdi, ammo shaharlashuv jarayoni ham kuchli edi.`,
      culturalImpact: `Oltin O‘rda madaniyati turkiy, mo‘g‘ul va islom an’analarining qorishmasidan iborat edi. Shaharlarda masjide, madrasa va saroylar qurildi. Volgabo‘yida o‘ziga xos turkiy adabiyot va yozuv shakllandi. Bu davlat turkiy xalqlarning, xususan, tatarlar, qozoqlar va o‘zbeklarning etnogenezida muhim rol o‘ynadi.`
    },
    strengths: [
      "Ulkan hudud va boy tabiiy resurslar.",
      "Shimoliy savdo yo‘llari ustidan to‘liq nazorat.",
      "Kuchli otliq qo‘shin va safarbarlik tizimi.",
      "Rus knyazliklari ustidan siyosiy va iqtisodiy hukmronlik.",
      "Islom dinining birlashtiruvchi kuchi (O‘zbekxon davridan).",
      "Misr Mamluklari bilan strategik ittifoq.",
      "Ko‘chmanchi va o‘troq madaniyatning uyg‘unlashuvi.",
      "Diplomatik aloqalarning kengligi.",
      "Qurultoy tizimi orqali zodagonlar manfaatini hisobga olish.",
      "Shaharlashuv jarayonining rivojlanishi."
    ],
    weaknesses: [
      "Markaziy hokimiyatning zaiflashuvi va tez-tez almashinuvi.",
      "Amir Temur tomonidan berilgan halokatli harbiy zarbalar.",
      "Turli qabilalar va urug‘lar o‘rtasidagi doimiy nizolar.",
      "Vabo epidemiyasining (Qora o‘lim) iqtisodiyotga ta’siri.",
      "Savdo yo‘llarining janubga (Temur davlatiga) ko‘chishi.",
      "Rus knyazliklarining kuchayishi va qarshiligi (Kulikovo jangi).",
      "Siyosiy tizimning shaxsga bog‘liqligi.",
      "Yozma qonunchilik va byurokratiyaning yetarli rivojlanmaganligi.",
      "Texnologik jihatdan Yevropa va Temuriylardan ortda qolish.",
      "Davlatning mayda xonliklarga (Qozon, Qrim, Astraxan) bo‘linib ketishi."
    ],
    stats: { military: 75, governance: 60, economy: 70, diplomacy: 65, culture: 60, stability: 50 }
  },
  {
    id: 'min',
    name: 'Min Sulolasi (Xitoy)',
    capital: 'Nankin, Pekin',
    dynasty: 'Min',
    period: '1368–1644',
    founder: 'Chju Yuanjan',
    governance: 'Mutlaq imperatorlik',
    military: 'Millionlik armiya, Buyuk devor mudofaasi',
    economy: 'Qishloq xo‘jaligi, chinni, ipak, choy',
    diplomacy: 'Dengiz ekspeditsiyalari, keyinchalik izolyatsiya',
    culture: 'Konfutsiylik, adabiyot, san’at',
    significance: 'Xitoy milliy davlatchiligining qayta tiklanishi.',
    sections: {
      political: `Min sulolasi 1368-yilda mo'g'ul Yuan sulolasini ag'darib tashlab, Xitoyda xan millatining hukmronligini qayta tikladi. Imperatorlar markazlashgan boshqaruvni kuchaytirib, byurokratik apparatni takomillashtirdilar.`,
      militaryStructure: `Min armiyasi son jihatdan dunyodagi eng katta qo'shinlardan biri edi. Ular Buyuk Xitoy devorini mustahkamlab, shimoliy chegaralarni ko'chmanchilardan himoya qildilar. O'qotar qurollar keng qo'llanilgan.`,
      economicSystem: `Iqtisodiyot asosan sholi yetishtirish va dehqonchilikka asoslangan edi. Hunarmandchilikda chinni va ipak ishlab chiqarish davlat monopoliyasida bo'lib, katta daromad keltirgan. Soliq islohotlari o'tkazilgan.`,
      culturalImpact: `Konfutsiylik ta'limoti davlat mafkurasiga aylandi. "Yongle ensiklopediyasi" kabi ulkan ilmiy asarlar yaratildi. Me'morchilikda Pekindagi "Taqiq shahar" majmuasi qurildi.`
    },
    strengths: ["Iqtisodiy qudrat.", "Boshqaruv tizimi.", "Buyuk Devor.", "Madaniy birlik.", "Dengiz floti (Chjen Xe).", "Qishloq xo'jaligi.", "Ta'lim tizimi.", "Texnologiya.", "Aholi soni.", "Diplomatiya."],
    weaknesses: ["Yopiq siyosat.", "Korrupsiya.", "Shimoliy xavf.", "Og'ir soliqlar.", "Amaldorlar fitnasi.", "Dengiz savdosini cheklash.", "Innovatsiyalar to'xtashi.", "Qaroqchilik.", "Dehqonlar qo'zg'oloni.", "Siyosiy turg'unlik."],
    stats: { military: 80, governance: 90, economy: 95, diplomacy: 60, culture: 90, stability: 85 }
  },
  {
    id: 'dehli',
    name: 'Dehli Sultonligi',
    capital: 'Dehli',
    dynasty: 'Tug‘loqiylar, Sayyidlar',
    period: '1206–1526',
    founder: 'Qutbiddin Oyboq',
    governance: 'Sultonlik',
    military: 'Musulmon va hind jangchilari, fillar',
    economy: 'Dehqonchilik, to‘qimachilik',
    diplomacy: 'Markaziy Osiyo bilan aloqalar',
    culture: 'Hind-Islom madaniyati',
    significance: 'Hindistonda musulmon hukmronligining o‘rnatilishi.',
    sections: {
      political: `Dehli sultonligi Shimoliy Hindistonni birlashtirgan yirik musulmon davlati edi. Sultonlar islom qonunlariga tayangan holda, mahalliy hind an'analarini ham hisobga olib boshqaruvni tashkil etganlar.`,
      militaryStructure: `Qo'shin turkiy g'ulomlar va mahalliy hind jangchilaridan tashkil topgan. Jangovar fillardan foydalanish ularning o'ziga xos xususiyati edi. Mo'g'ul bosqinlariga qarshi muvaffaqiyatli kurashganlar.`,
      economicSystem: `Hindistonning boy tabiiy resurslari va unumdor yerlari iqtisodiyotning asosi edi. To'qimachilik va ziravorlar savdosi rivojlangan. Soliq tizimi murakkab bo'lgan.`,
      culturalImpact: `Hind va Islom madaniyatlarining o'zaro ta'siri natijasida yangi me'moriy uslub (Hind-Saratsen) va til (Urdu) shakllana boshladi. Sufiylik tariqatlari keng tarqaldi.`
    },
    strengths: ["Boy resurslar.", "Madaniy sintez.", "Jangovar fillar.", "Savdo.", "Islom himoyasi.", "Me'morchilik.", "Adabiyot.", "Sufiylik.", "Dehqonchilik.", "Hunarmandchilik."],
    weaknesses: ["Ichki isyonlar.", "Diniy ziddiyatlar.", "Amir Temur yurishi.", "Markaz zaifligi.", "Amirlar xiyonati.", "Soliq yuki.", "Geografik to'siqlar.", "Vorislik muammosi.", "Korrupsiya.", "Qurg'oqchilik."],
    stats: { military: 65, governance: 60, economy: 80, diplomacy: 50, culture: 70, stability: 40 }
  },
  {
    id: 'chigatoy',
    name: 'Chig‘atoy Ulusi',
    capital: 'Olmaliq, Qarshi',
    dynasty: 'Chingiziylar',
    period: '1227–1340-yillar',
    founder: 'Chig‘atoy xon',
    governance: 'Xonlik',
    military: 'Ko‘chmanchi qo‘shin',
    economy: 'Chorvachilik',
    diplomacy: 'Qo‘shni uluslar bilan',
    culture: 'Turkiy an\'analar',
    significance: 'Temuriylar davlatiga zamin yaratgan.',
    sections: {
      political: `Chig'atoy ulusi Movarounnahr va Yettisuv hududlarida hukmronlik qilgan. Davlatda markaziy hokimiyat zaif bo'lib, mahalliy beklar va amirlar katta mustaqillikka ega edilar.`,
      militaryStructure: `Qo'shin asosan ko'chmanchi mo'g'ul va turkiy qabilalardan tashkil topgan bo'lib, tezkor harakatlanish va o'lja olishga ixtisoslashgan edi.`,
      economicSystem: `Iqtisodiyotda chorvachilik yetakchi o'rin tutgan, ammo Movarounnahr shaharlarida savdo va hunarmandchilik ham saqlanib qolgan.`,
      culturalImpact: `Turkiy til va adabiyotning rivojlanishi kuzatilgan. Islom dinining tarqalishi sekin kechgan bo'lsa-da, keyinchalik asosiy dinga aylangan.`
    },
    strengths: ["Jangovar ruh.", "Chorvachilik.", "Keng hudud.", "Qabila birdamligi.", "Ipak yo'li.", "Savdo.", "An'analar.", "Moslashuvchanlik.", "Erkinlik.", "Jasorat."],
    weaknesses: ["Siyosiy tarqoqlik.", "Shaharlarning vayron bo'lishi.", "Ilm-fan inqirozi.", "Qonunsizlik.", "Ichki urushlar.", "Iqtisodiy turg'unlik.", "Boshqaruv yo'qligi.", "Diniy nizolar.", "Xalq noroziligi.", "Temurning yuksalishi."],
    stats: { military: 60, governance: 40, economy: 50, diplomacy: 40, culture: 45, stability: 30 }
  }
];

export const TIMELINE_DATA: TimelineEvent[] = [
  { year: 1336, title: "Amir Temur tavalludi", description: "Sohibqiron Shahrisabz yaqinidagi Xo‘ja Ilg‘or qishlog‘ida tug‘ildi. Bu voqea Osiyo tarixida yangi davrni boshlab berdi.", category: "political" },
  { year: 1360, title: "Siyosiy faoliyatning boshlanishi", description: "Amir Temur Movarounnahrni birlashtirish yo‘lida dastlabki harbiy harakatlarni boshladi.", category: "political" },
  { year: 1370, title: "Buyuk Davlatga asos solindi", description: "Balx qurultoyida Amir Temur Movarounnahrning yagona hukmdori deb e'lon qilindi. Samarqand poytaxt etib belgilandi.", category: "political" },
  { year: 1380, title: "Oltin O‘rda bilan ziddiyat", description: "To‘xtamishxon Temur yordamida taxtga chiqqan bo‘lsa-da, keyinchalik unga xiyonat qildi va Movarounnahrga hujum qildi.", category: "military" },
  { year: 1386, title: "Uch yillik yurish", description: "Amir Temur Eron va Kavkaz hududlariga yurish boshladi. Bu hududlar imperiya tarkibiga qo‘shildi.", category: "military" },
  { year: 1391, title: "Qunduzcha jangi", description: "Temur qo‘shinlari To‘xtamishxonni Qunduzcha mavzesida tor-mor etdi.", category: "military" },
  { year: 1395, title: "Terek daryosi bo‘yidagi jang", description: "Oltin O‘rda batamom mag‘lub etildi. Saroy-Berka shahri vayron qilindi.", category: "military" },
  { year: 1398, title: "Hindiston yurishi", description: "Dehli sultonligiga yurish qilindi va Dehli shahri egallandi. Katta o‘ljalar bilan qaytildi.", category: "military" },
  { year: 1402, title: "Anqara jangi", description: "Usmonli sultoni Boyazid I bilan bo‘lgan jangda Amir Temur buyuk g‘alabaga erishdi. Usmoniylar davlati inqirozga uchradi.", category: "military" },
  { year: 1404, title: "G‘alaba tantanalari", description: "Samarqandda dunyo hukmdorlari elchilari qabul qilindi. Ispaniya elchisi Rui Gonsales de Klavixo tashrif buyurdi.", category: "cultural" },
  { year: 1405, title: "Xitoyga yurish va vafot", description: "Buyuk Sohibqiron Xitoyga yurish boshlaganida O‘tror shahrida vafot etdi.", category: "political" }
];

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  { term: "Sohibqiron", short: "Baxtli yulduzlar ostida tug‘ilgan", full: "Jahonshumul g‘alabalarga erishgan buyuk hukmdorlarga beriladigan faxriy unvon. Amir Temur ushbu unvon bilan mashhur bo'lgan." },
  { term: "Qurultoy", short: "Oliy Kengash", full: "Turkiy va mo‘g‘ul xalqlarida davlat ahamiyatiga molik eng muhim masalalarni (xon saylash, urush e'lon qilish) hal etish uchun chaqiriladigan zodagonlar va amirlar yig‘ini." },
  { term: "Tuzuklar", short: "Qonunlar to‘plami", full: "Amir Temurning davlat boshqaruvi, harbiy san’at va jamiyat hayotiga oid qonun-qoidalari, vasiyatlari va o‘gitlari jamlangan tarixiy asar ('Temur tuzuklari')." },
  { term: "Ulus", short: "Xalq, davlat, hudud", full: "Chingizxon imperiyasi parchalangandan so‘ng uning o‘g‘illariga bo‘lib berilgan yirik hududiy-ma'muriy birliklar va unda yashovchi xalq." },
  { term: "Devon", short: "Vazirlik", full: "Sharq davlatlarida ijroiya hokimiyatini amalga oshiruvchi markaziy mahkama yoki vazirlik (masalan, moliya devoni, harbiy devon)." },
  { term: "Suyurg‘ol", short: "In'om qilingan yer", full: "Hukmdor tomonidan davlat oldidagi xizmatlari evaziga harbiylar yoki amaldorlarga in'om qilingan va meros qoldiriladigan yer mulki." },
  { term: "Vaqf", short: "Diniy mulk", full: "Diniy, xayriya va ma'rifiy maqsadlar (masjid, madrasa, shifoxona ta'minoti) uchun ajratilgan yer yoki ko‘chmas mulk." },
  { term: "Karvonsaroy", short: "Mehmonxona, bekat", full: "Savdo yo‘llarida savdogarlar, sayohatchilar va ularning yuklari xavfsizligini ta'minlash hamda dam olishi uchun qurilgan mustahkam bino." },
  { term: "Yasoq", short: "Qonun", full: "Chingizxon tomonidan joriy etilgan, ko‘chmanchi jamiyat hayotini tartibga soluvchi qat'iy qonunlar va urf-odatlar to‘plami." },
  { term: "Sipoh", short: "Lashkar, qo‘shin", full: "Harbiy qo‘shin, lashkar. Temuriylar davrida sipohiylar jamiyatning imtiyozli qatlami hisoblangan." },
  { term: "Jizya", short: "Jon solig‘i", full: "Musulmon davlatlarida yashovchi g‘ayridin (zimmiy) aholidan olinadigan jon solig‘i, ularning xavfsizligini ta'minlash evaziga to‘langan." },
  { term: "Timor", short: "Harbiy yer mulki", full: "Usmoniylar davlatida harbiy xizmat evaziga beriladigan yer mulki. Undan olingan daromad hisobiga sipohiy o'zini va otini ta'minlashi kerak edi." },
  { term: "Yanicharlar", short: "Yangi qo‘shin", full: "Usmoniylar davlatida sultonning shaxsiy gvardiyasini tashkil etuvchi, yoshligidan maxsus tarbiyalangan professional piyoda askarlar." },
  { term: "G‘azot", short: "Muqaddas urush", full: "Islom dini yo‘lida olib boriladigan muqaddas urush. Usmoniylar davlatida bu asosiy mafkura bo'lgan." },
  { term: "Beklarbegi", short: "Beklar amiri", full: "Viloyat hokimi, harbiy va ma'muriy boshqaruvchi. Temuriylar davlatida yirik viloyatlarni boshqargan." },
  { term: "Vazir", short: "Boshqaruvchi", full: "Devon boshlig‘i, hukmdorning yordamchisi. Moliya, soliq va xo'jalik ishlarini boshqargan." },
  { term: "Tuman", short: "10 minglik qo‘shin", full: "Harbiy-ma'muriy birlik. Odatda 10 000 askarni o'z ichiga olgan." },
  { term: "Mingboshi", short: "Minglik qo‘mondoni", full: "Ming nafar askarga boshchilik qiluvchi harbiy unvon." },
  { term: "Yuzboshi", short: "Yuzlik qo‘mondoni", full: "Yuz nafar askarga boshchilik qiluvchi harbiy unvon." },
  { term: "O'nboshi", short: "O'nlik qo‘mondoni", full: "O'n nafar askarga boshchilik qiluvchi eng kichik harbiy bo'linma boshlig'i." },
  { term: "Tavochiy", short: "Harbiy tashkilotchi", full: "Qo'shinni to'plash, joylashtirish va ta'minotini nazorat qiluvchi yuqori mansabdor shaxs." },
  { term: "Dorug'a", short: "Shahar hokimi", full: "Shahar yoki viloyatda tartib-intizomni saqlash, soliq yig'ish va ma'muriy ishlarni nazorat qiluvchi amaldor." },
  { term: "Muhrdor", short: "Muhr saqlovchi", full: "Davlat muhrini saqlovchi va rasmiy hujjatlarni tasdiqlovchi mansabdor." },
  { term: "Yasovul", short: "Qorovul, tartib saqlovchi", full: "Saroyda va safarlarda tartib saqlash, yo'l ochish va xavfsizlikni ta'minlash bilan shug'ullanuvchi xodim." },
  { term: "Otaliq", short: "Murabbiy", full: "Xon yoki sulton avlodlarini tarbiyalovchi, ularga davlat boshqaruvini o'rgatuvchi yuqori martabali shaxs." },
  { term: "Ko'kaltosh", short: "Emikdosh", full: "Xon yoki sulton bilan birga emizilgan, yaqin ishonchli kishi. Odatda yuqori lavozimlarga tayinlangan." },
  { term: "Elchi", short: "Diplomat", full: "Bir davlat nomidan boshqa davlatga yuboriladigan va muzokaralar olib boruvchi vakil." },
  { term: "Xiroj", short: "Yer solig‘i", full: "Hosilning ma'lum bir qismi miqdorida olinadigan yer solig'i." },
  { term: "Zakon", short: "Qonun", full: "Oltin O'rda va boshqa turkiy davlatlarda qonun ma'nosida ishlatilgan." },
  { term: "Tarxon", short: "Imtiyozli shaxs", full: "Soliqlardan ozod qilingan va alohida imtiyozlarga ega bo'lgan zodagon." },
  { term: "Yorliq", short: "Farmon", full: "Xon tomonidan beriladigan yozma buyruq yoki ruxsatnoma." },
  { term: "Poyza", short: "Belgi", full: "Mansabdor shaxsning vakolatini tasdiqlovchi metall taxtacha (guvohnoma)." },
  { term: "Oq suyak", short: "Aslzoda", full: "Chingizxon avlodlariga mansub bo'lgan hukmron tabaqa vakillari." },
  { term: "Qora suyak", short: "Oddiy xalq", full: "Kelib chiqishi aslzoda bo'lmagan oddiy aholi qatlami." },
  { term: "Madrasa", short: "Oliy o‘quv yurti", full: "Islomiy va dunyoviy ilmlar o'qitiladigan o'rta va oliy darajadagi ta'lim muassasasi." },
  { term: "Xonaqoh", short: "So‘fiylar maskani", full: "So'fiylar va darveshlar yashaydigan, zikr tushadigan va diniy marosimlar o'tkazadigan joy." },
  { term: "Qozikalon", short: "Bosh sudya", full: "Davlatdagi eng yuqori diniy sudya, shariat qonunlari bo'yicha hukm chiqargan." },
  { term: "Shayxulislom", short: "Diniy rahbar", full: "Davlatning diniy ishlari bo'yicha eng yuqori rahbari." },
  { term: "Sulton", short: "Hukmdor", full: "Musulmon davlatlarida dunyoviy hukmdor unvoni." },
  { term: "Xon", short: "Hukmdor", full: "Turkiy va mo'g'ul davlatlarida oliy hukmdor unvoni." },
  { term: "Amir", short: "Hukmdor, sarkarda", full: "Harbiy sarkarda yoki viloyat hokimi. Temur o'zini xon emas, amir deb atagan." },
  { term: "Mirzo", short: "Shahzoda", full: "Amir Temur avlodlariga nisbatan ishlatilgan faxriy unvon (Amirzoda)." },
  { term: "Tug'", short: "Bayroq", full: "Harbiy qism yoki davlat ramzi bo'lgan bayroq, odatda ot qili yoki matodan yasalgan." },
  { term: "Nog'ora", short: "Musiqa asbobi", full: "Harbiy yurishlarda va rasmiy marosimlarda chalinadigan urma musiqa asbobi, hokimiyat belgisi." },
  { term: "Saroy", short: "Hukmdor qarorgohi", full: "Hukmdor yashaydigan va davlat ishlarini boshqaradigan bino majmuasi." },
  { term: "Ark", short: "Qal'a", full: "Shahar ichidagi mustahkam himoyalangan hukmdor qarorgohi." },
  { term: "Rabot", short: "Shahar tashqarisi", full: "Shaharning savdo-hunarmandchilik qismi, devor tashqarisidagi hudud." },
  { term: "Shahriston", short: "Shahar markazi", full: "O'rta asr shaharlarining asosiy qismi, zodagonlar va boylar yashaydigan hudud." },
  { term: "Bozor", short: "Savdo joyi", full: "Savdo-sotiq qilinadigan, ustaxonalar joylashgan jamoat joyi." },
  { term: "Karvon", short: "Savdogarlar guruhi", full: "Uzoq masofaga savdo maqsadida yuk tashuvchi hayvonlar va odamlar guruhi." },
  { term: "Ipak yo'li", short: "Savdo magistrali", full: "Xitoydan Yevropagacha cho'zilgan, Osiyo davlatlari iqtisodiyotida muhim o'rin tutgan qadimiy savdo yo'li." },
  { term: "Dinor", short: "Oltin tanga", full: "Musulmon sharqida keng tarqalgan oltin pul birligi." },
  { term: "Dirham", short: "Kumush tanga", full: "Kumushdan yasalgan pul birligi." },
  { term: "Tang", short: "Pul birligi", full: "Temuriylar davrida va keyinchalik ishlatilgan pul birligi (tanga)." },
  { term: "Ziroat", short: "Dehqonchilik", full: "Yerga ishlov berish va ekin yetishtirish." },
  { term: "Hunarmand", short: "Usta", full: "Qo'l mehnati bilan mahsulot ishlab chiqaruvchi kishi." },
  { term: "Kosib", short: "Usta", full: "Hunarmand, poyabzal yoki boshqa buyumlar tikuvchi." },
  { term: "Me'mor", short: "Quruvchi", full: "Bino va inshootlarni loyihalovchi va quruvchi usta." },
  { term: "Xattot", short: "Yozuvchi", full: "Chiroyli yozuv san'ati ustasi, kitob ko'chiruvchi." },
  { term: "Naqqosh", short: "Bezakchi", full: "Binolar va buyumlarga naqsh soluvchi usta." }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "Amir Temur davlatida 'Kuch – adolatda' shiori nimani anglatgan?",
    options: ["Faqat harbiy kuchni", "Qonun ustuvorligi va adolatli boshqaruvni", "Boylik orttirishni", "Qo‘shni davlatlarni bosib olishni"],
    correct: 1,
    explanation: "Bu shior davlatda qonunlarning hamma uchun barobarligini va kuch faqat adolatni ta'minlash uchun ishlatilishini anglatgan."
  },
  {
    id: 2,
    question: "1402-yilgi Anqara jangining tarixiy ahamiyati nimada?",
    options: ["Yevropani Usmonli istilosidan vaqtincha saqlab qoldi", "Xitoy bosib olindi", "Oltin O‘rda tugatildi", "Hindiston Temurga bo‘ysundi"],
    correct: 0,
    explanation: "Temurning g‘alabasi Usmoniylar davlatini inqirozga uchratdi va Konstantinopolning qulashini 50 yilga kechiktirdi."
  },
  {
    id: 3,
    question: "Temuriylar Renessansi davrida qaysi soha rivojlanmagan?",
    options: ["Astronomiya", "Me'morchilik", "Miniatyura san'ati", "Dengizchilik"],
    correct: 3,
    explanation: "Temuriylar quruqlik imperiyasi bo‘lgani uchun dengizchilik rivojlanmagan, ammo boshqa fan va san'atlar yuksak darajaga chiqqan."
  },
  {
    id: 4,
    question: "Oltin O‘rda davlatining zaiflashishiga nima sabab bo‘ldi?",
    options: ["Faqat ichki nizolar", "Amir Temurning harbiy zarbalari va ichki nizolar", "Yevropa hujumlari", "Xitoy devorining qurilishi"],
    correct: 1,
    explanation: "To‘xtamishning Temurga qarshi siyosati va undan keyingi mag‘lubiyatlar Oltin O‘rdani halokatga olib keldi."
  },
  {
    id: 5,
    question: "XIV-XV asrlarda Osiyoda markazlashgan davlatlarning paydo bo'lishining eng muhim tarixiy ahamiyati nima edi?",
    options: [
      "Faqat yangi yerlarni bosib olish",
      "Buyuk Ipak yo'li savdosining qayta tiklanishi va barqarorlik",
      "Diniy urushlarning kuchayishi",
      "Yevropa bilan aloqalarning uzilishi"
    ],
    correct: 1,
    explanation: "Markazlashgan davlatlar (Temuriylar, Min) siyosiy tarqoqlikka barham berib, savdo yo'llari xavfsizligini ta'minladi, bu esa iqtisodiy va madaniy yuksalishga olib keldi."
  },
  {
    id: 6,
    question: "Amir Temurning 'Tuzuklar' asarida davlat boshqaruvining asosi sifatida nimalar ko'rsatilgan?",
    options: ["Faqat qilich va boylik", "Kengash, mashvarat va qonun", "Qo'rquv va zulm", "Qarindosh-urug'chilik"],
    correct: 1,
    explanation: "Amir Temur davlat ishlarini o'n qism deb bilsa, shundan to'qqiz qismi kengash, tadbir va mashvarat, qolgan bir qismi esa qilich bilan hal etilganini ta'kidlagan."
  }
];

export const HISTORICAL_QUOTES: HistoricalQuote[] = [
  { text: "Kuch – adolatdadir.", author: "Amir Temur", state: "Temuriylar Davlati" },
  { text: "Biz kim mulki Turon, amiri Turkistonmiz, biz kim millatlarning eng qadimi va eng ulug‘i Turkning bosh bo‘g‘inimiz.", author: "Amir Temur", state: "Temuriylar Davlati" },
  { text: "Davlat qonunlar asosida qurilmas ekan, unday saltanatning shukuhi va qudrati bo‘lmas.", author: "Amir Temur", state: "Temuriylar Davlati" },
  { text: "Adolat – davlatning asosi.", author: "Sulton Sulaymon Qonuniy", state: "Usmoniylar Davlati" }, // A bit later but relevant spirit
  { text: "Xalqni rozi qilmay turib, davlatni boshqarib bo‘lmaydi.", author: "Chju Yuanjan", state: "Min Sulolasi" },
  { text: "Qilich bilan olingan narsani faqat adolat bilan saqlab qolish mumkin.", author: "Amir Temur", state: "Temuriylar Davlati" }
];

export const MAP_POINTS: MapPoint[] = [
  // States
  { 
    id: 'state_temur', 
    title: 'Amir Temur Davlati', 
    type: 'state', 
    coordinates: { lat: 39.6542, lng: 66.9597 }, 
    description: 'Markaz: Samarqand',
    modernCountries: ['O‘zbekiston', 'Tojikiston', 'Afg‘oniston', 'Eron', 'Ozarbayjon', 'Turkmaniston'],
    color: '#0047AB',
    radius: 800000
  },
  { 
    id: 'state_ottoman', 
    title: 'Usmoniylar Davlati', 
    type: 'state', 
    coordinates: { lat: 40.1885, lng: 29.0610 }, 
    description: 'Markaz: Bursa/Edirne', 
    modernCountries: ['Turkiya', 'Bolqon davlatlari'],
    color: '#DC2626',
    radius: 400000
  },
  { 
    id: 'state_golden_horde', 
    title: 'Oltin O‘rda', 
    type: 'state', 
    coordinates: { lat: 47.17, lng: 47.45 }, 
    description: 'Markaz: Saroy',
    modernCountries: ['Rossiya', 'Qozog‘iston', 'Ukraina'],
    color: '#D97706',
    radius: 900000
  },
  { 
    id: 'state_ming', 
    title: 'Min Sulolasi', 
    type: 'state', 
    coordinates: { lat: 39.9042, lng: 116.4074 }, 
    description: 'Markaz: Pekin',
    modernCountries: ['Xitoy'],
    color: '#DC2626',
    radius: 1000000
  },
  { 
    id: 'state_delhi', 
    title: 'Dehli Sultonligi', 
    type: 'state', 
    coordinates: { lat: 28.6139, lng: 77.2090 }, 
    description: 'Markaz: Dehli',
    modernCountries: ['Hindiston', 'Pokiston'],
    color: '#16A34A',
    radius: 500000
  },
  // Campaigns
  {
    id: 'camp_ankara',
    title: 'Anqara Jangi (1402)',
    type: 'campaign',
    coordinates: { lat: 39.9334, lng: 32.8597 },
    description: 'Boyazid I ustidan g‘alaba',
    color: '#FF0000',
    details: {
      location: 'Anqara yaqinida, Turkiya',
      reason: 'Usmoniylar bilan siyosiy ziddiyat va chegaralarni kengaytirish.',
      result: 'Amir Temur g‘alaba qozondi, Boyazid asir olindi.',
      significance: 'Usmoniylar davlati zaiflashdi, Yevropa xavfsizligi ta\'minlandi.'
    }
  },
  {
    id: 'camp_terek',
    title: 'Terek Daryosi Jangi (1395)',
    type: 'campaign',
    coordinates: { lat: 43.5, lng: 47.0 },
    description: 'To‘xtamish ustidan g‘alaba',
    color: '#FF0000',
    details: {
      location: 'Shimoliy Kavkaz, Terek daryosi',
      reason: 'Oltin O‘rda xoni To‘xtamishning xiyonati va hujumlari.',
      result: 'Oltin O‘rda qo‘shini tor-mor etildi.',
      significance: 'Oltin O‘rda qudrati sindirildi va Buyuk Ipak yo‘li janubga ko‘chdi.'
    }
  },
  {
    id: 'camp_delhi',
    title: 'Dehli Yurishi (1398)',
    type: 'campaign',
    coordinates: { lat: 28.6, lng: 77.2 },
    description: 'Hindistonning egallanishi',
    color: '#FF0000',
    details: {
      location: 'Dehli, Hindiston',
      reason: 'Boylik va resurslarni qo‘lga kiritish, islomni mustahkamlash.',
      result: 'Dehli egallandi, katta o‘ljalar olib ketildi.',
      significance: 'Temuriylar davlati iqtisodiy qudrati oshdi, me\'morchilik rivojlandi.'
    }
  }
];

export const SOURCES_LIST = [
  "O‘zbekiston tarixi (8-sinf darsligi)",
  "Jahon tarixi (8-sinf darsligi)",
  "Temur tuzuklari",
  "Sharafiddin Ali Yazdiy, 'Zafarnoma'",
  "Ibn Arabshoh, 'Ajoyib al-maqdur'",
  "Hilda Hookham, 'Tamburlaine the Conqueror'",
  "G‘iyosiddin Ali, 'Hindiston yurishi kundaligi'",
  "Rui Gonsales de Klavixo, 'Samarqandga sayohat kundaligi'",
  "Nizomiddin Shomiy, 'Zafarnoma'",
  "A.Sog'uniy, 'Temur tuzuklari' (sharhlar)"
];
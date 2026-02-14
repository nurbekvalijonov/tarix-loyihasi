import React, { useState, useEffect, useRef } from 'react';
import { 
  BookOpen, Globe, History, Scale, MessageCircle, Sun, Moon, 
  ChevronDown, ChevronUp, Sword, Shield, Scroll, CheckCircle, Search, Feather, Map as MapIcon, Info, Image as ImageIcon, Book, Play, Pause
} from 'lucide-react';
import { STATES_DATA, TIMELINE_DATA, GLOSSARY_TERMS, QUIZ_QUESTIONS, HISTORICAL_QUOTES, MAP_POINTS, SOURCES_LIST } from './constants';
import { SectionType, StateProfile, MapPoint } from './types';
import { chatWithMurod, generateComparisonAnalysis, checkHistoricalFact, getQuickExplanation, analyzeImage } from './services/geminiService';

// Fix for missing Google Maps types
declare global {
  interface Window {
    google: any;
  }
}

// --- STYLES & HELPERS ---
const Section = ({ title, children, className = "" }: { title: string, children: React.ReactNode, className?: string }) => (
  <section className={`py-16 px-4 md:px-8 border-b border-stone-300 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 ${className}`}>
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-center mb-10">
        <div className="h-px w-16 bg-temur-gold opacity-50 hidden md:block"></div>
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-temur-blue dark:text-temur-gold mx-4 text-center tracking-wide">{title}</h2>
        <div className="h-px w-16 bg-temur-gold opacity-50 hidden md:block"></div>
      </div>
      {children}
    </div>
  </section>
);

const AcademicCard = ({ children, title, className = "" }: { children: React.ReactNode, title?: string, className?: string }) => (
  <div className={`bg-white dark:bg-stone-900 rounded-sm shadow-md border border-stone-200 dark:border-stone-700 p-8 transition-all hover:shadow-xl ${className}`}>
    {title && <h3 className="text-xl font-serif font-bold mb-4 text-stone-800 dark:text-stone-200 border-b pb-2 border-temur-gold/30">{title}</h3>}
    <div className="font-serif leading-relaxed text-stone-700 dark:text-stone-300">
      {children}
    </div>
  </div>
);

// --- COMPONENTS ---

const QuoteRotator = () => {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    // Random initial quote
    setIndex(Math.floor(Math.random() * HISTORICAL_QUOTES.length));
  }, []);

  const nextQuote = () => {
    setFade(false);
    setTimeout(() => {
      let nextIndex;
      do {
        nextIndex = Math.floor(Math.random() * HISTORICAL_QUOTES.length);
      } while (nextIndex === index);
      setIndex(nextIndex);
      setFade(true);
    }, 500);
  };

  useEffect(() => {
    const interval = setInterval(nextQuote, 8000);
    return () => clearInterval(interval);
  }, [index]);

  const quote = HISTORICAL_QUOTES[index];

  return (
    <div className="w-full bg-stone-100 dark:bg-stone-900 border-b border-temur-gold/30 py-4 px-4 text-center font-serif">
      <h3 className="text-xs uppercase tracking-widest text-temur-gold mb-2 font-bold">Tarixdan hikmatli so‘zlar</h3>
      <div className={`transition-opacity duration-500 ease-in-out ${fade ? 'opacity-100' : 'opacity-0'}`}>
        <p className="text-lg md:text-xl italic text-stone-800 dark:text-stone-200 mb-2">"{quote.text}"</p>
        <p className="text-sm text-stone-500 dark:text-stone-400">— <span className="font-bold">{quote.author}</span>, {quote.state}</p>
      </div>
    </div>
  );
};

const GoogleMapSection = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any | null>(null);
  const [infoWindow, setInfoWindow] = useState<any | null>(null);
  const [selectedPoint, setSelectedPoint] = useState<MapPoint | null>(null);
  const [autoPlay, setAutoPlay] = useState(false);
  const autoPlayIndex = useRef(0);

  useEffect(() => {
    // Dynamically load Google Maps script
    if (!window.google) {
      const script = document.createElement('script');
      // Using API Key from process.env if available, otherwise relying on user environment
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.API_KEY || ''}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = initMap;
      document.head.appendChild(script);
    } else {
      initMap();
    }
  }, []);

  const initMap = () => {
    if (!mapRef.current) return;
    const mapInstance = new window.google.maps.Map(mapRef.current, {
      center: { lat: 35.0, lng: 65.0 }, // Central Asia focus
      zoom: 3,
      styles: [
        { elementType: "geometry", stylers: [{ color: "#ebe3cd" }] },
        { elementType: "labels.text.fill", stylers: [{ color: "#523735" }] },
        { elementType: "labels.text.stroke", stylers: [{ color: "#f5f1e6" }] },
        { featureType: "administrative", elementType: "geometry.stroke", stylers: [{ color: "#c9b2a6" }] },
        { featureType: "administrative.land_parcel", elementType: "geometry.stroke", stylers: [{ color: "#dcd2be" }] },
        { featureType: "administrative.land_parcel", elementType: "labels.text.fill", stylers: [{ color: "#ae9e90" }] },
        { featureType: "landscape.natural", elementType: "geometry", stylers: [{ color: "#dfd2ae" }] },
        { featureType: "poi", elementType: "geometry", stylers: [{ color: "#dfd2ae" }] },
        { featureType: "poi", elementType: "labels.text.fill", stylers: [{ color: "#93817c" }] },
        { featureType: "poi.park", elementType: "geometry.fill", stylers: [{ color: "#a5b076" }] },
        { featureType: "poi.park", elementType: "labels.text.fill", stylers: [{ color: "#447530" }] },
        { featureType: "road", elementType: "geometry", stylers: [{ color: "#f5f1e6" }] },
        { featureType: "road.arterial", elementType: "geometry", stylers: [{ color: "#fdfcf8" }] },
        { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#f8c967" }] },
        { featureType: "road.highway", elementType: "geometry.stroke", stylers: [{ color: "#e9bc62" }] },
        { featureType: "road.highway.controlled_access", elementType: "geometry", stylers: [{ color: "#e98d58" }] },
        { featureType: "road.highway.controlled_access", elementType: "geometry.stroke", stylers: [{ color: "#db8555" }] },
        { featureType: "road.local", elementType: "labels.text.fill", stylers: [{ color: "#806b63" }] },
        { featureType: "transit.line", elementType: "geometry", stylers: [{ color: "#dfd2ae" }] },
        { featureType: "transit.station", elementType: "geometry", stylers: [{ color: "#dfd2ae" }] },
        { featureType: "water", elementType: "geometry.fill", stylers: [{ color: "#b9d3c2" }] },
        { featureType: "water", elementType: "labels.text.fill", stylers: [{ color: "#92998d" }] }
      ]
    });
    setMap(mapInstance);
    setInfoWindow(new window.google.maps.InfoWindow());
  };

  useEffect(() => {
    if (map && infoWindow) {
      MAP_POINTS.forEach(point => {
        // Marker
        const marker = new window.google.maps.Marker({
          position: point.coordinates,
          map: map,
          title: point.title,
          label: point.type === 'campaign' ? { text: '⚔️', fontSize: '12px' } : undefined,
          icon: point.type === 'state' ? {
             path: window.google.maps.SymbolPath.CIRCLE,
             scale: 8,
             fillColor: point.color,
             fillOpacity: 1,
             strokeWeight: 1,
             strokeColor: 'white',
          } : undefined
        });

        // Circle for States to approximate territory
        if (point.type === 'state' && point.radius) {
          new window.google.maps.Circle({
            strokeColor: point.color,
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: point.color,
            fillOpacity: 0.15,
            map,
            center: point.coordinates,
            radius: point.radius,
            clickable: false
          });
        }

        marker.addListener('click', () => {
          setSelectedPoint(point);
          map.panTo(point.coordinates);
          map.setZoom(point.type === 'state' ? 4 : 6);
          
          const contentString = `
            <div style="font-family: serif; color: black; padding: 5px;">
              <h3 style="margin: 0 0 5px 0; font-weight: bold;">${point.title}</h3>
              <p style="margin: 0; font-style: italic;">${point.description}</p>
              ${point.modernCountries ? `<p style="margin-top: 5px; font-size: 11px;"><b>Hozirgi:</b> ${point.modernCountries.join(', ')}</p>` : ''}
              <p style="margin-top: 5px; font-size: 10px; color: gray;">Batafsil ma'lumot uchun pastdagi kartaga qarang.</p>
            </div>
          `;
          infoWindow.setContent(contentString);
          infoWindow.open(map, marker);
        });
      });
    }
  }, [map, infoWindow]);

  const focusPoint = (point: MapPoint) => {
    if (map && infoWindow) {
      setSelectedPoint(point);
      map.panTo(point.coordinates);
      map.setZoom(point.type === 'state' ? 4 : 6);
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (autoPlay) {
      interval = setInterval(() => {
        const campaigns = MAP_POINTS.filter(p => p.type === 'campaign');
        if (autoPlayIndex.current >= campaigns.length) {
          autoPlayIndex.current = 0;
        }
        focusPoint(campaigns[autoPlayIndex.current]);
        autoPlayIndex.current += 1;
      }, 4000);
    }
    return () => clearInterval(interval);
  }, [autoPlay, map]);

  return (
    <Section title="Interaktiv Tarixiy Xarita">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-3/4">
          <div className="relative">
            <div ref={mapRef} className="w-full h-[500px] rounded shadow-lg border border-stone-300 dark:border-stone-700 bg-stone-200"></div>
            <button 
              onClick={() => setAutoPlay(!autoPlay)}
              className="absolute top-4 right-4 bg-white dark:bg-stone-800 p-2 rounded shadow-lg flex items-center gap-2 text-xs font-bold border border-stone-300 dark:border-stone-600 hover:bg-stone-100"
            >
              {autoPlay ? <Pause className="w-4 h-4 text-red-500" /> : <Play className="w-4 h-4 text-green-500" />}
              {autoPlay ? "To‘xtatish" : "Avtomatik ko‘rsatish"}
            </button>
          </div>
          {selectedPoint && (
             <div className="mt-4 bg-white dark:bg-stone-900 p-6 rounded shadow border-l-4 border-temur-blue animate-fade-in">
                <h3 className="text-xl font-bold mb-2 font-serif text-temur-blue dark:text-temur-gold">{selectedPoint.title}</h3>
                <p className="text-stone-600 dark:text-stone-300 mb-2">{selectedPoint.description}</p>
                
                {selectedPoint.type === 'state' && selectedPoint.modernCountries && (
                   <div className="mb-2">
                      <span className="font-bold text-sm">Hozirgi davlatlar hududi:</span>
                      <p className="text-sm italic">{selectedPoint.modernCountries.join(', ')}</p>
                   </div>
                )}
                
                {selectedPoint.details && (
                  <div className="mt-4 grid md:grid-cols-2 gap-4 text-sm">
                     <div>
                        <span className="block font-bold">Joylashuv:</span> {selectedPoint.details.location}
                     </div>
                     <div>
                        <span className="block font-bold">Sabab:</span> {selectedPoint.details.reason}
                     </div>
                     <div>
                        <span className="block font-bold">Natija:</span> {selectedPoint.details.result}
                     </div>
                     <div>
                        <span className="block font-bold">Ahamiyati:</span> {selectedPoint.details.significance}
                     </div>
                  </div>
                )}
             </div>
          )}
        </div>
        
        <div className="w-full md:w-1/4 h-[500px] overflow-y-auto pr-2 custom-scrollbar">
          <h4 className="font-bold text-stone-500 uppercase text-xs mb-2">Amir Temur Yurishlari Xronologiyasi</h4>
          <div className="space-y-2">
             {MAP_POINTS.filter(p => p.type === 'campaign').map(p => (
                <button 
                  key={p.id}
                  onClick={() => { setAutoPlay(false); focusPoint(p); }}
                  className={`w-full text-left p-3 rounded border font-serif text-sm transition-all hover:bg-stone-100 dark:hover:bg-stone-800 ${selectedPoint?.id === p.id ? 'border-temur-gold bg-stone-100 dark:bg-stone-800' : 'border-stone-200 dark:border-stone-700'}`}
                >
                   <span className="block font-bold text-temur-blue dark:text-temur-gold">{p.title}</span>
                   <span className="text-xs text-stone-500">{p.description}</span>
                </button>
             ))}
          </div>
          
          <h4 className="font-bold text-stone-500 uppercase text-xs mt-6 mb-2">Davlatlar</h4>
          <div className="space-y-2">
             {MAP_POINTS.filter(p => p.type === 'state').map(p => (
                <button 
                  key={p.id}
                  onClick={() => { setAutoPlay(false); focusPoint(p); }}
                  className={`w-full text-left p-3 rounded border font-serif text-sm transition-all hover:bg-stone-100 dark:hover:bg-stone-800 ${selectedPoint?.id === p.id ? 'border-temur-gold bg-stone-100 dark:bg-stone-800' : 'border-stone-200 dark:border-stone-700'}`}
                >
                   <span className="block font-bold">{p.title}</span>
                </button>
             ))}
          </div>
        </div>
      </div>
    </Section>
  );
};

// --- MAIN APP ---
const App: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatHistory, setChatHistory] = useState<{role: 'user' | 'ai', text: string}[]>([]);
  const [chatLoading, setChatLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<SectionType>(SectionType.HOME);
  
  // State Profile Logic
  const [selectedStateId, setSelectedStateId] = useState<string>(STATES_DATA[0].id);
  const selectedState = STATES_DATA.find(s => s.id === selectedStateId) || STATES_DATA[0];

  // Comparison Logic
  const [compState1, setCompState1] = useState(STATES_DATA[0].id);
  const [compState2, setCompState2] = useState(STATES_DATA[1].id);
  const [comparisonResult, setComparisonResult] = useState<string>("");
  const [isComparing, setIsComparing] = useState(false);

  // Search/Fact Check Logic
  const [factCheckQuery, setFactCheckQuery] = useState("");
  const [factCheckResult, setFactCheckResult] = useState<{text: string, sources: string[]} | null>(null);
  const [isCheckingFact, setIsCheckingFact] = useState(false);

  // Quick Terms Logic
  const [termQuery, setTermQuery] = useState("");
  const [termResult, setTermResult] = useState("");

  // Gallery Logic
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState("");
  const [galleryImage, setGalleryImage] = useState<string | null>(null);

  // Theme Init
  useEffect(() => {
    if (theme === 'dark') document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [theme]);

  // Handlers
  const handleChat = async () => {
    if (!chatInput.trim()) return;
    const msg = chatInput;
    setChatHistory(prev => [...prev, { role: 'user', text: msg }]);
    setChatInput("");
    setChatLoading(true);
    const response = await chatWithMurod(msg);
    setChatHistory(prev => [...prev, { role: 'ai', text: response }]);
    setChatLoading(false);
  };

  const handleComparison = async () => {
    setIsComparing(true);
    setComparisonResult("");
    const s1 = STATES_DATA.find(s => s.id === compState1)?.name || "";
    const s2 = STATES_DATA.find(s => s.id === compState2)?.name || "";
    const analysis = await generateComparisonAnalysis(s1, s2);
    setComparisonResult(analysis);
    setIsComparing(false);
  };

  const handleFactCheck = async () => {
    if (!factCheckQuery.trim()) return;
    setIsCheckingFact(true);
    const result = await checkHistoricalFact(factCheckQuery);
    setFactCheckResult(result);
    setIsCheckingFact(false);
  };

  const handleQuickTerm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!termQuery) return;
    const res = await getQuickExplanation(termQuery);
    setTermResult(res);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      
      reader.onloadend = async () => {
        const base64String = (reader.result as string).split(',')[1];
        setGalleryImage(reader.result as string);
        setIsAnalyzing(true);
        setAnalysisResult("");
        const result = await analyzeImage(base64String);
        setAnalysisResult(result);
        setIsAnalyzing(false);
      };
      reader.readAsDataURL(file);
    }
  };

  // --- RENDERERS ---

  const renderHome = () => (
    <div className="relative min-h-[90vh] flex flex-col items-center justify-center text-center p-6 bg-stone-900 text-stone-100 overflow-hidden">
      {/* Abstract Background Texture */}
      <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')]"></div>
      
      <div className="absolute top-16 left-0 right-0 z-20">
         <QuoteRotator />
      </div>
      
      <div className="z-10 max-w-4xl animate-fade-in-up mt-20">
        <div className="mb-6 flex justify-center">
          <Feather className="w-16 h-16 text-temur-gold opacity-80" />
        </div>
        <h1 className="text-4xl md:text-6xl font-serif font-bold text-temur-gold mb-6 tracking-wide drop-shadow-md">
          XIV–XV asrlarda Osiyo davlatlari va Amir Temur
        </h1>
        <p className="text-xl md:text-2xl text-stone-300 font-serif italic mb-10 max-w-2xl mx-auto">
          "Kuch – adolatda"
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left max-w-6xl mx-auto">
          <div className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded hover:bg-white/10 transition cursor-pointer" onClick={() => setActiveTab(SectionType.STATES)}>
            <History className="w-8 h-8 text-temur-gold mb-3" />
            <h3 className="font-bold text-lg mb-2">Buyuk Davlatlar</h3>
            <p className="text-sm text-stone-400">Temuriylar, Usmoniylar va boshqa imperiyalar tarixi.</p>
          </div>
          <div className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded hover:bg-white/10 transition cursor-pointer" onClick={() => setActiveTab(SectionType.COMPARISON)}>
            <Scale className="w-8 h-8 text-temur-gold mb-3" />
            <h3 className="font-bold text-lg mb-2">Qiyosiy Tahlil</h3>
            <p className="text-sm text-stone-400">Davlatlarning kuchli va zaif tomonlarini akademik taqqoslash.</p>
          </div>
          <div className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded hover:bg-white/10 transition cursor-pointer" onClick={() => setActiveTab(SectionType.TIMELINE)}>
            <Scroll className="w-8 h-8 text-temur-gold mb-3" />
            <h3 className="font-bold text-lg mb-2">Xronologiya</h3>
            <p className="text-sm text-stone-400">Amir Temur davrining muhim sanalari va voqealari.</p>
          </div>
          <div className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded hover:bg-white/10 transition cursor-pointer" onClick={() => setActiveTab(SectionType.MAP)}>
            <MapIcon className="w-8 h-8 text-temur-gold mb-3" />
            <h3 className="font-bold text-lg mb-2">Xarita & Yurishlar</h3>
            <p className="text-sm text-stone-400">Interaktiv xarita va Amir Temur yurishlari xronologiyasi.</p>
          </div>
          <div className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded hover:bg-white/10 transition cursor-pointer" onClick={() => setActiveTab(SectionType.GALLERY)}>
            <ImageIcon className="w-8 h-8 text-temur-gold mb-3" />
            <h3 className="font-bold text-lg mb-2">Tarixiy Galereya</h3>
            <p className="text-sm text-stone-400">Eksponatlarni sun'iy intellekt yordamida tahlil qilish.</p>
          </div>
          <div className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded hover:bg-white/10 transition cursor-pointer" onClick={() => setActiveTab(SectionType.GLOSSARY)}>
            <Book className="w-8 h-8 text-temur-gold mb-3" />
            <h3 className="font-bold text-lg mb-2">Tarixiy Lug‘at</h3>
            <p className="text-sm text-stone-400">Atamalar va tushunchalarning batafsil izohi.</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStates = () => (
    <Section title="Osiyoning Yirik Davlatlari">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar List */}
        <div className="w-full md:w-1/4 space-y-2">
          {STATES_DATA.map(state => (
            <button
              key={state.id}
              onClick={() => setSelectedStateId(state.id)}
              className={`w-full text-left px-6 py-4 rounded-sm font-serif transition-all border-l-4 ${
                selectedStateId === state.id 
                ? 'bg-temur-blue text-white border-temur-gold shadow-lg' 
                : 'bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 border-transparent hover:bg-stone-100 dark:hover:bg-stone-700'
              }`}
            >
              {state.name}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="w-full md:w-3/4">
          <AcademicCard className="animate-fade-in">
            <div className="border-b border-stone-200 dark:border-stone-700 pb-6 mb-6">
              <h3 className="text-3xl font-serif font-bold text-temur-blue dark:text-temur-gold mb-2">{selectedState.name}</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-stone-500 dark:text-stone-400 mt-4">
                <div><span className="font-bold block text-stone-900 dark:text-stone-100">Poytaxt:</span> {selectedState.capital}</div>
                <div><span className="font-bold block text-stone-900 dark:text-stone-100">Davr:</span> {selectedState.period}</div>
                <div><span className="font-bold block text-stone-900 dark:text-stone-100">Sulola:</span> {selectedState.dynasty}</div>
                <div><span className="font-bold block text-stone-900 dark:text-stone-100">Asoschi:</span> {selectedState.founder}</div>
              </div>
            </div>

            <div className="prose dark:prose-invert max-w-none font-serif text-justify space-y-6">
              <div>
                <h4 className="text-xl font-bold text-stone-800 dark:text-stone-200 flex items-center gap-2 mb-2">
                  <BookOpen className="w-5 h-5 text-temur-gold" /> Siyosiy Tarix va Boshqaruv
                </h4>
                <p>{selectedState.sections.political}</p>
              </div>
              <div>
                <h4 className="text-xl font-bold text-stone-800 dark:text-stone-200 flex items-center gap-2 mb-2">
                  <Sword className="w-5 h-5 text-temur-gold" /> Harbiy Tuzilma
                </h4>
                <p>{selectedState.sections.militaryStructure}</p>
              </div>
              <div>
                <h4 className="text-xl font-bold text-stone-800 dark:text-stone-200 flex items-center gap-2 mb-2">
                  <Scale className="w-5 h-5 text-temur-gold" /> Iqtisodiyot
                </h4>
                <p>{selectedState.sections.economicSystem}</p>
              </div>
              <div>
                <h4 className="text-xl font-bold text-stone-800 dark:text-stone-200 flex items-center gap-2 mb-2">
                  <Globe className="w-5 h-5 text-temur-gold" /> Madaniyat va Meros
                </h4>
                <p>{selectedState.sections.culturalImpact}</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mt-10 pt-8 border-t border-stone-200 dark:border-stone-700">
              <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded border border-green-100 dark:border-green-900">
                <h5 className="font-bold text-green-800 dark:text-green-400 mb-4 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" /> Kuchli Tomonlari
                </h5>
                <ul className="space-y-2">
                  {selectedState.strengths.map((s, i) => (
                    <li key={i} className="text-sm text-stone-700 dark:text-stone-300 flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-green-500 shrink-0"></span>
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded border border-red-100 dark:border-red-900">
                <h5 className="font-bold text-red-800 dark:text-red-400 mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5" /> Zaif Tomonlari
                </h5>
                <ul className="space-y-2">
                  {selectedState.weaknesses.map((w, i) => (
                    <li key={i} className="text-sm text-stone-700 dark:text-stone-300 flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-500 shrink-0"></span>
                      {w}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </AcademicCard>
        </div>
      </div>
    </Section>
  );

  const renderComparison = () => (
    <Section title="Kengaytirilgan Akademik Tahlil">
      <div className="max-w-4xl mx-auto">
        <AcademicCard className="mb-8 bg-stone-100 dark:bg-stone-900">
          <p className="mb-6 text-center text-stone-600 dark:text-stone-400">
            Ikki davlatni tanlang va sun'iy intellekt yordamida chuqur qiyosiy tahlil yarating.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-6">
            <select 
              value={compState1}
              onChange={(e) => setCompState1(e.target.value)}
              className="p-3 w-64 rounded bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-600 font-serif"
            >
              {STATES_DATA.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
            <span className="font-bold text-xl text-temur-gold font-serif">VA</span>
            <select 
              value={compState2}
              onChange={(e) => setCompState2(e.target.value)}
              className="p-3 w-64 rounded bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-600 font-serif"
            >
              {STATES_DATA.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
          </div>
          <div className="text-center">
            <button 
              onClick={handleComparison}
              disabled={isComparing}
              className="px-8 py-3 bg-temur-blue text-white font-bold rounded shadow hover:bg-blue-800 transition disabled:opacity-50 flex items-center gap-2 mx-auto"
            >
              {isComparing ? 'Tahlil qilinmoqda...' : 'Tahlilni Yaratish (AI)'}
            </button>
          </div>
        </AcademicCard>

        {comparisonResult && (
          <AcademicCard className="animate-fade-in border-t-4 border-t-temur-gold">
            <h3 className="text-2xl font-serif font-bold text-center mb-8 text-temur-blue dark:text-temur-gold">Qiyosiy Tahlil Natijasi</h3>
            <div className="prose dark:prose-invert max-w-none text-justify font-serif leading-loose whitespace-pre-wrap">
              {comparisonResult}
            </div>
            <div className="mt-8 text-center text-sm text-stone-400 italic">
              *Tahlil Gemini AI (Pro) modeli tomonidan generatsiya qilindi.
            </div>
          </AcademicCard>
        )}
      </div>
    </Section>
  );

  const renderTimeline = () => (
    <Section title="Amir Temur Davri Xronologiyasi">
      <div className="max-w-4xl mx-auto relative border-l-2 border-temur-gold/30 ml-4 md:ml-0 space-y-12">
        {TIMELINE_DATA.map((event, idx) => (
          <div key={idx} className="relative pl-8 md:pl-0">
            <div className="md:w-1/2 md:mx-auto relative md:flex md:justify-end md:pr-12 md:text-right md:odd:justify-start md:odd:pl-12 md:odd:text-left group">
              {/* Dot */}
              <div className="absolute top-0 left-[-33px] md:left-1/2 md:ml-[-5px] w-4 h-4 rounded-full bg-temur-gold border-4 border-white dark:border-stone-900 z-10"></div>
              
              {/* Card */}
              <div className={`
                relative bg-white dark:bg-stone-800 p-6 rounded shadow border border-stone-200 dark:border-stone-700
                md:w-full transition-transform hover:-translate-y-1
                ${idx % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'}
              `}>
                <span className="inline-block px-3 py-1 bg-stone-100 dark:bg-stone-700 text-temur-blue dark:text-temur-gold text-xs font-bold rounded mb-2">
                  {event.year}
                </span>
                <h4 className="text-lg font-bold mb-2 font-serif">{event.title}</h4>
                <p className="text-stone-600 dark:text-stone-300 text-sm leading-relaxed">
                  {event.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );

  const renderGallery = () => (
    <Section title="Tarixiy Galereya va Tahlil">
      <div className="max-w-4xl mx-auto">
        <AcademicCard className="text-center mb-8">
          <h3 className="text-xl font-bold mb-4 flex items-center justify-center gap-2">
            <ImageIcon className="text-temur-gold" /> Sun'iy Intellekt Yordamida Tahlil
          </h3>
          <p className="mb-6 text-sm text-stone-600 dark:text-stone-300 max-w-2xl mx-auto">
            Tarixiy eksponat (tanga, qurol, miniatyura yoki qo‘lyozma) rasmini yuklang. AI uni tahlil qilib, kelib chiqishi, davri va tarixiy ahamiyatini tushuntirib beradi.
          </p>
          <div className="flex flex-col items-center gap-4">
            <input 
              type="file" 
              ref={fileInputRef}
              className="hidden" 
              accept="image/*"
              onChange={handleImageUpload}
            />
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="px-8 py-3 bg-temur-blue text-white rounded font-bold hover:bg-blue-800 transition flex items-center gap-2"
            >
              Rasm Yuklash
            </button>
          </div>
        </AcademicCard>

        {galleryImage && (
          <div className="flex flex-col md:flex-row gap-8 items-start animate-fade-in">
            <div className="w-full md:w-1/3">
              <div className="bg-white dark:bg-stone-800 p-2 rounded shadow border border-stone-200 dark:border-stone-700">
                <img src={galleryImage} alt="Uploaded Artifact" className="w-full h-auto rounded" />
              </div>
            </div>
            <div className="w-full md:w-2/3">
              <AcademicCard>
                <h4 className="font-bold mb-4 text-temur-blue dark:text-temur-gold text-lg">Tahlil Natijasi:</h4>
                {isAnalyzing ? (
                  <div className="flex items-center gap-2 text-stone-500 italic">
                    <div className="w-2 h-2 bg-temur-gold rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-temur-gold rounded-full animate-bounce delay-75"></div>
                    <div className="w-2 h-2 bg-temur-gold rounded-full animate-bounce delay-150"></div>
                    Tahlil qilinmoqda...
                  </div>
                ) : (
                  <div className="prose dark:prose-invert max-w-none text-sm font-serif leading-relaxed whitespace-pre-wrap">
                    {analysisResult}
                  </div>
                )}
              </AcademicCard>
            </div>
          </div>
        )}
      </div>
    </Section>
  );

  const renderGlossary = () => (
    <Section title="Tarixiy Terminlar Lug‘ati">
      <div className="max-w-6xl mx-auto overflow-x-auto rounded-lg shadow border border-stone-200 dark:border-stone-700">
        <table className="w-full text-sm text-left text-stone-600 dark:text-stone-300 font-serif">
          <thead className="text-xs uppercase bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-200 border-b border-stone-200 dark:border-stone-700">
            <tr>
              <th className="px-6 py-4 font-bold">Termin</th>
              <th className="px-6 py-4 font-bold w-1/4">Qisqa Tarjimasi</th>
              <th className="px-6 py-4 font-bold w-1/2">Batafsil Izohi</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-stone-900 divide-y divide-stone-200 dark:divide-stone-800">
            {GLOSSARY_TERMS.map((term, idx) => (
              <tr key={idx} className="hover:bg-stone-50 dark:hover:bg-stone-800 transition">
                <td className="px-6 py-4 font-bold text-temur-blue dark:text-temur-gold">{term.term}</td>
                <td className="px-6 py-4 italic text-stone-500 dark:text-stone-400">{term.short}</td>
                <td className="px-6 py-4 leading-relaxed">{term.full}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Section>
  );

  const renderFactChecker = () => (
    <Section title="Tarixiy Faktlarni Tekshirish">
      <div className="max-w-2xl mx-auto text-center">
        <p className="mb-6 text-stone-600 dark:text-stone-400">
          Google Qidiruv bazasidan foydalanib tarixiy ma'lumotlarni tekshiring yoki yangi manbalar toping.
        </p>
        <div className="flex gap-2 mb-8">
          <input 
            type="text" 
            value={factCheckQuery}
            onChange={(e) => setFactCheckQuery(e.target.value)}
            placeholder="Masalan: Temur va Boyazid yozishmalari..."
            className="flex-1 p-3 rounded border border-stone-300 dark:bg-stone-800 dark:border-stone-600 font-serif"
          />
          <button 
            onClick={handleFactCheck}
            disabled={isCheckingFact}
            className="p-3 bg-stone-700 text-white rounded hover:bg-stone-600 disabled:opacity-50"
          >
            <Search className="w-5 h-5" />
          </button>
        </div>
        
        {factCheckResult && (
          <div className="bg-white dark:bg-stone-800 p-6 rounded text-left shadow border border-stone-200 dark:border-stone-700 animate-fade-in">
            <h4 className="font-bold mb-2 text-temur-blue">Natija:</h4>
            <p className="text-sm mb-4 leading-relaxed">{factCheckResult.text}</p>
            {factCheckResult.sources.length > 0 && (
              <div className="text-xs text-stone-500 border-t pt-2 border-stone-200 dark:border-stone-700">
                <strong>Manbalar:</strong>
                <ul className="list-disc list-inside mt-1">
                  {factCheckResult.sources.slice(0, 3).map((s, i) => (
                    <li key={i} className="truncate"><a href={s} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline">{s}</a></li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </Section>
  );

  const renderSources = () => (
    <Section title="Manbalar va Izohlar">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="bg-yellow-50 dark:bg-yellow-900/10 border-l-4 border-yellow-500 p-6">
          <h4 className="font-bold text-yellow-800 dark:text-yellow-500 mb-2">Loyiha Haqida</h4>
          <p className="text-sm text-yellow-900 dark:text-yellow-200 mb-2">
            Ushbu loyiha umumta’lim maktablarining 8-sinf tarix darsligi asosida tayyorlandi.
          </p>
          <p className="text-sm text-yellow-900 dark:text-yellow-200 font-bold">
            Bu loyiha ta’limiy maqsadda tayyorlandi va notijorat xarakterga ega.
          </p>
        </div>

        <div>
          <h4 className="text-xl font-bold font-serif mb-4 text-center">Foydalanilgan Asosiy Manbalar</h4>
          <ul className="list-disc list-inside space-y-2 text-stone-700 dark:text-stone-300 font-serif bg-white dark:bg-stone-800 p-6 rounded shadow-sm">
            {SOURCES_LIST.map((source, index) => (
              <li key={index}>{source}</li>
            ))}
          </ul>
        </div>
        
        <div className="text-center pt-8 text-stone-500 text-sm">
          <p>Loyiha muallifi: <strong>Nurbek Valijonov</strong></p>
          <p>8-sinf | Tarix fani</p>
        </div>
      </div>
    </Section>
  );

  // --- MAIN LAYOUT ---

  return (
    <div className="min-h-screen font-sans bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 transition-colors duration-300">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-white/95 dark:bg-stone-900/95 backdrop-blur shadow-sm border-b border-stone-200 dark:border-stone-800">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab(SectionType.HOME)}>
            <div className="w-8 h-8 bg-temur-blue rounded-full flex items-center justify-center text-white font-serif font-bold">T</div>
            <span className="font-serif font-bold text-lg hidden md:block tracking-tight">XIV–XV asrlar Tarixi</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium font-serif">
            <button onClick={() => setActiveTab(SectionType.HOME)} className={`hover:text-temur-gold transition ${activeTab === SectionType.HOME ? 'text-temur-blue dark:text-temur-gold' : ''}`}>Asosiy</button>
            <button onClick={() => setActiveTab(SectionType.STATES)} className={`hover:text-temur-gold transition ${activeTab === SectionType.STATES ? 'text-temur-blue dark:text-temur-gold' : ''}`}>Davlatlar</button>
            <button onClick={() => setActiveTab(SectionType.COMPARISON)} className={`hover:text-temur-gold transition ${activeTab === SectionType.COMPARISON ? 'text-temur-blue dark:text-temur-gold' : ''}`}>Tahlil</button>
            <button onClick={() => setActiveTab(SectionType.MAP)} className={`hover:text-temur-gold transition ${activeTab === SectionType.MAP ? 'text-temur-blue dark:text-temur-gold' : ''}`}>Xarita</button>
            <button onClick={() => setActiveTab(SectionType.GALLERY)} className={`hover:text-temur-gold transition ${activeTab === SectionType.GALLERY ? 'text-temur-blue dark:text-temur-gold' : ''}`}>Galereya</button>
            <button onClick={() => setActiveTab(SectionType.GLOSSARY)} className={`hover:text-temur-gold transition ${activeTab === SectionType.GLOSSARY ? 'text-temur-blue dark:text-temur-gold' : ''}`}>Lug‘at</button>
            <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="p-2 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800">
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </nav>
          {/* Mobile Menu Button - simplified */}
          <div className="md:hidden flex items-center gap-2">
             <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="p-2 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800">
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>
        {/* Mobile Nav would go here, omitting for brevity to keep clean code structure focused on core requirements */}
      </header>

      {/* Main Container */}
      <main className="pt-16">
        {activeTab === SectionType.HOME && renderHome()}
        {activeTab === SectionType.STATES && renderStates()}
        {activeTab === SectionType.COMPARISON && renderComparison()}
        {activeTab === SectionType.TIMELINE && renderTimeline()}
        {activeTab === SectionType.MAP && <GoogleMapSection />}
        {activeTab === SectionType.GALLERY && renderGallery()}
        {activeTab === SectionType.GLOSSARY && renderGlossary()}
        
        {/* Always visible supplementary sections on non-Home tabs if needed, but keeping separate based on prompt structure requests */}
        {activeTab !== SectionType.HOME && activeTab !== SectionType.GLOSSARY && activeTab !== SectionType.GALLERY && (
          <>
            {renderFactChecker()}
            {renderSources()}
          </>
        )}
      </main>

      {/* MurodTarixchi Chat Widget */}
      <div className="fixed bottom-6 right-6 z-50">
        {!chatOpen ? (
          <button 
            onClick={() => setChatOpen(true)}
            className="flex items-center gap-2 px-5 py-3 bg-temur-blue text-white rounded-full shadow-2xl hover:bg-blue-800 transition-transform hover:scale-105 border-2 border-white dark:border-stone-700"
          >
            <MessageCircle className="w-5 h-5" />
            <span className="font-bold font-serif">MurodTarixchi</span>
          </button>
        ) : (
          <div className="bg-white dark:bg-stone-900 w-80 md:w-96 rounded-lg shadow-2xl border border-stone-300 dark:border-stone-700 overflow-hidden flex flex-col h-[500px] animate-fade-in-up">
            <div className="p-4 bg-temur-blue text-white flex justify-between items-center shadow">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <div>
                  <h4 className="font-bold font-serif text-sm">MurodTarixchi</h4>
                  <p className="text-[10px] opacity-80">AI Akademik Yordamchi</p>
                </div>
              </div>
              <button onClick={() => setChatOpen(false)} className="hover:bg-white/20 p-1 rounded">
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-stone-50 dark:bg-stone-950">
              {chatHistory.length === 0 && (
                <div className="text-center text-sm text-stone-500 mt-8 px-4">
                  <p className="mb-2">Assalomu alaykum! Men sun'iy intellektga asoslangan tarixchiman.</p>
                  <p>Menga Amir Temur yoki XIV-XV asr davlatlari haqida istalgan savolingizni bering.</p>
                </div>
              )}
              {chatHistory.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3 rounded-lg text-sm font-serif leading-relaxed shadow-sm ${
                    msg.role === 'user' 
                    ? 'bg-blue-600 text-white rounded-br-none' 
                    : 'bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-200 border border-stone-200 dark:border-stone-700 rounded-bl-none'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {chatLoading && (
                <div className="flex justify-start">
                  <div className="bg-white dark:bg-stone-800 p-3 rounded-lg rounded-bl-none shadow-sm border border-stone-200 dark:border-stone-700">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-stone-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-stone-400 rounded-full animate-bounce delay-75"></div>
                      <div className="w-2 h-2 bg-stone-400 rounded-full animate-bounce delay-150"></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="p-3 bg-white dark:bg-stone-900 border-t border-stone-200 dark:border-stone-700 flex gap-2">
              <input 
                type="text" 
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleChat()}
                placeholder="Savolingizni yozing..."
                className="flex-1 p-2 rounded border border-stone-300 dark:border-stone-600 dark:bg-stone-800 text-sm focus:outline-none focus:border-temur-blue font-serif"
              />
              <button 
                onClick={handleChat}
                disabled={chatLoading}
                className="p-2 bg-temur-blue text-white rounded hover:bg-blue-700 transition disabled:opacity-50"
              >
                <Feather className="w-4 h-4" />
              </button>
            </div>
            
            {/* Quick Term Check using Flash-Lite */}
            <form onSubmit={handleQuickTerm} className="px-3 pb-3 bg-white dark:bg-stone-900 text-xs border-t border-stone-100 dark:border-stone-800 pt-2">
              <div className="flex items-center gap-2 mb-1 opacity-60">
                <Search className="w-3 h-3" />
                <span>Tezkor Termin Izlash (Flash-Lite)</span>
              </div>
              <div className="flex gap-2">
                <input 
                  value={termQuery}
                  onChange={(e) => setTermQuery(e.target.value)}
                  className="flex-1 bg-stone-100 dark:bg-stone-800 p-1 rounded border-none" 
                  placeholder="Masalan: ulus"
                />
                <button type="submit" className="text-blue-600 font-bold px-1">OK</button>
              </div>
              {termResult && <div className="mt-1 p-1 bg-yellow-50 dark:bg-yellow-900/20 text-stone-800 dark:text-stone-200 rounded">{termResult}</div>}
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
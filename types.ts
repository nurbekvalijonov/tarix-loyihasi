export interface StateProfile {
  id: string;
  name: string;
  capital: string;
  dynasty: string;
  period: string;
  founder: string;
  governance: string;
  military: string;
  economy: string;
  diplomacy: string;
  culture: string;
  significance: string;
  strengths: string[];
  weaknesses: string[];
  // Detailed text sections
  sections: {
    political: string;
    militaryStructure: string;
    economicSystem: string;
    culturalImpact: string;
  };
  stats: {
    military: number;
    governance: number;
    economy: number;
    diplomacy: number;
    culture: number;
    stability: number;
  };
}

export interface TimelineEvent {
  year: number;
  title: string;
  description: string;
  category: 'political' | 'military' | 'cultural' | 'reform';
}

export interface GlossaryTerm {
  term: string;
  short: string;
  full: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

export interface HistoricalQuote {
  text: string;
  author: string;
  state: string;
}

export interface MapPoint {
  id: string;
  title: string;
  type: 'state' | 'campaign';
  coordinates: { lat: number; lng: number };
  description: string; // Short hover description
  modernCountries?: string[]; // For states
  details?: { // For campaigns/states detailed click
    location: string;
    reason?: string;
    result?: string;
    significance: string;
  };
  color: string;
  radius?: number; // For state territory approximation
}

export enum SectionType {
  HOME = 'home',
  STATES = 'states',
  COMPARISON = 'comparison',
  MAP = 'map',
  TIMELINE = 'timeline',
  GALLERY = 'gallery',
  GLOSSARY = 'glossary',
  SOURCES = 'sources'
}

export enum AppView {
  DASHBOARD = 'dashboard',
  THEORY_EXPLORER = 'theory_explorer',
  NEWS_ANALYZER = 'news_analyzer',
  ESSAY_ARCHITECT = 'essay_architect',
  TEXT_REFINER = 'text_refiner',
  TUTOR = 'tutor',
  LIVE_SEMINAR = 'live_seminar',
  RESEARCH_ASSISTANT = 'research_assistant',
  NOTES = 'notes',
  JOURNAL = 'journal',
  DRIVE = 'drive',
  ACCOUNT = 'account'
}

export interface UserProfile {
  pseudonym: string;
  avatarColor: string;
  joinedDate: number;
  pin: string; // Nouveau champ de sécurité
}

export interface EssayPlan {
  title: string;
  problematic: string;
  outline: {
    part: string;
    subparts: string[];
  }[];
  conclusion: string;
}

export interface GroundingChunk {
  web?: {
    uri: string;
    title: string;
  };
}

export interface SeminarTurn {
  role: 'user' | 'model';
  text: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export interface PastSeminarSession {
  id: string;
  date: string;
  transcript: SeminarTurn[];
}

export interface UserNote {
  id: string;
  title: string;
  content: string;
  lastModified: number;
}

export interface JournalEntry {
  id: string;
  date: number;
  content: string;
  mood?: 'productive' | 'tired' | 'inspired' | 'stressed';
}

export interface TheoryAnalysis {
  concept: string;
  definition: string;
  keyFigures: {
    name: string;
    contribution: string;
    work: string;
  }[];
  historicalContext: string;
  modernApplication: string;
  criticalAnalysis: string;
}

export interface TheoryComparison {
  theoryA: string;
  theoryB: string;
  convergencePoints: string[];
  divergencePoints: {
    aspect: string;
    theoryA_view: string;
    theoryB_view: string;
  }[];
  synthesis: string;
  comparativeConclusion: string;
}

export interface ClubData {
  id: string;
  name: string;
  period: string;
  goals: number;
  assists: number;
  appearances: number;
  trophies: string[];
  description: string;
  accentClass: string;
  bgGradient: string;
  logo: string; // Tailwind emoji/icon or symbol
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface SkillItem {
  name: string;
  difficulty: 'Fácil' | 'Médio' | 'Difícil' | 'Lendário';
  description: string;
  howTo: string;
  visualPattern: string; // visual instructions
}

export interface QuoteItem {
  text: string;
  context: string;
  year: string;
}

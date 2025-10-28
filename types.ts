
export interface MusicTheoryResponse {
  name: string;
  type: 'scale' | 'chord' | 'unknown';
  notes: string[];
  explanation: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}

export type AppView = 'visualizer' | 'chatbot' | 'imageGenerator';

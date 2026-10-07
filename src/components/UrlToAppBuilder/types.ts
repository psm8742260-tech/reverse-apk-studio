export interface UrlAnalysis { 
  id: string; 
  url: string; 
  status: 'idle' | 'analyzing' | 'complete'; 
}

export interface ActionItem {
  id: string;
  title: string;
  description: string;
  type: 'error' | 'warning' | 'info' | 'feature' | 'success';
  category?: string;
  message?: string;
  action?: string;
}

export interface AnalysisReport {
  id?: string;
  url: string;
  summary?: string;
  score: number;
  maxScore: number;
  actionItems: ActionItem[];
  counts: {
    errors: number;
    warnings: number;
    info: number;
    features: number;
  };
  errors?: any[];
  warnings?: any[];
  manifest?: any;
  manifestFound?: boolean;
  hasServiceWorker?: boolean;
  isSsl?: boolean;
  hostname?: string;
  appIconUrl?: string;
  iconCheck?: {
    has192: boolean;
    has512: boolean;
    hasMaskable: boolean;
    validTypes?: boolean;
    details?: string[];
  };
}

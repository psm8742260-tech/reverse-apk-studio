export interface ActionItem {
  category: 'Manifest' | 'Service Worker' | 'Security';
  type: 'error' | 'warning' | 'info' | 'feature' | 'success';
  title: string;
  message: string;
  action?: string;
}

export interface AnalysisReport {
  url: string;
  hostname?: string;
  isSsl: boolean;
  hasServiceWorker: boolean;
  manifestFound: boolean;
  manifest: {
    name?: string;
    short_name?: string;
    description?: string;
    start_url?: string;
    display?: string;
    theme_color?: string;
    background_color?: string;
    icons?: Array<{ src: string; sizes: string; type?: string; purpose?: string }>;
    screenshots?: Array<{ src: string; sizes?: string; form_factor?: string }>;
  } | null;
  appIconUrl: string | null;
  counts: {
    errors: number;
    warnings: number;
    info: number;
    features: number;
  };
  iconCheck: {
    has192: boolean;
    has512: boolean;
    hasMaskable?: boolean;
    validTypes: boolean;
    details: string[];
  };
  actionItems: ActionItem[];
  score: number;
  maxScore: number;
}

export type BuildType = 'apk' | 'aab' | 'testing';

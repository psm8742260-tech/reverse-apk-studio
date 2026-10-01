export type StudioTab = 'chat' | 'preview' | 'code' | 'assets' | 'logs' | 'integrations' | 'github';
export type StudioMode = 'NORMAL' | 'REVERSE';
export type ActiveModal = 
  | 'none' 
  | 'share' 
  | 'settings' 
  | 'remix' 
  | 'publish' 
  | 'url_import' 
  | 'projects' 
  | 'login' 
  | 'import-url' 
  | 'version_history' 
  | 'models' 
  | 'integrations' 
  | 'secrets' 
  | 'github' 
  | 'sidebar_menu'
  | 'auth'
  | 'build'
  | 'exposing'
  | 'self_fixer'
  | 'url_app_builder'
  | 'gallery'
  | 'languages'
  | 'dashboard';

export interface ExtractedFile {
  path: string;
  name: string;
  size: number;
  type: 'html' | 'css' | 'js' | 'json' | 'xml' | 'image' | 'audio' | 'other';
  mimeType: string;
  content?: string;
  blobUrl?: string;
  isBinary?: boolean;
}

export interface FileTreeNode {
  name: string;
  path: string;
  isFolder: boolean;
  children?: FileTreeNode[];
  file?: ExtractedFile;
}

export interface ManifestInfo {
  packageName: string;
  versionName: string;
  versionCode: number;
  minSdkVersion: string;
  targetSdkVersion: string;
  permissions: string[];
  mainActivity: string;
  appTitle: string;
  extractedAssetsCount: number;
  totalSizeMb: string;
}

export interface DecompiledApp {
  fileName: string;
  manifest: ManifestInfo;
  files: ExtractedFile[];
  tree: FileTreeNode[];
  webRootPath: string;
  previewBlobUrl?: string;
  decompiledAt: string;
}

export interface SecurityLog {
  id: string;
  timestamp: string;
  event: string;
  status: 'SUCCESS' | 'WARNING' | 'DENIED' | 'INFO';
  ipAddress?: string;
  agent?: string;
}

export interface FeatureFlags {
  enableUnpacker: boolean;
  enableLivePreview: boolean;
  enableCodeEditor: boolean;
  enableAIAssistant: boolean;
  enableZipExporter: boolean;
  enableCorsProxy: boolean;
  enableDemoApks: boolean;
  darkModeDefault: boolean;
  enableSelfFixer: boolean;
  enableVisualBuilder: boolean;
  enableAgentRegulations: boolean;
  enableAdminDemoControllers: boolean;
  enableInvisibleAgentDaemon: boolean;
}

export interface AgentStatus {
  id: string;
  name: string;
  role: string;
  status: 'IDLE' | 'ACTIVE' | 'PROCESSING' | 'COMPLETED' | 'ERROR';
  description: string;
  lastAction?: string;
  tasksCompleted: number;
  badgeColor: string;
}

export interface AIStudioMessage {
  id: string;
  sender: 'user' | 'ai' | 'system';
  agentName?: string;
  text: string;
  timestamp: string;
  fileContext?: string;
  codeSnippet?: {
    filename: string;
    code: string;
    language: string;
  };
}

export interface CodeTab {
  id: string;
  filename: string;
  path: string;
  content: string;
  language: string;
  isModified?: boolean;
}

export interface StudioConfig {
  studio_name: string;
  version: string;
  engine_type: string;
  features: {
    reverse_studio: boolean;
    normal_studio: boolean;
    pwa_support: boolean;
    ai_repair: boolean;
  };
  endpoints: {
    api_base: string;
    publishing_domain: string;
    hosting_proxy: string;
  };
}

export interface Project {
  id: string;
  name: string;
  description: string;
  type: 'REVERSE' | 'NORMAL';
  createdAt: number;
  lastModified: number;
  files?: StudioFile[];
}

export interface StudioFile {
  path: string;
  content: string;
  type: string;
}

export interface UserSession {
  instanceId: string;
  userId?: string;
  lastProject?: string;
  settings: {
    theme: 'light' | 'dark';
    compactMode: boolean;
  };
}

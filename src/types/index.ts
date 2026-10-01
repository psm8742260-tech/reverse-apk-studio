export interface ExtractedFile {
  path: string;
  name: string;
  size: number;
  type: 'html' | 'css' | 'js' | 'json' | 'xml' | 'image' | 'audio' | 'other';
  mimeType: string;
  content?: string; // Text content if text-based
  blobUrl?: string; // Blob URL for preview if binary/media
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
  webRootPath: string; // e.g. "assets/www/index.html" or "index.html"
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

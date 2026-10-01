import JSZip from 'jszip';
import { DecompiledApp, ExtractedFile, FileTreeNode, ManifestInfo } from '../types';

export async function decompileApk(fileOrBlob: Blob, fileName: string): Promise<DecompiledApp> {
  if (!fileOrBlob || fileOrBlob.size === 0) {
    throw new Error('Selected file is empty. Please choose a valid APK or ZIP file.');
  }

  const zip = new JSZip();
  let loadedZip;
  try {
    loadedZip = await zip.loadAsync(fileOrBlob);
  } catch (err: any) {
    if (err.message.includes('end of central directory')) {
      throw new Error('Invalid APK/ZIP format. The file might be corrupted or not a valid archive.');
    }
    throw new Error(`Failed to read archive: ${err.message}`);
  }

  const extractedFiles: ExtractedFile[] = [];
  const fileMap: Map<string, ExtractedFile> = new Map();

  let webRootPath = '';
  let indexHtmlContent = '';

  const totalBytes = fileOrBlob.size;

  // Process files sequentially or in batch
  const fileKeys = Object.keys(loadedZip.files);

  for (const relativePath of fileKeys) {
    const zipEntry = loadedZip.files[relativePath];
    if (zipEntry.dir) continue;

    const fileExt = relativePath.split('.').pop()?.toLowerCase() || '';
    const name = relativePath.split('/').pop() || relativePath;

    let fileType: ExtractedFile['type'] = 'other';
    let mimeType = 'text/plain';

    if (['html', 'htm'].includes(fileExt)) {
      fileType = 'html';
      mimeType = 'text/html';
    } else if (['css'].includes(fileExt)) {
      fileType = 'css';
      mimeType = 'text/css';
    } else if (['js', 'mjs', 'jsx', 'ts', 'tsx'].includes(fileExt)) {
      fileType = 'js';
      mimeType = 'application/javascript';
    } else if (['json'].includes(fileExt)) {
      fileType = 'json';
      mimeType = 'application/json';
    } else if (['xml'].includes(fileExt)) {
      fileType = 'xml';
      mimeType = 'text/xml';
    } else if (['png', 'jpg', 'jpeg', 'svg', 'webp', 'gif', 'ico'].includes(fileExt)) {
      fileType = 'image';
      mimeType = `image/${fileExt === 'svg' ? 'svg+xml' : fileExt}`;
    } else if (['mp3', 'wav', 'ogg', 'aac'].includes(fileExt)) {
      fileType = 'audio';
      mimeType = `audio/${fileExt}`;
    }

    let textContent: string | undefined;
    let blobUrl: string | undefined;
    const binaryExtensions = ['dex', 'so', 'arsc', 'bin', 'dat', 'jar', 'aab', 'apk', 'zip', 'pb', 'class', 'db', 'sqlite', 'keystore', 'jks'];
    const isBinary = fileType === 'image' || fileType === 'audio' || binaryExtensions.includes(fileExt);

    if (isBinary) {
      try {
        const u8array = await zipEntry.async('uint8array');
        const blob = new Blob([u8array], { type: mimeType });
        blobUrl = URL.createObjectURL(blob);
      } catch (err) {
        console.warn(`Failed to extract binary file ${relativePath}:`, err);
        blobUrl = '';
      }
    } else {
      try {
        textContent = await zipEntry.async('text');
      } catch (err) {
        textContent = `[Binary or Unreadable text file: ${name}]`;
      }
    }

    const extractedFile: ExtractedFile = {
      path: relativePath,
      name,
      size: (zipEntry as any)._data?.uncompressedSize || textContent?.length || 0,
      type: fileType,
      mimeType,
      content: textContent,
      blobUrl,
      isBinary,
    };

    extractedFiles.push(extractedFile);
    fileMap.set(relativePath, extractedFile);
  }

  // Identify primary web root HTML entry point (Only for APK/AAB)
  const isApkOrAab = fileName.toLowerCase().endsWith('.apk') || fileName.toLowerCase().endsWith('.aab');
  
  if (isApkOrAab) {
    for (const file of extractedFiles) {
      const { path: relativePath, type: fileType, content: textContent } = file;
      if (fileType === 'html') {
        if (relativePath.includes('assets/www/index.html')) {
          webRootPath = relativePath;
          indexHtmlContent = textContent || '';
        } else if (!webRootPath && relativePath.includes('www/index.html')) {
          webRootPath = relativePath;
          indexHtmlContent = textContent || '';
        } else if (!webRootPath && relativePath.endsWith('index.html')) {
          webRootPath = relativePath;
          indexHtmlContent = textContent || '';
        }
      }
    }
  }

  // Fallback web root if none explicitly matched (Only for APK/AAB)
  if (!webRootPath && isApkOrAab) {
    const firstHtml = extractedFiles.find((f) => f.type === 'html');
    if (firstHtml) {
      webRootPath = firstHtml.path;
      indexHtmlContent = firstHtml.content || '';
    } else {
      webRootPath = 'index.html';
      indexHtmlContent = `<!DOCTYPE html><html><head><title>Decompiled App</title><style>body{font-family:sans-serif;padding:2rem;background:#0f172a;color:#f8fafc;}</style></head><body><h1>AI Master Web Viewer</h1><p>No standard index.html found. Showing extracted assets summary (${extractedFiles.length} files).</p></body></html>`;
    }
  }

  // Parse Android Manifest metadata
  const manifestFile = fileMap.get('AndroidManifest.xml');
  const manifestInfo: ManifestInfo = parseManifest(manifestFile?.content, fileName, extractedFiles.length, totalBytes);

  // Build File Tree hierarchy
  const tree = buildFileTree(extractedFiles);

  // Generate Live Preview Blob URL
  const previewBlobUrl = createLivePreviewBundleUrl(webRootPath, indexHtmlContent, fileMap);

  return {
    fileName,
    manifest: manifestInfo,
    files: extractedFiles,
    tree,
    webRootPath,
    previewBlobUrl,
    decompiledAt: new Date().toLocaleTimeString(),
  };
}

function parseManifest(manifestXml: string | undefined, fileName: string, fileCount: number, totalBytes: number): ManifestInfo {
  let packageName = 'com.extracted.app';
  let appTitle = fileName.replace(/\.(apk|zip)$/i, '');
  let versionName = '1.0.0';
  let versionCode = 100;
  let minSdkVersion = '21 (Android 5.0)';
  let targetSdkVersion = '34 (Android 14)';
  const permissions: string[] = ['android.permission.INTERNET', 'android.permission.ACCESS_NETWORK_STATE'];

  if (manifestXml && typeof manifestXml === 'string') {
    const pkgMatch = manifestXml.match(/package=["']([^"']+)["']/i);
    if (pkgMatch) packageName = pkgMatch[1];

    const verNameMatch = manifestXml.match(/android:versionName=["']([^"']+)["']/i);
    if (verNameMatch) versionName = verNameMatch[1];

    const verCodeMatch = manifestXml.match(/android:versionCode=["']([^"']+)["']/i);
    if (verCodeMatch) versionCode = parseInt(verCodeMatch[1], 10);

    const minSdkMatch = manifestXml.match(/android:minSdkVersion=["']([^"']+)["']/i);
    if (minSdkMatch) minSdkVersion = minSdkMatch[1];

    const labelMatch = manifestXml.match(/android:label=["']([^"']+)["']/i);
    if (labelMatch) appTitle = labelMatch[1];

    const permMatches = manifestXml.matchAll(/uses-permission\s+android:name=["']([^"']+)["']/gi);
    for (const match of permMatches) {
      if (match[1] && !permissions.includes(match[1])) {
        permissions.push(match[1]);
      }
    }
  }

  const totalMb = (totalBytes / (1024 * 1024)).toFixed(2);

  return {
    packageName,
    versionName,
    versionCode,
    minSdkVersion,
    targetSdkVersion,
    permissions,
    mainActivity: `${packageName}.MainActivity`,
    appTitle,
    extractedAssetsCount: fileCount,
    totalSizeMb: totalMb,
  };
}

function buildFileTree(files: ExtractedFile[]): FileTreeNode[] {
  const root: FileTreeNode[] = [];

  for (const file of files) {
    const parts = file.path.split('/');
    let currentLevel = root;

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      const isLast = i === parts.length - 1;
      const currentPath = parts.slice(0, i + 1).join('/');

      let existingNode = currentLevel.find((node) => node.name === part);

      if (!existingNode) {
        existingNode = {
          name: part,
          path: currentPath,
          isFolder: !isLast,
          children: isLast ? undefined : [],
          file: isLast ? file : undefined,
        };
        currentLevel.push(existingNode);
      }

      if (!isLast && existingNode.children) {
        currentLevel = existingNode.children;
      }
    }
  }

  return root;
}

function createLivePreviewBundleUrl(
  webRootPath: string,
  indexHtml: string,
  fileMap: Map<string, ExtractedFile>
): string {
  const rootDir = webRootPath.substring(0, webRootPath.lastIndexOf('/') + 1);

  // Substitute local assets (CSS, JS, images) with Blob URLs or inline code
  let parsedHtml = indexHtml;

  // Inline CSS files in web root or replace href
  fileMap.forEach((file, relativePath) => {
    if (file.type === 'css' && file.content) {
      const cssFileName = file.name;
      const cssBlob = new Blob([file.content], { type: 'text/css' });
      const cssUrl = URL.createObjectURL(cssBlob);
      parsedHtml = parsedHtml.replaceAll(`href="${cssFileName}"`, `href="${cssUrl}"`);
      parsedHtml = parsedHtml.replaceAll(`href="./${cssFileName}"`, `href="${cssUrl}"`);
    }

    if (file.type === 'js' && file.content) {
      const jsFileName = file.name;
      const jsBlob = new Blob([file.content], { type: 'application/javascript' });
      const jsUrl = URL.createObjectURL(jsBlob);
      parsedHtml = parsedHtml.replaceAll(`src="${jsFileName}"`, `src="${jsUrl}"`);
      parsedHtml = parsedHtml.replaceAll(`src="./${jsFileName}"`, `src="${jsUrl}"`);
    }

    if (file.type === 'image' && file.blobUrl) {
      const imgFileName = file.name;
      parsedHtml = parsedHtml.replaceAll(`src="${imgFileName}"`, `src="${file.blobUrl}"`);
      parsedHtml = parsedHtml.replaceAll(`src="./${imgFileName}"`, `src="${file.blobUrl}"`);
    }
  });

  const finalBlob = new Blob([parsedHtml], { type: 'text/html' });
  return URL.createObjectURL(finalBlob);
}

export async function downloadSourceZip(app: DecompiledApp): Promise<void> {
  try {
    const zip = new JSZip();

    // Re-bundle clean web assets
    for (const file of app.files) {
      // Strip non-web binary overhead if desired or keep clean structure
      if (file.content) {
        zip.file(file.path, file.content);
      } else if (file.blobUrl) {
        try {
          const response = await fetch(file.blobUrl);
          const blob = await response.blob();
          zip.file(file.path, blob);
        } catch (e) {
          console.warn(`Could not re-fetch blob for ${file.path}`);
        }
      }
    }

    const content = await zip.generateAsync({ type: 'blob' });
    const downloadUrl = URL.createObjectURL(content);

    const a = document.createElement('a');
    a.href = downloadUrl;
    a.download = `${app.fileName.replace(/\.(apk|zip)$/i, '')}_source_code.zip`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(downloadUrl);
  } catch (err) {
    console.error('downloadSourceZip fatal error:', err);
    throw err;
  }
}

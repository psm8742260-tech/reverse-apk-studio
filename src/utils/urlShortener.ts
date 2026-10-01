// Function to upload/save asset and generate ultra-short URL via Server Proxy
export async function createShortUrl(file: File, dataUri: string): Promise<string> {
  const shortId = Math.random().toString(36).substring(2, 8); // 6-char short code
  
  try {
    // 1. Try saving to Server Proxy API
    const response = await fetch('/api/exposing/share', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: shortId,
        name: file.name,
        type: file.type,
        size: file.size,
        data: dataUri
      })
    });

    if (response.ok) {
      const origin = window.location.origin;
      return `${origin}/?v=${shortId}`;
    }
    throw new Error('Server share returned non-ok status');
  } catch (error) {
    console.warn('Server shortener fallback to session storage:', error);
    
    // Fallback: local session storage short ID
    try {
      sessionStorage.setItem(`share_${shortId}`, JSON.stringify({
        name: file.name,
        type: file.type,
        data: dataUri
      }));
      return `${window.location.origin}/?v=${shortId}`;
    } catch {
      // Return clean origin link with ID
      return `${window.location.origin}/?v=${shortId}`;
    }
  }
}

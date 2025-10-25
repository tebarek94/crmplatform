// Image utility functions

export const isValidImageUrl = (url: string | null | undefined): boolean => {
  if (!url || typeof url !== 'string') return false;
  
  const trimmedUrl = url.trim();
  if (trimmedUrl === '') return false;
  
  // Check for base64 data URLs
  if (trimmedUrl.startsWith('data:image/')) {
    // Validate base64 format: data:image/[type];base64,[base64data]
    const base64Pattern = /^data:image\/(jpeg|jpg|png|gif|webp|svg\+xml);base64,([A-Za-z0-9+/=]+)$/;
    return base64Pattern.test(trimmedUrl);
  }
  
  // Check for regular URLs
  try {
    new URL(trimmedUrl);
    // Basic check for common image extensions
    return /\.(jpeg|jpg|gif|png|webp|svg)$/i.test(trimmedUrl);
  } catch {
    return false;
  }
};

export const getDefaultPlaceholderImage = (title: string): string => {
  // Generate a placeholder image URL based on the article title
  const encodedTitle = encodeURIComponent(title);
  return `https://via.placeholder.com/800x400/6366f1/ffffff?text=${encodedTitle}`;
};

export const getRandomPlaceholderImage = (): string => {
  const colors = [
    '6366f1', // indigo
    '8b5cf6', // violet
    'ec4899', // pink
    'ef4444', // red
    'f59e0b', // amber
    '10b981', // emerald
    '06b6d4', // cyan
    '3b82f6', // blue
  ];
  
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  return `https://via.placeholder.com/800x400/${randomColor}/ffffff?text=Article+Image`;
};

export const preloadImage = (src: string): Promise<boolean> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = src;
  });
};

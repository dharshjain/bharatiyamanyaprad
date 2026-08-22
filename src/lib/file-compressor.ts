/**
 * Global File & Image Compressor Utility
 * Automatically compresses images (JPEG, PNG, WebP) and optimizes files before storage upload.
 */

export interface CompressOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number; // 0.1 to 1.0 (default 0.82)
  outputType?: "image/webp" | "image/jpeg" | "image/png";
}

/**
 * Compress an image file using HTML5 Canvas & WebP encoding.
 * Reduces file size significantly (often 60-90% reduction) while preserving high quality.
 */
export async function compressImage(file: File, options: CompressOptions = {}): Promise<File> {
  const { maxWidth = 1920, maxHeight = 1920, quality = 0.82, outputType = "image/webp" } = options;

  // Non-image files pass through directly
  if (!file.type.startsWith("image/")) {
    return file;
  }

  // SVG images do not need canvas rasterization compression
  if (file.type === "image/svg+xml") {
    return file;
  }

  return new Promise((resolve) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(objectUrl);

      let width = img.width;
      let height = img.height;

      // Scale down proportionally if larger than maximum bounds
      if (width > maxWidth || height > maxHeight) {
        if (width / height > maxWidth / maxHeight) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        } else {
          width = Math.round((width * maxHeight) / height);
          height = maxHeight;
        }
      }

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        resolve(file);
        return;
      }

      // Smooth scaling
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            resolve(file);
            return;
          }

          // Only replace if compressed blob is actually smaller than original
          if (blob.size >= file.size) {
            resolve(file);
            return;
          }

          // Determine file extension
          let extension = "webp";
          if (outputType === "image/jpeg") extension = "jpg";
          if (outputType === "image/png") extension = "png";

          const originalBaseName = file.name.substring(0, file.name.lastIndexOf(".")) || file.name;

          const compressedFileName = `${originalBaseName}.${extension}`;

          const compressedFile = new File([blob], compressedFileName, {
            type: outputType,
            lastModified: Date.now(),
          });

          console.log(
            `📦 Compressed [${file.name}]: ${(file.size / 1024).toFixed(
              1,
            )}KB ➔ ${(compressedFile.size / 1024).toFixed(1)}KB (${Math.round(
              (1 - compressedFile.size / file.size) * 100,
            )}% saved)`,
          );

          resolve(compressedFile);
        },
        outputType,
        quality,
      );
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      resolve(file);
    };

    img.src = objectUrl;
  });
}

/**
 * Global entry point for compressing any uploaded file.
 * Handles images with canvas WebP compression and passes through other files safely.
 */
export async function compressFile(file: File, options?: CompressOptions): Promise<File> {
  if (!file) return file;

  try {
    if (file.type.startsWith("image/")) {
      return await compressImage(file, options);
    }
    // Return document/binary file directly if not an image
    return file;
  } catch (err) {
    console.warn("Global compressor fallback to original file:", err);
    return file;
  }
}

export const MAX_UPLOAD_FILE_SIZE = 1024 * 1024; // 2MB

// Follow react-dropzone accepts, prefix: "image/*"
export const allowImageMimeTypes = [
  ".apng", // Animated Portable Network Graphics (APNG)
  ".avif", // AV1 Image File Format (AVIF)
  ".gif", // Graphics Interchange Format (GIF)
  ".jpeg", // Joint Photographic Expert Group image (JPEG),
  ".jpg",
  ".png", // Portable Network Graphics (PNG)
  ".svg", // Scalable Vector Graphics (SVG)
  ".webp", // Web Picture format (WEBP)
];

export enum ProductStatus {
  ACTIVE = "Active",
  INACTIVE = "Inactive",
  DELETED = "Deleted",
}

export const LIMIT_PAGE = [10, 20, 30, 40, 50];

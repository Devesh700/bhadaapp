import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { resolveMediaUrl } from "./media";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      func(...args);
    }, wait);
  };
}

export function mapToCard(p: any) {
    const locationText = [p?.location?.address, p?.location?.city, p?.location?.state].filter(Boolean).join(", ");
    const firstImage = Array.isArray(p?.images) && p.images.length ? resolveMediaUrl(p.images[0]) : undefined;

    const listingType = p?.propertyType === "sale" || p?.propertyType === "rent" ? p.propertyType : "rent";
    const derivedType = p?.propertyType === "commercial" || p?.category === "office" ? "commercial" : "residential";

    const isFurnished =
      typeof p?.specifications?.furnishing === "string"
        ? p.specifications.furnishing.toLowerCase().includes("full")
          ? "fully"
          : p.specifications.furnishing.toLowerCase().includes("semi")
          ? "semi"
          : "unfurnished"
        : "unfurnished";

    return {
      id: String(p?.id ?? p?._id ?? ""),
      title: p?.title ?? "",
      location: locationText,
      price: Number(p?.price ?? 0),
      imageUrl: firstImage,
      bedrooms: Number(p?.specifications?.bedrooms ?? 0),
      bathrooms: Number(p?.specifications?.bathrooms ?? 0),
      area: Number(p?.specifications?.area ?? 0),
      propertyType: derivedType,
      listingType,
      isFurnished,
      tenantPreference: p?.tenantPreference,
      pincode: p?.location?.pincode,
      amenities: Array.isArray(p?.specifications?.amenities) ? p.specifications.amenities : [],
      createdAt: new Date(p?.createdAt ?? Date.now()).getTime(),
    };
  }
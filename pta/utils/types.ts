import type {
  SanityDocument,
  Image,
  ImageAsset,
  ImageCrop,
  ImageHotspot,
} from "@sanity/types";

export interface PtaMember extends SanityDocument {
  name?: string;
  role?: string;
  email?: string;
  phone?: string;
  profilePhoto?: Image & {
    asset: ImageAsset;
    hotspot?: ImageHotspot;
    crop?: ImageCrop;
  };
  memberType?: "staff" | "slt";
}

export interface GalleryImage extends SanityDocument {
  image?: Image & {
    asset: ImageAsset;
    hotspot?: ImageHotspot;
    crop?: ImageCrop;
  };
  alt?: string;
  order?: number;
}

export interface GalleryImage extends SanityDocument {
  image?: Image & {
    asset: ImageAsset;
    hotspot?: ImageHotspot;
    crop?: ImageCrop;
  };
  alt?: string;
  order?: number;
}

export interface Resource extends SanityDocument {
  name?: string;
  description?: string;
  link?: string;
  image?: Image & {
    asset: ImageAsset;
    hotspot?: ImageHotspot;
    crop?: ImageCrop;
  };
  order?: number;
}
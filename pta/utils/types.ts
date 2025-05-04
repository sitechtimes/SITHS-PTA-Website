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

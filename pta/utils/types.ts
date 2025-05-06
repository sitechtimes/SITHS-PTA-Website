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
export interface BlockContent {
  _key: string
  _type: 'block'
  children: Array<{
    _key: string
    _type: 'span'
    marks: string[]
    text: string
  }>
  markDefs: any[]
  style: string
}

export interface HomePageData {
  aboutUs?: BlockContent[];
  activitiesContent?: BlockContent[];
}
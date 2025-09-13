import type { SanityDocument, Image, ImageAsset, ImageCrop, ImageHotspot } from "@sanity/types";

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
  order?: number;
}

export interface BlockContent {
  _key: string;
  _type: "block";
  children: Array<{
    _key: string;
    _type: "span";
    marks: string[];
    text: string;
  }>;
  markDefs: any[];
  style: string;
}

export interface HomePageData {
  aboutUs?: BlockContent[];
  activitiesContent?: BlockContent[];
}

export interface DonationPageData {
  bakeSales?: BlockContent[];
  monetaryDonations?: BlockContent[];
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

export interface JoinUsData extends SanityDocument {
  joinUs: BlockContent[];
};
export interface WebsiteInformation extends SanityDocument {
  _id: string;
  title: string;
  description: string;
  link: string;
  image?: Image & {
    asset: ImageAsset;
    hotspot?: ImageHotspot;
    crop?: ImageCrop;
  };
}

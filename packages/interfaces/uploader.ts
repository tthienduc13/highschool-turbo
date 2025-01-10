export enum HighSchoolAssets {
  Avatar = "HighSchoolAvatar",
  FlashcardContent = "HighSchoolFlashcardContent",
  Subject = "HighSchoolSubject",
  Theory = "HighSchoolTheory",
  NewsContent = "HighSchoolNewsContent",
  NewsThumbnail = "HighSchoolNewsThumbnail",
  GameAvatar = "GameAvatar",
  KetThumbnail = "GameKetThumbnail",
  KetContent = "GameKetContent",
}

export enum ImageResizeMode {
  Crop = "Crop",
  Pad = "Pad",
  BoxPad = "BoxPad",
  Max = "Max",
  Min = "Min",
  Stretch = "Stretch",
  Manual = "Manual",
}

export enum ImageFormat {
  JPG = "jpg",
  PNG = "png",
  GIF = "gif",
  BMP = "bmp",
  TIFF = "tiff",
  WEBP = "webp",
}

export interface UploadImagePayload {
  image: File;
  fileName: string;
  folder: HighSchoolAssets;
  presetName: "avatar" | "thumbnail";
  presetWidth?: number;
  presetHeight?: number;
  typeResize?: ImageResizeMode;
  format?: ImageFormat;
}

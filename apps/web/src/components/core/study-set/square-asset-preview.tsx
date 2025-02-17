/* eslint-disable jsx-a11y/img-redundant-alt */
import { PhotoView } from "../providers/photo-provider/photo-view";

import { resize } from "@/utils/resize-image";

export interface SquareAssetPreviewProps {
  src: string;
  rounded: number;
  size: number;
  disablePointerEvents?: boolean;
}

export const SquareAssetPreview: React.FC<SquareAssetPreviewProps> = ({
  src,
  rounded,
  size,
  disablePointerEvents,
}) => {
  const url = resize({ src, width: 500 });

  return (
    <PhotoView borderRadius={rounded} src={url}>
      <img
        alt="Image preview"
        height={size}
        src={url}
        style={{
          cursor: "zoom-in",
          pointerEvents: disablePointerEvents ? "none" : "all",
          objectFit: "cover",
          width: size,
          height: size,
          minWidth: size,
          borderRadius: rounded,
        }}
        width={size}
      />
    </PhotoView>
  );
};

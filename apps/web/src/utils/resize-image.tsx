const transform = (src: string, transformation: string) => {
  const cloudinaryBase = "https://res.cloudinary.com/";

  if (!src.startsWith(cloudinaryBase)) {
    throw new Error("Invalid Cloudinary URL");
  }

  const [base, ...rest] = src.split("/upload/");

  return `${base}/upload/${transformation}/${rest.join("/")}`;
};

export const resize = ({
  src,
  width,
  height,
}: {
  src: string;
  width?: number;
  height?: number;
}) => {
  // Skip transformation for images from Unsplash
  if (src.includes("unsplash.com")) return src;

  // Build the Cloudinary transformation string
  let transformations = "c_fit";

  if (width) transformations += `,w_${width}`;
  if (height) transformations += `,h_${height}`;

  return transform(src, transformations);
};

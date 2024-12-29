import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import Compressor from "compressorjs";

import { createContext, useContext, useEffect, useRef, useState } from "react";

import Link from "next/link";

import { useDebounceValue } from "@highschool/hooks";
import { useUnsplashQuery } from "@highschool/react-query/queries";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@highschool/ui/components/ui/dialog";
import { Input } from "@highschool/ui/components/ui/input";

import {
  IconAlertCircle,
  IconCloudUpload,
  IconLock,
} from "@tabler/icons-react";

import { Context, editorEventChannel } from "@/events/editor";
import { useDropzone } from "@/hooks/use-drop-zone";

interface SearchImagesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ResultsContextProps {
  data: any;
  onClick: (index: number) => void;
}

const ResultsContext = createContext<ResultsContextProps>({
  data: undefined,
  onClick: () => undefined,
});

export const SearchImagesModal = ({
  isOpen,
  onClose,
}: SearchImagesModalProps) => {
  const [currentContext, setCurrentContext] = useState<Context>();
  const currentContextRef = useRef(currentContext);
  currentContextRef.current = currentContext;

  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounceValue(query, 500);

  const { data, isLoading } = useUnsplashQuery(debouncedQuery);

  const [uploadError, setUploadError] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const fileRef = useRef(file);
  fileRef.current = file;

  const [progress, setProgress] = useState<number | null>(null);

  const reset = () => {
    setFile(null);
    setFileName(null);
    setProgress(null);
  };

  const start = (file: File) => {
    setUploadError(null);
    setFileName(file.name);

    new Compressor(file, {
      quality: 0.8,
      convertSize: 500_000,
      success: (result) => {
        setFile(result as File);
        if (result.size > 5_000_000) {
          setUploadError("File quá to (> 5 MB)");
          reset();
          return;
        }

        editorEventChannel.emit("requestUploadUrl", currentContextRef.current!);
      },
    });
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/png": [".png", ".jpg", ".jpeg", ".gif"],
    },
    maxFiles: 1,
    onDropAccepted: (files) => {
      start(files[0]!);
    },
  });

  useEffect(() => {
    const upload = (jwt?: string) => {
      void (async () => {
        if (!jwt) return;

        const result = (await doUpload(jwt, fileRef.current!)) as boolean;
        if (!result) {
          setUploadError(
            "Something went wrong while uploading. Please try again.",
          );
          reset();
          return;
        }

        editorEventChannel.emit("uploadComplete", currentContextRef.current!);

        reset();
        onClose();
      })();
    };

    editorEventChannel.on("openSearchImages", setCurrentContext);
    editorEventChannel.on("startUpload", upload);
    return () => {
      editorEventChannel.off("openSearchImages", setCurrentContext);
      editorEventChannel.off("startUpload", upload);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const doUpload = async (jwt: string, blob: unknown) => {
    return new Promise((resolve) => {
      const xhr = new XMLHttpRequest();

      // xhr.open(
      //     "PUT",
      //     `${env.NEXT_PUBLIC_CDN_WORKER_ENDPOINT}/terms`,
      //     true
      // );
      xhr.setRequestHeader("Authorization", `Bearer ${jwt}`);

      xhr.upload.addEventListener("progress", (e) => {
        if (e.lengthComputable) {
          const progress = e.loaded / e.total;
          setProgress(progress);
        }
      });
      xhr.addEventListener("loadend", () => {
        resolve(xhr.readyState === 4 && xhr.status === 200);
      });

      xhr.send(blob as XMLHttpRequestBodyInit);
    });
  };

  useEffect(() => {
    const handlePaste = (event: ClipboardEvent) => {
      if (
        document.activeElement !== rootRef.current &&
        document.activeElement !== inputRef.current
      )
        return;

      const getFilesFromClipboardEvent = (event: ClipboardEvent) => {
        const dataTransferItems = event.clipboardData?.items;
        if (!dataTransferItems) return;

        const files = Array.from(dataTransferItems).reduce<File[]>(
          (acc, curr) => {
            const f = curr.getAsFile();
            return f ? [...acc, f] : acc;
          },
          [],
        );

        return files;
      };

      const pastedFiles = getFilesFromClipboardEvent(event);
      if (!pastedFiles?.length) return;

      start(pastedFiles[0]!);
    };

    window.addEventListener("paste", handlePaste);
    return () => {
      window.removeEventListener("paste", handlePaste);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const expanded = !!data || isLoading;
  return (
    <ResultsContext.Provider
      value={{
        data,
        onClick: (index) => {
          const url = data?.response?.results[index]?.urls.small;
          if (!url) return;

          editorEventChannel.emit("imageSelected", {
            context: currentContext!,
            optimisticUrl: url,
            query: debouncedQuery,
            index,
          });

          onClose();
        },
      }}
    >
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="border-none bg-transparent p-0 shadow-none">
          <VisuallyHidden>
            <DialogHeader>
              <DialogTitle>Unsplash</DialogTitle>
            </DialogHeader>
          </VisuallyHidden>
          <VisuallyHidden>
            <DialogDescription>Descritption</DialogDescription>
          </VisuallyHidden>
          <div className="active:scale-97 rounded-xl border-2 border-gray-200 bg-gray-50/40 p-0 shadow-xl backdrop-blur-md transition-transform duration-150 ease-in-out dark:border-gray-700 dark:bg-gray-800/60">
            <div className="px-5 py-4">
              <Input
                ref={inputRef}
                placeholder="Tìm kiếm ảnh"
                className="border-none px-0 !text-xl text-gray-900 placeholder-gray-500 shadow-none focus-visible:ring-0 dark:text-white"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            {expanded && (
              <div
                className={`grid grid-cols-5 gap-2 border-t-2 border-gray-200 p-2 transition-opacity duration-500 dark:border-gray-700 ${expanded ? "opacity-100" : "opacity-0"}`}
              >
                <div className="col-span-2">
                  <Thumbnail index={0} />
                </div>
                <DoubleRow />
                <DoubleRow offset={2} />
                <DoubleRow offset={4} />
              </div>
            )}
          </div>
          <p className="ml-3 mt-3 text-xs text-gray-500 opacity-75">
            Ảnh bởi{" "}
            <Link
              href="https://unsplash.com/?utm_source=quenti&utm_medium=referral"
              className="font-semibold text-gray-600 transition-colors duration-150 ease-in-out hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              Unsplash
            </Link>
          </p>
          <div className="relative mx-6 mt-6 cursor-not-allowed">
            <div
              {...getRootProps()}
              className="group relative w-full cursor-pointer overflow-hidden rounded-xl border-2 border-gray-200 bg-gray-50/40 px-6 py-10 transition-colors duration-200 ease-in-out hover:border-gray-300 dark:border-gray-700 dark:bg-gray-800/30 dark:hover:border-gray-600"
            >
              <div
                className="absolute left-0 top-0 h-full bg-gray-200 opacity-50 transition-[width] duration-700 dark:bg-gray-700"
                style={{ width: `${progress ?? 0 * 100}%` }}
              />
              <input {...getInputProps()} disabled />
              <div className="absolute left-0 top-0 flex items-center gap-1">
                <div className="rounded-full bg-gray-50 p-1 text-blue-600 dark:bg-gray-900 dark:text-blue-200">
                  <div className="rounded-full bg-white p-[4px] shadow-md dark:bg-gray-800/50">
                    <IconLock size={16} />
                  </div>
                </div>
                <p className="text-muted-foreground text-sm">
                  Nâng cấp lên tài khoản Pro
                </p>
              </div>

              {fileName ? (
                <div className="z-10 flex h-[46px] items-center justify-center">
                  <div className="flex items-center space-x-3">
                    <div className="relative text-blue-600 dark:text-blue-400">
                      <UploadDots />
                      <IconCloudUpload className="animate-bounce" />
                    </div>
                    <span className="text-sm font-semibold">{fileName}</span>
                  </div>
                </div>
              ) : (
                <div className="z-10 flex flex-col items-center">
                  <div className="flex items-center space-x-3 text-gray-500 transition-colors duration-200 group-hover:text-gray-700 dark:group-hover:text-gray-300">
                    <IconCloudUpload />
                    <span className="font-semibold">Chọn ảnh của bạn</span>
                  </div>
                  <span className="mt-1 text-xs text-gray-500">
                    Kéo và thả ảnh vào đây
                  </span>
                </div>
              )}
            </div>
            {uploadError && (
              <div className="absolute left-1/2 top-full mt-3 w-full -translate-x-1/2 transform">
                <div className="flex items-center space-x-2 text-red-500 dark:text-red-400">
                  <IconAlertCircle size={16} />
                  <span className="text-sm font-medium">{uploadError}</span>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </ResultsContext.Provider>
  );
};

export function UploadDots() {
  return (
    <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 transform space-x-0 opacity-20">
      <UploadColumn opacity={0.3} transform="translateY(6px)" />
      <UploadColumn opacity={0.7} speed={0.75} />
      <UploadColumn opacity={0.3} transform="translateY(6px)" />
    </div>
  );
}

interface UploadColumnProps {
  speed?: number;
  opacity: number;
  transform?: string;
}

function UploadColumn({ opacity, speed = 1, transform }: UploadColumnProps) {
  return (
    <div className={`flex flex-col space-y-0`} style={{ opacity, transform }}>
      {Array.from({ length: 10 }).map((_, i) => (
        <div key={i} className="p-2">
          <div
            className="animate-upload-dot h-[5px] w-[5px] rounded-full bg-current"
            style={{ animationDuration: `${speed}s` }}
          />
        </div>
      ))}
    </div>
  );
}

interface DoubleRowProps {
  offset?: number;
}

function DoubleRow({ offset = 0 }: DoubleRowProps) {
  return (
    <div>
      <div className="grid h-full gap-2">
        <div>
          <Thumbnail index={1 + offset} />
        </div>
        <div>
          <Thumbnail index={2 + offset} />
        </div>
      </div>
    </div>
  );
}

interface ThumbnailProps {
  index: number;
}

function Thumbnail({ index }: ThumbnailProps) {
  const { data, onClick } = useContext(ResultsContext);

  const image = data?.response?.results[index];

  return (
    <div className="aspect-square h-full w-full overflow-hidden rounded-lg">
      {image && (
        <div
          className="group relative cursor-pointer"
          style={{ backgroundColor: image.color || "transparent" }}
          onClick={(e) => {
            if (e.target instanceof HTMLAnchorElement) return;
            onClick(index);
          }}
        >
          <img
            src={image.urls.small}
            alt={image.alt_description || "Image"}
            className="aspect-square h-full w-full object-cover"
          />
          <div className="absolute bottom-0 left-0 w-full overflow-hidden bg-gradient-to-t from-[hsl(230,21%,11%)] to-transparent px-[7px] py-1 pt-10 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            <div className="w-full overflow-hidden text-ellipsis">
              <Link
                href={`${image.user.links.html}?utm_source=quenti&utm_medium=referral`}
                className="overflow-hidden whitespace-nowrap text-[10px] font-medium text-gray-50"
                target="_blank"
              >
                {image.user.first_name} {image.user.last_name}
              </Link>
            </div>
          </div>
          <div className="pointer-events-none absolute left-0 top-0 h-full w-full bg-white opacity-0 transition-opacity duration-200 group-hover:opacity-10" />
        </div>
      )}
    </div>
  );
}

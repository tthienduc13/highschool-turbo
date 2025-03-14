import type { Editor } from "@tiptap/react";

import * as React from "react";
import { Button } from "@highschool/ui/components/ui/button";
import { Label } from "@highschool/ui/components/ui/label";
import { Input } from "@highschool/ui/components/ui/input";

interface ImageEditBlockProps {
  editor: Editor;
  close: () => void;
}

export const ImageEditBlock: React.FC<ImageEditBlockProps> = ({
  editor,
  close,
}) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [link, setLink] = React.useState("");

  const handleClick = React.useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFile = React.useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;

      if (!files?.length) return;

      const insertImages = async () => {
        const contentBucket = [];
        const filesArray = Array.from(files);

        for (const file of filesArray) {
          contentBucket.push({ src: file });
        }

        editor.commands.setImages(contentBucket);
      };

      await insertImages();
      close();
    },
    [editor, close],
  );

  const handleSubmit = React.useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      e.stopPropagation();

      if (link) {
        editor.commands.setImages([{ src: link }]);
        close();
      }
    },
    [editor, link, close],
  );

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="space-y-1">
        <Label htmlFor="image-link">Attach an image link</Label>
        <div className="flex">
          <Input
            required
            className="grow"
            id="image-link"
            placeholder="https://example.com"
            type="url"
            value={link}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setLink(e.target.value)
            }
          />
          <Button className="ml-2" type="submit">
            Submit
          </Button>
        </div>
      </div>
      <Button className="w-full" type="button" onClick={handleClick}>
        Upload from your computer
      </Button>
      <input
        ref={fileInputRef}
        multiple
        accept="image/*"
        className="hidden"
        type="file"
        onChange={handleFile}
      />
    </form>
  );
};

export default ImageEditBlock;

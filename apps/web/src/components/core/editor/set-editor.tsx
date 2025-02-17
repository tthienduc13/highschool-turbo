"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

import { EditorGlobalStyles } from "../common/editor-global-style";
import { PhotoViewProvider } from "../providers/photo-provider";

import { ButtonArea } from "./button-area";
import { TermsList } from "./term/terms-list";
import { TitleProperties } from "./title-properties";
import { TopBar } from "./top-bar";

import { useSetEditorContext } from "@/stores/use-set-editor-store";
import { editorEventChannel } from "@/events/editor";

const ImportTermsModal = dynamic(
  () => import("./import-term-modal").then((mod) => mod.ImportTermModal),
  { ssr: false },
);

const SearchImagesModal = dynamic(
  () =>
    import("../study-set/search-image-modal").then(
      (mod) => mod.SearchImagesModal,
    ),
  { ssr: false },
);

export const SetEditor = () => {
  const [importOpen, setImportOpen] = useState(false);
  const [searchImagesOpen, setSearchImagesOpen] = useState(false);
  const bulkAddTerms = useSetEditorContext((s) => s.bulkAddTerms);

  useEffect(() => {
    const open = () => setSearchImagesOpen(true);

    editorEventChannel.on("openSearchImages", open);

    return () => {
      editorEventChannel.off("openSearchImages", open);
    };
  }, []);

  return (
    <PhotoViewProvider>
      <div className="relative flex flex-col gap-8">
        <ImportTermsModal
          isOpen={importOpen}
          onClose={() => {
            setImportOpen(false);
          }}
          onImport={(terms) => {
            bulkAddTerms(terms);
            setImportOpen(false);
          }}
        />
        <SearchImagesModal
          isOpen={searchImagesOpen}
          onClose={() => setSearchImagesOpen(false)}
        />
        <TopBar />
        <TitleProperties />
        <ButtonArea onImportOpen={() => setImportOpen(true)} />
        <EditorGlobalStyles />
        <TermsList />
      </div>
    </PhotoViewProvider>
  );
};

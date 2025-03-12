"use client";

import { useState } from "react";
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import { Card, CardContent } from "@highschool/ui/components/ui/card";
import { Button } from "@highschool/ui/components/ui/button";
import { Input } from "@highschool/ui/components/ui/input";
import {
  IconChevronLeft,
  IconChevronRight,
  IconFileText,
  IconRotate,
  IconZoomIn,
  IconZoomOut,
} from "@tabler/icons-react";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PDFViewerProps {
  pdfUrl: string;
}

export default function PDFViewer({ pdfUrl }: PDFViewerProps) {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.0);
  const [rotation, setRotation] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setIsLoading(false);
    setError(null);
  }

  function onDocumentLoadError(err: Error) {
    console.error("Error loading PDF:", err);
    setError(`Failed to load PDF document: ${err.message}`);
    setIsLoading(false);
  }

  function changePage(offset: number) {
    setPageNumber((prevPageNumber) => {
      const newPageNumber = prevPageNumber + offset;

      return newPageNumber >= 1 && newPageNumber <= (numPages || 1)
        ? newPageNumber
        : prevPageNumber;
    });
  }

  function changeScale(delta: number) {
    setScale((prevScale) => {
      const newScale = prevScale + delta;

      return newScale >= 0.5 && newScale <= 2.5 ? newScale : prevScale;
    });
  }

  function rotateDocument() {
    setRotation((prevRotation) => (prevRotation + 90) % 360);
  }

  // If there's an error or we're still loading, show a fallback UI
  if (error) {
    return (
      <div className="flex h-full flex-col">
        <div className="bg-muted flex items-center justify-between border-b p-2">
          <span className="text-sm font-medium">PDF Viewer</span>
        </div>
        <div className="bg-muted-foreground/10 flex flex-1 items-center justify-center overflow-auto p-6">
          <Card className="w-full max-w-md">
            <CardContent className="pt-6">
              {/* <Alert variant="destructive">
                <AlertCircle className="size-4" />
                <AlertTitle>Error loading PDF</AlertTitle>
                <AlertDescription>
                  {error}
                  <div className="mt-2 text-sm">
                    Please check that the PDF URL is correct and accessible. If
                    you're using a secure URL, make sure it allows cross-origin
                    requests.
                  </div>
                </AlertDescription>
              </Alert> */}

              <div className="mt-6 flex justify-center">
                <div className="text-muted-foreground flex flex-col items-center">
                  <IconFileText className="mb-2 size-16" />
                  <p className="text-sm">
                    Try using a different PDF file or check your network
                    connection.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      <div className="bg-muted flex items-center justify-between border-b p-2">
        <div className="flex items-center gap-2">
          <Button
            disabled={pageNumber <= 1}
            size="icon"
            variant="outline"
            onClick={() => changePage(-1)}
          >
            <IconChevronLeft className="size-4" />
          </Button>

          <div className="flex items-center gap-2">
            <Input
              className="w-16 text-center"
              max={numPages || 1}
              min={1}
              type="number"
              value={pageNumber}
              onChange={(e) => {
                const value = Number.parseInt(e.target.value);

                if (value >= 1 && value <= (numPages || 1)) {
                  setPageNumber(value);
                }
              }}
            />
            <span className="text-sm">/ {numPages || "-"}</span>
          </div>

          <Button
            disabled={numPages === null || pageNumber >= numPages}
            size="icon"
            variant="outline"
            onClick={() => changePage(1)}
          >
            <IconChevronRight className="size-4" />
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Button
            disabled={scale <= 0.5}
            size="icon"
            variant="outline"
            onClick={() => changeScale(-0.1)}
          >
            <IconZoomOut className="size-4" />
          </Button>

          <span className="w-16 text-center text-sm">
            {Math.round(scale * 100)}%
          </span>

          <Button
            disabled={scale >= 2.5}
            size="icon"
            variant="outline"
            onClick={() => changeScale(0.1)}
          >
            <IconZoomIn className="size-4" />
          </Button>

          <Button size="icon" variant="outline" onClick={rotateDocument}>
            <IconRotate className="size-4" />
          </Button>
        </div>
      </div>

      <div className="bg-muted-foreground/10 flex flex-1 items-center justify-center overflow-auto">
        {isLoading && (
          <div className="flex flex-col items-center justify-center p-8">
            <div className="border-primary size-8 animate-spin rounded-full border-4 border-t-transparent" />
            <p className="text-muted-foreground mt-2 text-sm">Loading PDF...</p>
          </div>
        )}

        <Document
          className="pdf-document"
          file={pdfUrl}
          loading={null}
          options={{
            cMapUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/cmaps/`,
            cMapPacked: true,
            standardFontDataUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/standard_fonts/`,
          }}
          onLoadError={onDocumentLoadError}
          onLoadSuccess={onDocumentLoadSuccess}
        >
          <Page
            className="shadow-lg"
            loading={
              <div className="flex h-[600px] w-[400px] items-center justify-center">
                <div className="border-primary size-8 animate-spin rounded-full border-4 border-t-transparent" />
              </div>
            }
            pageNumber={pageNumber}
            renderAnnotationLayer={false}
            renderTextLayer={false}
            rotate={rotation}
            scale={scale}
          />
        </Document>
      </div>
    </div>
  );
}

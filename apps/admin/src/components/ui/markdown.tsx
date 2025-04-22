/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/heading-has-content */
"use client";
import { cn } from "@highschool/ui/lib/utils";
import ReactMarkdown from "react-markdown";

interface FormattedContentProps {
    content: string;
    className?: string;
}

export function FormattedContent({
    content,
    className,
}: FormattedContentProps) {
    return (
        <div
            className={cn("prose prose-sm dark:prose-invert max-w-none", className)}
        >
            <ReactMarkdown
                components={{
                    h1: ({ node, ...props }) => (
                        <h1 className="mb-4 mt-6 text-2xl font-bold" {...props} />
                    ),
                    h2: ({ node, ...props }) => (
                        <h2 className="mb-3 mt-5 text-xl font-bold" {...props} />
                    ),
                    h3: ({ node, ...props }) => (
                        <h3 className="mb-2 mt-4 text-lg font-bold" {...props} />
                    ),
                    h4: ({ node, ...props }) => (
                        <h4 className="mb-2 mt-3 text-base font-bold" {...props} />
                    ),
                    p: ({ node, ...props }) => <p className="my-2" {...props} />,
                    ul: ({ node, ...props }) => (
                        <ul className="my-2 list-disc pl-6" {...props} />
                    ),
                    ol: ({ node, ...props }) => (
                        <ol className="my-2 list-decimal pl-6" {...props} />
                    ),
                    li: ({ node, ...props }) => <li className="my-1" {...props} />,
                    a: ({ node, href, ...props }) => (
                        <a
                            className="text-primary hover:underline"
                            href={href}
                            rel="noopener noreferrer"
                            target="_blank"
                            {...props}
                        />
                    ),
                    strong: ({ node, ...props }) => (
                        <strong className="font-bold" {...props} />
                    ),
                    em: ({ node, ...props }) => <em className="italic" {...props} />,
                    code: ({ node, ...props }) => (
                        <code className="bg-muted rounded px-1 py-0.5 text-sm" {...props} />
                    ),
                    pre: ({ node, ...props }) => (
                        <pre
                            className="bg-muted my-4 overflow-x-auto rounded-md p-4"
                            {...props}
                        />
                    ),
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
}

"use client";

import * as React from "react";
import { ArrowLeftIcon, CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { Button, type ButtonProps } from "@highschool/ui/components/ui/button";
import { Checkbox } from "@highschool/ui/components/ui/checkbox";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@highschool/ui/components/ui/command";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@highschool/ui/components/ui/dialog";
import { Label } from "@highschool/ui/components/ui/label";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@highschool/ui/components/ui/popover";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@highschool/ui/components/ui/table";
import { IconFileUpload } from "@tabler/icons-react";
import { cn } from "@highschool/ui/lib/utils";

import { FileUploader } from "./file-uploader";

import { useParseCsv } from "@/hooks/use-parse-csv";
// import { FileUploader } from "@/components/file-uploader";

interface CsvImporterProps
    extends React.ComponentPropsWithoutRef<typeof DialogTrigger>,
    ButtonProps {
    /**
     * Array of field mappings defining the imported data structure.
     * Each includes a label, value, and optional required flag.
     * @example fields={[{ label: 'Name', value: 'name', required: true }, { label: 'Email', value: 'email' }]}
     */
    fields: {
        /**
         * Field display label shown to the user.
         * @example "Name"
         */
        label: string;

        /**
         * Key identifying the field in the imported data.
         * @example "name"
         */
        value: string;

        /**
         * Optional flag indicating if the field is required.
         * Required fields cannot be unchecked during mapping.
         * @default false
         * @example true
         */
        required?: boolean;
    }[];

    /**
     * Callback function called on data import.
     * Receives an array of records as key-value pairs.
     * @example onImport={(data) => console.log(data)}
     */
    onImport: (data: Record<string, unknown>[]) => void;
}

export function CsvImporter({
    fields,
    onImport,
    className,
    ...props
}: CsvImporterProps) {
    const [open, setOpen] = React.useState(false);
    const [step, setStep] = React.useState<"upload" | "map">("upload");
    const {
        data,
        fieldMappings,
        onParse,
        onFieldChange,
        onFieldToggle,
        onFieldsReset,
        getSanitizedData,
    } = useParseCsv({ fields });

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className={cn("w-fit", className)} variant="outline" {...props}>
                    <IconFileUpload />
                    Import CSV
                </Button>
            </DialogTrigger>
            {step === "upload" ? (
                <DialogContent className="p-8 sm:max-w-xl">
                    <DialogHeader>
                        <DialogTitle>Upload CSV</DialogTitle>
                        <DialogDescription>
                            Drag and drop your files here or click to browse.
                        </DialogDescription>
                    </DialogHeader>
                    <FileUploader
                        accept={{ "text/csv": [] }}
                        maxFileCount={1}
                        maxSize={4 * 1024 * 1024}
                        multiple={false}
                        onValueChange={(files) => {
                            const file = files[0];

                            if (!file) return;

                            onParse({ file, limit: 2000 });

                            setStep("map");
                        }}
                    />
                </DialogContent>
            ) : (
                <DialogContent className="overflow-hidden p-8 sm:max-w-6xl">
                    <div className="flex flex-col items-center gap-2 sm:flex-row">
                        <DialogHeader className="flex-1">
                            <DialogTitle>Map fields</DialogTitle>
                            <DialogDescription>
                                Map the CSV fields to the corresponding table fields.
                            </DialogDescription>
                        </DialogHeader>
                        <Button
                            className="w-full sm:w-fit"
                            variant="outline"
                            onClick={onFieldsReset}
                        >
                            Reset
                        </Button>
                    </div>
                    <div className="grid h-[26.25rem] w-full overflow-hidden rounded-md border">
                        <Table className="border-b">
                            <TableHeader className="sticky top-0 z-10 bg-background shadow">
                                <TableRow className="bg-muted/50">
                                    {fields.map((field) => (
                                        <PreviewTableHead
                                            key={field.value}
                                            className="border-r"
                                            currentFieldMapping={fieldMappings.current[field.value]}
                                            field={field}
                                            originalFieldMappings={fieldMappings.original}
                                            onFieldChange={(f) => {
                                                onFieldChange({
                                                    oldValue: f.value,
                                                    newValue: field.value,
                                                });
                                            }}
                                            onFieldToggle={onFieldToggle}
                                        />
                                    ))}
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {data.map((row, i) => (
                                    <TableRow key={i} className="h-10">
                                        {fields.map((field) => (
                                            <TableCell
                                                key={field.value}
                                                className="border-r last:border-r-0"
                                            >
                                                <span className="line-clamp-1">
                                                    {String(row[field.value] ?? "")}
                                                </span>
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                    <DialogFooter className="gap-2 sm:space-x-0">
                        <Button variant="outline" onClick={() => setStep("upload")}>
                            Back
                        </Button>
                        <Button
                            onClick={async () => {
                                await new Promise((resolve) => setTimeout(resolve, 100));
                                onImport(getSanitizedData({ data }));
                                setOpen(false);
                                setStep("upload");
                            }}
                        >
                            Import
                        </Button>
                    </DialogFooter>
                </DialogContent>
            )}
        </Dialog>
    );
}

interface PreviewTableHeadProps
    extends React.ThHTMLAttributes<HTMLTableCellElement> {
    field: { label: string; value: string; required?: boolean };
    onFieldChange: (props: { value: string; required?: boolean }) => void;
    onFieldToggle: (props: { value: string; checked: boolean }) => void;
    currentFieldMapping: string | undefined;
    originalFieldMappings: Record<string, string | undefined>;
}

function PreviewTableHead({
    field,
    onFieldChange,
    onFieldToggle,
    currentFieldMapping,
    originalFieldMappings,
    className,
    ...props
}: PreviewTableHeadProps) {
    const id = React.useId();
    const [open, setOpen] = React.useState(false);

    return (
        <TableHead className={cn("whitespace-nowrap py-2", className)} {...props}>
            <div className="flex items-center gap-4 pr-1.5">
                <div className="flex items-center gap-2">
                    <Checkbox
                        defaultChecked
                        disabled={field.required}
                        id={`${id}-${field.value}`}
                        onCheckedChange={(checked) => {
                            onFieldToggle({
                                value: field.value,
                                checked: !!checked,
                            });
                        }}
                    />
                    <Label className="truncate" htmlFor={`${id}-${field.value}`}>
                        {field.label}
                    </Label>
                </div>
                <ArrowLeftIcon aria-hidden="true" className="size-4" />
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            aria-expanded={open}
                            className="w-48 justify-between"
                            role="combobox"
                            size="sm"
                            variant="outline"
                        >
                            {currentFieldMapping || "Select field..."}
                            <CaretSortIcon className="ml-2 size-4 shrink-0 opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
                        <Command>
                            <CommandInput placeholder="Search field..." />
                            <CommandEmpty>No field found.</CommandEmpty>
                            <CommandList>
                                <CommandGroup>
                                    {[...new Set(Object.values(originalFieldMappings))].map(
                                        (fm) => (
                                            <CommandItem
                                                key={fm}
                                                value={fm}
                                                onSelect={() => {
                                                    onFieldChange({
                                                        value: fm ?? "",
                                                    });
                                                    setOpen(false);
                                                }}
                                            >
                                                <CheckIcon
                                                    className={cn(
                                                        "mr-2 size-4",
                                                        currentFieldMapping === fm
                                                            ? "opacity-100"
                                                            : "opacity-0",
                                                    )}
                                                />
                                                <span className="line-clamp-1">{fm}</span>
                                            </CommandItem>
                                        ),
                                    )}
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </PopoverContent>
                </Popover>
            </div>
        </TableHead>
    );
}

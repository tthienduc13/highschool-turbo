import {
    IconColorPicker,
    IconSquareToggleHorizontal,
    IconTable,
    IconTableColumn,
    IconSpacingVertical,
    IconSpacingHorizontal,
    IconColumns2,
    IconColumns3,
    IconLayoutColumns,
    IconTablePlus,
    IconTableMinus,
} from "@tabler/icons-react";
import { Editor } from "@tiptap/core";
import React from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@highschool/ui/components/ui/dropdown-menu";

import ToolbarButton from "../../core/toolbar-button";

export interface TableBarProps {
    editor: Editor | null;
}

export const TableBar: React.FC<TableBarProps> = ({ editor }) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <ToolbarButton aria-label="Table" tooltip="Table" variant="default">
                    <IconTable size={18} />
                </ToolbarButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>Format Table</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup className="h-[50vh] overflow-y-auto">
                    <DropdownMenuItem
                        className="px-4 py-3"
                        onClick={() =>
                            editor
                                ?.chain()
                                .focus()
                                .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
                                .run()
                        }
                    >
                        <div className="flex items-center">
                            <IconTable size={18} />
                            <p className="ml-4">Insert table</p>
                        </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        className="px-4 py-3"
                        disabled={!editor?.can().addColumnBefore()}
                        onClick={() => editor?.chain().focus().addColumnBefore().run()}
                    >
                        <div className="flex items-center">
                            <IconColumns2 size={18} />
                            <p className="ml-4">Add column before</p>
                        </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        className="px-4 py-3"
                        disabled={!editor?.can().addColumnAfter()}
                        onClick={() => editor?.chain().focus().addColumnAfter().run()}
                    >
                        <div className="flex items-center">
                            <IconColumns3 size={18} />
                            <p className="ml-4">Add column after</p>
                        </div>
                    </DropdownMenuItem>

                    <DropdownMenuItem
                        className="px-4 py-3"
                        disabled={!editor?.can().deleteColumn()}
                        onClick={() => editor?.chain().focus().deleteColumn().run()}
                    >
                        <div className="flex items-center">
                            <IconSpacingVertical size={18} />
                            <p className="ml-4">Delete column</p>
                        </div>
                    </DropdownMenuItem>

                    <DropdownMenuItem
                        className="px-4 py-3"
                        disabled={!editor?.can().addRowBefore()}
                        onClick={() => editor?.chain().focus().addRowBefore().run()}
                    >
                        <div className="flex items-center">
                            <IconLayoutColumns size={18} />
                            <p className="ml-4">Add row before</p>
                        </div>
                    </DropdownMenuItem>

                    <DropdownMenuItem
                        className="px-4 py-3"
                        disabled={!editor?.can().addRowAfter()}
                        onClick={() => editor?.chain().focus().addRowAfter().run()}
                    >
                        <div className="flex items-center">
                            <IconLayoutColumns size={18} />
                            <p className="ml-4">Add row after</p>
                        </div>
                    </DropdownMenuItem>

                    <DropdownMenuItem
                        className="px-4 py-3"
                        disabled={!editor?.can().deleteRow()}
                        onClick={() => editor?.chain().focus().deleteRow().run()}
                    >
                        <div className="flex items-center">
                            <IconSpacingHorizontal size={18} />
                            <p className="ml-4">Delete row</p>
                        </div>
                    </DropdownMenuItem>

                    <DropdownMenuItem
                        className="px-4 py-3"
                        disabled={!editor?.can().mergeCells()}
                        onClick={() => editor?.chain().focus().mergeCells().run()}
                    >
                        <div className="flex items-center">
                            <IconTablePlus size={18} />
                            <p className="ml-4">Merge cells</p>
                        </div>
                    </DropdownMenuItem>

                    <DropdownMenuItem
                        className="px-4 py-3"
                        disabled={!editor?.can().splitCell()}
                        onClick={() => editor?.chain().focus().splitCell().run()}
                    >
                        <div className="flex items-center">
                            <IconTableMinus size={18} />
                            <p className="ml-4">Split cell</p>
                        </div>
                    </DropdownMenuItem>

                    <DropdownMenuItem
                        className="px-4 py-3"
                        disabled={!editor?.can().toggleHeaderColumn()}
                        onClick={() => editor?.chain().focus().toggleHeaderColumn().run()}
                    >
                        <div className="flex items-center">
                            <IconTableColumn size={18} />
                            <p className="ml-4">Toggle header column</p>
                        </div>
                    </DropdownMenuItem>

                    <DropdownMenuItem
                        className="px-4 py-3"
                        disabled={!editor?.can().toggleHeaderRow()}
                        onClick={() => editor?.chain().focus().toggleHeaderRow().run()}
                    >
                        <div className="flex items-center">
                            <IconSquareToggleHorizontal size={18} />
                            <p className="ml-4">Toggle header row</p>
                        </div>
                    </DropdownMenuItem>

                    <DropdownMenuItem
                        className="px-4 py-3"
                        disabled={!editor?.can().toggleHeaderCell()}
                        onClick={() => editor?.chain().focus().toggleHeaderCell().run()}
                    >
                        <div className="flex items-center">
                            <IconColorPicker size={18} />
                            <p className="ml-4">Toggle header cell</p>
                        </div>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

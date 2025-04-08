import React from "react";
import { Textarea, TextareaProps } from "@highschool/ui/components/ui/textarea";
import { omit } from "lodash";

interface AutoResizeTextareaProps extends TextareaProps {
  allowTab: boolean;
}

export const ImportTermTextArea = React.forwardRef<
  HTMLTextAreaElement,
  AutoResizeTextareaProps
>(function AutoResizeInternal(props: AutoResizeTextareaProps, ref) {
  const spaces = 4;
  const [text, setText] = React.useState<{
    value: string;
    caret: number;
    target: (EventTarget & HTMLTextAreaElement) | null;
  }>({
    value: "",
    caret: -1,
    target: null,
  });

  React.useEffect(() => {
    if (text.caret >= 0 && text.target) {
      text.target.setSelectionRange(text.caret + spaces, text.caret + spaces);
    }
  }, [text, spaces]);

  const handleTab = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();

      const content = e.currentTarget.value;
      const caret = e.currentTarget.selectionStart;
      const newText =
        content.substring(0, caret) + "\t" + content.substring(caret);

      setText({ value: newText, caret: caret, target: e.currentTarget });
    }
  };

  const handleText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText({ value: e.target.value, caret: -1, target: e.target });
    props.onChange?.(e);
  };

  const onKeyDownHandler = props.allowTab ? handleTab : props.onKeyDown;
  const onChangeHandler = props.allowTab ? handleText : props.onChange;
  const value = props.allowTab ? text.value : props.value;

  return (
    <Textarea
      ref={ref}
      className="min-h-[100px]"
      {...omit(props, ["allowTab"])}
      value={value}
      onChange={onChangeHandler}
      onKeyDown={onKeyDownHandler}
    />
  );
});

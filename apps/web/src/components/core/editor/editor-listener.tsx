"use client";

import { shallow } from "zustand/shallow";

import React, { useCallback, useContext, useEffect } from "react";

import { SetEditorStoreContext } from "@/stores/use-set-editor-store";

export const EditorListener = () => {
  const store = useContext(SetEditorStoreContext)!;

  const propertiesSaveHandler = useCallback(() => {
    store.getState().onSubscribeDelegate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    store.subscribe(
      (s) => [s.title, s.description, s.courseId, s.visibility],
      propertiesSaveHandler,
      {
        equalityFn: shallow,
      },
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <></>;
};

import React from "react";

import { AssignmentForm } from "./form";

import { Container } from "@/components/core/layouts/container";

function CreateAssignmentModule() {
  return (
    <Container
      className="max-w-6xl  rounded-lg border-2 border-gray-200 bg-white p-5 dark:border-gray-700"
      maxWidth="6xl"
    >
      <AssignmentForm />
    </Container>
  );
}

export default CreateAssignmentModule;

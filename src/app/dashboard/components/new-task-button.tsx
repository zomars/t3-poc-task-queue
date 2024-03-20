"use client";
import { Button } from "~/components/ui/button";
import { createTask } from "../actions";

const NewTaskButton = () => {
  return (
    <Button
      onClick={async () => {
        await createTask();
      }}
    >
      Create Task
    </Button>
  );
};

export default NewTaskButton;

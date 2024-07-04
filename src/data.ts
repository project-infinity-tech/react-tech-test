import { CSSProperties } from "react";

export type DBComponent = {
  id: string;
  tag: string;
  content?: { type: string; value: string } | DBComponent[];
  parentId?: string;
  style?: CSSProperties;
};

// Imagine this is stored as rows / documents in a remote database...
const database: Record<string, DBComponent> = {
  comp1: {
    id: "comp1",
    tag: "h1",
    content: {
      type: "text",
      value: "Hello",
    },
    parentId: "comp3",
  },
  comp2: {
    id: "comp2",
    tag: "h2",
    content: {
      type: "text",
      value: "Database!",
    },
    style: {
      fontStyle: "italic",
    },
    parentId: "comp3",
  },
  comp3: {
    id: "comp3",
    tag: "div",
    style: {
      border: "1px dashed black",
    },
  },
};

// And this is our function for querying them
export const fetchComponents = async (taskId: string) => {
  if (taskId === "task-1") {
    return [database.comp1, database.comp2];
  }

  if (taskId === "task-2") {
    return [database.comp1, database.comp2, database.comp3];
  }

  throw new Error("Task not found");
};

export const fetchData = (taskId: string, artificialDelay: number) => {
  let status = "pending";
  let result: DBComponent[] = [];

  let suspender = new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      if (taskId === "task-1") {
        result = [database.comp1, database.comp2];
      } else if (taskId === "task-2") {
        result = [database.comp1, database.comp2, database.comp3];
      } else {
        status = "error";
        reject();
      }

      status = "success";
      resolve();
    }, artificialDelay);
  });

  return {
    read() {
      if (status === "pending") {
        throw suspender;
      } else if (status === "error") {
        throw result;
      } else if (status === "success") {
        return result;
      }
    },
  };
};

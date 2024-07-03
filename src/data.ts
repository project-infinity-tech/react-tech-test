import { CSSProperties } from "react";

// Imagine this is stored as rows / documents in a remote database...
const database = {
  comp1: {
    id: 'comp1',
    tag: 'h1',
    content: {
      type: 'text',
      value: 'Hello',
    },
  },
  comp2: {
    id: 'comp2',
    tag: 'h2',
    content: {
      type: 'text',
      value: 'Database!',
    },
    style: {
      fontStyle: 'italic',
    } as CSSProperties,
  },
  comp3: {
    id: 'comp3',
    tag: 'div',
    style: {
      border: '1px dashed black',
    } as CSSProperties,
    content: '...'
  }
}

// And this is our function for querying them
export const fetchComponents = async (taskId: string) => {
  if (taskId === 'task-1') {
    return [
      database.comp1,
      database.comp2,
    ];
  }

  if (taskId === 'task-2') {
    return [
      database.comp1,
      database.comp2,
      database.comp3,
    ];
  }

  throw new Error('Task not found');
}

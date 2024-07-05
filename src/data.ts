import { CSSProperties } from "react";

export type SerializedComponent = {
  id: string,
  tag: string,
  content?: string,
  style?: CSSProperties,
}

// Imagine this is stored as rows / documents in a remote database...
const database = {
  comp1: {
    id: 'comp1',
    tag: 'h1',
    content: 'Hello',
  },
  comp2: {
    id: 'comp2',
    tag: 'h2',
    content: 'Database!',
    style: {
      fontStyle: 'italic',
    }
  },

  comp3: {
    id: 'comp3',
    tag: 'div',
    style: {
      border: '1px dashed black',
    },
  }
}

// And this is our function for querying them from the remote database
export const fetchComponents = async (taskId: string): Promise<SerializedComponent[]> => {
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

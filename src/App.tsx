import React, { CSSProperties, FC } from 'react';
import { fetchComponents } from './data';

const Component: FC<{ tag: string, content: string, style?: CSSProperties }> = ({ tag, content, ...props }) => {
  return React.createElement(tag, props, [
    content,
  ]);
};

function App() {
  // TODO this should maybe fetch some data from our database...?
  const data = fetchComponents("task-1");

  return (
    <div>
      <Component tag="h1" content="Hello" />
      <Component tag="h2" content="Static" style={{ fontStyle: "italic" }} />
    </div>
  );
}

export default App;

import React, { CSSProperties, FC, Suspense } from "react";
import { DBComponent, fetchData } from "./data";
const resource = fetchData("task-2", 2000);

const Component: FC<{
  tag: string;
  content?: DBComponent["content"];
  style?: CSSProperties;
}> = ({ tag, content, ...props }) => {
  if (!content) {
    return null;
  }

  if ("type" in content) {
    return React.createElement(tag, props, [content.value]);
  }

  return React.createElement(
    tag,
    props,
    content.map((props) =>
      React.createElement(Component, { ...props, key: props.id })
    )
  );
};

function Components() {
  const data = resource.read() ?? [];

  const componentTree = data.reduce<DBComponent[]>((acc, component) => {
    if (component.parentId) {
      const parent = data.find((c) => c.id === component.parentId);

      if (!parent) {
        if (!acc.find((c) => c.id === component.id)) {
          return acc.concat({ ...component });
        } else {
          return acc;
        }
      }

      let parentIndex = acc.findIndex((c) => c.id === parent.id);

      if (parentIndex === -1) {
        acc.push({ ...parent });
        parentIndex = acc.length - 1;
      }

      const parentComponent = acc[parentIndex];

      if (parentComponent.content && Array.isArray(parentComponent.content)) {
        parentComponent.content.push(component);
      } else {
        parentComponent.content = [component];
      }
      return acc.filter((c) => c.id !== component.id);
    } else {
      if (!acc.find((c) => c.id === component.id)) {
        return acc.concat({ ...component });
      } else {
        return acc;
      }
    }
  }, []);

  return (
    <div>
      {componentTree.map(({ content, ...props }) => {
        return <Component key={props.id} content={content} {...props} />;
      })}
    </div>
  );
}

function App() {
  return (
    <Suspense fallback={<p>Loading.....</p>}>
      <Components />
    </Suspense>
  );
}
export default App;

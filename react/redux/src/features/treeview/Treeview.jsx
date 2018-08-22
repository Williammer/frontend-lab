import React from 'react';
import TreeviewNode from '../../components/TreeviewNode';

const treeData = [
  {
    content: '1 layer',
    children: {
      content: '2 layer',
      children: [
        {
          content: '3.1 layer',
          children: [{ content: '4.1 layer' }, { content: '4.2 layer' }],
        },
        { content: '3.2 layer' },
        { content: '3.3 layer' },
      ],
    },
  },
];

function renderTreeviewNode({ children, ...props }) {
  return (
    <TreeviewNode {...props}>
      {!children
        ? null
        : Array.isArray(children)
          ? children.map(child => renderTreeviewNode(child))
          : renderTreeviewNode(children)}
    </TreeviewNode>
  );
}

export default function TreeviewDemo() {
  return <div>{treeData.map(root => renderTreeviewNode(root))}</div>;
}

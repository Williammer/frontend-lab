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

function renderTreeviewNode(nodeData) {
  const data = Array.isArray(nodeData) ? nodeData : [nodeData];
  return (
    <React.Fragment>
      {data.map(({ children, ...props }, index) => (
        <TreeviewNode {...props} key={index}>
          {children ? renderTreeviewNode(children) : null}
        </TreeviewNode>
      ))}
    </React.Fragment>
  );
}

export default function TreeviewDemo() {
  return <React.Fragment>{renderTreeviewNode(treeData)}</React.Fragment>;
}

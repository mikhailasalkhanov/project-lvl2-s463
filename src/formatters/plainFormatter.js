const formatValue = (value) => {
  if (value instanceof Object) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return value;
};

const dispatcher = {
  removed: (node, pathToNode) => `Property '${pathToNode}' was removed`,
  added: (node, pathToNode) => `Property '${pathToNode}' was added with value: ${formatValue(node.newValue)}`,
  updated: (node, pathToNode) => `Property '${pathToNode}' was updated. From ${formatValue(node.oldValue)} to ${formatValue(node.newValue)}`,
};

const iter = (tree, pathToNode = '') => tree.filter(node => node.type !== 'unchanged').map((node) => {
  if (node.type === 'nested') {
    return iter(node.children, `${pathToNode}${node.name}.`);
  }
  return dispatcher[node.type](node, `${pathToNode}${node.name}`);
}).join('\n');

export default iter;

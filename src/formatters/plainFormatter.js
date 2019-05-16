const formatValue = (value) => {
  if (value instanceof Object) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return value;
};

const iter = (tree, path = '') => {
  const dispatcher = {
    removed: nodePath => `Property '${nodePath}' was removed`,
    added: (nodePath, node) => `Property '${nodePath}' was added with value: ${formatValue(node.newValue)}`,
    updated: (nodePath, node) => `Property '${nodePath}' was updated. From ${formatValue(node.oldValue)} to ${formatValue(node.newValue)}`,
    nested: (nodePath, node) => iter(node.children, `${nodePath}.`),
  };

  const changedNodes = tree.filter(node => node.type !== 'unchanged');
  return changedNodes.map(node => dispatcher[node.type](`${path}${node.name}`, node)).join('\n');
};

export default iter;

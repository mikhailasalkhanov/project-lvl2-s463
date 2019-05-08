const formatValue = (value) => {
  if (value instanceof Object) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return value;
};

const options = {
  removed: (node, pathToNode) => `Property '${pathToNode}' was removed`,
  added: (node, pathToNode) => `Property '${pathToNode}' was added with value: ${formatValue(node.newValue)}`,
  updated: (node, pathToNode) => `Property '${pathToNode}' was updated. From ${formatValue(node.oldValue)} to ${formatValue(node.newValue)}`,
};

const iter = (tree, pathToNode = '') => {
  const formated = tree.filter(node => node.type !== 'unchanged').map((node) => {
    if (node.type === 'nested') {
      return iter(node.children, `${pathToNode}${node.name}.`);
    }
    return options[node.type](node, `${pathToNode}${node.name}`);
  }).join('\n');

  return formated;
};

export default iter;

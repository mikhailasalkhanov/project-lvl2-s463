import _ from 'lodash';

const stringify = (value, depth) => {
  if (value instanceof Object) {
    const stringifiedValue = Object.keys(value).map(key => `${' '.repeat(depth * 4 + 4)}${key}: ${value[key]}`).join('\n');
    return `{\n${stringifiedValue}\n${' '.repeat(depth * 4)}}`;
  }
  return value;
};

const dispatcher = {
  unchanged: (node, depth) => `  ${node.name}: ${stringify(node.value, depth)}\n`,
  removed: (node, depth) => `- ${node.name}: ${stringify(node.oldValue, depth)}\n`,
  added: (node, depth) => `+ ${node.name}: ${stringify(node.newValue, depth)}\n`,
  nested: node => `  ${node.name}: {`,
  updated: (node, depth) => `${dispatcher.removed(node, depth)}${' '.repeat(depth * 4 - 2)}${dispatcher.added(node, depth)}`,
};

const iter = (tree, depth = 1) => tree.reduce((acc, node) => {
  const formattedString = `${' '.repeat(depth * 4 - 2)}${dispatcher[node.type](node, depth)}`;
  if (node.type === 'nested') {
    return [...acc, `${formattedString}\n${_.flatten(iter(node.children, depth + 1)).join('')}${' '.repeat(depth * 4)}}\n`];
  }
  return [...acc, formattedString];
}, []);

export default ast => `{\n${_.flatten(iter(ast)).join('')}}`;

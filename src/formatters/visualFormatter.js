import _ from 'lodash';

const indent = spaces => ' '.repeat(spaces);

const stringify = (value, depth) => {
  if (!(value instanceof Object)) {
    return value;
  }
  const stringifiedValue = Object.keys(value).map(key => `${indent((depth + 1) * 4)}${key}: ${value[key]}`).join('\n');
  return `{\n${stringifiedValue}\n${indent(depth * 4)}}`;
};

const iter = (tree, depth = 1) => {
  const dispatcher = {
    unchanged: node => `${indent(depth * 4)}${node.name}: ${stringify(node.value, depth)}`,
    removed: node => `${indent(depth * 4 - 2)}- ${node.name}: ${stringify(node.oldValue, depth)}`,
    added: node => `${indent(depth * 4 - 2)}+ ${node.name}: ${stringify(node.newValue, depth)}`,
    updated: node => [dispatcher.removed(node, depth), dispatcher.added(node, depth)],
    nested: node => [
      `${indent(depth * 4)}${node.name}: {`,
      iter(node.children, depth + 1),
      `${indent(depth * 4)}}`,
    ],
  };

  return tree.map(node => dispatcher[node.type](node, depth));
};

export default ast => `{\n${_.flattenDeep(iter(ast)).join('\n')}\n}`;

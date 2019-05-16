import _ from 'lodash';

const indent = depth => ' '.repeat(depth * 4 - 2);

const stringify = (value, depth) => {
  if (!(value instanceof Object)) {
    return value;
  }
  const stringifiedValue = Object.keys(value).map(key => `${indent(depth + 1)}  ${key}: ${value[key]}`).join('\n');
  return `{\n${stringifiedValue}\n${indent(depth)}  }`;
};

const iter = (tree, depth = 1) => {
  const indentation = indent(depth);

  const dispatcher = {
    unchanged: node => `${indentation}  ${node.name}: ${stringify(node.value, depth)}`,
    removed: node => `${indentation}- ${node.name}: ${stringify(node.oldValue, depth)}`,
    added: node => `${indentation}+ ${node.name}: ${stringify(node.newValue, depth)}`,
    updated: node => [dispatcher.removed(node), dispatcher.added(node)],
    nested: node => [
      `${indentation}  ${node.name}: {`,
      iter(node.children, depth + 1),
      `${indentation}  }`,
    ],
  };

  return tree.map(node => dispatcher[node.type](node, depth));
};

export default ast => `{\n${_.flattenDeep(iter(ast)).join('\n')}\n}`;

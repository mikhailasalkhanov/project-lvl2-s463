const stringify = (value, depth) => {
  if (value instanceof Object) {
    const stringifiedValue = Object.keys(value).map(key => `${' '.repeat(depth * 4 + 4)}${key}: ${value[key]}`).join('\n');
    return `{\n${stringifiedValue}\n${' '.repeat(depth * 4)}}`;
  }
  return value;
};

const options = {
  unchanged: (node, depth) => `  ${node.name}: ${stringify(node.value, depth)}\n`,
  removed: (node, depth) => `- ${node.name}: ${stringify(node.oldValue, depth)}\n`,
  added: (node, depth) => `+ ${node.name}: ${stringify(node.newValue, depth)}\n`,
  nested: node => `  ${node.name}: {`,
  updated: (node, depth) => `${options.removed(node, depth)}${' '.repeat(depth * 4 - 2)}${options.added(node, depth)}`,
};

const render = (ast) => {
  const iter = (tree, depth = 1) => tree.map((node) => {
    const formattedString = `${' '.repeat(depth * 4 - 2)}${options[node.type](node, depth)}`;

    if (node.type === 'nested') {
      return `${formattedString}\n${iter(node.children, depth + 1)}${' '.repeat(depth * 4)}}\n`;
    }
    return formattedString;
  }).join('');

  return `{\n${iter(ast)}}`;
};

export default render;

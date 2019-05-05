import _ from 'lodash';

const markers = {
  unchanged: ' ',
  deleted: '-',
  added: '+',
  nested: ' ',
};

const getIndent = depth => ' '.repeat(depth * 4 - 2);

const stringify = (value, depth) => {
  if (value instanceof Object) {
    const newValue = _.keys(value).map(key => `${getIndent(depth)}  ${key}: ${value[key]}`).join('\n');
    return `{\n${newValue}\n${getIndent(depth - 1)}  }`;
  }
  return value;
};

const render = (ast) => {
  const iter = (tree, depth = 1) => tree.map((node) => {
    const firstPart = `${getIndent(depth)}${markers[node.type]} ${node.name}: `;

    if (node.type === 'nested') {
      return `${firstPart}{\n${iter(node.children, depth + 1)}${getIndent(depth)}  }\n`;
    }
    return `${firstPart}${stringify(node.value, depth + 1)}\n`;
  }).join('');

  return `{\n${iter(ast)}}`;
};

export default render;

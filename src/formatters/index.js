import defaultFormat from './defaultFormatter';
import plainFormat from './plain';
import jsonFormat from './json';

const dispatcher = {
  plain: plainFormat,
  defaultFormatter: defaultFormat,
  json: jsonFormat,
};

const render = (tree, format) => dispatcher[format](tree);

export default render;

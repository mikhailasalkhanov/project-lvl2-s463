import defaultFormat from './defaultFormatter';
import plainFormat from './plainFormatter';
import jsonFormat from './jsonFormatter';

const dispatcher = {
  plain: plainFormat,
  defaultFormatter: defaultFormat,
  json: jsonFormat,
};

const render = (tree, format) => dispatcher[format](tree);

export default render;

import visualFormat from './visualFormatter';
import plainFormat from './plainFormatter';
import jsonFormat from './jsonFormatter';

const dispatcher = {
  plain: plainFormat,
  defaultFormatter: visualFormat,
  json: jsonFormat,
};

const render = (tree, format) => dispatcher[format](tree);

export default render;

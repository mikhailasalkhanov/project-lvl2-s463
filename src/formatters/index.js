import defaultFormat from './defaultFormatter';
import plain from './plain';

const options = {
  plain,
  defaultFormatter: defaultFormat,
};

const render = (tree, format) => options[format](tree);

export default render;

import yaml from 'js-yaml';
import ini from 'ini';
import { extname } from 'path';

const formats = {
  '.json': JSON.parse,
  '.yml': yaml.safeLoad,
  '.ini': ini.parse,
};

export default path => formats[extname(path)];

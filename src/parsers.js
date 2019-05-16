import yaml from 'js-yaml';
import ini from 'ini';

const dispatcher = {
  '.json': JSON.parse,
  '.yml': yaml.safeLoad,
  '.ini': ini.parse,
};

export default extension => dispatcher[extension];

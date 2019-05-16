import { readFileSync } from 'fs';
import { extname } from 'path';
import selectParser from './parsers';
import buildAst from './astBuilder';
import render from './formatters';

const genDiff = (filepath1, filepath2, format = 'defaultFormatter') => {
  const dataObj1 = selectParser(extname(filepath1))(readFileSync(filepath1, 'UTF-8'));
  const dataObj2 = selectParser(extname(filepath2))(readFileSync(filepath2, 'UTF-8'));

  const tree = buildAst(dataObj1, dataObj2);
  const diff = render(tree, format);

  return diff;
};

export default genDiff;

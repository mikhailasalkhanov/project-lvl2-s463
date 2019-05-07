import { readFileSync } from 'fs';
import parseByPath from './parsers';
import buildAst from './astBuilder';
import render from './formatters';

const genDiff = (firstPathToFile, secondPathToFile, format = 'defaultFormatter') => {
  const dataObj1 = parseByPath(firstPathToFile)(readFileSync(firstPathToFile, 'UTF-8'));
  const dataObj2 = parseByPath(secondPathToFile)(readFileSync(secondPathToFile, 'UTF-8'));

  const tree = buildAst(dataObj1, dataObj2);
  const diff = render(tree, format);

  return diff;
};

export default genDiff;

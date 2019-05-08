import { readFileSync } from 'fs';
import selectParser from './parsers';
import buildAst from './astBuilder';
import render from './formatters';

const genDiff = (firstPathToFile, secondPathToFile, format = 'defaultFormatter') => {
  const dataObj1 = selectParser(firstPathToFile)(readFileSync(firstPathToFile, 'UTF-8'));
  const dataObj2 = selectParser(secondPathToFile)(readFileSync(secondPathToFile, 'UTF-8'));

  const tree = buildAst(dataObj1, dataObj2);
  const diff = render(tree, format);

  return diff;
};

export default genDiff;

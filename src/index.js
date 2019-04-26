import { has, union } from 'lodash';
import { readFileSync } from 'fs';
import parseByPath from './parsers';

const genDiff = (firstPathToFile, secondPathToFile) => {
  const firstDataObj = parseByPath(firstPathToFile)(readFileSync(firstPathToFile, 'UTF-8'));
  const secondDataObj = parseByPath(secondPathToFile)(readFileSync(secondPathToFile, 'UTF-8'));
  const allKeys = union(Object.keys(firstDataObj), Object.keys(secondDataObj));

  const result = allKeys.reduce((acc, key) => {
    if (
      has(firstDataObj, key) && has(secondDataObj, key) && firstDataObj[key] === secondDataObj[key]
    ) {
      return [...acc, `    ${key}: ${firstDataObj[key]}`];
    }
    if (has(firstDataObj, key) && !has(secondDataObj, key)) {
      return [...acc, `  - ${key}: ${firstDataObj[key]}`];
    }
    if (!has(firstDataObj, key) && has(secondDataObj, key)) {
      return [...acc, `  + ${key}: ${secondDataObj[key]}`];
    }
    return [...acc, `  + ${key}: ${secondDataObj[key]}`, `  - ${key}: ${firstDataObj[key]}`];
  }, []);

  return ['{', ...result, '}'].join('\n');
};

export default genDiff;

import { has, union } from 'lodash';
import { readFileSync } from 'fs';

const genDiff = (beforeFilePath, afterFilePath) => {
  const before = JSON.parse(readFileSync(beforeFilePath, 'UTF-8'));
  const after = JSON.parse(readFileSync(afterFilePath, 'UTF-8'));
  const allKeys = union(Object.keys(before), Object.keys(after));

  const result = allKeys.reduce((acc, key) => {
    if (has(before, key) && has(after, key) && before[key] === after[key]) {
      return [...acc, `    ${key}: ${before[key]}`];
    }
    if (has(before, key) && !has(after, key)) {
      return [...acc, `  - ${key}: ${before[key]}`];
    }
    if (!has(before, key) && has(after, key)) {
      return [...acc, `  + ${key}: ${after[key]}`];
    }
    return [...acc, `  + ${key}: ${after[key]}`, `  - ${key}: ${before[key]}`];
  }, []);

  return ['{', ...result, '}'].join('\n');
};

export default genDiff;

import { readFileSync } from 'fs';
import path from 'path';
import genDiff from '../src';

const extensions = ['.json', '.yml', '.ini'];

const getPath = fileName => path.join('__tests__/__fixtures__', fileName);

const runTest = (fileName1, fileName2, expectedFileName, format = 'defaultFormatter') => {
  const paths = extensions.map(extension => [
    getPath(`${fileName1}${extension}`),
    getPath(`${fileName2}${extension}`),
    getPath(`${expectedFileName}.txt`),
  ]);

  test.each(paths)('%s',
    (beforeFilePath, afterFilePath, expectedFilePath) => {
      const expected = readFileSync(expectedFilePath, 'UTF-8');
      expect(genDiff(beforeFilePath, afterFilePath, format)).toBe(expected);
    });
};

runTest('before', 'after', 'result');
runTest('nested-before', 'nested-after', 'nested-result');
runTest('nested-before', 'nested-after', 'plain-result', 'plain');
runTest('nested-before', 'nested-after', 'json-result', 'json');

import { readFileSync } from 'fs';
import path from 'path';
import genDiff from '../src';

const testCases = {
  flat: [
    ['before.json', 'after.json', 'result.txt'],
    ['before.yml', 'after.yml', 'result.txt'],
    ['before.ini', 'after.ini', 'result.txt'],
  ],
  nested: [
    ['nested-before.json', 'nested-after.json', 'nested-result.txt'],
    ['nested-before.yml', 'nested-after.yml', 'nested-result.txt'],
    ['nested-before.ini', 'nested-after.ini', 'nested-result.txt'],
  ],
};

const runTest = (testCase) => {
  const pathsToTestFiles = testCases[testCase].map(testFiles => testFiles
    .map(fileName => path.resolve(__dirname, '__fixtures__', fileName)));

  test.each(pathsToTestFiles)(`${testCase} %s`,
    (beforeFilePath, afterFilePath, expectedFilePath) => {
      const expected = readFileSync(expectedFilePath, 'UTF-8');
      expect(genDiff(beforeFilePath, afterFilePath)).toBe(expected);
    });
};

runTest('flat');
runTest('nested');

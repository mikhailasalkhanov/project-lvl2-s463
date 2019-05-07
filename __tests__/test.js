import { readFileSync } from 'fs';
import path from 'path';
import genDiff from '../src';

const flatSamples = [
  ['before.json', 'after.json'],
  ['before.yml', 'after.yml'],
  ['before.ini', 'after.ini'],
];
const nestedSamples = [
  ['nested-before.json', 'nested-after.json'],
  ['nested-before.yml', 'nested-after.yml'],
  ['nested-before.ini', 'nested-after.ini'],
];


const runTest = (samples, expectedOutput, format = 'defaultFormatter') => {
  const pathsToTestFiles = samples.map((sample => [...sample, expectedOutput].map(fileName => path.join('__tests__/__fixtures__', fileName))));

  test.each(pathsToTestFiles)(`${expectedOutput} %s`,
    (beforeFilePath, afterFilePath, expectedFilePath) => {
      const expected = readFileSync(expectedFilePath, 'UTF-8');
      expect(genDiff(beforeFilePath, afterFilePath, format)).toBe(expected);
    });
};

runTest(flatSamples, 'result.txt');
runTest(nestedSamples, 'nested-result.txt');
runTest(nestedSamples, 'plain-result.txt', 'plain');

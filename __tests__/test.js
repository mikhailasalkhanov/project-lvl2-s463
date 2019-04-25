import { readFileSync } from 'fs';
import path from 'path';
import genDiff from '../src';

const fixtures = [
  ['before.json', 'after.json', 'result'],
  ['before.yml', 'after.yml', 'result'],
];

const pathsToFixtures = fixtures.map(
  arr => arr.map(fileName => path.resolve(__dirname, '__fixtures__', fileName)),
);

test.each(pathsToFixtures)('generate difference',
  (beforeFilePath, afterFilePath, expectedFilePath) => {
    const expected = readFileSync(expectedFilePath, 'UTF-8');
    expect(genDiff(beforeFilePath, afterFilePath)).toBe(expected);
  });

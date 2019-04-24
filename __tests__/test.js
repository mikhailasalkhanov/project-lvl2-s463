import { readFileSync } from 'fs';
import genDiff from '../src';


test('result is not correct', () => {
  const expected = readFileSync('__tests__/__fixtures__/result', 'UTF-8');
  expect(genDiff('__tests__/__fixtures__/before.json', '__tests__/__fixtures__/after.json')).toBe(expected);
});

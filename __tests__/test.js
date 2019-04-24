import { readFileSync } from 'fs';
import genDiff from '../src';


test('JSON', () => {
  const expected = readFileSync('__tests__/__fixtures__/result', 'UTF-8');
  expect(genDiff('__tests__/__fixtures__/before.json', '__tests__/__fixtures__/after.json')).toBe(expected);
});

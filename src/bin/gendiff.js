#! /usr/bin/env node
import commander from 'commander';
import { version } from '../../package.json';
import genDiff from '..';

const program = commander;

program
  .version(version)
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  .arguments('<firstConfig> <secondConfig>')
  .action((filepath1, filepath2) => console.log(genDiff(filepath1, filepath2, program.format)))
  .parse(process.argv);

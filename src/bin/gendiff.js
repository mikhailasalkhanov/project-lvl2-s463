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
  .action((file1, file2) => console.log(genDiff(file1, file2, program.format)))
  .parse(process.argv);

#! /usr/bin/env node
import commander from 'commander';
import { version } from '../../package.json';

const program = commander;

program
  .version('version')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  .arguments('<firstConfig> <secondConfig>')
  .parse(process.argv);

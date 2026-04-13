import fs from 'fs';
import path from 'path';
import { cwd } from 'process';
import jsYaml from 'js-yaml';

const getAbsolutePath = (filepath) => path.resolve(cwd(), filepath);
const readFile = (filepath) => {
  const absolutePath = getAbsolutePath(filepath);
  return fs.readFileSync(absolutePath, 'utf-8');
};
const parseJson = (data) => JSON.parse(data);
const parseYaml = (data) => jsYaml.load(data);
const parsers = {
  json: parseJson,
  yaml: parseYaml,
  yml: parseYaml,
};
const getFormat = (filepath) => path.extname(filepath).toLowerCase().slice(1);

export const getData = (filepath) => {
  const data = readFile(filepath);
  const format = getFormat(filepath);
  if (!parsers[format]) {
    throw new Error(`Unsupported format: ${format}`);
  }
  return parsers[format](data);
};
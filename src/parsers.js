import fs from 'fs';
import path from 'path';
import { cwd } from 'process';

const getAbsolutePath = (filepath) => {
    return path.resolve(cwd(), filepath);
};

const readFile = (filepath) => {
    const absolutePath = getAbsolutePath(filepath);
    return fs.readFileSync(absolutePath, 'utf-8');
};

const parseJson = (data) => JSON.parse(data);

const parsers = {
  json: parseJson,
};

const getFormat = (filepath) => {
    const ext = path.extname(filepath).toLowerCase();
    return ext.slice(1);
};

export const getData = (filepath) => {
    const data = readFile(filepath);
    const format = getFormat(filepath);
    
    if (!parsers[format]) {
        throw new Error(`Unsupported format: ${format}`);
  }
  return parsers[format](data);
};
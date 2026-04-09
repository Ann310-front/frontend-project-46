import fs from 'fs';
import path from 'path';
import { cwd } from 'process';

const getAbsolutePath = (filepath) => path.resolve(cwd(), filepath)

const readFile = (filepath) => fs.readFileSync(absolutePath, 'utf-8');

const parseJson = (data) => JSON.parse(data);

const parsers = {
  json: parseJson,
};

const getFormat = (filepath) => path.extname(filepath).toLowerCase().slice(1);
    
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
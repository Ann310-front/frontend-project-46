import { getData } from './parsers.js';
import buildTree from './compare.js';
import stylish from './formatters/stylish.js';
import plain from './formatters/plain.js';
import json from './formatters/json.js';

const genDiff = (filepath1, filepath2, format = 'stylish') => {
    const data1 = getData(filepath1);
    const data2 = getData(filepath2);
    const ast = buildTree(data1, data2);
    switch (format) {
    case 'stylish':
      return stylish(ast);
    case 'plain':
      return plain(ast);
      case 'json':
        return json(ast);
        default:
      throw new Error(`Unknown format: ${format}`);
  }
};

export default genDiff;
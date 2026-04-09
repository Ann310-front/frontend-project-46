import { getData } from './parsers.js';
import buildTree from './compare.js';
import stylish from './formatters/stylish.js';

const genDiff = (filepath1, filepath2, format = 'stylish') => {
    const data1 = getData(filepath1);
    const data2 = getData(filepath2);
    const ast = buildTree(data1, data2);
    if (format === 'stylish') {
    return stylish(ast);
  }
};

export default genDiff;
import { getData } from './parsers.js';

const genDiff = (filepath1, filepath2, format = 'stylish') => {
    const data1 = getData(filepath1);
    const data2 = getData(filepath2);
    return `File 1: ${JSON.stringify(data1)}\nFile 2: ${JSON.stringify(data2)}\nFormat: ${format}`;
  

};

export default genDiff;
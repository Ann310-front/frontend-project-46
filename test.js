import genDiff from './src/index.js';

const file1 = './__fixtures__/file1.yml';
const file2 = './__fixtures__/file2.yml';

console.log('=== plain ===');
console.log(genDiff(file1, file2, 'plain'));

console.log('=== json ===');
console.log(genDiff(file1, file2, 'json'));
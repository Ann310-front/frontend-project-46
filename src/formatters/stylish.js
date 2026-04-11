import _ from 'lodash';

const getIndent = (depth) => '  '.repeat(depth);  // ← 2 пробела вместо 4

const stringify = (value, depth) => {
  if (!_.isObject(value)) {
    return String(value);
  }
  const indent = getIndent(depth + 1);
  const lines = Object.entries(value).map(
    ([key, val]) => `${indent}${key}: ${stringify(val, depth + 1)}`,  // ← убрал лишние пробелы
  );
  return `{\n${lines.join('\n')}\n${getIndent(depth)}}`;
};

const stylish = (ast, depth = 0) => {
  const indent = getIndent(depth);
  const lines = ast.flatMap((node) => {
    const { key, type, value, oldValue, newValue, children } = node;

    switch (type) {
      case 'nested':
        return `${indent}${key}: {\n${stylish(children, depth + 1)}\n${indent}}`;
      case 'added':
        return `${indent}+ ${key}: ${stringify(value, depth)}`;  // ← убрал лишний пробел
      case 'removed':
        return `${indent}- ${key}: ${stringify(value, depth)}`;  // ← убрал лишний пробел
      case 'changed':
        return [
          `${indent}- ${key}: ${stringify(oldValue, depth)}`,
          `${indent}+ ${key}: ${stringify(newValue, depth)}`,
        ];
      case 'unchanged':
        return `${indent}  ${key}: ${stringify(value, depth)}`;
      default:
        throw new Error(`Unknown type: ${type}`);
    }
  });
  return `{\n${lines.join('\n')}\n${indent}}`;
};

export default stylish;

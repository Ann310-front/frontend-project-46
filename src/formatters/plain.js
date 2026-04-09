import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  return typeof value === 'string' ? `'${value}'` : value;
};

const plain = (ast, parentKey = '') => {
  const lines = ast.flatMap((node) => {
    const { key, type, value, oldValue, newValue, children } = node;
    const fullKey = parentKey ? `${parentKey}.${key}` : key;
    switch (type) {
      case 'nested':
        return plain(children, fullKey);
      case 'added':
        return `Property '${fullKey}' was added with value: ${stringify(value)}`;
      case 'removed':
        return `Property '${fullKey}' was removed`;
      case 'changed':
        return `Property '${fullKey}' was updated. From ${stringify(oldValue)} to ${stringify(newValue)}`;
      case 'unchanged':
        return [];
      default:
        throw new Error(`Unknown type: ${type}`);
    }
  });
  return lines.join('\n');
};
export default plain;
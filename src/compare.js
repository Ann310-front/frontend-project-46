import _ from 'lodash';

const buildTree = (obj1, obj2) => {
  const keys = _.union(Object.keys(obj1), Object.keys(obj2)).sort();
  const ast = keys.map((key) => {
    const val1 = obj1[key];
    const val2 = obj2[key];
    if (!_.has(obj1, key)) {
      return { key, type: 'added', value: val2 };
    }
    if (!_.has(obj2, key)) {
      return { key, type: 'removed', value: val1 };
    }
    if (_.isObject(val1) && _.isObject(val2)) {
      return { key, type: 'nested', children: buildTree(val1, val2) };
    }
    if (val1 !== val2) {
      return { key, type: 'changed', oldValue: val1, newValue: val2 };
    }
    return { key, type: 'unchanged', value: val1 };
  });
  return ast;
};
export default buildTree;
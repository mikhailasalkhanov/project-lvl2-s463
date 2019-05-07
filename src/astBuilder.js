import _ from 'lodash';

const buildAst = (dataObj1, dataObj2) => {
  const keys = _.union(Object.keys(dataObj1), Object.keys(dataObj2));
  const ast = keys.slice().sort((a, b) => b - a).reduce((acc, key) => {
    const valueObj1 = dataObj1[key];
    const valueObj2 = dataObj2[key];

    if (valueObj1 instanceof Object && valueObj2 instanceof Object) {
      return [...acc, { name: key, type: 'nested', children: buildAst(valueObj1, valueObj2) }];
    }
    if (_.has(dataObj1, key) && !_.has(dataObj2, key)) {
      return [...acc, { name: key, type: 'removed', oldValue: valueObj1 }];
    }
    if (!_.has(dataObj1, key) && _.has(dataObj2, key)) {
      return [...acc, { name: key, type: 'added', newValue: valueObj2 }];
    }
    if (valueObj1 !== valueObj2) {
      return [...acc, {
        name: key, type: 'updated', oldValue: valueObj1, newValue: valueObj2,
      }];
    }
    return [...acc, { name: key, type: 'unchanged', value: valueObj1 }];
  }, []);

  return ast;
};

export default buildAst;

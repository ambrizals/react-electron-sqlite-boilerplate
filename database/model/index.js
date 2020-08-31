const model = ({ model, method, param }) => {
  let Model = require("./" + model);
  const m = new Model();
  return m[method](param);
};

module.exports = model;

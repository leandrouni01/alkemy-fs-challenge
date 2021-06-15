const categoryModel = require('../models/Category');
const dbOperations = require('../database/dbOperations');

module.exports.getCategories = (req,res) =>{
  const fk_user = res.locals.user.id;
  categoryModel.find.keys[0].table = `DISTINCT ${categoryModel.find.keys[0].table}`;
  dbOperations.findBy(categoryModel.find, {fk_user, conditions: [{key: "fk_user"}]})
  .then((results) => {
    return res.status(200).send(results);
  })
  .catch((err) => {
    return res.status(422).send({errors: [{ title: "Db Error", detail: err.message }] })
  })
}
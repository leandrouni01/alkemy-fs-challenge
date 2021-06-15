const operationModel = require('../models/Operation');
const dbOperations = require('../database/dbOperations');


module.exports.getOperations = (req,res) =>{
  const fk_user = res.locals.user.id;
  dbOperations.findBy(operationModel.find, {fk_user, conditions: [{key: "fk_user"}]})
  .then((results) => {
    return res.status(200).send(results);
  })
  .catch((err) => {
    return res.status(422).send({errors: [{ title: "Db Error", detail: err.message }] })
  })
}

module.exports.getOperationById = (req,res) =>{

}

module.exports.createOperation = (req,res) =>{

}

module.exports.updateOperation = (req,res) =>{

}

module.exports.deleteOperation = (req,res) =>{

}

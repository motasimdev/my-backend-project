const categorySchema = require("../../model/categorySchema");


function categoryController(req, res) {
  const { title, description } = req.body;

  const createCategory = new categorySchema({
    
  }) 
}

module.exports = categoryController;

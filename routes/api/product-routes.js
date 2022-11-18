const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');



// get all products
router.get('/', (req, res) => {
  
  Product.findAll({
    include: [
      {
        model: Category,
        attributes: ['id', 'category_name'],
      },
      {
        model: Tag,
        attributes: ['id', 'tag_name'],
        // needed to work!
        as: 'tags',
      },
    ],
  })
    .then((dbProductData) => res.json(dbProductData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});


router.get('/:id', (req, res) => {
  
  Product.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Category,
        attributes: ['id', 'category_name'],
      },
      {
        model: Tag,
        attributes: ['id', 'tag_name'],
        
        as: 'tags',
      },
    ],
  })
    .then((dbProductData) => res.json(dbProductData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// create new product

router.post('/', (req, res) => {
  // create a new product
  Product.create(req.body)
    .then((dbProductData) => {
      res.json(dbProductData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
  console.log(`\n ++++++++++ new product added: ${req.body.product_name} ++++++++++ \n`);
});

// update product
router.put('/:id', (req, res) => {
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((dbProductData) => {
      res.json(dbProductData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
  console.log(`\n ^^^^^^^^^^ product updated: ${req.body.product_name} ^^^^^^^^^^ \n`);
});

router.delete('/:id', (req, res) => {
  // delete one product by its `id` value
  Product.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((product) => res.json(product))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
  console.log(`\n ^^^^^^^^^^ product deleted: ${req.body.product_name} ^^^^^^^^^^ \n`);
});

module.exports = router;

// done
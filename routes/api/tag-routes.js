const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');



router.get('/', (req, res) => {
  Tag.findAll({
    include: {
      model: Product,
      attributes: ['id', 'product_name', 'price', 'stock'],
      as: 'products',
    },
  })
    .then((dbTagData) => res.json(dbTagData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
 
  Tag.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock'],
        as: 'products',
      },
    ],
  })
    .then((dbTagData) => {
      
      const tag = dbTagData.get({ plain: true });
      
      res.json(tag);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create(req.body)
    .then((dbTagData) => {
      res.json(dbTagData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
  console.log(`\n ++++++++++ new tag added: ${req.body.tag_name} ++++++++++ \n`);
});

router.put('/:id', (req, res) => {
  
  Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((dbTagData) => {
      res.json(dbTagData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
  console.log(`\n ^^^^^^^^^^ tag_name updated: ${req.body.tag_name} ^^^^^^^^^^ \n`);
});

router.delete('/:id', (req, res) => {
  
  Tag.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbTagData) => res.json(dbTagData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
  console.log(`\n ---------- tag_id deleted: ${req.params.id} ---------- \n`);
});

module.exports = router;

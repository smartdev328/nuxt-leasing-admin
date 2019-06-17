const db = require('../models')
function run() {
  db.Product.findAll().then(products => {
    if (products.length === 0) {
      const arrProduct = [
        {
          o_variant: 'Tekna 1.42',
          variant: 'Tekna(S)',
          year: '2019',
          primary_image: 'https://i.ibb.co/vzMD4Mz/purepng-com-volvovolvovolvo-carsvolvo-automobilevolvo-stylish-carvolvo-trucks-1701527683044gc27c.png',
          thumbnail1: 'https://i.ibb.co/vzMD4Mz/purepng-com-volvovolvovolvo-carsvolvo-automobilevolvo-stylish-carvolvo-trucks-1701527683044gc27c.png',
          thumbnail2: 'https://i.ibb.co/vzMD4Mz/purepng-com-volvovolvovolvo-carsvolvo-automobilevolvo-stylish-carvolvo-trucks-1701527683044gc27c.png',
          thumbnail3: 'https://i.ibb.co/vzMD4Mz/purepng-com-volvovolvovolvo-carsvolvo-automobilevolvo-stylish-carvolvo-trucks-1701527683044gc27c.png',
          thumbnail4: 'https://i.ibb.co/vzMD4Mz/purepng-com-volvovolvovolvo-carsvolvo-automobilevolvo-stylish-carvolvo-trucks-1701527683044gc27c.png',
          short_description: 'Lorem Ipsum',
          long_description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
          acquisition_cost: 285000,
          scrap_value: [10000, 20000],
          leasing_period: [12, 24],
          start_kilometer: 10000,
          end_kilometer: 35000,
          interval_kilometer: 5000,
          interval_price: 2500,
          model: 1,
          size: 1,
          colors: [1, 2],
          categories: [1],
          professions: [1, 2],
          equipments: [1, 2]
        }
      ]
      arrProduct.forEach(product => {
        db.Product.create(product, {
          include: [
            db.Model,
            db.Finance,
            db.Size
          ]
        })
          .then(prod => Promise.all([
            prod.setModel(product.model),
            prod.setSize(product.size),
            prod.setFinance(1),
            prod.setColors(product.colors),
            prod.setCategories(product.categories),
            prod.setEquipments(product.equipments),
            prod.setProfessions(product.professions)
          ]))
      })
    }
  })
}

module.exports = {
  run: run
}

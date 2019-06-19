const db = require('../models')
function run() {
  db.Model.findAll().then(models => {
    if (models.length === 0) {
      const arrModel = [
        {
          modelTitle: 'Transit',
          modelImage: 'https://i.ibb.co/qrxZdbS/2017-Ford-Transit-On-White.png',
          seoText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
          modelDescription: 'Description for Ford Transit model',
          metaDescription: 'Ford Transit model',
          titleTag: 'transit',
          brandId: 6
        },
        {
          modelTitle: 'Altima',
          modelImage: 'https://i.ibb.co/rZzW2TN/2018-Nissan-Altima-model.png',
          seoText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
          modelDescription: 'Description for Nissian Altima model',
          metaDescription: 'Nissian Altima model',
          titleTag: 'altima',
          brandId: 7
        },
        {
          modelTitle: 'Rogue',
          modelImage: 'https://i.ibb.co/KhSQy48/nissan-rogue-model.png',
          seoText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
          modelDescription: 'Description for Nissan Rogue model',
          metaDescription: 'Nissan Rogue model',
          titleTag: 'rogue',
          brandId: 7
        },
        {
          modelTitle: 'TITAN',
          modelImage: 'https://i.ibb.co/vHc7vJH/2018-Nissan-Titan-hero.png',
          seoText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
          modelDescription: 'Description for Nissan TITAN model',
          metaDescription: 'Nissan TITAN model',
          titleTag: 'titan',
          brandId: 7
        },
        {
          modelTitle: 'X7',
          modelImage: 'https://i.ibb.co/MfZgtZP/bmw-x7.png',
          seoText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
          metaDescription: 'BMW X7 model',
          modelDescription: 'Description for BMW X7 model',
          titleTag: 'x7',
          brandId: 4
        },
        {
          modelTitle: 'EcoSport',
          modelImage: 'https://i.ibb.co/q0gQR4Y/ford-ecosport2018-blue.png',
          seoText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
          metaDescription: 'Ford EcoSport model',
          modelDescription: 'Description for Ford EcoSport model',
          titleTag: 'EcoSport',
          brandId: 6
        },
        {
          modelTitle: 'Explorer',
          modelImage: 'https://i.ibb.co/jTwnWbJ/model.png',
          seoText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
          metaDescription: 'Ford Sport model',
          modelDescription: 'Description for Ford Sport model',
          titleTag: 'sport',
          brandId: 6
        },
        {
          modelTitle: 'XC40',
          modelImage: 'https://i.ibb.co/pbxNb5b/9074-2019-volvo-xc40.png',
          seoText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
          metaDescription: 'Volvo XC40 model',
          modelDescription: 'Description for Volvo XC40 model',
          titleTag: 'xc40',
          brandId: 2
        },
        {
          modelTitle: 'Golf GTI',
          modelImage: 'https://i.ibb.co/xG7Q2cK/volkswagen-png-png-file-name-volkswagen-1600.png',
          seoText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
          metaDescription: 'Volkswagen Golf GTI',
          modelDescription: 'Description for Volkswagen Golf GTI model',
          titleTag: 'Golf GTI',
          brandId: 1
        }
      ]
      arrModel.forEach(model => {
        db.Model.create(model, {
          include: [ db.Brand ]
        })
      })
    }
  })
}

module.exports = {
  run: run
}

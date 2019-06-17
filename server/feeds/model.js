const db = require('../models')
function run() {
  db.Model.findAll().then(models => {
    if (models.length === 0) {
      const arrModel = [
        {
          modelTitle: 'Transit',
          modelImage: 'https://a.icons8.com/gTgOoiqP/EvpiHm/crafter-copy-8@2x.png',
          seoText: 'Seo text: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
          metaDescription: 'Ford Transit model',
          titleTag: 'transit',
          brandId: 6
        },
        {
          modelTitle: 'Altima',
          modelImage: 'https://a.icons8.com/gTgOoiqP/EvpiHm/crafter-copy-8@2x.png',
          seoText: 'Seo text: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
          metaDescription: 'Nissian Altima model',
          titleTag: 'altima',
          brandId: 7
        },
        {
          modelTitle: 'Rogue',
          modelImage: 'https://a.icons8.com/gTgOoiqP/EvpiHm/crafter-copy-8@2x.png',
          seoText: 'Seo text: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
          metaDescription: 'Nissan Rogue model',
          titleTag: 'rogue',
          brandId: 7
        },
        {
          modelTitle: 'TITAN',
          modelImage: 'https://a.icons8.com/gTgOoiqP/EvpiHm/crafter-copy-8@2x.png',
          seoText: 'Seo text: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
          metaDescription: 'Nissan TITAN model',
          titleTag: 'titan',
          brandId: 7
        },
        {
          modelTitle: 'TITAN',
          modelImage: 'https://a.icons8.com/gTgOoiqP/EvpiHm/crafter-copy-8@2x.png',
          seoText: 'Seo text: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
          metaDescription: 'Nissan TITAN model',
          titleTag: 'titan',
          brandId: 7
        },
        {
          modelTitle: 'X7',
          modelImage: 'https://a.icons8.com/gTgOoiqP/EvpiHm/crafter-copy-8@2x.png',
          seoText: 'Seo text: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
          metaDescription: 'BMW X7 model',
          titleTag: 'x7',
          brandId: 4
        },
        {
          modelTitle: 'EcoSport',
          modelImage: 'https://a.icons8.com/gTgOoiqP/EvpiHm/crafter-copy-8@2x.png',
          seoText: 'Seo text: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
          metaDescription: 'Ford EcoSport model',
          titleTag: 'titan',
          brandId: 6
        },
        {
          modelTitle: 'EcoSport',
          modelImage: 'https://a.icons8.com/gTgOoiqP/EvpiHm/crafter-copy-8@2x.png',
          seoText: 'Seo text: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
          metaDescription: 'Ford EcoSport model',
          titleTag: 'titan',
          brandId: 6
        },
        {
          modelTitle: 'XC40',
          modelImage: 'https://a.icons8.com/gTgOoiqP/EvpiHm/crafter-copy-8@2x.png',
          seoText: 'Seo text: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
          metaDescription: 'Volvo XC40 model',
          titleTag: 'xc40',
          brandId: 2
        },
        {
          modelTitle: 'Golf GTI',
          modelImage: 'https://a.icons8.com/gTgOoiqP/EvpiHm/crafter-copy-8@2x.png',
          seoText: 'Seo text: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
          metaDescription: 'Volkswagen Golf GTI',
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

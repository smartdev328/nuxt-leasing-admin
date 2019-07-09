const _ = require('lodash')

const enums = {
  'STATUS': {
    DRAFT: 'DRAFT',
    COMPLETED: 'COMPLETED'
  }
}

module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    new_car: DataTypes.BOOLEAN,
    model: DataTypes.STRING,
    o_variant: DataTypes.STRING,
    variant: DataTypes.STRING,
    year: DataTypes.STRING,
    primary_image: DataTypes.STRING,
    thumbnail1: DataTypes.STRING,
    thumbnail2: DataTypes.STRING,
    thumbnail3: DataTypes.STRING,
    thumbnail4: DataTypes.STRING,
    short_description: DataTypes.STRING,
    long_description: DataTypes.TEXT,
    acquisition_cost: DataTypes.INTEGER,
    scrap_value: DataTypes.ARRAY(DataTypes.INTEGER),
    leasing_period: DataTypes.ARRAY(DataTypes.INTEGER),
    start_kilometer: DataTypes.INTEGER,
    end_kilometer: DataTypes.INTEGER,
    interval_kilometer: DataTypes.INTEGER,
    interval_price: DataTypes.INTEGER,
    economy: DataTypes.STRING,
    fuelType: DataTypes.STRING,
    doors: DataTypes.STRING,
    motor: DataTypes.STRING,
    cargoSize: DataTypes.STRING,
    gear: DataTypes.STRING,
    energyLabel: DataTypes.STRING,
    status: {
      type: DataTypes.ENUM(_.values(enums.STATUS)),
      defaultValue: enums.STATUS.DRAFT
    }
  })

  Product.associate = models => {
    Product.belongsTo(models.Model, {
      foreignKey: 'modelId',
      targetKey: 'id'
    })
    Product.belongsTo(models.Size, {
      foreignKey: 'sizeId',
      targetKey: 'id'
    })
    Product.belongsTo(models.Finance, {
      foreignKey: 'financeId',
      targetKey: 'id'
    })
    Product.belongsToMany(models.Profession, {
      as: 'professions',
      through: 'Products_Professions',
      foreignKey: 'product_id'
    })
    Product.belongsToMany(models.Color, {
      as: 'Colors',
      through: 'Products_Colors',
      foreignKey: 'product_id'
    })
    Product.belongsToMany(models.Category, {
      as: 'Categories',
      through: 'Products_Categories',
      foreignKey: 'product_id'
    })
    Product.belongsToMany(models.Equipment, {
      as: 'Equipments',
      through: 'Products_Equipments',
      foreignKey: 'product_id'
    })
  }

  return Product
}

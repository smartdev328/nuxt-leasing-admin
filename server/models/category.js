module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  })

  Category.associate = models => {
    Category.belongsToMany(models.Product, {
      as: 'Products',
      through: 'Products_Categories',
      foreignKey: 'category_id'
    })
  }

  return Category
}

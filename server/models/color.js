module.exports = (sequelize, DataTypes) => {
  const Color = sequelize.define('Color', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    hex_color: DataTypes.STRING,
    price: DataTypes.INTEGER
  })

  Color.associate = models => {
    Color.belongsToMany(models.Product, {
      as: 'Products',
      through: 'Products_Colors',
      foreignKey: 'color_id'
    })
  }

  return Color
}

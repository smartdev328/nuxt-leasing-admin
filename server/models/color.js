module.exports = (sequelize, DataTypes) => {
  const Color = sequelize.define('Color', {
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
    },
    hex_color: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
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

module.exports = (sequelize, DataTypes) => {
  const Equipment = sequelize.define('Equipment', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    icon: DataTypes.STRING
  })

  Equipment.associate = models => {
    Equipment.belongsToMany(models.Product, {
      as: 'Products',
      through: 'Products_Equipments',
      foreignKey: 'equipment_id'
    })
  }

  return Equipment
}

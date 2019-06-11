module.exports = (sequelize, DataTypes) => {
  const Profession = sequelize.define('Profession', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    icon: DataTypes.STRING,
    shortDescription: DataTypes.STRING,
    link: DataTypes.STRING
  })
  Profession.associate = models => {
    Profession.belongsToMany(models.Product, {
      as: 'Products',
      through: 'Products_Professions',
      foreignKey: 'profession_id'
    })
  }

  return Profession
}

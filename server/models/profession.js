module.exports = (sequelize, DataTypes) => {
  const Profession = sequelize.define('Profession', {
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
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
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

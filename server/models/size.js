module.exports = (sequelize, DataTypes) => {
  const Size = sequelize.define('Size', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING
  })

  return Size
}

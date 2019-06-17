module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.define('Model', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    modelTitle: DataTypes.STRING,
    modelImage: DataTypes.STRING,
    seoText: DataTypes.STRING,
    metaDescription: DataTypes.STRING,
    titleTag: DataTypes.STRING
  })

  Model.associate = (models) => {
    Model.belongsTo(models.Brand, {
      foreignKey: 'brandId',
      targetKey: 'id'
    })
  }

  return Model
}

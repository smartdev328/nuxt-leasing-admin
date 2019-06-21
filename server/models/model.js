module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.define('Model', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    modelTitle: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    modelImage: DataTypes.STRING,
    seoText: DataTypes.TEXT,
    metaDescription: DataTypes.TEXT,
    modelDescription: DataTypes.TEXT,
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

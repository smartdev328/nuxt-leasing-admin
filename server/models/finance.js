module.exports = (sequelize, DataTypes) => {
  const Finance = sequelize.define('Finance', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    rate: DataTypes.FLOAT,
    downpayment1: DataTypes.INTEGER,
    downpayment2: DataTypes.INTEGER,
    datdownpayment3: DataTypes.INTEGER
  })

  return Finance
}

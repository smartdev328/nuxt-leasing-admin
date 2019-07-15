const _ = require('lodash')

const enums = {
  'STATUS': {
    AWAITING_CONTACT: 'AWAITING_CONTACT',
    FINISHED: 'FINISHED',
    WAITING: 'WAITING',
    NOT_INTERESTED: 'NOT_INTERESTED',
    TEMP_CREATED: 'TEMP_CREATED'
  }
}

module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    primaryImage: DataTypes.STRING,
    brand: DataTypes.STRING,
    model: DataTypes.STRING,
    variant: DataTypes.STRING,
    leasingPeriod: DataTypes.INTEGER,
    kilometers: DataTypes.INTEGER,
    color: DataTypes.JSON,
    profession: DataTypes.STRING,
    equipment: DataTypes.ARRAY(DataTypes.STRING),
    downPayment: DataTypes.INTEGER,
    monthlyPrice: DataTypes.INTEGER,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    companyName: DataTypes.STRING,
    cvr: DataTypes.STRING,
    numberOfEmployees: DataTypes.STRING,
    companyIndustry: DataTypes.STRING,
    urgency: DataTypes.STRING,
    urgencyFlexibility: DataTypes.BOOLEAN,
    addressStreet: DataTypes.STRING,
    addressZipcode: DataTypes.STRING,
    addressCity: DataTypes.STRING,
    addressFloor: DataTypes.STRING,
    newsletter: DataTypes.BOOLEAN,
    message: DataTypes.TEXT,
    comments: DataTypes.TEXT,
    status: {
      type: DataTypes.ENUM(_.values(enums.STATUS)),
      defaultValue: enums.STATUS.TEMP_CREATED
    }
  })

  return Order
}

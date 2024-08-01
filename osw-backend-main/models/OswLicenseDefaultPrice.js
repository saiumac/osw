const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return OswLicenseDefaultPrice.init(sequelize, DataTypes);
}

class OswLicenseDefaultPrice extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    ssb_price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0
    },
    pd_price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0
    },
    date: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'osw_license_default_price',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}

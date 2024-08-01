const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return OswLicenseDetail.init(sequelize, DataTypes);
}

class OswLicenseDetail extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    license_id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    license_type: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      comment: "1=> SSB, 2=> PD, 3=> Old"
    },
    created_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      comment: "0 => Not used,1 => Active, 2 => Expired"
    },
    actual_amount: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: 0
    },
    discount_amount: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: 0
    },
    final_amount: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: 0
    },
    coupon_id: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    company_id: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'osw_license_details',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "license_id" },
        ]
      },
    ]
  });
  }
}

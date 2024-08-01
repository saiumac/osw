const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return OswLicenseOrder.init(sequelize, DataTypes);
}

class OswLicenseOrder extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    order_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    txn_id: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    actual_amount: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    final_amount: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      comment: "1=>process,2=>completed"
    },
    licenseid: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    licensetype: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    coupon: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    coupon_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: 0
    },
    licensename: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    purchase_by: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    mem_type: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    add_licence_num: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    ssb_license: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    pd_license: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    company_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    log_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    add_description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    members_data: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    payment_response: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    user_name: {
      type: DataTypes.STRING(25),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(25),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'osw_license_orders',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "order_id" },
        ]
      },
    ]
  });
  }
}

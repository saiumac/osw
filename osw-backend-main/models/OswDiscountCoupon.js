const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return OswDiscountCoupon.init(sequelize, DataTypes);
}

class OswDiscountCoupon extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    coupon_id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    coupon_code: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    created_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    effective_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    exipiration_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    used_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      comment: "0=> Not Used, 1 => Redemed, 2=> Expired, 3 => Deleted"
    },
    coupon_type: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      comment: "1=> Mini 4Di, 2=> Back to School, 3 => Existing Customers, 4 => SSB to PD"
    },
    discount_type: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      comment: "1=> $, 2=> %"
    },
    ssb_discount: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0
    },
    pd_discount: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0
    },
    no_of_licenses: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    no_of_licenses_used: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    company_id: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    member_id: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    associated_email: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    minimum_amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0
    },
    maximum_amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0
    },
    maximum_discount: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0
    },
    minimum_discount: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'osw_discount_coupons',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "coupon_id" },
        ]
      },
    ]
  });
  }
}

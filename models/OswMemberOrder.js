const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return OswMemberOrder.init(sequelize, DataTypes);
}

class OswMemberOrder extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    member_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    reference_code: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('Used','Not Used','Expaired'),
      allowNull: false,
      defaultValue: "Used"
    }
  }, {
    sequelize,
    tableName: 'osw_member_orders',
    timestamps: true,
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

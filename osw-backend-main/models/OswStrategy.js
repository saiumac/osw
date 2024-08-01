const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return OswStrategy.init(sequelize, DataTypes);
}

class OswStrategy extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    stratagy_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    stratagy_name: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('0','1'),
      allowNull: false,
      defaultValue: "0"
    }
  }, {
    sequelize,
    tableName: 'osw_strategy',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "stratagy_id" },
        ]
      },
    ]
  });
  }
}

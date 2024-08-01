const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return OswCoolWarmCount.init(sequelize, DataTypes);
}

class OswCoolWarmCount extends Sequelize.Model {
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
      allowNull: false
    },
    cool_count: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    warm_count: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    result: {
      type: DataTypes.STRING(20),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'osw_cool_warm_count',
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

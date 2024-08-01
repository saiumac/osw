const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return State.init(sequelize, DataTypes);
}

class State extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    code: {
      type: DataTypes.CHAR(2),
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(64),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'state',
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
      {
        name: "id",
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

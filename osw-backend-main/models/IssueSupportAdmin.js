const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return IssueSupportAdmin.init(sequelize, DataTypes);
}

class IssueSupportAdmin extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    user_name: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'issue_support_admin',
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
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}

const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return OswIssueStatus.init(sequelize, DataTypes);
}

class OswIssueStatus extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    issue_status: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    support_status: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'osw_issue_status',
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

const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return OswIssueAttachment.init(sequelize, DataTypes);
}

class OswIssueAttachment extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    attachment_id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    issue_id: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    attachment_name: {
      type: DataTypes.STRING(200),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'osw_issue_attachments',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "attachment_id" },
        ]
      },
      {
        name: "attachment_id",
        using: "BTREE",
        fields: [
          { name: "attachment_id" },
        ]
      },
    ]
  });
  }
}

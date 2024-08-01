const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return OswIssue.init(sequelize, DataTypes);
}

class OswIssue extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    issue_track_id: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    issue_type: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    issue_status: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    user_id: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    created_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    created_by: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    status: {
      type: DataTypes.STRING(20),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'osw_issues',
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

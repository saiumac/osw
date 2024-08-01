const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return OswAdministratorGroup.init(sequelize, DataTypes);
}

class OswAdministratorGroup extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    ag_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    group_id: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    administrator_id: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    crdate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('current_timestamp')
    },
    status: {
      type: DataTypes.STRING(10),
      allowNull: false,
      defaultValue: "A"
    },
    is_deleted: {
      type: DataTypes.ENUM('1','0'),
      allowNull: false,
      defaultValue: "0"
    }
  }, {
    sequelize,
    tableName: 'osw_administrator_groups',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ag_id" },
        ]
      },
      {
        name: "mg_id",
        using: "BTREE",
        fields: [
          { name: "ag_id" },
        ]
      },
      {
        name: "group_id",
        using: "BTREE",
        fields: [
          { name: "group_id" },
        ]
      },
      {
        name: "group_id_2",
        using: "BTREE",
        fields: [
          { name: "group_id" },
        ]
      },
    ]
  });
  }
}

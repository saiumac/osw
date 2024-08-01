const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return OswMemberGroup.init(sequelize, DataTypes);
}

class OswMemberGroup extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    mg_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    member_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'osw_members',
        key: 'member_id'
      }
    },
    group_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'osw_group',
        key: 'group_id'
      }
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
    tableName: 'osw_member_groups',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "mg_id" },
        ]
      },
      {
        name: "mg_id",
        using: "BTREE",
        fields: [
          { name: "mg_id" },
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
        name: "member_id",
        using: "BTREE",
        fields: [
          { name: "member_id" },
        ]
      },
      {
        name: "member_id_2",
        using: "BTREE",
        fields: [
          { name: "member_id" },
        ]
      },
      {
        name: "member_id_3",
        using: "BTREE",
        fields: [
          { name: "member_id" },
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

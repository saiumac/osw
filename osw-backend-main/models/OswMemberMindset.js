const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return OswMemberMindset.init(sequelize, DataTypes);
}

class OswMemberMindset extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    member_id: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    creative_thinking: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    creative_intuition: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    analytical_thinking: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    compassion: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    critical_thinking: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    beliefs_based: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    gut_intuition: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'osw_member_mindsets',
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
          { name: "member_id" },
        ]
      },
    ]
  });
  }
}

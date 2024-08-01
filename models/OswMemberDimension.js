const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return OswMemberDimension.init(sequelize, DataTypes);
}

class OswMemberDimension extends Sequelize.Model {
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
    creativity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    understanding: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    decisionmaking: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    personal_spirit: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'osw_member_dimensions',
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

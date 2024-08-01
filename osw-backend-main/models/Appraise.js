const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return Appraise.init(sequelize, DataTypes);
}

class Appraise extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    aspect_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    score_level_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    appraise: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'appraise',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "aspect_id" },
          { name: "score_level_id" },
        ]
      },
      {
        name: "aspect_id",
        using: "BTREE",
        fields: [
          { name: "aspect_id" },
        ]
      },
      {
        name: "score_level_id",
        using: "BTREE",
        fields: [
          { name: "score_level_id" },
        ]
      },
    ]
  });
  }
}

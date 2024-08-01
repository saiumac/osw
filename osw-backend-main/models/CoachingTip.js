const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return CoachingTip.init(sequelize, DataTypes);
}

class CoachingTip extends Sequelize.Model {
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
    tip: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'coaching_tips',
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

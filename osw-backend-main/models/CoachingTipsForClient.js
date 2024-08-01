const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return CoachingTipsForClient.init(sequelize, DataTypes);
}

class CoachingTipsForClient extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    aspect_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true
    },
    score_level: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true
    },
    tip: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    for_graph: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'coaching_tips_for_client',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "aspect_name" },
          { name: "score_level" },
        ]
      },
    ]
  });
  }
}

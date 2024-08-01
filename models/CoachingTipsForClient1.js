const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return CoachingTipsForClient1.init(sequelize, DataTypes);
}

class CoachingTipsForClient1 extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    aspect_name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    score_level: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    tip: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    coach_tips: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    for_graph: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'coaching_tips_for_client1',
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
    ]
  });
  }
}

const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return ScoreLevel.init(sequelize, DataTypes);
}

class ScoreLevel extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    score_level_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    level_name: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    level_value_start: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true
    },
    level_value_end: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true
    },
    section: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'score_level',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "score_level_id" },
        ]
      },
    ]
  });
  }
}

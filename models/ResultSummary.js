const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return ResultSummary.init(sequelize, DataTypes);
}

class ResultSummary extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    result_id: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    member_id: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    creative_thinking: {
      type: DataTypes.DECIMAL(14,0),
      allowNull: true
    },
    creative_intuition: {
      type: DataTypes.DECIMAL(12,0),
      allowNull: true
    },
    analytical_thinking: {
      type: DataTypes.DECIMAL(13,0),
      allowNull: true
    },
    compassion: {
      type: DataTypes.DECIMAL(13,0),
      allowNull: true
    },
    critical_thinking: {
      type: DataTypes.DECIMAL(14,0),
      allowNull: true
    },
    beliefs_based: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    gut_intuition: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    creativity: {
      type: DataTypes.DECIMAL(16,0),
      allowNull: true
    },
    understanding: {
      type: DataTypes.DECIMAL(16,0),
      allowNull: true
    },
    decision_making: {
      type: DataTypes.DECIMAL(16,0),
      allowNull: true
    },
    personal_spirit: {
      type: DataTypes.DECIMAL(13,0),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'result_summary',
    timestamps: false
  });
  }
}

const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return OswSection1Answered.init(sequelize, DataTypes);
}

class OswSection1Answered extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    answer_id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false
    },
    question1: {
      type: DataTypes.ENUM('', 'a', 'b'),
      allowNull: false,
      defaultValue: ''
    },
    question2: {
      type: DataTypes.ENUM('', 'a', 'b'),
      allowNull: false,
      defaultValue: ''
    },
    question3: {
      type: DataTypes.ENUM('', 'a', 'b'),
      allowNull: false,
      defaultValue: ''
    },
    question4: {
      type: DataTypes.ENUM('', 'a', 'b'),
      allowNull: false,
      defaultValue: ''
    },
    question5: {
      type: DataTypes.ENUM('', 'a', 'b'),
      allowNull: false,
      defaultValue: ''
    },
    question6: {
      type: DataTypes.ENUM('', 'a', 'b'),
      allowNull: false,
      defaultValue: ''
    },
    question7: {
      type: DataTypes.ENUM('', 'a', 'b'),
      allowNull: false,
      defaultValue: ''
    },
    question8: {
      type: DataTypes.ENUM('', 'a', 'b'),
      allowNull: false,
      defaultValue: ''
    },
    question9: {
      type: DataTypes.ENUM('', 'a', 'b'),
      allowNull: false,
      defaultValue: ''
    },
    question10: {
      type: DataTypes.ENUM('', 'a', 'b'),
      allowNull: false,
      defaultValue: ''
    },
    question11: {
      type: DataTypes.ENUM('', 'a', 'b'),
      allowNull: false,
      defaultValue: ''
    },
    question12: {
      type: DataTypes.ENUM('', 'a', 'b'),
      allowNull: false,
      defaultValue: ''
    },
    question13: {
      type: DataTypes.ENUM('', 'a', 'b'),
      allowNull: false,
      defaultValue: ''
    },
    question14: {
      type: DataTypes.ENUM('', 'a', 'b'),
      allowNull: false,
      defaultValue: ''
    },
    question15: {
      type: DataTypes.ENUM('', 'a', 'b'),
      allowNull: false,
      defaultValue: ''
    },
    question16: {
      type: DataTypes.ENUM('', 'a', 'b'),
      allowNull: false,
      defaultValue: ''
    },
    question17: {
      type: DataTypes.ENUM('', 'a', 'b'),
      allowNull: false,
      defaultValue: ''
    },
    question18: {
      type: DataTypes.ENUM('', 'a', 'b'),
      allowNull: false,
      defaultValue: ''
    },
    question19: {
      type: DataTypes.ENUM('', 'a', 'b'),
      allowNull: false,
      defaultValue: ''
    },
    question20: {
      type: DataTypes.ENUM('', 'a', 'b'),
      allowNull: false,
      defaultValue: ''
    },
    question21: {
      type: DataTypes.ENUM('', 'a', 'b'),
      allowNull: false,
      defaultValue: ''
    },
    question22: {
      type: DataTypes.ENUM('', 'a', 'b'),
      allowNull: false,
      defaultValue: ''
    },
    question23: {
      type: DataTypes.ENUM('', 'a', 'b'),
      allowNull: false,
      defaultValue: ''
    },
    question24: {
      type: DataTypes.ENUM('', 'a', 'b'),
      allowNull: false,
      defaultValue: ''
    },
    question25: {
      type: DataTypes.ENUM('', 'a', 'b'),
      allowNull: false,
      defaultValue: ''
    },
    question26: {
      type: DataTypes.ENUM('', 'a', 'b'),
      allowNull: false,
      defaultValue: ''
    },
    question27: {
      type: DataTypes.ENUM('', 'a', 'b'),
      allowNull: false,
      defaultValue: ''
    },
    question28: {
      type: DataTypes.ENUM('', 'a', 'b'),
      allowNull: false,
      defaultValue: ''
    },
    question29: {
      type: DataTypes.ENUM('', 'a', 'b'),
      allowNull: false,
      defaultValue: ''
    },
    question30: {
      type: DataTypes.ENUM('', 'a', 'b'),
      allowNull: false,
      defaultValue: ''
    },
    question31: {
      type: DataTypes.ENUM('', 'a', 'b'),
      allowNull: false,
      defaultValue: ''
    },
    question32: {
      type: DataTypes.ENUM('', 'a', 'b'),
      allowNull: false,
      defaultValue: ''
    },
    question33: {
      type: DataTypes.ENUM('', 'a', 'b'),
      allowNull: false,
      defaultValue: ''
    },
    question34: {
      type: DataTypes.ENUM('', 'a', 'b'),
      allowNull: false,
      defaultValue: ''
    },
    question35: {
      type: DataTypes.ENUM('', 'a', 'b'),
      allowNull: false,
      defaultValue: ''
    },
    question36: {
      type: DataTypes.ENUM('', 'a', 'b'),
      allowNull: false,
      defaultValue: ''
    },
    question37: {
      type: DataTypes.ENUM('', 'a', 'b'),
      allowNull: false,
      defaultValue: ''
    },
    question38: {
      type: DataTypes.ENUM('', 'a', 'b'),
      allowNull: false,
      defaultValue: ''
    },
    question39: {
      type: DataTypes.ENUM('', 'a', 'b'),
      allowNull: false,
      defaultValue: ''
    },
    question40: {
      type: DataTypes.ENUM('', 'a', 'b'),
      allowNull: false,
      defaultValue: ''
    },
    question41: {
      type: DataTypes.ENUM('', 'a', 'b'),
      allowNull: false,
      defaultValue: ''
    },
    question42: {
      type: DataTypes.ENUM('', 'a', 'b'),
      allowNull: false,
      defaultValue: ''
    },
    question43: {
      type: DataTypes.ENUM('', 'a', 'b'),
      allowNull: false,
      defaultValue: ''
    },
    question44: {
      type: DataTypes.ENUM('', 'a', 'b'),
      allowNull: false,
      defaultValue: ''
    },
    question45: {
      type: DataTypes.ENUM('', 'a', 'b'),
      allowNull: false,
      defaultValue: ''
    },
    total_questions_answered: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'osw_section1_answered',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "answer_id" },
        ]
      },
      {
        name: "user_id",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });
  }
}

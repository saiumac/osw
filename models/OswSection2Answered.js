const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return OswSection2Answered.init(sequelize, DataTypes);
}

class OswSection2Answered extends Sequelize.Model {
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
      type: DataTypes.ENUM('','1','2','3','4','5'),
      allowNull: false
    },
    question2: {
      type: DataTypes.ENUM('','1','2','3','4','5'),
      allowNull: false
    },
    question3: {
      type: DataTypes.ENUM('','1','2','3','4','5'),
      allowNull: false
    },
    question4: {
      type: DataTypes.ENUM('','1','2','3','4','5'),
      allowNull: false
    },
    question5: {
      type: DataTypes.ENUM('','1','2','3','4','5'),
      allowNull: false
    },
    question6: {
      type: DataTypes.ENUM('','1','2','3','4','5'),
      allowNull: false
    },
    question7: {
      type: DataTypes.ENUM('','1','2','3','4','5'),
      allowNull: false
    },
    question8: {
      type: DataTypes.ENUM('','1','2','3','4','5'),
      allowNull: false
    },
    question9: {
      type: DataTypes.ENUM('','1','2','3','4','5'),
      allowNull: false
    },
    question10: {
      type: DataTypes.ENUM('','1','2','3','4','5'),
      allowNull: false
    },
    question11: {
      type: DataTypes.ENUM('','1','2','3','4','5'),
      allowNull: false
    },
    question12: {
      type: DataTypes.ENUM('','1','2','3','4','5'),
      allowNull: false
    },
    question13: {
      type: DataTypes.ENUM('','1','2','3','4','5'),
      allowNull: false
    },
    question14: {
      type: DataTypes.ENUM('','1','2','3','4','5'),
      allowNull: false
    },
    question15: {
      type: DataTypes.ENUM('','1','2','3','4','5'),
      allowNull: false
    },
    question16: {
      type: DataTypes.ENUM('','1','2','3','4','5'),
      allowNull: false
    },
    question17: {
      type: DataTypes.ENUM('','1','2','3','4','5'),
      allowNull: false
    },
    question18: {
      type: DataTypes.ENUM('','1','2','3','4','5'),
      allowNull: false
    },
    question19: {
      type: DataTypes.ENUM('','1','2','3','4','5'),
      allowNull: false
    },
    question20: {
      type: DataTypes.ENUM('','1','2','3','4','5'),
      allowNull: false
    },
    question21: {
      type: DataTypes.ENUM('','1','2','3','4','5'),
      allowNull: false
    },
    question22: {
      type: DataTypes.ENUM('','1','2','3','4','5'),
      allowNull: false
    },
    question23: {
      type: DataTypes.ENUM('','1','2','3','4','5'),
      allowNull: false
    },
    question24: {
      type: DataTypes.ENUM('','1','2','3','4','5'),
      allowNull: false
    },
    total_questions_answered: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'osw_section2_answered',
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

const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return Question.init(sequelize, DataTypes);
}

class Question extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    question_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    question: {
      type: DataTypes.STRING(250),
      allowNull: false
    },
    video_url: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING(250),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'questions',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "question_id" },
        ]
      },
    ]
  });
  }
}

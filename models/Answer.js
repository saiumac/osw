const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return Answer.init(sequelize, DataTypes);
}

class Answer extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    answer_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    set_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'question_sets',
        key: 'set_id'
      }
    },
    id: {
      type: DataTypes.STRING(2),
      allowNull: false,
    },
    answer: {
      type: DataTypes.STRING(350),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'answers',
    timestamps: true,
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
        name: "set_id",
        using: "BTREE",
        fields: [
          { name: "set_id" },
        ]
      },
    ]
  });
  }
}

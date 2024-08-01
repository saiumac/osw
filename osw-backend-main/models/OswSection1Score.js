const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return OswSection1Score.init(sequelize, DataTypes);
}

class OswSection1Score extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    stratagy_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    score: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    zscore: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    percentile: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'osw_section1_scores',
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

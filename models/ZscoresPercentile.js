const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return ZscoresPercentile.init(sequelize, DataTypes);
}

class ZscoresPercentile extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    zscores: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      primaryKey: true
    },
    percentile: {
      type: DataTypes.DOUBLE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'zscores_percentiles',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "zscores" },
        ]
      },
    ]
  });
  }
}

const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return Aspect.init(sequelize, DataTypes);
}

class Aspect extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    aspect_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    aspect_name: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    mean: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    sd: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    section: {
      type: DataTypes.TINYINT.UNSIGNED,
      allowNull: true
    },
    color: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'aspects',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "aspect_id" },
        ]
      },
    ]
  });
  }
}

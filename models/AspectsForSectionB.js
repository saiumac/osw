const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return AspectsForSectionB.init(sequelize, DataTypes);
}

class AspectsForSectionB extends Sequelize.Model {
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
      type: DataTypes.TINYINT,
      allowNull: false
    },
    color: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'aspects_for_section_b',
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

const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return OswPersonalDevelopmentTip.init(sequelize, DataTypes);
}

class OswPersonalDevelopmentTip extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    aspect_name: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    strength: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    capability: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'osw_personal_development_tips',
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

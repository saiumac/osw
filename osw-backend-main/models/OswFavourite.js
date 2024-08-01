const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return OswFavourite.init(sequelize, DataTypes);
}

class OswFavourite extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    fav_id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    fav_name: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    fav_crdate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    fav_status: {
      type: DataTypes.ENUM('0','1'),
      allowNull: false,
      comment: "\"0\"=>active,\"1\"=>inactive"
    }
  }, {
    sequelize,
    tableName: 'osw_favourites',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "fav_id" },
        ]
      },
    ]
  });
  }
}

const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return OswFavMem.init(sequelize, DataTypes);
}

class OswFavMem extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    fav_mem_id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    fav_id: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    member_id: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    is_deleted: {
      type: DataTypes.ENUM('0','1'),
      allowNull: false,
      defaultValue: "0",
      comment: "0=>Not deleted,1=>deleted"
    },
    crdate: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'osw_fav_mems',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "fav_mem_id" },
        ]
      },
    ]
  });
  }
}

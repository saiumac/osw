const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return OswSubscribeEmail.init(sequelize, DataTypes);
}

class OswSubscribeEmail extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    post_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('1','0'),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'osw_subscribe_email',
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

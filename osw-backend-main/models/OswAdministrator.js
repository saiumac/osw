const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return OswAdministrator.init(sequelize, DataTypes);
}

class OswAdministrator extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    administrator_id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    crdate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('current_timestamp')
    },
    first_name: {
      type: DataTypes.STRING(250),
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING(250),
      allowNull: false
    },
    mobile: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    fax: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(250),
      allowNull: false
    },
    list_of_companies: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    login: {
      type: DataTypes.STRING(150),
      allowNull: true
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    status: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: "A"
    },
    user_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: {
        model: 'users',
        key: 'user_id'
      }
    },
    admintype: {
      type: DataTypes.STRING(30),
      allowNull: false,
      defaultValue: "A"
    },
    is_primary: {
      type: DataTypes.ENUM('1','0'),
      allowNull: false,
      defaultValue: "0"
    },
    is_deleted: {
      type: DataTypes.ENUM('0','1'),
      allowNull: false,
      defaultValue: "0"
    }
  }, {
    sequelize,
    tableName: 'osw_administrator',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "administrator_id" },
        ]
      },
      {
        name: "administrator_id",
        using: "BTREE",
        fields: [
          { name: "administrator_id" },
        ]
      },
      {
        name: "user_id",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });
  }
}

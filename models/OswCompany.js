const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return OswCompany.init(sequelize, DataTypes);
}

class OswCompany extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    company_id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    company_name: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    employee_count: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    street: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    country: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    state: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    postal_code: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    telephone: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    fax: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    logo: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    crdate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('current_timestamp')
    },
    status: {
      type: DataTypes.STRING(30),
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
    is_deleted: {
      type: DataTypes.ENUM('1','0'),
      allowNull: false,
      defaultValue: "0"
    },
    is_search: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    sector: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'osw_company',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "company_id" },
        ]
      },
      {
        name: "company_id",
        using: "BTREE",
        fields: [
          { name: "company_id" },
        ]
      },
      {
        name: "user_id",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
      {
        name: "user_id_2",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
      {
        name: "user_id_3",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
      {
        name: "sector",
        using: "BTREE",
        fields: [
          { name: "sector" },
        ]
      },
    ]
  });
  }
}

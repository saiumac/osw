const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return OswCompanyLicence.init(sequelize, DataTypes);
}

class OswCompanyLicence extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    log_id: {
      autoIncrement: true,
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    add_licence_num: {
      type: DataTypes.STRING(11),
      allowNull: true
    },
    ssb_license: {
      type: DataTypes.STRING(10),
      allowNull: false,
      defaultValue: "0"
    },
    pd_license: {
      type: DataTypes.STRING(10),
      allowNull: false,
      defaultValue: "0"
    },
    add_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    add_description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    company_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'osw_company_licence',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "log_id" },
        ]
      },
      {
        name: "company_id",
        using: "BTREE",
        fields: [
          { name: "company_id" },
        ]
      },
    ]
  });
  }
}

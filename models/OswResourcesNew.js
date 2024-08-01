const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return OswResourcesNew.init(sequelize, DataTypes);
}

class OswResourcesNew extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    resource_id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    resources_name: {
      type: DataTypes.STRING(1000),
      allowNull: false
    },
    resources_description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    resources_file_name: {
      type: DataTypes.STRING(1000),
      allowNull: false
    },
    resources_file_type: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      comment: "1 => File, 2 => Video"
    },
    resources_file_extension: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    for_ssb_pdp: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      comment: "1 => SSB, 2 => PDP"
    },
    is_for_demo: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
      comment: "1 => Yes, 0 => No"
    },
    uploaded_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    uploaded_user_type: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "0=member,1=company admin,2=admin"
    },
    uploaded_user_id: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    uploaded_company_id: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    is_deleted: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      comment: "0 => No, 1 => Yes"
    }
  }, {
    sequelize,
    tableName: 'osw_resources_new',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "resource_id" },
        ]
      },
    ]
  });
  }
}

const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return OswResource.init(sequelize, DataTypes);
}

class OswResource extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    resource_id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    uploaded_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('current_timestamp')
    },
    uploaded_by: {
      type: DataTypes.STRING(100),
      allowNull: false,
      comment: "'3' means company subadmin ,'2' means superadmin , '1' means company"
    },
    filename: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    file: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    type: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: "file"
    },
    file_extension: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    user_id: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    company_id: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    is_deleted: {
      type: DataTypes.ENUM('1','0'),
      allowNull: false,
      defaultValue: "0"
    }
  }, {
    sequelize,
    tableName: 'osw_resources',
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

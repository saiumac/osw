const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return OswMemberLicense.init(sequelize, DataTypes);
}

class OswMemberLicense extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    member_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: 0
    },
    license_type: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    updated_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    licence_status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      comment: "1 => Active, 2 => Inactive"
    },
    license_id: {
      type: DataTypes.BIGINT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'osw_member_license',
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

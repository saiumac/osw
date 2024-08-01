const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return OswMember.init(sequelize, DataTypes);
}

class OswMember extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    member_id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    member_age: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    member_gender: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    member_education: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    member_ocupation: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    member_industry: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    job_category: {
      type: DataTypes.STRING(80),
      allowNull: true
    },
    company_id: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    crdate: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('current_timestamp')
    },
    first_name: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    last_name: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    member_country: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    profile_visible: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    status: {
      type: DataTypes.STRING(10),
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
    is_4dicompleted: {
      type: DataTypes.ENUM('0','1'),
      allowNull: false,
      defaultValue: "0"
    },
    accept_terms: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    member_mobile: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    member_ext: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    is_deleted: {
      type: DataTypes.ENUM('0','1'),
      allowNull: false,
      defaultValue: "0"
    },
    administrator_id: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    isprivate: {
      type: DataTypes.ENUM('0','1'),
      allowNull: false,
      defaultValue: "0"
    },
    is_search: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    license_type: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      comment: "1=> SSB, 2=> PD, 3=> Old"
    },
    accept_mailing: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'osw_members',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "member_id" },
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
        name: "member_id",
        using: "BTREE",
        fields: [
          { name: "member_id" },
        ]
      },
    ]
  });
  }
}

const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return ProfileResult.init(sequelize, DataTypes);
}

class ProfileResult extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    result_id: {
      autoIncrement: true,
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    member_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true
    },
    brainstorm: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true
    },
    challenge: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true
    },
    reframe: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true
    },
    envision: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true
    },
    flow: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true
    },
    flash_of_insight: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true
    },
    scan: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true
    },
    structure: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true
    },
    clarify: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true
    },
    tune_in: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true
    },
    empathize: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true
    },
    express: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true
    },
    crux: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true
    },
    conclude: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true
    },
    validate: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true
    },
    experience: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true
    },
    values_driven: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true
    },
    trust_your_heart: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true
    },
    your_outlook: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true
    },
    your_sense_of_control: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true
    },
    your_initiative: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true
    },
    completed_date: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'profile_results',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "result_id" },
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

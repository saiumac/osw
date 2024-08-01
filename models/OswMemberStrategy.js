const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return OswMemberStrategy.init(sequelize, DataTypes);
}

class OswMemberStrategy extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    member_id: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    brainstorm: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    challenge: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    clarify: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    conclude: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    crux: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    empathize: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    envision: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    experience: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    express: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    flash_of_insight: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    flow: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    reframe: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    scan: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    structure: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    tune_in: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    trust_your_heart: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    validate: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    values_driven: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    your_initiative: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    your_outlook: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    your_sense_of_control: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    your_initiative_raw: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    your_outlook_raw: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    your_sense_of_control_raw: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: 'osw_member_strategies',
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

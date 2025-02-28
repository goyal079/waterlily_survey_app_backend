module.exports = (sequelize, DataTypes) => {
    const Application = sequelize.define("Applications", {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: /^\+?1?\d{10,15}$/,
          notEmpty: true
        }
      },
      dateOfBirth: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      zipCode: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: /^\d{5}(-\d{4})?$/,
          notEmpty: true
        }
      },
      hasChronicConditions: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      chronicConditionDetails: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: 'N/A',
      },
      smokingStatus: {
        type: DataTypes.ENUM('never', 'former', 'active'),
        allowNull: false,
        defaultValue: 'never',
      },
      annualIncome: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false,
      },
      hasSavings: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      hasInsurance: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      }
    }, {
      timestamps: true,
      tableName: 'applications'
    });
  
    return Application;
  };

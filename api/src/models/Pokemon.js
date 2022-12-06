const { DataTypes } = require('sequelize');

 module.exports = (sequelize) => {

  sequelize.define('pokemon', {
    ID: {
      type: DataTypes.UUID,  
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    Nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Vida: {
      type: DataTypes.INTEGER 
    },
    Ataque: {
      type: DataTypes.INTEGER
    },
    Defensa: {
      type: DataTypes.INTEGER
    },
    Velocidad: {
      type: DataTypes.INTEGER
    },
    Altura: {
      type: DataTypes.INTEGER
    },
    Peso: {
      type: DataTypes.INTEGER
    },
    Imagen: {
      type: DataTypes.STRING
    },
    IdFake: {
      type: DataTypes.INTEGER
    }
   
  },
  {
    timestamps: false 
  });
};

 
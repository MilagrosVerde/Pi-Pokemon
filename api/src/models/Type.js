const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
    sequelize.define("tipo", {
        ID: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        Nombre: {
            type: DataTypes.STRING
        }
    },
    {
        timestamps: false
    })
}
 
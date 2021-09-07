module.exports = (sequelize, dataTypes) => {
    let alias = "Operación";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            notNull: true,
            autoIncrement: true
        },

        id_usuario: {
            type: dataTypes.INTEGER,
            notNull: true
        },

        importe_total: {
            type: dataTypes.INTEGER,
            notNull: true
        },

        fecha_operacion: {
            type: dataTypes.DATE,
            notNull: true
        },
        
    }
    let config = {
        tableName: "Operación",
        timestamps: false
    }

    const Operación = sequelize.define(alias, cols, config);


    return Operación;
}
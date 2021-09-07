module.exports = (sequelize, dataTypes) => {
    let alias = "DetalleOperacion";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            notNull: true,
            autoIncrement: true
        },

        id_producto_FK: {
            type: dataTypes.INTEGER,
            notNull: true
        },

        id_operacion_FK: {
            type: dataTypes.INTEGER,
            notNull: true
        },

        unidades: {
            type: dataTypes.INTEGER,
            notNull: true
        },

        importe: {
            type: dataTypes.INTEGER,
            notNull: true
        },
        
    }
    let config = {
        tableName: "DetalleOperacion",
        timestamps: false
    }

    const DetalleOperacion = sequelize.define(alias, cols, config);


    return DetalleOperacion;
}
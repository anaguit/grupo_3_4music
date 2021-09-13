module.exports = (sequelize, dataTypes) => {
    let alias = "DetalleOperacion";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            notNull: true,
            autoIncrement: true
        },

        id_producto: {
            type: dataTypes.INTEGER,
            notNull: true
        },

        id_operacion: {
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
        tableName: "detalle_operacion",
        timestamps: false
    }

    const DetalleOperacion = sequelize.define(alias, cols, config);

    DetalleOperacion.associate = function(models){
        DetalleOperacion.belongsTo(models.Operacion, {
            as: "operacion",
            foreignKey: "id_operacion"
        }),
        DetalleOperacion.belongsTo(models.Producto, {
            as: "producto",
            foreignKey: "id_producto"
        })
    }

    return DetalleOperacion;
}
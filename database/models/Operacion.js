module.exports = (sequelize, dataTypes) => {
    let alias = "Operacion";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            notNull: true,
            autoIncrement: true
        },

        id_comprador: {
            type: dataTypes.INTEGER,
            notNull: true
        },

        id_vendedor: {
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
        tableName: "operacion",
        timestamps: false
    }

    const Operacion = sequelize.define(alias, cols, config);

    Operacion.associate = function(models){
        Operacion.belongsTo(models.Usuario, {
            as: "comprador",
            foreignKey: "id_comprador"
        }),
        Operacion.belongsTo(models.Usuario, {
            as: "vendedor",
            foreignKey: "id_vendedor"
        }),
        Operacion.hasMany(models.DetalleOperacion, {
            as: "detalle_operacion",
            foreignKey: "id_operacion"
        })
    }

    return Operacion;
}
module.exports = (sequelize, dataTypes) => {
    let alias = "Producto";
    let cols = {
        id_producto: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            notNull: true,
            autoIncrement: true
        },
        id_categoria: {
            type: dataTypes.INTEGER,
            notNull: true
        },
        titulo: {
            type: dataTypes.STRING(100),
            notNull: true
        },
        precio: {
            type: dataTypes.INTEGER,
            notNull: true
        },
        descripcion: {
            type: dataTypes.TEXT,
            notNull: true
        },
        marca: {
            type: dataTypes.STRING(100),
            notNull: true
        },
        modelo: {
            type: dataTypes.STRING(100),
            notNull: true
        },
        cantidad_disponible: {
            type: dataTypes.INTEGER,
            notNull: true
        }
    }
    let config = {
        tableName: "producto",
        timestamps: false
    }

    const Producto = sequelize.define(alias, cols, config);


    return Producto;
}
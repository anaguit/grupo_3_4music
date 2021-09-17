module.exports = (sequelize, dataTypes) => {
    let alias = "Producto";
    let cols = {
        id: {
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

    Producto.associate = function(models){
        Producto.hasMany(models.Producto_Genero, {
            as: "producto_genero",
            foreignKey: "id_producto"
        })
        Producto.hasMany(models.Foto, {
            as: "fotos",
            foreignKey: "id_producto"
        })
        Producto.belongsTo(models.Categoria, {
            as: "categoria",
            foreignKey: "id_categoria"
        })
        /*
        Producto.belongsToMany(models.Operacion, {
            as: "operaciones",
            through: "DetalleOperacion",
            foreignKey: "id_producto",
            otherKey: "id_operacion",
            timestamps: false
        })
        Producto.belongsToMany(models.Genero_Musical, {
            as: "generosMusicales",
            through: "Producto_Genero",
            foreignKey: "id_producto",
            otherKey: "id_genero_musical",
            timestamps: false
        })
        */
    }

    return Producto;
}
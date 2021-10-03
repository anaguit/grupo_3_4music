module.exports = (sequelize, dataTypes) => {
    let alias = "Usuario";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            notNull: true,
            autoIncrement: true
        },
        nombre: {
            type: dataTypes.STRING(100),
            notNull: true
        },
        apellido: {
            type: dataTypes.STRING(100),
            notNull: true
        },
        email: {
            type: dataTypes.STRING(60),
            notNull: true
        },
        telefono: {
            type: dataTypes.STRING(60),
            notNull: true
        },
        clave: {
            type: dataTypes.STRING(100),
            notNull: true
        },
        foto_perfil: {
            type: dataTypes.STRING(100),
            notNull: true
        },
        rol: {
            type: dataTypes.ENUM('comprador','vendedor'),
            notNull: true
        }
    }
    let config = {
        tableName: "usuario",
        timestamps: false
    }

    const Usuario = sequelize.define(alias, cols, config);

    Usuario.associate = function(models) {
        Usuario.hasMany(models.Operacion, {
            as: "operacion_compra",
            foreignKey: "id_comprador"
        })
        Usuario.hasMany(models.Operacion, {
            as: "operacion_venta",
            foreignKey: "id_vendedor"
        })
        Usuario.hasMany(models.Producto, {
            as: "publicacion",
            foreignKey: "id_usuario_FK"
        })
    }

    return Usuario;
}
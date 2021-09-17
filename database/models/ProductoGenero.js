module.exports = (sequelize, dataTypes) => {
    let alias = "Producto_Genero";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            notNull: true,
            autoIncrement: true
        },
        id_producto: {
            type: dataTypes.INTEGER,
            notNull: true,
        },
        id_genero_musical: {
            type: dataTypes.INTEGER,
            notNull: true,
        }
    }
    let config = {
        tableName: "producto_genero",
        timestamps: false
    }

    const Producto_Genero = sequelize.define(alias, cols, config);
    
    Producto_Genero.associate = function(models) {
        Producto_Genero.belongsTo(models.Producto, {
            as: "producto",
            foreignKey: "id"
        })
        Producto_Genero.belongsTo(models.Genero_Musical, {
            as: "genero",
            foreignKey: "id_genero_musical"
        })
        
    }

    return Producto_Genero;
}
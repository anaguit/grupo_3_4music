module.exports = (sequelize, dataTypes) => {
    let alias = "Genero_Musical";
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
        }
    }
    let config = {
        tableName: "genero_musical",
        timestamps: false
    }

    const Genero_Musical = sequelize.define(alias, cols, config);
    
    /*Genero_Musical.associate = function(models) {
        Genero_Musical.belongsToMany(models.Producto, {
            as: "productos",
            through: "Producto_Genero",
            foreignKey: "id_genero_musical",
            otherKey: "id_producto",
            timestamps: false
        })
    }*/

    return Genero_Musical;
}
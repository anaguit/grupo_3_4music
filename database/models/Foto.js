module.exports = (sequelize, dataTypes) => {
    let alias = "Foto";
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

        url: {
            type: dataTypes.STRING(100),
            notNull: true
        },
        
    }
    let config = {
        tableName: "foto",
        timestamps: false
    }

    const Foto = sequelize.define(alias, cols, config);

    Foto.associate = function(models){
        Foto.belongsTo(models.Producto, {
            as: "producto",
            foreignKey: "id_producto"
        })
    }
    return Foto;
}
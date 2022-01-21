const mongoose = require('mongoose');


//Transaccion:Resgitra todas las ventas de productos en la canasta
exports.compraProductosCanasta = async function (req, res) {

    const session = await mongoose.startSession();

    try {
        await session.withTransaction(
            async () => {
                const venta = mongoose.model('Venta');
                for (let ventas of req.body) {
                    var venta_nueva = new venta({ "idComprador": ventas.idComprador, "idVendedor": ventas.idVendedor, "nombreProducto": ventas.nombreProducto, "cantidad": ventas.cantidad, "fecha": ventas.fecha, "precio": ventas.precio });
                    await venta_nueva.save({ session });
                }
            })
        res.json(req.body);
    } catch (err) {
        res.status(500).send(err);
    }
    finally {
        await session.endSession();
    }

}

//Transaccion:Actualizar productos
exports.modificaMiProducto = async function (req, res) {

    const session = await mongoose.startSession();
    try {
        const producto = mongoose.model('Producto');
        const venta = mongoose.model('Venta');
        const voto = mongoose.model('Voto');
        let productoActualizado = null;
        await session.withTransaction(
            async () => {
                if (req.query.nombre === req.body.nombre)
                    productoActualizado = await producto.findOneAndUpdate({ "nombre": req.query.nombre, "idVendedor": req.query.idVendedor }, req.body, { session });
                else {
                    productoActualizado = await producto.findOneAndUpdate({ "nombre": req.query.nombre, "idVendedor": req.query.idVendedor }, req.body, { session });
                    await venta.updateMany({ "idVendedor": req.query.idVendedor, "nombreProducto": req.query.nombre }, { "nombreProducto": req.body.nombre }, { session });
                    await voto.updateMany({ "idVendedor": req.query.idVendedor, "nombre": req.query.nombre }, { "nombre": req.body.nombre }, { session });
                }
            })
        if (productoActualizado)
            res.json(productoActualizado);
        else
            res.status(500).send('');
    } catch (err) {
        res.status(500).send(err);
        console.log(err);
    }
    finally {
        await session.endSession();
    }
}


//Transaccion:Votacion
exports.calificaProducto = async function (req, res) {

    const session = await mongoose.startSession();

    try {
        await session.withTransaction(
            async () => {
                const voto = mongoose.model('Voto');
                const producto = mongoose.model('Producto');
                if (await voto.findOne({ 'nombre': req.body.nombre, 'idVendedor': req.body.idVendedor, 'idVotante': req.body.idVotante }))
                    await voto.findOneAndUpdate({ 'nombre': req.body.nombre, 'idVendedor': req.body.idVendedor, 'idVotante': req.body.idVotante }, req.body, { session })
                else {
                    const nuevoVoto = new voto(req.body);
                    await nuevoVoto.save({ session });
                }
                const calificacion = await voto.aggregate([{ "$match": { 'nombre': req.body.nombre, 'idVendedor': req.body.idVendedor } }, { "$group": { "_id": null, "calificacionTotal": { "$sum": "$puntuacion" }, "cantidad": { "$sum": 1 } } }], { session });
                if (calificacion.length > 0)
                    await producto.findOneAndUpdate({ 'nombre': req.body.nombre, 'idVendedor': req.body.idVendedor }, { "calificacion": ((calificacion[0].calificacionTotal) / (calificacion[0].cantidad)) }, { session });
                else
                    await producto.findOneAndUpdate({ 'nombre': req.body.nombre, 'idVendedor': req.body.idVendedor }, { "calificacion": req.body.puntuacion }, { session });
            })
        res.json(req.body);
    } catch (err) {
        res.status(500).send(err);
    }
    finally {
        await session.endSession();
    }
}

//Transaccion:Elimina mi producto y sus votos
exports.eliminarMiProducto = async function (req, res) {

    const session = await mongoose.startSession();

    try {
        await session.withTransaction(
            async () => {
                const producto = mongoose.model('Producto');
                const voto = mongoose.model('Voto');
                const productoEliminado = await producto.findOneAndDelete({ 'nombre': req.body.nombre, 'idVendedor': req.body.idVendedor }, { session })
                await voto.deleteMany({ 'nombre': req.body.nombre, 'idVendedor': req.body.idVendedor }, { session })
                res.json(productoEliminado);
            })

    } catch (err) {
        res.status(500).send(err);
    }
    finally {
        await session.endSession();
    }
}

//Elimina mi usuario
exports.eliminarMiUsuario = async function (req, res) {

    const session = await mongoose.startSession();

    try {
        await session.withTransaction(
            async () => {
                const producto = mongoose.model('Producto');
                const usuario = mongoose.model('Usuario');
                const voto = mongoose.model('Voto');
                const usuarioEliminado = await usuario.findOneAndDelete({ 'ruc': req.body.id }, { session })
                await producto.deleteMany({ 'idVendedor': req.body.id }, { session })
                await voto.deleteMany({ 'idVotante': req.body.id }, { session })
                res.json(usuarioEliminado);
            })

    } catch (err) {
        res.status(500).send(err);
    }
    finally {
        await session.endSession();
    }
}
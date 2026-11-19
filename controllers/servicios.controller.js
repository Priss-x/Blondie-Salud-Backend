
let servicios = [
    {id: 1, nombre: "Medicina General", descripcion: "Consulta médica general", precio: 18000},
    {id: 2, nombre: "Pediatría", descripcion: "Atención médica infantil", precio: 25000},
    {id: 3, nombre: "Neurología", descripcion: "Atención de enfermedades neurológicas", precio: 35000},
    {id: 4, nombre: "Toma de muestras", descripcion: "Exámenes de laboratorio", precio: 8000}
]


let siguienteId = 5

function listarServicios(req, res) {res.json(servicios)}

function crearServicio(req, res) {
    const {nombre, descripcion, precio} = req.body

    if (!nombre || !descripcion || precio === undefined || precio === null || precio === "") {
        return res.status(400).json({mensaje: "Todos los campos son obligatorios"})
    }
    if (typeof precio !== "number" || !Number.isFinite(precio) || precio < 0) {
        return res.status(400).json({mensaje: "El precio debe ser un número válido"})
    }
    const nuevoServicio = {id: siguienteId++, nombre, descripcion, precio}
    servicios.push(nuevoServicio)

    res.status(201).json({mensaje: "Servicio creado correctamente", servicio: nuevoServicio})
}



function actualizarServicio(req, res) {
    const id = Number(req.params.id)
    const {nombre, descripcion, precio} = req.body
    const servicio = servicios.find(item => item.id === id)

    if (!servicio) {
        return res.status(404).json({mensaje: "Servicio no encontrado"})
    }
    if (!nombre || !descripcion || precio === undefined || precio === null || precio === "") {
        return res.status(400).json({mensaje: "Todos los campos son obligatorios"})
    }
    if (typeof precio !== "number" || !Number.isFinite(precio) || precio < 0) {
        return res.status(400).json({mensaje: "El precio debe ser un número válido"})
    }

    servicio.nombre = nombre
    servicio.descripcion = descripcion
    servicio.precio = precio

    res.json({mensaje: "Servicio actualizado correctamente",servicio})
}


function eliminarServicio(req, res) {
    const id = Number(req.params.id)
    const indice = servicios.findIndex(item => item.id === id)

    if (indice === -1) {
        return res.status(404).json({mensaje: "Servicio no encontrado"})
    }
    servicios.splice(indice, 1)
    res.json({mensaje: "Servicio eliminado correctamente"})
}
module.exports = {listarServicios, crearServicio, actualizarServicio, eliminarServicio}

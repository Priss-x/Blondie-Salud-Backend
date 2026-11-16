
let servicios = [
    {id: 1, nombre: "Medicina General", descripcion: "Consulta médica general"},
    {id: 2, nombre: "Pediatría", descripcion: "Atención médica infantil"},
    {id: 3, nombre: "Neurología", descripcion: "Atención de enfermedades neurológicas"},
    {id: 4, nombre: "Toma de muestras", descripcion: "Exámenes de laboratorio"}
]

let siguienteId = 5

function listarServicios(req, res) {res.json(servicios)}
function crearServicio(req, res) {
    const {nombre, descripcion} = req.body

    if (!nombre || !descripcion) {
        return res.status(400).json({mensaje: "Todos los campos son obligatorios"})
    }

    const nuevoServicio = {id: siguienteId++, nombre, descripcion}

    servicios.push(nuevoServicio)

    res.status(201).json({mensaje: "Servicio creado correctamente", servicio: nuevoServicio})
}

function actualizarServicio(req, res) {
    const id = Number(req.params.id)
    const {nombre, descripcion} = req.body

    const servicio = servicios.find(item => item.id === id)

    if (!servicio) {
        return res.status(404).json({mensaje: "Servicio no encontrado"})
    }
    if (!nombre || !descripcion) {
        return res.status(400).json({mensaje: "Todos los campos son obligatorios"})
    }
    servicio.nombre = nombre
    servicio.descripcion = descripcion

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

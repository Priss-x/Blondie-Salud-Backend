
let horasMedicas = []
let examenes = []
let siguienteOrden = 1001

function generarOrden() {return siguienteOrden++}


function agendarHora(req, res) {
    const {run, especialidad, medico, fecha, hora} = req.body
    if (!run || !especialidad || !medico || !fecha || !hora) {
        return res.status(400).json({mensaje: "Todos los campos son obligatorios"})
    }
    if (run !== req.usuario.run) {
        return res.status(403).json({mensaje: "No puedes agendar para otro paciente"})
    }

    
const ocupada = horasMedicas.some((reserva) =>
    reserva.medico === medico && reserva.fecha === fecha && reserva.hora === hora && reserva.estado !== "Cancelada")


    if (ocupada) {
        return res.status(409).json({mensaje: "Esta hora ya está ocupada para ese médico"})
    }
    const nuevaHora = {numeroOrden: generarOrden(), run, especialidad, medico, fecha, hora, estado: "Agendada"}
    horasMedicas.push(nuevaHora)

    res.status(201).json({mensaje: "Hora médica agendada correctamente",reserva: nuevaHora})
}



function agendarExamen(req, res) {
    const {run, examen, fecha, hora} = req.body

    if (!run || !examen || !fecha || !hora) {
        return res.status(400).json({mensaje: "Todos los campos son obligatorios"})
    }
    if (run !== req.usuario.run) {
        return res.status(403).json({mensaje: "No puedes agendar para otro paciente"})
    }
    const ocupada = examenes.some((reserva) => reserva.fecha === fecha && reserva.hora === hora)

    if (ocupada) {
        return res.status(409).json({mensaje: "Este horario de laboratorio ya está ocupado"})
    }

    const nuevoExamen = {numeroOrden: generarOrden(), run, examen, fecha, hora, estado: "Agendado"}
    examenes.push(nuevoExamen)

    res.status(201).json({mensaje: "Examen agendado correctamente", reserva: nuevoExamen})
}

function reagendarHora(req, res) {
    const numeroOrden = Number(req.params.numeroOrden)
    const {fecha, hora} = req.body
    const reserva = horasMedicas.find((item) => item.numeroOrden === numeroOrden)

    if (!reserva) {return res.status(404).json({mensaje: "No se encontró la reserva"})}
    if (reserva.run !== req.usuario.run) {return res.status(403).json({mensaje: "No tienes permiso para modificar esta reserva"})}
    if (reserva.estado === "Cancelada") {return res.status(400).json({mensaje: "No puedes reagendar una hora cancelada"})}
    if (!fecha || !hora) {return res.status(400).json({mensaje: "Debes indicar la nueva fecha y hora"})}

    const ocupada = horasMedicas.some((item) =>
        item.numeroOrden !== numeroOrden && item.medico === reserva.medico && item.fecha === fecha && item.hora === hora && item.estado !== "Cancelada")

    if (ocupada) {return res.status(409).json({mensaje: "Ese horario ya está ocupado para ese médico"})}

    reserva.fecha = fecha
    reserva.hora = hora
    reserva.estado = "Reagendada"

    res.json({mensaje: "Hora médica reagendada correctamente", reserva})
}

function cancelarHora(req, res) {
    const numeroOrden = Number(req.params.numeroOrden)

    const reserva = horasMedicas.find(item => item.numeroOrden === numeroOrden)
    if (!reserva) {return res.status(404).json({mensaje: "No se encontró la reserva"})}
    if (reserva.run !== req.usuario.run) {return res.status(403).json({mensaje: "No puedes cancelar esta reserva"})}
    if (reserva.estado === "Cancelada") {return res.status(400).json({mensaje: "Esta hora ya fue cancelada"})}

    reserva.estado = "Cancelada"
    res.json({mensaje: "Hora médica cancelada correctamente",reserva})
}

function obtenerMisReservas(req, res) {
    const run = req.usuario.run
    const misHoras = horasMedicas.filter((item) => item.run === run)
    const misExamenes = examenes.filter((item) => item.run === run)

    res.json({horasMedicas: misHoras, examenes: misExamenes})
}

module.exports = {agendarHora, agendarExamen, reagendarHora, cancelarHora,obtenerMisReservas}

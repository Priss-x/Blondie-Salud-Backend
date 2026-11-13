
const bcrypt = require("bcryptjs")

let pacientes = []

function ocultarPassword(paciente) {
    const { password, ...datosPaciente } = paciente
    return datosPaciente
}

const obtenerPacientes = (req, res) => {
    const pacientesSeguros = pacientes.map(ocultarPassword)
    res.json(pacientesSeguros)
}

const crearPaciente = async (req, res) => {
    try {
        const paciente = req.body

        if (!paciente.run || !paciente.email || !paciente.password) {
            return res.status(400).json({mensaje: "RUN, correo y contraseña son obligatorios, intente nuevamente"})}

        const existe = pacientes.some((p) => p.run === paciente.run || p.email === paciente.email)

        if (existe) {
            return res.status(409).json({mensaje: "El RUN o correo ya está registrado"})
        }

        const passwordHash = await bcrypt.hash(paciente.password, 10)
        const nuevoPaciente = {...paciente, password: passwordHash}

        pacientes.push(nuevoPaciente)

        res.status(201).json({mensaje: "Paciente registrado correctamente", paciente: ocultarPassword(nuevoPaciente)})

    } catch (error) {
        res.status(500).json({mensaje: "Error al registrar el paciente"})
    }
}

const actualizarPaciente = async (req, res) => {
    try {
        const { run } = req.params
        const indice = pacientes.findIndex((p) => p.run === run)

        if (indice === -1) {
            return res.status(404).json({mensaje: "Paciente no encontrado"})
        }
        const datosNuevos = { ...req.body }

        delete datosNuevos.run

        if (datosNuevos.password !== undefined) {
            if (
                typeof datosNuevos.password !== "string" || datosNuevos.password.length < 6) {
                return res.status(400).json({mensaje: "La contraseña debe tener al menos 6 caracteres"})
            }
            datosNuevos.password = await bcrypt.hash(datosNuevos.password,10)
        }

        pacientes[indice] = {...pacientes[indice], ...datosNuevos, run}
    
        res.json({mensaje: "Paciente actualizado correctamente", paciente: ocultarPassword(pacientes[indice])})

    } catch (error) {
        res.status(500).json({mensaje: "Error al actualizar el paciente"})
    }
}
const eliminarPaciente = (req, res) => {
    const { run } = req.params
    const indice = pacientes.findIndex((p) => p.run === run)

    if (indice === -1) {
        return res.status(404).json({mensaje: "Paciente no encontrado"})
    }

    pacientes.splice(indice, 1)

    res.json({mensaje: "Paciente eliminado correctamente"})
}

module.exports = {obtenerPacientes, crearPaciente, actualizarPaciente, eliminarPaciente}

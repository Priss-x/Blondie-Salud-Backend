
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

const { buscarPacientePorEmail } = require("./pacientes.controller")

function generarToken(usuario) {return jwt.sign(
        {run: usuario.run, rol: usuario.rol}, process.env.JWT_SECRET,
        {expiresIn: "1h"}
    )
}
const iniciarSesion= async (req, res) => {
    try {
        const {email, password} = req.body
        if (typeof email !== "string" || typeof password !== "string" || !email.trim() || !password) {
            return res.status(400).json({mensaje: "Correo y contraseña son obligatorios"})
        }
        const correo= email.trim().toLowerCase()
        const usuarios= [
            {email: "admin@blondiesalud.cl",password: "9999",rol: "admin"},
            {email: "recepcionista@blondiesalud.cl", password: "9999", rol: "recepcionista"}
        ]
        const usuario = usuarios.find((u) => u.email === correo)
        if (usuario) {
            if (usuario.password !== password) {
                return res.status(401).json({mensaje: "Correo o contraseña incorrectos"})
            }
            const token = generarToken(usuario)
            return res.json({mensaje: "Inicio de sesión exitoso", token, rol: usuario.rol})
        }
        const paciente = buscarPacientePorEmail(correo)
        if (!paciente) {
            return res.status(401).json({mensaje: "Correo o contraseña incorrectos"})}
        
        const passwordCorrecta = await bcrypt.compare(password, paciente.password)
        if (!passwordCorrecta) {
            return res.status(401).json({mensaje: "Correo o contraseña incorrectos"})}

        const token = generarToken({run: paciente.run,rol: "paciente"})
        return res.json({mensaje: "Inicio de sesión exitoso", token, rol: "paciente", run: paciente.run})

    } catch (error) {
        return res.status(500).json({mensaje: "Error al iniciar sesión"})
    }
}

module.exports= {iniciarSesion}

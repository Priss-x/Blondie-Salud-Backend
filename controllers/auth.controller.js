
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

function generarToken(usuario) {
    return jwt.sign(
        {run: usuario.run,rol: usuario.rol},
        process.env.JWT_SECRET,{expiresIn: "1h"}
    )
}


const iniciarSesion = async(req, res) =>{
    try{
        const {email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({mensaje: "Correo y contraseña son obligatorios"})}

        const usuarios= [
            {email: "admin@blondiesalud.cl",password: "9999",rol: "admin"},
            {email: "recepcionista@blondiesalud.cl",password: "9999",rol: "recepcionista"}
        ]

        const usuario= usuarios.find((u) => u.email=== email.trim().toLowerCase())

        if (!usuario || usuario.password !== password) {
            return res.status(401).json({mensaje: "Correo o contraseña incorrectos, intente nuevamente"})}

        const token = generarToken(usuario)

        res.json({mensaje: "Inicio de sesión exitoso",token,rol: usuario.rol})

    } catch (error) {
        res.status(500).json({ mensaje: "Error al iniciar sesión"})
    }
}

module.exports= {iniciarSesion}

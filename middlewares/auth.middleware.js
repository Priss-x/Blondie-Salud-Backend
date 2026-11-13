
const jwt = require("jsonwebtoken")

function verificarToken(req, res, next) {const autorizacion = req.headers.authorization
    if (!autorizacion || !autorizacion.startsWith("Bearer ")) {
        return res.status(401).json({ mensaje: "No autorizado"})
    }

    const token = autorizacion.split(" ")[1]

    try {
        const datos = jwt.verify(token, process.env.JWT_SECRET)
        req.usuario = datos
        next()

    } catch (error) {
        return res.status(401).json({mensaje: "No autorizado"})
    }
}

function permitirRoles(...rolesPermitidos) {
    return (req, res, next) => {
        if (!req.usuario || !rolesPermitidos.includes(req.usuario.rol)) {
            return res.status(403).json({mensaje: "Acceso denegado"})
        }
        next()
    }
}

module.exports= {verificarToken, permitirRoles}

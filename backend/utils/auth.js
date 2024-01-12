import jwt from "jsonwebtoken"
async function generateJWT(id){
    return jwt.sign({id:id},process.env.JWT_TOKEN,{expiresIn:'30d'})
}

export default generateJWT
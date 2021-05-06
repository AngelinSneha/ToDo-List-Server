import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { rules, schema } from '@ioc:Adonis/Core/Validator'
import User from "App/Models/User";

export default class AuthController {
    public async register({request, auth}:HttpContextContract) {
        const validations = await schema.create({
            email: schema.string({}, [
              rules.email(),
              rules.unique({ table: 'users', column: 'email' })
            ]),
            password: schema.string({}, [
                rules.confirmed()
            ])
        })

        const data = await request.validate({
            schema: validations,
        })
        const user = await User.create(data)
        const u = await auth.login(user)
        const tokenValue = u.type+" "+u.token
        return tokenValue;
    }
    public async login ({request, auth}:HttpContextContract) {
        const email = request.input('email')
        const password = request.input('password')
        const token = await auth.attempt(email, password)
        return token.toJSON();
    }
    public async destroy ({auth, response}:HttpContextContract) {
        await auth.logout()
        return response.send('logout success');
    }
    public async user ({request}:HttpContextContract) {
        const user = await User.findBy('email', request.input('email'));
        return user
    }
}

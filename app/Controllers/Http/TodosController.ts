import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database';
import Todo from "App/Models/Todo";

export default class TodosController {
    public async index () {
        // const todos = await Todo.all()
        const list = await Database.query().select('*').from('todos')
        return list
    }
    public async store ({request, response, auth}:HttpContextContract) {
        await auth.user?.related('todos').create({title:request.input('title'),body:request.input('body'), is_completed:false})
        return response.status(201).json({'created': true})
    }
    public async update ({request, params}:HttpContextContract) {
        // const todo = await Todo.findOrFail(params.id)
        // const val = request.input('is_completed')
        // todo.save()
        // // const val = await Todo.w
        // return response.status(202).send(todo)
        await Database.from('todos').where('id', params.id).update({is_completed:request.input('is_completed')})
        return await Todo.all()
    }
}

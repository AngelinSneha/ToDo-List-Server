import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database';
import Todo from "App/Models/Todo";

export default class TodosController {
    public async index () {
        const list = await Database.query().select('*').from('todos')
        return list
    }
    public async store ({request, response, auth}:HttpContextContract) {
        await auth.user?.related('todos').create({title:request.input('title'),body:request.input('body'), is_completed:false})
        return response.status(201).json({'created': true})
    }
    public async update ({request, response}:HttpContextContract) {
        try {
           await Todo
          .query()
          .where('id', request.input('id'))
          .update({ is_completed: true })
        } catch {
            return response.send("Could not mark your task as done")
        }
    }
    public async undoupdate ({request, response}:HttpContextContract) {
        try {
           await Todo
          .query()
          .where('id', request.input('id'))
          .update({ is_completed: false })
        } catch {
            return response.send("Could not undo your task")
        }
    }
    public async delete ({request, response}:HttpContextContract) {
        try {
            await Todo.query().where('id', request.input('id')).delete()
        } catch {
            return response.send("Could not delete the user")
        }
    }
}

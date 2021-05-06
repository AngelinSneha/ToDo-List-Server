/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes/index.ts` as follows
|
| import './cart'
| import './customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', 'PagesController.home')

Route.group(() => {

  Route.group(() => {
    Route.post('/logout', 'AuthController.destroy')
    Route.post('/user', 'AuthController.user')
    Route.get('/todo', 'TodosController.index')
    Route.post('/todo', 'TodosController.store')
    Route.post('/tododel', 'TodosController.delete')
    Route.post('/todoupdate', 'TodosController.update')
    Route.post('/todoundoupdate', 'TodosController.undoupdate')
  }).middleware('auth')

  Route.post('/register', 'AuthController.register')
  Route.post('/login', 'AuthController.login')

}).prefix('api')
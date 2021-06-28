const UserInteractor = require('../application/user.interactor')
const UserRepositoryImp = require('../infrastructure/repositories/user.repository')

UserRepository = new UserRepositoryImp
const intercator = new UserInteractor({UserRepository})  
console.log(intercator.getAll())
console.log(intercator.get(1))
console.log(intercator.create({
    firstname:"John",
    lastname:"Snow",
    nick:"snow"
}))
console.log(intercator.update({
    firstname:"John",
    lastname:"Snow",
    nick:"snow"
},1))
console.log(intercator.delete(1))
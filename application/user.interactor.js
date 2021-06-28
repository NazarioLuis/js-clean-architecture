const UserBehavior = require("../domain/behavior/user.behavior")
const User = require("../domain/models/user.model")

class UserInteractor extends UserBehavior{
    constructor({UserRepository}){
        super()
        this._entityRepo = UserRepository
    }
    
    getAll = ()=> this._entityRepo.getAll()
    get = id => this._entityRepo.get(id)
    create = entity => this._entityRepo.create(new User(entity))
    update = (entity,id) => this._entityRepo.update(new User(entity),id)
    delete = id => this._entityRepo.delete(id)
    
}

module.exports = UserInteractor
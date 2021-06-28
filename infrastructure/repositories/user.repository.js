const UserBehavior = require("../../domain/behavior/user.behavior")

class UserRepository extends UserBehavior{
    getAll = () => 'fake getAll'
    get = id => `fake get ${id}`
    create = entity => entity
    update = (entity,id) => {
        return {
            id,
            data: entity,
        }
    }
    delete = id => `fake get ${id}`
}

module.exports = UserRepository
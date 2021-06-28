const { NON_IMPLEMENTED } = require("../helper")

class UserBehavior{
    getAll = () => NON_IMPLEMENTED()
    get = id => NON_IMPLEMENTED()
    create = entity => NON_IMPLEMENTED()
    update = (entity,id) => NON_IMPLEMENTED()
    delete = id => NON_IMPLEMENTED()
}

module.exports = UserBehavior
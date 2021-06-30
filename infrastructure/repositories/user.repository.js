const UserBehavior = require("../../domain/behavior/user.behavior")

class UserRepository extends UserBehavior{
    users = [{
        id:1,
        firstname:"Eddard",
        lastname:"Stark",
        nick:"ned",
        pass:"123",
    },{
        id:2,
        firstname:"Catelyn",
        lastname:"Tully",
        nick:"cat",
        pass:"123",
    }]
    getAll = () => this.users
    get = id => this.users.find(x => x.id == id)
    create = entity => {
        this.users.push({
            ...entity,
            id:this.users[this.users.length-1].id+1,
        })
        return this.users[this.users.length-1]
    }
    update = (entity,id) => {
        const index = this.users.findIndex(x => x.id == id)
        this.users[index]={
            ...entity,
            id:this.users[index].id,
        }
        return this.users[index]
    }
    delete = id => {
        const index = this.users.findIndex(x => x.id == id)
        this.users.splice(index, 1);
        return id
    }
}

module.exports = UserRepository
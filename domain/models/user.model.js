const { REQUIRED } = require("../helper");

class User{
    constructor({
        id=0,
        firstname,
        lastname,
        nick,
        pass,
        createdAt,
        updatedAt
    }){
        this.id=id
        this.firstname= REQUIRED(firstname)
        this.lastname= REQUIRED(lastname)
        this.nick=REQUIRED(nick)
        this.pass=pass
        this.createdAt=createdAt
        this.updatedAt=updatedAt
    }
    
    
}

module.exports = User
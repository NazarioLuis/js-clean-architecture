var assert = require('assert');
const interactor = require('../container').cradle.UserInteractor;

describe("User",function () {
    describe("crud",function () {
        it("create", function () {
            const result = interactor.create({
                firstname:"John",
                lastname:"Snow",
                nick:"snow",
                pass:"123",
            })
            assert.strictEqual(result.id>0,true)
        })
        it("getall", function () {
            const result = interactor.getAll()
            assert.strictEqual(result.length>0,true)    
        })
        it("get", function () {
            const result = interactor.get(1)
            assert.strictEqual(result==null,false)
        })
        it("update", function () {
            const result = interactor.update({
                firstname:"Sansa",
                lastname:"Stark",
                nick:"sansa",
                pass:"123",
            },1)
            const aux = interactor.get(1)
            assert.strictEqual(result.firstname,aux.firstname)
        })
        it("delete", function () {
            const deletedId = interactor.delete(1)
            const result = interactor.get(deletedId)
            assert.strictEqual(result==null,true)
        })
    })
})
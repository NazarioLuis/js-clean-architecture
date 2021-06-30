const awilix = require("awilix");
const applicationModules = require("./application");
const infrastructureModules = require("./infrastructure/repositories");

const modules = [
    ...applicationModules, 
    ...infrastructureModules,
]

const container = awilix.createContainer()

const resolvers = {}
modules.forEach(module => {
    if(modules[0].toString().substring(0, 5) === 'class') {
        resolvers[module.name] = awilix.asClass(module).singleton()
    }else resolvers[module.name] = awilix.asFunction(module).singleton()
});

container.register(resolvers)

module.exports = container
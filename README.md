### Clean Architecture Implementation in NodeJS

Clean Architecture is a software architectural approach that emphasizes the separation of concerns and the independence of dependencies within a system. The main idea behind Clean Architecture is to design software systems in a way that allows for easy maintenance, scalability, and testability, while also promoting a clear understanding of the system's structure and behavior. 

**Repository: **[https://github.com/NazarioLuis/js-clean-architecture/](https://github.com/NazarioLuis/js-clean-architecture/)
In a Clean Architecture setup, the system is divided into layers, each with its own specific responsibility. This repository contains a base implementation of Clean Architecture in JavaScript using NodeJS. The code includes three layers of abstraction:

- **Domain Layer**: This is where the models and business rules are implemented via the behavior of the models.
- **Application Layer**: This is where the application logic is implemented according to use cases.
- **Infrastructure Layer**: This is where the persistence strategy is implemented using the models from the domain layer.

![Capas](https://raw.githubusercontent.com/davidruizdiaz/js-clean-architecture/main/imgs/capas.png)

### Communication Between Layers
The communication between layers is represented by the following diagram.

![Comunicación](https://raw.githubusercontent.com/davidruizdiaz/js-clean-architecture/main/imgs/comunicacion.png)

### Dependencies
- `awilix`
- `mocha`

### Utility for Module Import
This utility module provides a function for importing multiple modules dynamically from a directory

**util/import-modules.js**
```javascript
const fs = require('fs');
const path = require('path');

module.exports = function (filename, dirname) {
    const imports = [];
    const basename = path.basename(filename);
    fs.readdirSync(dirname)
        .filter(file => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
        .forEach(file => {
            const mod = require(path.join(dirname, file));
            imports.push(mod);
        });
    return imports;
};
```

### Domain Layer

#### Helper
This module contains helper functions commonly used across the domain layer, such as a function to check for required parameters and a function to throw an error for unimplemented methods.

**domain/helper.js**
```javascript
const REQUIRED = (attr) => {
    if (attr === undefined) throw new Error('ERR_REQUIRED_PARAM');
    return attr;
};

const NON_IMPLEMENTED = () => {
    throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
};

module.exports = { REQUIRED, NON_IMPLEMENTED };
```

#### Models
This module defines the User model class, representing a user entity with attributes such as id, firstname, lastname, etc.

**domain/models/user.model.js**
```javascript
const { REQUIRED } = require('../helper');

class User {
    constructor({ id = 0, firstname, lastname, nick, pass, createdAt, updatedAt }) {
        this.id = id;
        this.firstname = REQUIRED(firstname);
        this.lastname = REQUIRED(lastname);
        this.nick = REQUIRED(nick);
        this.pass = pass;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}

module.exports = User;
```

#### Behavior
This module defines the behavior interface for user-related operations such as getAll, get, create, update, and delete. These methods are placeholders and should be implemented by concrete classes.

**domain/behavior/user.behavior.js**
```javascript
const { NON_IMPLEMENTED } = require('../helper');

class UserBehavior {
    getAll = () => NON_IMPLEMENTED();
    get = id => NON_IMPLEMENTED();
    create = entity => NON_IMPLEMENTED();
    update = (entity, id) => NON_IMPLEMENTED();
    delete = id => NON_IMPLEMENTED();
}

module.exports = UserBehavior;
```

### Application Layer

#### User Interactor 
This module acts as an intermediary between the application layer and the domain layer, handling user-related use cases. It encapsulates the business logic associated with user operations, such as user creation, retrieval, updating, and deletion.

**application/user.interactor.js**
```javascript
const UserBehavior = require('../domain/behavior/user.behavior');
const User = require('../domain/models/user.model');

class UserInteractor extends UserBehavior {
    constructor({ UserRepository }) {
        super();
        this._entityRepo = UserRepository;
    }

    getAll = () => this._entityRepo.getAll();
    get = id => this._entityRepo.get(id);
    create = entity => this._entityRepo.create(new User(entity));
    update = (entity, id) => this._entityRepo.update(new User(entity), id);
    delete = id => this._entityRepo.delete(id);
}

module.exports = UserInteractor;
```

#### Application Index 
This file dynamically imports all modules from the application layer using the importModules utility function.

**application/index.js**
```javascript
const importModules = require('../util/import-modules');
const infrastructureModules = importModules(__filename, __dirname);
module.exports = infrastructureModules;
```

### Infrastructure Layer

#### User Repository
This module defines the persistence strategy for user entities. It encapsulates data access logic and implements CRUD (Create, Read, Update, Delete) operations on user data.

**infrastructure/repositories/user.repository.js**
```javascript
const UserBehavior = require('../../domain/behavior/user.behavior');

class UserRepository extends UserBehavior {
    users = [
        { id: 1, firstname: "Eddard", lastname: "Stark", nick: "ned", pass: "123" },
        { id: 2, firstname: "Catelyn", lastname: "Tully", nick: "cat", pass: "123" }
    ];

    getAll = () => this.users;
    get = id => this.users.find(x => x.id == id);
    create = entity => {
        const newUser = { ...entity, id: this.users[this.users.length - 1].id + 1 };
        this.users.push(newUser);
        return newUser;
    };
    update = (entity, id) => {
        const index = this.users.findIndex(x => x.id == id);
        this.users[index] = { ...entity, id: this.users[index].id };
        return this.users[index];
    };
    delete = id => {
        const index = this.users.findIndex(x => x.id == id);
        this.users.splice(index, 1);
        return id;
    };
}

module.exports = UserRepository;
```

#### Repository Index
This file dynamically imports all modules from the repository layer using the importModules utility function.

**infrastructure/repositories/index.js**
```javascript
const importModules = require('../../util/import-modules');
const infrastructureModules = importModules(__filename, __dirname);
module.exports = infrastructureModules;
```

### Dependency Injection Container

#### Container
This module configures a dependency injection container using Awilix. It registers application and repository modules as dependencies, facilitating dependency injection across the application.

**container.js**
```javascript
const awilix = require('awilix');
const applicationModules = require('./application');
const infrastructureModules = require('./infrastructure/repositories');

const modules = [
    ...applicationModules,
    ...infrastructureModules,
];

const container = awilix.createContainer();

const resolvers = {};
modules.forEach(module => {
    if (module.toString().substring(0, 5) === 'class') {
        resolvers[module.name] = awilix.asClass(module).singleton();
    } else {
        resolvers[module.name] = awilix.asFunction(module).singleton();
    }
});

container.register(resolvers);

module.exports = container;
```

### Testing
This module contains test cases for the user-related functionality implemented in the application layer. It uses the Mocha framework for test execution and assertion.

#### User Tests 

**test/user.test.js**
```javascript
var assert = require('assert');
const interactor = require('../container').cradle.UserInteractor;

describe("User", function () {
    describe("CRUD operations", function () {
        it("create", function () {
            const result = interactor.create({
                firstname: "John",
                lastname: "Snow",
                nick: "snow",
                pass: "123",
            });
            assert.strictEqual(result.id > 0, true);
        });

        it("get all", function () {
            const result = interactor.getAll();
            assert.strictEqual(result.length > 0, true);
        });

        it("get", function () {
            const result = interactor.get(1);
            assert.strictEqual(result == null, false);
        });

        it("update", function () {
            const result = interactor.update({
                firstname: "Sansa",
                lastname: "Stark",
                nick: "sansa",
                pass: "123",
            }, 1);
            const aux = interactor.get(1);
            assert.strictEqual(result.firstname, aux.firstname);
        });

        it("delete", function () {
            const deletedId = interactor.delete(1);
            const result = interactor.get(deletedId);
            assert.strictEqual(result == null, true);
        });
    });
});
```

This implementation covers the basic structure and flow of Clean Architecture in NodeJS, focusing on separation of concerns and modularity. The provided code includes models, behaviors, repositories, and tests to demonstrate how each layer interacts with one another.

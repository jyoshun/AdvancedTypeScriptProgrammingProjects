/*! *****************************************************************************
装饰器AOP
***************************************************************************** */

interface IDecoratorExample {
    AnyoneCanRun(args: string): void;

    AdminOnly(args: string): void;
}

class NoRoleCheck implements IDecoratorExample {
    AnyoneCanRun(args: string): void {
        if (!IsInRole('user')) {
            console.log(`${currentUser.user} is not in the user role`);
            return;
        }
        console.log(args);
    }

    AdminOnly(args: string): void {
        if (!IsInRole('admin')) {
            console.log(`${currentUser.user} is not in the admin role`);
        }
        console.log(args);
    }
}

let currentUser = {
    user: 'Peter',
    roles: [
        {role: 'user'},
        {role: 'admin'},
    ],
};

function TestDecoratorExample(decoratorMethod: IDecoratorExample) {
    console.log(`Current user ${currentUser.user}`);
    decoratorMethod.AnyoneCanRun('Running as user');
    decoratorMethod.AdminOnly('Running as admin');
}

TestDecoratorExample(new NoRoleCheck());

function IsInRole(role: string): boolean {
    return currentUser.roles.some(r => r.role === role);
}

/**
 * 方法装饰器.
 * @param target 指代要把该装饰器应用到的元素.
 * @param propertyKey 该元素的名称.
 * @param descriptor 要应用装饰器的方法的描述符, 允许修改该方法的行为.
 */
function Admin(target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
    let originalMethod = descriptor.value;
    descriptor.value = function () {
        if (IsInRole('admin')) {
            originalMethod.apply(this, arguments);
            return;
        }
        console.log(`${currentUser.user} is not in the admin role`);
    }
    return descriptor;
}

class DecoratedExampleMethodDecoration implements IDecoratorExample {
    AnyoneCanRun(args: string): void {
        console.log(args);
    }
    @Admin
    AdminOnly(args: string): void {
        console.log(args);
    }
}

/**
 * 装饰器工厂
 */
function Role(role: string) {
    return function (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
        let originalMethod = descriptor.value;
        descriptor.value = function () {
            if (IsInRole(role)) {
                originalMethod.apply(this, arguments);
                return;
            }
            console.log(`${currentUser.user} is not in the ${role} role`);
        }
        return descriptor;
    }
}
class DecoratedExampleMethodDecoration2 implements IDecoratorExample {
    @Role('user')
    AnyoneCanRun(args: string): void {
        console.log(args);
    }
    @Role('admin')
    AdminOnly(args: string): void {
        console.log(args);
    }
}

/**
 * 从工厂创建的构造函数装饰器
 */
function Role2(role: string) {
    return function (constructor: Function) {
        if (!IsInRole(role)) {
            throw new Error('The user is not authorized to access this class');
        }
    }
}
@Role2('admin')
class RestrictedClass {
    constructor() {
        console.log('Inside the constructor');
    }
    Validate() {
        console.log('Validating');
    }
}

"use strict";
/*! *****************************************************************************
装饰器AOP
***************************************************************************** */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
class NoRoleCheck {
    AnyoneCanRun(args) {
        if (!IsInRole('user')) {
            console.log(`${currentUser.user} is not in the user role`);
            return;
        }
        console.log(args);
    }
    AdminOnly(args) {
        if (!IsInRole('admin')) {
            console.log(`${currentUser.user} is not in the admin role`);
        }
        console.log(args);
    }
}
let currentUser = {
    user: 'Peter',
    roles: [
        { role: 'user' },
        { role: 'admin' },
    ],
};
function TestDecoratorExample(decoratorMethod) {
    console.log(`Current user ${currentUser.user}`);
    decoratorMethod.AnyoneCanRun('Running as user');
    decoratorMethod.AdminOnly('Running as admin');
}
TestDecoratorExample(new NoRoleCheck());
function IsInRole(role) {
    return currentUser.roles.some(r => r.role === role);
}
/**
 * 方法装饰器.
 * @param target 指代要把该装饰器应用到的元素.
 * @param propertyKey 该元素的名称.
 * @param descriptor 要应用装饰器的方法的描述符, 允许修改该方法的行为.
 */
function Admin(target, propertyKey, descriptor) {
    let originalMethod = descriptor.value;
    descriptor.value = function () {
        if (IsInRole('admin')) {
            originalMethod.apply(this, arguments);
            return;
        }
        console.log(`${currentUser.user} is not in the admin role`);
    };
    return descriptor;
}
let DecoratedExampleMethodDecoration = /** @class */ (() => {
    class DecoratedExampleMethodDecoration {
        AnyoneCanRun(args) {
            console.log(args);
        }
        AdminOnly(args) {
            console.log(args);
        }
    }
    __decorate([
        Admin
    ], DecoratedExampleMethodDecoration.prototype, "AdminOnly", null);
    return DecoratedExampleMethodDecoration;
})();
/**
 * 装饰器工厂
 */
function Role(role) {
    return function (target, propertyKey, descriptor) {
        let originalMethod = descriptor.value;
        descriptor.value = function () {
            if (IsInRole(role)) {
                originalMethod.apply(this, arguments);
                return;
            }
            console.log(`${currentUser.user} is not in the ${role} role`);
        };
        return descriptor;
    };
}
let DecoratedExampleMethodDecoration2 = /** @class */ (() => {
    class DecoratedExampleMethodDecoration2 {
        AnyoneCanRun(args) {
            console.log(args);
        }
        AdminOnly(args) {
            console.log(args);
        }
    }
    __decorate([
        Role('user')
    ], DecoratedExampleMethodDecoration2.prototype, "AnyoneCanRun", null);
    __decorate([
        Role('admin')
    ], DecoratedExampleMethodDecoration2.prototype, "AdminOnly", null);
    return DecoratedExampleMethodDecoration2;
})();
/**
 * 从工厂创建的构造函数装饰器
 */
function Role2(role) {
    return function (constructor) {
        if (!IsInRole(role)) {
            throw new Error('The user is not authorized to access this class');
        }
    };
}
let RestrictedClass = /** @class */ (() => {
    let RestrictedClass = class RestrictedClass {
        constructor() {
            console.log('Inside the constructor');
        }
        Validate() {
            console.log('Validating');
        }
    };
    RestrictedClass = __decorate([
        Role2('admin')
    ], RestrictedClass);
    return RestrictedClass;
})();
//# sourceMappingURL=1.3.7.Decorator.js.map
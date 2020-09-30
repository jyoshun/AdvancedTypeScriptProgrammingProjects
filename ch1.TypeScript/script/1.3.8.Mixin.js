"use strict";
/*! *****************************************************************************
混入组成类型
***************************************************************************** */
class ActiveRecord {
    constructor() {
        this.Deleted = false;
    }
}
class Person extends ActiveRecord {
    constructor(firstName, lastName) {
        super();
        this.FirstName = firstName;
        this.LastName = lastName;
    }
}
function RecordStatus(base) {
    return class extends base {
        constructor() {
            super(...arguments);
            this.Deleted = false;
        }
    };
}
const ActivePerson = RecordStatus(Person);
let activePerson = new ActivePerson('Peter', "O'Hanlon");
activePerson.Deleted = true;
/**
 * 创建另一个混入.
 */
function Timestamp(base) {
    return class extends base {
        constructor() {
            super(...arguments);
            this.Updated = new Date();
        }
    };
}
const ActivePerson2 = RecordStatus(Timestamp(Person));
/**
 * 在混入中加入构造函数和方法.
 */
function RecordStatus2(base) {
    return class extends base {
        constructor() {
            super(...arguments);
            this.deleted = false;
        }
        get Deleted() {
            return this.deleted;
        }
        Delete() {
            this.deleted = true;
            console.log('The record has been marked as deleted.');
        }
    };
}
// 注意: 除非将参数限制放松为any, 否则不能将混入类型作为参数传递.
//# sourceMappingURL=1.3.8.Mixin.js.map
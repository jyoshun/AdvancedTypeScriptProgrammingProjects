/*! *****************************************************************************
混入组成类型
***************************************************************************** */

class ActiveRecord {
    Deleted = false;
}
class Person extends ActiveRecord {
    constructor(firstName: string, lastName: string) {
        super();
        this.FirstName = firstName;
        this.LastName = lastName;
    }
    FirstName: string;
    LastName: string;
}

/**
 * 混入(Mixin).
 */
type Constructor<T = {}> = new(...args: any[]) => T;
function RecordStatus<T extends Constructor>(base: T) {
    return class extends base {
        Deleted: boolean = false;
    }
}
const ActivePerson = RecordStatus(Person);
let activePerson = new ActivePerson('Peter', "O'Hanlon");
activePerson.Deleted = true;

/**
 * 创建另一个混入.
 */
function Timestamp<T extends Constructor>(base: T) {
    return class extends base {
        Updated: Date = new Date();
    }
}
const ActivePerson2 = RecordStatus(Timestamp(Person));

/**
 * 在混入中加入构造函数和方法.
 */
function RecordStatus2<T extends Constructor>(base: T) {
    return class extends base {
        private deleted: boolean = false;
        get Deleted(): boolean {
            return this.deleted;
        }
        Delete(): void {
            this.deleted = true;
            console.log('The record has been marked as deleted.');
        }
    }
}
// 注意: 除非将参数限制放松为any, 否则不能将混入类型作为参数传递.

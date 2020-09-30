"use strict";
/*! *****************************************************************************
泛型
***************************************************************************** */
class QueueOfInt {
    constructor() {
        this.queue = [];
    }
    Push(value) {
        this.queue.push(value);
    }
    Pop() {
        return this.queue.shift();
    }
}
class QueueOfString {
    constructor() {
        this.queue = [];
    }
    Push(value) {
        this.queue.push(value);
    }
    Pop() {
        return this.queue.shift();
    }
}
/**
 * 泛型
 */
class Queue {
    constructor() {
        this.queue = [];
    }
    Push(value) {
        this.queue.push(value);
    }
    Pop() {
        return this.queue.shift();
    }
}
const queue = new Queue();
const stringQueue = new Queue();
queue.Push(10);
queue.Push(35);
console.log(queue.Pop());
console.log(queue.Pop());
stringQueue.Push('Hello');
stringQueue.Push('Generics');
console.log(stringQueue.Pop());
console.log(stringQueue.Pop());
/**
 * 任意数量的类型
 */
function KeyValuePair(key, value) {
    // ...
}
class Data {
    ReadStream(stream) {
        let output = stream.ReadStream();
        console.log(output.byteLength);
    }
}
class WebStream {
    ReadStream() {
        let array = new Int8Array(8);
        for (let index = 0; index < array.length; index++) {
            array[index] = index + 3;
        }
        return array;
    }
}
class DiskStream {
    ReadStream() {
        let array = new Int8Array(20);
        for (let index = 0; index < array.length; index++) {
            array[index] = index + 3;
        }
        return array;
    }
}
const webStream = new Data();
const diskStream = new Data();
webStream.ReadStream(new WebStream());
diskStream.ReadStream(new DiskStream());
/**
 * 方法级别使用泛型
 */
class Data2 {
    ReadStream(stream) {
        let output = stream.ReadStream();
        console.log(output.byteLength);
    }
}
//# sourceMappingURL=1.3.9.GenericType.js.map
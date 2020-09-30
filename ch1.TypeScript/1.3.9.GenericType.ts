/*! *****************************************************************************
泛型
***************************************************************************** */

class QueueOfInt {
    private queue: number[] = [];
    public Push(value: number): void {
        this.queue.push(value);
    }
    public Pop(): number | undefined {
        return this.queue.shift();
    }
}
class QueueOfString {
    private queue: string[] = [];
    public Push(value: string): void {
        this.queue.push(value);
    }
    public Pop(): string | undefined {
        return this.queue.shift();
    }
}

/**
 * 泛型
 */
class Queue<T> {
    private queue: T[] = [];
    public Push(value: T): void {
        this.queue.push(value);
    }
    public Pop(): T | undefined {
        return this.queue.shift();
    }
}
const queue: Queue<number> = new Queue<number>();
const stringQueue: Queue<string> = new Queue<string>();
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
function KeyValuePair<TKey, TValue>(key: TKey, value: TValue) {
    // ...
}

/**
 * 泛型约束
 */
interface IStream {
    ReadStream(): Int8Array; // Array of bytes
}
class Data<T extends IStream> {
    ReadStream(stream: T) {
        let output = stream.ReadStream();
        console.log(output.byteLength);
    }
}
class WebStream implements IStream {
    ReadStream(): Int8Array {
        let array: Int8Array = new Int8Array(8);
        for (let index: number = 0; index < array.length; index++) {
            array[index] = index + 3;
        }
        return array;
    }
}
class DiskStream implements IStream {
    ReadStream(): Int8Array {
        let array: Int8Array = new Int8Array(20);
        for (let index: number = 0; index < array.length; index++) {
            array[index] = index + 3;
        }
        return array;
    }
}
const webStream = new Data<WebStream>();
const diskStream = new Data<DiskStream>();
webStream.ReadStream(new WebStream());
diskStream.ReadStream(new DiskStream());

/**
 * 方法级别使用泛型
 */
class Data2 {
    ReadStream<T extends IStream>(stream: T) {
        let output = stream.ReadStream();
        console.log(output.byteLength);
    }
}

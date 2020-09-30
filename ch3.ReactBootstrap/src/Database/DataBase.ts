import { RecordState } from '../RecordState';
import { ITable } from './TableBuilder';

export class DataBase<T extends RecordState> {
    private readonly indexDb: IDBFactory;
    private database: IDBDatabase | null = null;
    private readonly table: ITable;

    constructor(table: ITable) {
        this.indexDb = window.indexedDB;
        this.table = table;
        this.OpenDatabase();
    }

    private OpenDatabase(): void {
        const open = this.indexDb.open(this.table.Database(), this.table.Version());
        open.onupgradeneeded = (e: any) => {
            this.UpgradeDatabase(e.target.result);
        }
        open.onsuccess = (e: any) => {
            this.database = e.target.result;
        }
    }
    private UpgradeDatabase(database: IDBDatabase) {
        this.database = database;
        this.table.Build(this.database);
    }

    private GetObjectStore(): IDBObjectStore | null {
        try {
            const transaction: IDBTransaction = this.database!.transaction(this.table.TableName(), 'readwrite');
            // noinspection UnnecessaryLocalVariableJS
            const dbStore: IDBObjectStore = transaction.objectStore(this.table.TableName());
            return dbStore;
        } catch (Error) {
            return null;
        }
    }

    public Create(state: T): Promise<void> {
        return new Promise<void>((resolve) => {
            const dbStore = this.GetObjectStore();
            const request: IDBRequest = dbStore!.add(state);
            request.onsuccess = () => {
                resolve();
            }
        });
    }
    public Read(): Promise<T[]> {
        return new Promise<T[]>((response) => {
            const dbStore = this.GetObjectStore();
            const items = new Array<T>();
            const request: IDBRequest = dbStore!.openCursor();
            request.onsuccess = (e: any) => {
                const cursor: IDBCursorWithValue = e.target.result;
                if (cursor) {
                    const result: T = cursor.value;
                    if (result.IsActive) {
                        items.push(result);
                    }
                    cursor.continue();
                } else {
                    // When cursor is null, that is the point that we want to
                    // return back to our calling code.
                    response(items);
                }
            }
        });
    }
    public Update(state: T): Promise<T> {
        return new Promise<T>((resolve) => {
            const dbStore = this.GetObjectStore();
            const innerRequest: IDBRequest = dbStore!.put(state);
            innerRequest.onsuccess = () => {
                resolve();
            }
        });
    }
    public Delete(idx: number | string): Promise<void> {
        return new Promise((resolve) => {
            const dbStore = this.GetObjectStore();
            const innerRequest: IDBRequest = dbStore!.delete(idx.toString());
            innerRequest.onsuccess = () => {
                resolve();
            }
        });
    }
}

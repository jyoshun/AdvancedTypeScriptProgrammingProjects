/*! *****************************************************************************
Promise和async/await异步
***************************************************************************** */

/**
 * Promise
 */
function ExpensiveWebCall(time: number): Promise<void> {
    return new Promise((resolve, reject) => setTimeout(resolve, time));
}
class MyWebService {
    CallExpensiveWebOperation(): void {
        ExpensiveWebCall(4000)
            .then(() => console.log('Finished web service'))
            .catch(() => console.log('Expensive web call failure'));
    }
}

console.log('calling service');
new MyWebService().CallExpensiveWebOperation();
console.log('Processing continues until the web service returns');

/**
 * async/await
 */
class MyWebService2 {
    async CallExpensiveWebOperation() {
        try {
            await ExpensiveWebCall(4000);
            console.log('Finished web service');
        } catch (error) {
            console.log(`Caught ${error}`);
        }
    }
}

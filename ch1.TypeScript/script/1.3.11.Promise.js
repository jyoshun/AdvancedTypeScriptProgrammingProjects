"use strict";
/*! *****************************************************************************
Promise和async/await异步
***************************************************************************** */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/**
 * Promise
 */
function ExpensiveWebCall(time) {
    return new Promise((resolve, reject) => setTimeout(resolve, time));
}
class MyWebService {
    CallExpensiveWebOperation() {
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
    CallExpensiveWebOperation() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield ExpensiveWebCall(4000);
                console.log('Finished web service');
            }
            catch (error) {
                console.log(`Caught ${error}`);
            }
        });
    }
}
//# sourceMappingURL=1.3.11.Promise.js.map
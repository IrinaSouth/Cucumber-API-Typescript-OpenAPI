'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const openapi_1 = require("../../../../generated-sources/openapi");
const cucumber_1 = require("cucumber");
const file = require('../../properties/input.properties');
const todoApi = new openapi_1.DefaultApi(file.inputProperties.URL);
let key;
let todo;
let newResponse;
cucumber_1.Given(/^I get a list of to-dos$/, () => __awaiter(this, void 0, void 0, function* () {
    todo = (yield todoApi.listTodos({})).data;
    if (todo) {
        for (let i = 0; i < todo.length; i++) {
            key = todo[i].id;
            console.log("***** Resolved status is :" + todo[i]["resolved"] + ' *****');
        }
    }
}));
cucumber_1.Given(/^I delete all the existing to-do tasks$/, () => __awaiter(this, void 0, void 0, function* () {
    if (key) {
        console.log("***** Response length is : " + todo.length + ' *****');
        for (let i = 0; i < todo.length; i++) {
            let delResponse = yield todoApi.removeTodo(todo[i].id);
            console.log('******* Deleted response is :' + delResponse + ' ********');
        }
    }
}));
cucumber_1.When(/^I add a new task with title (.*)$/, (title) => __awaiter(this, void 0, void 0, function* () {
    const todo = {
        id: '1',
        title: title,
        resolved: true,
    };
    newResponse = (yield todoApi.addTodo(todo)).data;
}));
cucumber_1.Then(/^I should get a response with an id, title (.*) and a task resolved status as (.*)$/, (title, resolved) => {
    let expected = (resolved == 'true');
    chai_1.expect(newResponse[0]["resolved"]).to.equal(expected);
    chai_1.expect(parseInt(newResponse[0]["id"])).to.be.a('number');
    chai_1.expect(newResponse[0]["title"]).to.equal(title);
});
cucumber_1.When(/^I update a task and resolve it$/, () => __awaiter(this, void 0, void 0, function* () {
    newResponse = (yield todoApi.resolveTodo(newResponse[0].id)).data;
}));
cucumber_1.Then(/^the list is empty$/, () => {
    chai_1.expect(todo).to.be.empty;
});
//# sourceMappingURL=my_steps.js.map
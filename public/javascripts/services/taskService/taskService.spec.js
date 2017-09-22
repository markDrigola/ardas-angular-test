import { TaskList } from "./taskService";

let resp = {};
let params = '/tasks';
let taskUp = {
    name: '123',
    id: '11'
};

let id = '';
let paramsId = `/tasks/${id}`;


let $http = {
    get: function () {
        return {
            then: function (func) {
                return func(resp);
            }
        }
    }
};

let $httpTask = {
    put: function () {
        return {
            then: function (func) {
                return func(resp);
            }
        }
    },
    task: taskUp
};

let paramsIdUpdate = `/tasks/${taskUp.id}`;

let $httpId = {
    get: function () {
        return {
            then: function () {
                return {
                    catch: function () {
                        return {};
                    }
                };
            }
        }
    }
};

describe('TaskList', function() {
    it('TaskList should get TaskList', function () {
        spyOn($http, 'get').and.callThrough();

        let task = new TaskList($http);

        task.getTasks();

        expect($http.get).toHaveBeenCalledWith(params);
    });

    it('TaskList should get Task by id', function () {
        spyOn($httpId, 'get').and.callThrough();

        let task = new TaskList($httpId);

        task.getTaskById(id);

        expect($httpId.get).toHaveBeenCalledWith(paramsId);
    });

    it('Task should update by id', function () {
        spyOn($httpTask, 'put').and.callThrough();

        let task = new TaskList($httpTask);

        task.updateTask(taskUp);

        expect($httpTask.put).toHaveBeenCalledWith(paramsIdUpdate,taskUp);
    });
});
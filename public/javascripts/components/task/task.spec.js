import { taskController } from "./task";
let data = {};
let params = {
    id: ''
};

let servObj = {
    getTaskById: function () {
        return {
            then: function (func) {
                func(data);
            }
        }
    },
    updateTask: function () {
        return {
            then: function (func) {}
        }
    }
};

let servObjNotData = {
    getTaskById: function () {
        return {
            then: function (func) {
                func();
            }
        }
    }
};
let state = {};

describe('task', function() {
    it('task should get task by id', function () {
        spyOn(servObj, 'getTaskById').and.callThrough();
        let task = new taskController(state,params,servObj);

        expect(task.taskService.getTaskById).toHaveBeenCalledWith(params.id);

        expect(task.taskById).toBe(data);
        expect(task.taskName).toBe(data.name);
    });

    it('should not write data', function () {
        spyOn(servObjNotData, 'getTaskById').and.callThrough();
        let task = new taskController(state,params,servObjNotData);

        expect(task.taskService.getTaskById).toHaveBeenCalledWith(params.id);

        expect(task.taskById).toBe(undefined);
    });

    it('taskUpdate should call updateTask', function () {
        spyOn(servObj, 'updateTask').and.callThrough();
        let task = new taskController(state, params, servObj);
        let taskById = {};
        task.taskById = taskById;
        task.saveRefactoringTask();

        expect(task.taskService.updateTask).toHaveBeenCalledWith(taskById);
    });
});
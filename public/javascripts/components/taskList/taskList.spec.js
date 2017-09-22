import { taskListController } from "./taskList";
let data = {};
let servObj = {
    getTasks: function () {
        return {
            then: function (func) {
                func(data);
            }
        }
    }
};
let state = {};

describe('taskList', function() {
    it('task should check status in object', function () {
        let taskList = new taskListController(state,servObj);
        let obj = {
            obj_status: 'active'
        };

        expect(taskList.taskFilter(obj)).toBe(true);
        obj.obj_status = '';
        expect(taskList.taskFilter(obj)).toBe(false);
    });

    it('taskListController should in constructor add params', function () {
        spyOn(servObj, 'getTasks').and.callThrough();
        let taskList = new taskListController(state,servObj);

        expect(taskList.$state).toBe(state);
        expect(taskList.taskService).toBe(servObj);
        expect(taskList.taskList).toBe(data);
        expect(taskList.taskService.getTasks).toHaveBeenCalled()
    })

});
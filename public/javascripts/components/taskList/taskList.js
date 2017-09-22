"use strict";
function taskList() {
    let directive = {
        restrict: 'E',
        scope: {},
        templateUrl: './javascripts/components/taskList/taskList.html',
        controller: taskListController,
        controllerAs: 'ctrl',
        bindToController: true
    };
    return directive;
}

class taskListController {
    constructor ($state,taskService) {
        this.$state = $state;
        this.taskService = taskService;

        this.taskService.getTasks().then( (data)=> {
            this.taskList = data;
        })
    }

    taskFilter(el) {
        return el.obj_status === 'active';
    }
}

taskListController.$inject = ['$state','taskService'];

export {taskList, taskListController};
"use strict";

function task() {
    let directive = {
        restrict: 'E',
        templateUrl: './javascripts/components/task/task.html',
        controller: taskController,
        controllerAs: 'ctrl',
        bindToController: true
    };
    return directive;
}

class taskController {
    constructor ($scope, $stateParams, taskService) {
        this.taskService = taskService;
        this.taskById = undefined;
        this.textShow = false;
        this.$scope = $scope;

        this.taskService.getTaskById($stateParams.id).then( (data)=> {
            if(!data) return;
            this.taskById = data;
            this.taskName = this.taskById.name;
        })
    }

    saveRefactoringTask() {
        this.taskService.updateTask(this.taskById).then( (data)=> {
            if(!data) return;
            this.textShow = true;
            setTimeout(this.taskFade.bind(this),1500)
        })
    }

    taskFade() {
        this.textShow = false;
        this.$scope.$apply();
    }

}

taskController.$inject = ['$scope','$stateParams', 'taskService'];

export {task,taskController};

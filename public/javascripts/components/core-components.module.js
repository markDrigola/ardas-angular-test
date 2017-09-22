'use strict';

const myCoreComponents = angular.module('won.core.components', []);
import {taskList} from './taskList/taskList.js';
import {task} from './task/task.js';

myCoreComponents
    .directive('gTask', task)
    .directive('gTaskList', taskList);


export {myCoreComponents};
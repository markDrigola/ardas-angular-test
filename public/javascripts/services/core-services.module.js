'use strict';

import {TaskList} from './taskService/taskService.js';

const myCoreServices = angular.module('won.core.services', []);

myCoreServices
	.service('taskService', TaskList);


export {myCoreServices};
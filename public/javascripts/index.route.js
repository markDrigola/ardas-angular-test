'use strict';

function appRoutes ($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state('/', {
            url : '/',
            template : '<g-task-list></g-task-list>'
        })
        .state('task', {
            url : '/task/:id',
            template : '<g-task></g-task>'
        });

    $urlRouterProvider.otherwise('/');
}

appRoutes.$inject = ['$stateProvider', '$urlRouterProvider'];

export {appRoutes};

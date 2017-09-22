import { myCoreComponents } from './components/core-components.module';
import {myCoreServices} from './services/core-services.module.js';

import { appRoutes } from './index.route';

angular.module('nameApp', [
    'ui.router',
    'mgcrea.ngStrap',
    'xeditable',
    myCoreComponents.name,
    myCoreServices.name
    ])
    .config(appRoutes)
    .run((editableOptions)=> {
        editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
    });

angular.element(document).ready(function () {
    angular.bootstrap(document.documentElement, ['nameApp'], {
        strictDi: false
    });
});
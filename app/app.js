var app = angular.module('DaikiriApp', [
    'ngResource', 
    'ui.bootstrap',
    'ui.router', 
    'pascalprecht.translate'
]);

app.value('session', { sessionId: null, userId: null });
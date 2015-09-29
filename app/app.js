var app = angular.module('DaikiriApp', [
    'ngResource', 
    'ui.bootstrap',
    'ui.router', 
    'pascalprecht.translate',
    'duScroll' 
]);

app.value('session', { Id: null, sessionToken: null, name: null, email: null });
app.value('duScrollOffset', 30);

app.constant('Services', {
    LoginService: 'https://service/security/login',
    LogoutService: 'https://service/security/logout',
    UserInfoService: 'https://service/security/getUserInfo',
	ProjectsService: 'https://service/security/project'
});

app.config(['$locationProvider', '$stateProvider', '$urlRouterProvider', function($locationProvider, $stateProvider, $urlRouterProvider) {
	'use strict';

	$locationProvider.html5Mode(true);

	$urlRouterProvider.otherwise('/home');

	$stateProvider
		.state('home', {
			url: '/home',
			templateUrl: 'app/home/home.tpl.html',
			controller: 'HomeController',
			requireAuth: false
		}).state('login', {
			url: '/login',
			templateUrl: 'app/login/login.tpl.html',
			controller: 'LoginController',
			requireAuth: false
		});
}]);

app.run(['$rootScope', '$urlRouter', function($rootScope, $urlRouter){
	'use strict';
	$rootScope.$on('emit', function(event, data) {
		$rootScope.$broadcast('broadcast', data);
	});
}]);

app.config(['$httpProvider', '$translateProvider',function($httpProvider, $translateProvider) {
	'use strict';
 	function config() {
	 	$httpProvider.interceptors.push(function ($location, $q) {
				return {
					'request': function (request) {
						if (!localStorage.getItem('sessionId') && ($location.path() !== '/home')) {
							if ($location.path() === '/login') {
								$location.path('/login');
							} else if ($location.path() === '/signup') {
								$location.path('/signup');
							} else {
								$location.path('/home');
							}
						} else if(localStorage.getItem('sessionId') && (($location.path() === '/login') ||  ($location.path() === '/signup') ||  ($location.path() === '/home'))) {
							$location.path('/dashboard');       
						}
						return request;
					},
					'responseError': function (rejection) {
						if (rejection.status === 401 && $location.path() !== '/home') {	        	
							$location.path('/home');
						}
						return $q.reject(rejection);         
					}
				};
			});

			$translateProvider.useStaticFilesLoader({
			    prefix: 'lang/i18n/locale_',
			    suffix: '.json'
			});
			$translateProvider.preferredLanguage('es-ES');
 	}
 	config();
}]);


app.controller('MainController', ['$rootScope', '$location', '$scope', '$http', '$state', 'Services', function($rootScope, $location, $scope, $http, $state, Services){
    'use strict';
    $rootScope.$on('$locationChangeSuccess', function() {
        initCookies();
    });

    function initCookies() {
        var terms;

        terms = false;//UserSessionProvider.getCookiesTerm();
        if(terms) {
            $scope.cookieTerms = false;
        } else {
            $('.cookies-container').slideDown('slow');
            $scope.cookieTerms = true;
        }
    }

    initCookies();

    function rechargeUserData() {
        /*var userData = {};
        userData.user = UserSessionProvider.getUser();
        userData.token = UserSessionProvider.getSessionId();
        userData.data = amfUtils.formatDate(new Date(), '%d/%M/%Y %h:%m:%s');
        userData.privateKey = privateKey.privateKey;
        userData.key = amfUtils.md5(userData.user + userData.token + userData.data + userData.privateKey);
        var getData = '?usuario='+userData.user+'&data='+userData.data+'&token='+userData.token+'&key='+userData.key;

        if (!angular.equals(DataPetitionProvider.getUserConfigData(), getData)) {
            DataPetitionProvider.setUserConfigData(getData);
            $http.get(AppConf.GetUserConfig+getData)
                .success(function (data, status, headers, config) {
                    if (data.resultado === 'KO') {
                        logoutService.cleanDataSession();
                        $state.go('login');
                    }
                    else {
                        loginService.saveLoginData(data);
                        loginService.getPolicys();
                        amfParams.setParameter('haveUserData', 1);
                    }
                })
                .error(function (data, status, headers, config) {
                    console.log(data);
                });
        }
        else {
            amfParams.setParameter('haveUserData', 1);
        }*/
    }
    if(localStorage.getItem('sessionId')) {
        if ($location.$$path === $location.path()) {
            rechargeUserData();
        }
    }
}]);

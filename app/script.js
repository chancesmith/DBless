// create the module and name it headphonesApp
var dbless = angular.module('dbless', ['ngRoute']);

// configure our routes
dbless.config(function($routeProvider) {
	$routeProvider

		// route for the home page
		.when('/', {
			templateUrl : 'pages/intro.html',
			controller  : 'mainController'
		});
	});

dbless.service('mainController', function ($http) {
    //to create unique contact id
    var uid = 1;
    var contacts = '';
    $http.get('jobs.json').success(function(data) {
    	contacts = data;
    });
    // contacts array to hold list of all contacts
    // var contacts = [
	   //  {
	   //      id: 0,
	   //      'name': 'Director, Ethical Hacking',
	   //      'email': 'Helps financial institutions identify the vulnerabilities of their Web applications and networks',
	   //      'phone': 'As DEH, you will be...'
	   //  },
	   //  {
	   //      id: 1,
	   //      'name': 'Master of Disaster',
	   //      'email': 'Helps federal, state, and local authorities access the information they need to recover quickly from calamities.',
	   //      'phone': 'As MoD, you will be...'
	   //  }
    // ];
    
    //save method create a new contact if not already exists
    //else update the existing object
    this.save = function (contact) {
    	if (contact.id == null) {
            //if this is new contact, add it in contacts array
            contact.id = uid++;
            contacts.push(contact);
            console.log('New contact');
        } else {
            //for existing contact, find this contact using id
            //and update it.
            console.log('Existing contact');
            for (i in contacts) {
            	if (contacts[i].id == contact.id) {
            		contacts[i] = contact;
            	}
            }
        }
        var jsonData = JSON.stringify(contacts);
        $http({
            type: 'POST',
            url: 'update-json.php',
            data: {myData:contacts}
        })
        .then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            console.log('Data saved: ' + response.data);
          }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            console.log('No, not saved: ' + response.data);
        });
    }

    //simply search contacts list for given id
    //and returns the contact object if found
    this.get = function (id) {
    	for (i in contacts) {
    		if (contacts[i].id == id) {
    			return contacts[i];
    		}
    	}

    }
    
    //iterate through contacts list and delete 
    //contact if found
    this.delete = function (id) {
    	for (i in contacts) {
    		if (contacts[i].id == id) {
    			contacts.splice(i, 1);
    		}
    	}
    }

    //simply returns the contacts list
    this.list = function () {
    	return contacts;
    }
});

dbless.controller('mainController', function ($scope, mainController) {

	$scope.contacts = mainController.list();

	$scope.saveContact = function () {
		mainController.save($scope.newcontact);
		$scope.newcontact = {};
	}


	$scope.delete = function (id) {

		mainController.delete(id);
		if ($scope.newcontact.id == id) $scope.newcontact = {};
	}


	$scope.edit = function (id) {
		$scope.newcontact = angular.copy(mainController.get(id));
	}
})
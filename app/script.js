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

//create UUID
function generateUUID(){
    var d = new Date().getTime();
    if(window.performance && typeof window.performance.now === "function"){
        d += performance.now(); //use high-precision timer if available
    }
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
}

dbless.service('mainController', function ($http) {
    //to create unique contact id
    var contacts = '';
    var uid = 0;
    $http.get('jobs.json').success(function(data) {
    	contacts = data;
        uid = contacts.length; // zero base start
        if(uid < 0) uid = 0;
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
            contact.id = generateUUID();
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
        // var jsonData = JSON.stringify(contacts);
        $http({
          method: 'POST',
          url: 'update-json.php',
          data: contacts
        }).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            console.log(response);
          }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            console.log(response);
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
        $http({
          method: 'POST',
          url: 'update-json.php',
          data: contacts
        }).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            console.log(response);
          }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            console.log(response);
          });
    }

    //iterate through contacts list and duplicate 
    //contact if found
    this.duplicate = function (id) {
        var cloneContact = '';
        for (i in contacts) {
            if (contacts[i].id == id) {
                cloneContact = contacts[i];
                console.log(cloneContact);
                cloneContact.id = generateUUID();
                contacts.push(cloneContact);
                console.log(cloneContact);
                console.log('Contact Duplicated');
            }
        }
        $http({
          method: 'POST',
          url: 'update-json.php',
          data: contacts
        }).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            console.log(response);
          }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            console.log(response);
          });
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

    $scope.duplicate = function (id) {
        $scope.newcontact = angular.copy(mainController.duplicate(id));
    }
})
// create the module and name it dbless
var dbless = angular.module('dbless', ['ngRoute','ui.sortable']);
var lastUpdate = new Date().getTime();

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
    var jobs = '';
    
    // update JSON file
    function updateJobsJSONFile(jobsJSON){
        $http({
          method: 'POST',
          url: 'update-json.php',
          data: jobs
        }).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            // console.log(response);
          }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            // console.log(response);
          });
    }

    $http.get('jobs.json').success(function(data) {
        jobs = data;
    });
    
    // jobs array to hold list of all jobs
    // var jobs = [
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
    
    //save method create a new job if not already exists
    //else update the existing object
    this.save = function (job) {
    	if (job.id == null) {
            //if this is new job, add it in jobs array
            job.id = generateUUID();
            job.order = 0;
            jobs.push(job);
            // console.log('New job');
        } else {
            //for existing job, find this job using id
            //and update it.
            // console.log('Existing job');
            for (i in jobs) {
            	if (jobs[i].id == job.id) {
            		jobs[i] = job;
            	}
            }
        }
        // var jsonData = JSON.stringify(jobs);
        updateJobsJSONFile(jobs);
    }

    //simply search jobs list for given id
    //and returns the job object if found
    this.get = function (id) {
    	for (i in jobs) {
    		if (jobs[i].id == id) {
    			return jobs[i];
    		}
    	}
    }
    
    //iterate through jobs list and delete 
    //job if found
    this.delete = function (id) {
    	for (i in jobs) {
    		if (jobs[i].id == id) {
    			jobs.splice(i, 1);
    		}
    	}
        updateJobsJSONFile(jobs);
    }

    //iterate through jobs list and duplicate 
    //job if found
    this.duplicate = function (id) {
        var cloneJob = '';
        for (i in jobs) {
            if (jobs[i].id == id) {
                cloneJob = jobs[i];
                // console.log(cloneJob);
                cloneJob.id = generateUUID();
                jobs.push(cloneJob);
                // console.log(cloneJob);
                // console.log('Job Duplicated');
            }
        }
        updateJobsJSONFile(jobs);
    }

    //update order of list
    this.order = function (jobsList) {
        var d = new Date();
        var unixTime = d.getTime();
        var secondsSinceLastUpdate = Math.round((unixTime - lastUpdate)*.001);
        // check it is has been greater than 5 seconds since last update
        if (secondsSinceLastUpdate > 2){
            updateJobsJSONFile(jobsList);
            // update time of last change
            lastUpdate = unixTime;
        }
    }

    //simply returns the jobs list
    this.list = function () {
        return jobs;
    }
});

dbless.controller('mainController', function ($scope, mainController) {

	$scope.jobs = mainController.list();

	$scope.saveJob = function () {
		mainController.save($scope.newjob);
		$scope.newjob = {};
	}

	$scope.delete = function (id) {
		mainController.delete(id);
		if ($scope.newjob.id == id) $scope.newjob = {};
	}

	$scope.edit = function (id) {
		$scope.newjob = angular.copy(mainController.get(id));
	}

    $scope.duplicate = function (id) {
        $scope.newjob = angular.copy(mainController.duplicate(id));
    }

    $scope.updateOrder = function (){
        mainController.order($scope.jobs);
    }
})
var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope, $http) {
	
	$http({
    method : "GET",
    url : "data/data.json"
	}).then(function mySucces(response) {
		$scope.aglFullName = response.data.FullName;

		$scope.aglJob = response.data.Job;
		$scope.aglPhone = response.data.Phone;
		$scope.aglEmail = response.data.Email;
		$scope.aglAddressNation = response.data.AddressNation;
		$scope.aglAddressState = response.data.AddressState;
		$scope.aglNationality = response.data.Nationality;
		$scope.aglMoreDetailAboutAddress = response.data.MoreDetailAboutAddress;
		$scope.aglProfile = "images/profile1.png";
		$scope.aglProfile = response.data.ProfileImage;
		
		$scope.aglHeaders = response.data.Headers;
		
		$scope.aglSummary = response.data.Summary;

		$scope.aglEducation = response.data.Education;

		$scope.aglSkills = response.data.Skills;

		$scope.aglInterests = response.data.Interests;

		$scope.aglLanguages = response.data.Languages;

		$scope.aglProjects = response.data.Projects;
		
    }, function myError(response) {
      $scope.aglFullName = response.statusText;
	});
  
	$http({
    method : "GET",
    url : "data/publicData.json"
	}).then(function mySucces(response1) {
		$scope.aglSkillCatalog = response1.data.SkillCatalog;
		$scope.aglInterestCatalog = response1.data.InterestCatalog;
	}, function myError(response1) {
		$scope.aglFullName = response1.statusText;
	});
  
	$http({
    method : "GET",
    url : "data/WorldData.json"
	}).then(function mySucces(response2) {
		$scope.aglCountries = response2.data.Countries;
		$scope.aglStates = response2.data.States;
		$scope.aglNationalities = response2.data.Nationalities;
		
		var ind = $scope.aglCountries.indexOf( $scope.aglAddressNation );
		$scope.aglSelectedStates = $scope.aglStates[ind].split("|");
	}, function myError(response2) {
		$scope.aglFullName = response2.statusText;
	});

	$http({
    method : "GET",
    url : "data/LanguageData.json"
	}).then(function mySucces(response3) {
		$scope.aglLanguageList = response3.data;
	}, function myError(response3) {
		$scope.aglFullName = response3.statusText;
	});
	
	$scope.aglMonthList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "Octoper", "November", "December"];
	$scope.aglYearList = [1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2010, 2011, 2012, 2013, 2014, 2015, 2016];
	
	$scope.UpdateState = function() {
		var ind = $scope.aglCountries.indexOf( $scope.aglSelectedCountry );
		$scope.aglSelectedStates = $scope.aglStates[ind].split("|");
	}
	
    $scope.LoadSessionData = function(val) {
        console.log(val);
    }
	
	bkLib.onDomLoaded(function() { 
		//nicEditors.allTextAreas()
		new nicEditor({fullPanel : true}).panelInstance('area1');	
	});
	
	
    $scope.imageUpload = function(element){
        var reader = new FileReader();
        reader.onload = $scope.imageIsLoaded;
        reader.readAsDataURL(element.files[0]);
    }

    $scope.imageIsLoaded = function(e){
        $scope.$apply(function() {
            $scope.aglProfile = e.target.result;
        });
    }
	
	$scope.RemoveSkill = function(index){
		$scope.aglSkills.splice(index, 1); 
	}
	
	$scope.AddSkill = function(){
		$scope.aglSkills.push($scope.SelectedDoctor);
	}
	
	$scope.RemoveInterest = function(index){
		$scope.aglInterests.splice(index, 1); 
	}
	
	$scope.AddInterest = function(){
		$scope.aglInterests.push($scope.SelectedDoctor1);
	}
});
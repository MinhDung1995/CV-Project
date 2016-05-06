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
	
	$scope.aglMonthList = 
	[
		{name : "Jan", id : 1},
		{name : "Feb", id : 2},
		{name : "Mar", id : 3},
		{name : "Apr", id : 4},
		{name : "May", id : 5},
		{name : "Jun", id : 6},
		{name : "Jul", id : 7},
		{name : "Aug", id : 8},
		{name : "Sep", id : 9},
		{name : "Oct", id : 10},
		{name : "Nov", id : 11},
		{name : "Dec", id : 12}
	];
		
	$scope.aglYearList = [1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2010, 2011, 2012, 2013, 2014, 2015, 2016];
	$scope.aglLevelList = ["Native", "Professional", "Fluent", "Communicable", "Quite Good"];
	$scope.aglProgrammingLanguages = ["C", "C++", "C#", "Java", "Object C", "PHP", "Assemly"];
	
	$scope.UpdateState = function() {
		var ind = $scope.aglCountries.indexOf( $scope.aglSelectedCountry );
		$scope.aglSelectedStates = $scope.aglStates[ind].split("|");
	}
	
    $scope.LoadSessionData = function(val) {
        console.log(val);
    }
	
	/*bkLib.onDomLoaded(function() { 
		//nicEditors.allTextAreas()
		new nicEditor({fullPanel : true}).panelInstance('area1');	
	});*/
	
	
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
		if ($scope.SelectedDoctor == null)
			return;
		
		var n = $scope.aglSkills.length;
		for (var i = 0; i < n; i++)
			if ($scope.SelectedDoctor == $scope.aglSkills[i])
				return;
			
		$scope.aglSkills.push($scope.SelectedDoctor);
	}
	
	$scope.RemoveInterest = function(index){
		$scope.aglInterests.splice(index, 1); 
	}
	
	$scope.AddInterest = function(){
		
		if ($scope.SelectedDoctor1 == null)
			return;
		
		var n = $scope.aglInterests.length;
		for (var i = 0; i < n; i++)
			if ($scope.SelectedDoctor1 == $scope.aglInterests[i])
				return;
		
		$scope.aglInterests.push($scope.SelectedDoctor1);
	}
	
	$scope.AddLanguage = function()
	{
		var n = $scope.aglLanguages.length;
		for (var i = 0; i < n; i++)
			if ($scope.aglLanguage == $scope.aglLanguages[i].name)
			{
				$scope.aglDuplicatedLangError = "Error: Existed Language";
				return ;
			}
			
		if (!($scope.aglLanguage != null && $scope.aglLevel != null))
		{
			$scope.aglDuplicatedLangError = "Error: Empty Data! Please check again!";
			return;
		}

		$scope.aglLanguages.push({name : $scope.aglLanguage, summary : $scope.aglLevel});
		$scope.aglDuplicatedLangError = "";
	}
	
	$scope.RemoveLanguage = function(index){
		$scope.aglLanguages.splice(index, 1); 
		$scope.SelectedLangIndex = -1;
		$scope.flag1 = ! $scope.flag1;
		$scope.aglIsUpdating = false;
	}
	
	$scope.EditLanguage = function(index){
		$scope.aglLanguage = $scope.aglLanguages[index].name;
		$scope.aglLevel = $scope.aglLanguages[index].summary;
		$scope.flag1 = ! $scope.flag1;
		$scope.SelectedLangIndex = index;
		$scope.aglIsUpdating = true;
		$scope.flag2 = true;
	}
	
	$scope.UpdateLanguage = function(){
	
		$scope.aglLanguages[$scope.SelectedLangIndex ].summary = $scope.aglLevel;
		
		$scope.aglLanguage = "";
		$scope.aglLevel = "";
		
		$scope.aglIsUpdating = false;
		$scope.flag1 = ! $scope.flag1;
	}
	
	$scope.RemoveProject = function(index){
		$scope.aglProjects.splice(index, 1); 
		$scope.SelectedProIndex = -1;
		$scope.flag4 = ! $scope.flag4;
		$scope.aglProNameChecked = false;
		$scope.ResetProjectData();
		$scope.aglProjectError = "";
	}
	
	$scope.EditProject = function(index){
		//$scope.aglLanguage = $scope.aglLanguages[index].name;
		//$scope.aglLevel = $scope.aglLanguages[index].summary;
		$scope.aglProNameChecked = true;
		$scope.showDetails3 = true;
		$scope.flag4 = true;
		$scope.SelectedProIndex = index;	
		
		$scope.aglProName = $scope.aglProjects[index].name;
		$scope.aglProLang = $scope.aglProjects[index].language;
		$scope.aglProSummary = $scope.aglProjects[index].summary;
		
		var time = $scope.aglProjects[index].period.split(" - ");
		var sTime = time[0].split(" ");
		var eTime = time[1].split(" ");
		
		$scope.aglProStartMonth = sTime[0];
		$scope.aglProEndMonth = eTime[0];
		$scope.aglProStartYear = sTime[1];
		$scope.aglProEndYear = eTime[1];
	}
	
	$scope.RemoveEducation = function(index){
		$scope.aglEducation.splice(index, 1); 
		$scope.SelectedEduIndex = -1;
		$scope.flag6 = ! $scope.flag6;
	}
	
	$scope.EditEducation = function(index){
		//$scope.aglLanguage = $scope.aglLanguages[index].name;
		//$scope.aglLevel = $scope.aglLanguages[index].summary;
		$scope.showDetails1 = !$scope.showDetails1;
		$scope.flag6 = true;
		$scope.SelectedEduIndex = index;	
	}
	
	$scope.RemoveExperience = function(index){
		$scope.aglExperience .splice(index, 1); 
		$scope.SelectedExpIndex = -1;
		$scope.flag5 = ! $scope.flag5;
	}
	
	$scope.EditExperience  = function(index){
		//$scope.aglLanguage = $scope.aglLanguages[index].name;
		//$scope.aglLevel = $scope.aglLanguages[index].summary;
		$scope.showDetails2 = !$scope.showDetails2;
		$scope.flag5 = true;
		$scope.SelectedExpIndex = index;	
		
	}
	
	$scope.UpdateProject = function(){
		
		$scope.SelectedProIndex
		$scope.CheckProjectData();
		if ($scope.aglProjectError != "")
			return;
		
		var per = $scope.aglProStartMonth + " " + $scope.aglProStartYear + " - ";
		per = per + $scope.aglProEndMonth + " " + $scope.aglProEndYear;
		
		var ind = $scope.SelectedProIndex;
		
		$scope.aglProjects[ind].language = $scope.aglProLang;
		$scope.aglProjects[ind].period = per;
		$scope.aglProjects[ind].summary = $scope.aglProSummary;
		
		
		$scope.flag4 = ! $scope.flag4;
		$scope.aglProNameChecked = false;
		$scope.ResetProjectData();
		$scope.aglProjectError = "";
	}
	
	$scope.AddProject = function(){
		
		$scope.CheckProjectData();
		if ($scope.aglProjectError != "")
			return;
		

		var per = $scope.aglProStartMonth + " " + $scope.aglProStartYear + " - ";
		per = per + $scope.aglProEndMonth + " " + $scope.aglProEndYear;
		var newPro = 
		{
			name : $scope.aglProName,
			language : $scope.aglProLang,
			period : per,
			summary : $scope.aglProSummary
		}
		
		$scope.aglProjects.push (newPro);
		
		$scope.ResetProjectData();
		$scope.aglProjectError = "";
	}
	
	$scope.ResetProjectData = function()
	{
		$scope.aglProName = null;
		$scope.aglProLang = null;
		$scope.aglProSummary = null;
		$scope.aglProStartMonth = null;
		$scope.aglProEndMonth = null;
		$scope.aglProStartYear = null;
		$scope.aglProEndYear = null;
	}
	
	$scope.CheckProjectData = function()
	{
		$scope.aglProjectError = "";
		if ($scope.aglProName == null)
		{
			$scope.aglProjectError = "Error: Empty Name!";
			return;
		}

		if ($scope.aglProStartYear == null || $scope.aglProStartMonth == null || $scope.aglProEndYear == null || $scope.aglProEndMonth == null)
		{
			$scope.aglProjectError = "Error: Invalid Period!";
			return;
		}

		if ($scope.aglProStartYear > $scope.aglProEndYear)
		{
			$scope.aglProjectError = "Error: Invalid Period!";
			return;
		}	
		
		var n = $scope.aglMonthList.length;
		var ind1 = -1;
		var ind2 = -1;
		
		for (var i = 0; i < n; i++)
		{
			if ($scope.aglProStartMonth == $scope.aglMonthList[i].name)
				ind1 = i;
			if ($scope.aglProEndMonth == $scope.aglMonthList[i].name)
				ind2 = i;
		}
		
		if ($scope.aglProStartYear == $scope.aglProEndYear && ind1 > ind2)
		{
			$scope.aglProjectError = "Error: Invalid Period!";
			return;
		}
		
		if ($scope.aglProSummary == null)
		{
			$scope.aglProjectError = "Error: Empty Decription!";
			return;
		}
	}
});
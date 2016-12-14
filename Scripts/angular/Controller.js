/// <reference path="../angular.min.js" />
app.controller("EmpController", function ($scope, EmpService, StudentDataOp, $location, $localStorage, $sessionStorage, $window) {
    $scope.divBook = false;
    getAllEmployee1();
    function getAllEmployee1() {
       

        StudentDataOp.getStudents()
           .success(function (studs) {
               $scope.students = studs;
           })
           .error(function (error) {
               $scope.status = 'Unable to load customer data: ' + error.message;
           });
       
    }
    getAllEmployee();
    function getAllEmployee() {
        debugger;
        $scope.username = $sessionStorage.SessionMessage;
        var getEmpData = EmpService.getBooks();
        getEmpData.then(function (book) {
            $scope.books = book.data;
        }, function () {
            alert('Error in getting book records');
        });
    }
   
    $scope.login = function() {
        debugger;
        var emp = {
            UserEmail: $scope.UserEmail,
            UserPassword: $scope.UserPassword
        }
        StudentDataOp.loginform(emp).success(function (studs) {
            alert("login sucess");
            $location.path('/home');
        })
           .error(function (error) {
               $scope.status = 'Unable to load customer data: ' + error.message;
           });

        //var getdata = EmpService1.fetchUserDetails(emp)
        //getdata.then(function (msg) {
        //    alert(msg.data);
        //})


    }

    $scope.logout = function () {
        debugger;
        alert("logout sucess");
        $location.path('/login');
      
        $sessionStorage.empty();
       
    }
    $scope.test = function () {
        $location.hash('/test');
    }
    $scope.submit = function () {
        debugger;
        var emp = {
            UserEmail: $scope.UserEmail,
            UserPassword: $scope.UserPassword
        }
        var getloginemp = EmpService.loginform(emp);
        $sessionStorage.SessionMessage = emp.UserEmail;
        getloginemp.then(function (msg) 
            {
              
            alert(msg.data);
            window.location.href = "home.html";
            
            //$location.path("/home");
            }, function () {
                alert('Error in updating record');
            });
    }
    $scope.AddEmp = function () {
        debugger;
        ClearFields();
        $scope.Action = "Add";
        $scope.isdivbook = false;
        $scope.divBook = true;
    }
    function ClearFields() {
        $scope.Eid = "";
        $scope.Ename = "";
        $scope.ESalary = "";
        $scope.Edepartment = "";
        $scope.Eorganisation = "";
    }
    $scope.Cancel = function () {
        debugger;
        $scope.divBook = false;
    }
    $scope.AddUpdateBook = function (emp) {
        debugger;
        var getBookAction = $scope.Action;
        if(getBookAction == "Update")
        {
            StudentDataOp.updateEmp(emp).success(function () {
                getAllEmployee1()
                $scope.divBook = false;
            }, function () {
                alert('Error in updating record');
            })
        }
        else {
            StudentDataOp.AddBook(emp).success(function () {
                getAllEmployee1()
                $scope.divBook = false;
            }, function () {
                alert('Error in adding book record');
            })
        }
    }
    $scope.editBook = function (emp) {


        debugger;
        $scope.Eid = emp.Eid;
        $scope.Ename = emp.Ename;
        $scope.ESalary = emp.ESalary;
        $scope.Edepartment = emp.Edepartment;
        $scope.Eorganisation = emp.Eorganisation;
        $scope.Action = "Update";
        $scope.divBook = true;
       
        
    }
    //$scope.AddUpdateBook = function (emp) {
    //    debugger;
       
    //    var getBookAction = $scope.Action;
    //    if(getBookAction == "Update")
    //    {
    //        var updateEmpDetails = EmpService.updateEmp(emp);
    //        updateEmpDetails.then(function (details) {
    //            getAllEmployee();
    //            alert(details.data);
    //            $scope.divBook = false;
    //        }, function () {
    //            alert('Error in updating record');
    //        });


    //    }
    //    else {
    //        var getBookData = EmpService.AddBook(emp);
    //        getBookData.then(function(msg){
    //            getAllEmployee();
    //            alert(msg.data);
    //            $scope.divBook = false;
    //        }, function () {
    //            alert('Error in adding book record');
    //        });
    //    }
    //}
    $scope.naomi = { name: 'Naomi', address: '1600 Amphitheatre' };
    $scope.vojta = { name: 'Vojta', address: '3456 Somewhere Else' };
    $scope.Mahesh = {};
    $scope.Mahesh.name = "Mahesh Parashar";
    $scope.Mahesh.rollno = 1;

    $scope.Piyush = {};
    $scope.Piyush.name = "Piyush Parashar";
    $scope.Piyush.rollno = 2;

   
    $scope.deleteBook = function (emp) {
        debugger;
        StudentDataOp.deleteEmp(emp).success(function () {
            debugger
            getAllEmployee1();
            alert('Employee Deleted');
        })
           .error(function (error) {
               $scope.status = 'Unable to load customer data: ' + error.message;
           });
    }
});
app.directive('myc', function () {
    return {
        restrict: 'E',
        scope:{
            customerInfo: '=info'
        },
        templateUrl: 'directive.html'
    };
})
app.directive('student', function () {
    //define the directive object
    var directive = {};

    //restrict = E, signifies that directive is Element directive
    directive.restrict = 'E';

    //template replaces the complete element with its text. 
    directive.template = "Student: <b>{{student.name}}</b> , Roll No: <b>{{student.rollno}}</b>";

    //scope is used to distinguish each student element based on criteria.
    directive.scope = {
        student: "=name"
    }

    //compile is called during application initialization. AngularJS calls it once when html page is loaded.

    directive.compile = function (element, attributes) {
        element.css("border", "1px solid #cccccc");

        //linkFunction is linked with each element with scope to get the element specific data.
        var linkFunction = function ($scope, element, attributes) {
            element.html("Student: <b>" + $scope.student.name + "</b> , Roll No: <b>" + $scope.student.rollno + "</b><br/>");
            element.css("background-color", "#ff00ff");
        }
        return linkFunction;
    }
    return directive;
});
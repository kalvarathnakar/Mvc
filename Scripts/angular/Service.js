app.service("EmpService", function ($http) {
    //get All Employee Details
    this.getBooks = function () {
        return $http.get("CRUD/getempDetails");
    };
    //Add Book
    
    this.GetEmp = function (empId) {
        var response = $http({
            method: "post",
            url: "CRUD/GetBookById",
            params: {
                Eid: JSON.stringify(empId)
            }
        });
        return response;
    }
    // Update Employee
    
    //delete record

   
    //loginform
        
})
app.factory('StudentDataOp',  function ($http) {

   
    var StudentDataOp = {};

    StudentDataOp.getStudents = function () {
        return $http.get('CRUD/getempDetails');
    };
    StudentDataOp.loginform = function (emp) {
        return $http.post('CRUD/loginEmp', emp);
    }
    StudentDataOp.deleteEmp = function (emp) {
        return $http.post('CRUD/DeleteEmp', {Eid:emp.Eid});
    }
    StudentDataOp.AddBook = function (emp) {
        return $http.post('CRUD/AddEmp', emp);
    }
    StudentDataOp.updateEmp = function (emp) {
        return $http.post('CRUD/UpdateEmp', emp);
    }
    return StudentDataOp;

});

//app.factory("Empservice1", function ($http) {
//    var obj = {};

//    obj.fetchUserDetails = function () {
//        return $http.get('CRUD/getempDetails');
//    }

//    return obj;
   
//})
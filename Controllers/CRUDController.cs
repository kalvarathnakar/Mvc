using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AngularMvc.Controllers
{
    public class CRUDController : Controller
    {
        // GET: CRUD
        public ActionResult Index()
        {
            return View();
        }
       public JsonResult getempDetails()
        {
            using (var db = new RathnaEntities())
            {
                var q = db.tbl_Employee.ToList();
                return Json(q, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult GetBookById(string rathna)
        {
            int id = Convert.ToInt32(rathna);
            using (var db  =new RathnaEntities())
            {
                var q = (from s in db.tbl_Employee
                         where s.Eid.Equals((id))
                         select s).SingleOrDefault();
                return Json(q, JsonRequestBehavior.AllowGet);
            }
        }
        public string AddEmp(tbl_Employee tbl)
        {
            if(tbl != null)
            {
                using (var db = new RathnaEntities())
                {
                    db.tbl_Employee.Add(tbl);
                    db.SaveChanges();
                    return "Employee Add Sucessfully";
                }
            }
            else
            {
                return "Invalid Emp Details";
            }
        }
        public string DeleteEmp(tbl_Employee tbl)
        {
            if(tbl!=null)
            {
                using (var db = new RathnaEntities())
                {
                    int no = Convert.ToInt32(tbl.Eid);
                    var employeeList = db.tbl_Employee.Where(x => x.Eid== no).FirstOrDefault();
                    db.tbl_Employee.Remove(employeeList);
                    db.SaveChanges();
                    return "Employee Deleted";

                }
            }
            else
            {
                return "records not available";
            }
        }
        public string UpdateEmp(tbl_Employee tbl)
        {
            if(tbl !=null)
            {
                using (var db = new RathnaEntities())
                {
                    int id = Convert.ToInt32(tbl.Eid);
                    var q = (from s in db.tbl_Employee
                             where s.Eid.Equals(id)
                             select s).ToList();
                    q[0].Ename = tbl.Ename;
                    q[0].Eorganisation = tbl.Eorganisation;
                    q[0].Edepartment = tbl.Edepartment;
                    q[0].ESalary = tbl.ESalary;
                    db.SaveChanges();
                    return "Employee Updated";
                }
            }
            else
            {
                return "Employee not Updated";
            }
        }
       
        public string loginEmp(THF_User tbl)
        {
            if(tbl != null)
            {
                using (var db = new RathnaEntities())
                {
                    var q = (from s in db.THF_User
                             where s.UserEmail.Equals(tbl.UserEmail) && s.UserPassword.Equals(tbl.UserPassword)
                             select s).ToList();
                    if(q.Count !=0)
                    {
                        return "login sucess fully";
                    }
                    else
                    {
                        return "username & password wrong";
                    }

                }
            }
            else
            {
                return "username & password wrong";
            }
        }
    }
}
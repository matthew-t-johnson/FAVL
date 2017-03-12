using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace website.Controllers
{
    public class APIController : ApiController
    {
        [HttpGet]
        [Route("api/string/{s}")]
        public string GetString(string s)
        {
            return s;
        }

        public class AddUserArgs
        {
            public string firstName;
            public string lastName;
            public string address;
            public string phone;
        }


        [HttpPost]
        [Route("api/user/add")]
        public string AddUser([FromBody] AddUserArgs args)
        {
            return args.firstName;
        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BMG_NPVoting.Models
{
    public class Voter
    {
        public string Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string BusinessName { get; set; }
        public string City { get; set; }
    }
}
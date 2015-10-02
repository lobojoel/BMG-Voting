using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BMG_NPVoting.Models
{
    public class Vote
    {
        public string Id { get; set; }

        public DateTime Created { get; set; }

        public string VoterId { get; set; }

        public virtual Voter Voter { get; set; }
        public string VoteCandidate { get; set; }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BMG_NPVoting.ViewModels
{
    public class VotingResult
    {
        public int Total { get; set; }

        public List<PercentageStats> PercentageStats { get; set; }
    }

    public class PercentageStats
    {
        public string NonProfit { get; set; }

        public decimal PercentageVotes { get; set; }
    }
}
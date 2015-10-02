using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;
using BMG_NPVoting.Models;

namespace BMG_NPVoting.Context
{
    public class VotingContext : DbContext
    {
        public VotingContext()
        {
            Database.SetInitializer(new CreateDatabaseIfNotExists<VotingContext>());
            //Database.SetInitializer<VotingContext>(new CreateDatabaseIfNotExists<VotingContext>());
        }
        public DbSet<Voter> Voters { get; set; }
        public DbSet<Vote> Votes { get; set; }
        //public DbSet<NonProfit> NonProfit { get; set; }
    }
}
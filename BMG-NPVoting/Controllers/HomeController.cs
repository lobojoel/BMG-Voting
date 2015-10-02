using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using BMG_NPVoting.Context;
using BMG_NPVoting.Models;
using BMG_NPVoting.ViewModels;

namespace BMG_NPVoting.Controllers
{
    public class HomeController : Controller
    {
        VotingContext context = new VotingContext();
        public ActionResult Index()
        {
            using (var context = new VotingContext())
            {
                List<Voter> nps = context.Voters.ToList();
                return View("Index", nps);
            }
          

        }

        [HttpPost]
        public ActionResult Vote(string firstName, string lastName, string email, string phone, string businessName, string city, string votedFor)
        {

            using (var db = new VotingContext())
            {
                string voterId = Guid.NewGuid().ToString();

                var existingVoter = db.Voters.Where(a => a.FirstName == firstName && a.LastName == lastName && a.Email == email).SingleOrDefault();
                if (existingVoter != null)
                {
                    voterId = existingVoter.Id;
                }
                else
                {
                    var voter = new Voter { Id = voterId, FirstName = firstName, LastName = lastName, Email = email, Phone = phone, BusinessName = businessName, City = city };
                    db.Voters.Add(voter);
                    db.SaveChanges();
                }
                var vote = new Vote { Id = Guid.NewGuid().ToString(), Created = DateTime.Now, VoteCandidate = votedFor, VoterId = voterId };
                db.Votes.Add(vote);
                db.SaveChanges();
            }
            return View("Result");
        }

        [HttpGet]
        public ActionResult Results()
        {
            VotingResult results = new VotingResult();
            using (var db = new VotingContext())
            {
                int totalVotes = db.Votes.ToList().Count;
                results.Total = totalVotes;
                results.PercentageStats = new List<PercentageStats>();
                if (totalVotes > 0)
                {
                    decimal tot = Convert.ToDecimal(totalVotes);
                    var existingVoteStats = db.Votes.GroupBy(a => a.VoteCandidate,
                                       a => a.Id,
                                   (key, g) => new
                                   {
                                       NonProfit = key,
                                       PercentageVotes = ((g.Count() / tot) * 100)
                                   });
                    foreach (var stat in existingVoteStats)
                    {
                        results.PercentageStats.Add(new PercentageStats { NonProfit = stat.NonProfit.Replace(" ","_"), PercentageVotes = stat.PercentageVotes });
                    }
                }
            }
            return Json(results,JsonRequestBehavior.AllowGet);
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your app description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}

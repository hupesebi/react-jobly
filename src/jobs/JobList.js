import JobCard from "./JobCard";
import React, { useEffect, useState } from "react";
import JoblyApi from "../api/APIHelper";
import SearchForm from "../common/SearchForm";



function JobList({ jobsForCompany = null }) {
  const [jobs, setJobs] = useState(jobsForCompany);
  const [searchTerm, setSearchTerm] = useState(null);


  useEffect(function makeJobsAPIRequest() {
    async function makeAPIRequest() {
      const jobsResult = await JoblyApi.getJobs(searchTerm);
      setJobs(jobsResult);
    }
    try {
      makeAPIRequest();
    }
    catch (e) {
      console.error("Error: update jobs failed:\n", e);
    }
  }, [searchTerm]);

  /* Renders JobCard components based on jobs in state */
  function renderJobs() {
    return jobs.map(j =>
      { return <JobCard
                key={j.id}
                jobId={j.id}
                title={j.title}
                salary={j.salary}
                equity={j.equity}
                companyName={j.companyName} />});
  }

  function updateJobs(searchTerm) {
    setSearchTerm(searchTerm);
  }



  if (!jobs) return (<div >Loading...</div>);

  return (
    <div>
      <SearchForm handleSearch={updateJobs} />
        {renderJobs()}
    </div>
  );
}


export default JobList;
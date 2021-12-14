import React, { useContext, useState, useEffect } from "react";
import UserContext from "../auth/UserContext";


const JobCard = ({jobId, title, salary, equity, companyName}) => {

  const { hasAppliedToJob, applyToJob } = useContext(UserContext);
  const [applied, setApplied] = useState();
  
  useEffect(function updateAppliedStatus() {

    setApplied(hasAppliedToJob(jobId));
  }, [jobId, hasAppliedToJob]);

  /** Apply for a job */
  async function handleApply(evt) {
    if (hasAppliedToJob(jobId)) return;
    applyToJob(jobId);
    setApplied(true);
  }

  return (
    <div>
 
        <h3 className="inline text-lg leading-6 font-medium text-gray-900">
          Job Title: {title}
        </h3>

          <button
                className="inline-flex justify-center  py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={handleApply}
                disabled={applied}
            >
            {applied ? "Applied" : "Apply"}
          </button>
       
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          {companyName}
        </p> 
   
      <div>
        <dl>
          <div>
            <dt>
              Salary:
            </dt>
            <dd>
              {formatSalary(salary) || "Not Listed"}
            </dd>
          </div>
          <div>
            <dt>
              Equity:
            </dt>
            <dd>
              {equity ? equity : 0}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}


function formatSalary(salary) {
  if (!salary) return null;
  const digitsRev = [];
  const salaryStr = salary.toString();

  for (let i = salaryStr.length - 1; i >= 0; i--) {
    digitsRev.push(salaryStr[i]);
    if (i > 0 && i % 3 === 0) digitsRev.push(",");
  }

  return digitsRev.reverse().join("");
}

export default JobCard;
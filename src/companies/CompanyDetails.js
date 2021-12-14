
   
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import JoblyApi from "../api/APIHelper";
import JobList from "../jobs/JobList";

const CompanyDetails = () =>{
    const [company, setCompany] = useState()
    const {handle} = useParams()

    useEffect(function makeApiCallforComp(){
        async function fetchCompanyInfo(){
            const res = await JoblyApi.getCompany(handle)
            setCompany(res)
        }
        fetchCompanyInfo();
    }, [handle])

    if (company === undefined) return ( <div> Loading.... </div>);
    return(
        <div>
            <h2> {company.handle} </h2>
            <p> {company.name} </p>
            <p> {company.desription} </p>
            <JobList jobs={company.jobs} />
        </div>
    )
}

export default CompanyDetails;
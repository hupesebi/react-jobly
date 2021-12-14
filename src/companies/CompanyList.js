import SearchForm from "../common/SearchForm";
import CompanyCard from "./CompanyCard";
import React, { useEffect, useState } from "react";
import JoblyApi from "../api/APIHelper";


const CompanyList = () =>{
  
    const [companies, setCompanies] = useState([]);

    const renderCompanies = () => {
        return companies.map(company => 
            <CompanyCard
            key={company.handle} 
            handle={company.handle}
            name={company.name}
            description={company.description}
            numEmployees={company.numEmployees}
         />)
    }

    useEffect(function getCompaniesOnMount(){
        search()
    },[])

    async function search(name){
        let companies = await JoblyApi.getCompanies(name);
        setCompanies(companies)
    }

    return (
        <div>
          <h1>Companies:</h1>
          <SearchForm handleSearch={search} />
          <div>
            {renderCompanies()}
          </div>
        </div>);

}

export default CompanyList
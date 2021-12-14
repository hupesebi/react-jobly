import React from "react";
import { Link } from "react-router-dom";

const CompanyCard = ({handle, name, description, logo_url}) =>{
    return(
        <div>
            <Link to={`companies/${handle}`}>
                <h4> {name}</h4>
            </Link>
            <p> {description}</p>
            <img src={logo_url} alt="logo"/>
        </div>
    );
};

export default CompanyCard;
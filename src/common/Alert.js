import React from "react"

const Alert = ({errors = []}) =>{
    if (errors.legnth){
        return(
            <div>
                <strong>
                    {errors.map(error=><p key={error}>{error}</p>)}
                </strong>
            </div>
        )
    } else{
        return null
    }
}

export default Alert
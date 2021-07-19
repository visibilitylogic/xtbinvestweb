import React from "react"
import {useHistory}from "react-router-dom"

const Router=(props)=>{
    const history=useHistory()
    return(
        <>{history.push(`/${props.link}`)}</>
    )
}

export default Router

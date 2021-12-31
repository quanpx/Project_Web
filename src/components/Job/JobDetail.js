import React, { useState,useEffect } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";

const JobDetail = () => {
    const {id} = useParams();
 
    // call api
    const [job,setJob] = useState({});
    const [authenticated,setAuthenticated]=useState(JSON.parse(localStorage.getItem("authenticated")));

    const base_url = "https://my-happy-farmer.herokuapp.com/api/v1";
    // let headers = {
    //     'Authorization': "Bearer "+authenticated.token,
    //     'Content-Type': 'application/json'
    // };

    useEffect(async () => {
      await  axios.get(base_url + "/job/detail/"+id)
            .then(res => res.data)
            .then(data => {
                setJob(data.data);
            });
    }, [])

    console.log(job)

    return(
        <>
            Job-detail
        </>
    )
}

export default React.memo(JobDetail);
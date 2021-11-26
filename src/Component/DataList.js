import React,{useState,useEffect} from "react";
import Table from "./Table";

export function EmployeeDataList(){

    const [data,setData] = useState([]);
       const url = 'http://localhost:8000/data';

    useEffect(() =>
        fetch(url)
        .then(res=>res.json())
        .then(result=>setData(result))
    , [])

    const distinctGender = [...new Set(data.map(user=>user.gender))];

    console.log(distinctGender );


    return(
        <div>
            <Table/>

        </div>
    )
}
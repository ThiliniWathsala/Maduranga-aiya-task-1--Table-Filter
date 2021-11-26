import React,{useState,useEffect} from "react";
import Table from "./Table";

export function EmployeeDataList(){

    const [data,setData] = useState([]);
    const url = 'http://localhost:8000/data?';
    const title="Employee Table"

    useEffect(() =>
        fetch(url)
        .then(res=>res.json())
        .then(result=>setData(result))
    , [])

    const distinctGender = [...new Set(data.map(user=>user.gender))];


    return(
        <div>

            <Table data={data} menuarray={distinctGender} setData={setData} url={url} title={title} />
        </div>
    )
}
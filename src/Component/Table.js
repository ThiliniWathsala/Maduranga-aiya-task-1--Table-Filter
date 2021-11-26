import React, { useMemo, useState, useEffect,useCallback} from "react";
import MaterialTable from 'material-table';
import { COLOMNS } from "./Columns";
import MOCK_Data from './MOCK_DATA.json';
import debounce from 'lodash.debounce';
// import MenuItem from '@mui/material/MenuItem';
import {tableIcons} from './TableIcon'

export function Table(){
    
    const [tableData, setTableData] = useState(MOCK_Data);
    const [searchKeyWord,setSearchKeyWord] = useState('');
    const [column,setColumn] = useState('');
    const [firstName, setFirstName] = useState('');
    let keyWord='';
    

    // const columns = useMemo(() => COLOMNS, []);
    const columns = COLOMNS;
    const title = "Employee Table"
    const url = 'http://localhost:8000/data';
     const getData =()=>{
                        fetch(url).then(res=>{
                            res.json().then(res=>{
                                 // prepare your data and then call resolve like this:
                               console.log(res);
                            })
                        });
                        console.log(keyWord)

     }


    
    const getSearchKeyWord=(e)=>{
        keyWord = e.target.value;
        getData();    
    }

    // const debounseChangeHandeler = useCallback(
    //   debounce(getSearchKeyWord,3000)
    //   ,[],
    // )
    const debounseChangeHandeler = useMemo(
      () => debounce(getSearchKeyWord, 3000)
    , []);
   
    return(
        <div>
            <MaterialTable  
                title={title}
                icons={tableIcons} 
                options={
                    {
                        filtering:true,
                        // pagin:true,
                        // pageSizeOptions:[,5,10,20,50,100],
                        search:true,
                        debounceInterval: 1000,
                        padding: "dense",
                        

    
                    }
                    }
                columns={columns} 
                // data={query =>
                //     new Promise((resolve, reject) => {
                //         let url = 'http://localhost:3006/data?'

                //         if(query.orderBy){
                //             url+=`&_sort=${query.orderBy.field}&_order=${query.orderDirection}`
                //         }
                        
                //         if(query.filters.length){
                //             const filter = (query.filters.map(item=>{
                //               return `&${item.column.field} ${item.operator} ${item.value}`
                //             }))

                //             url+= filter.join('');
                //         }
                //         url+=`&_page=${query.page+1}`
                //         url+=`&_limit=${query.pageSize}`
                        
                //         fetch(url).then(res=>{
                //             res.json().then(res=>{
                //                  // prepare your data and then call resolve like this:
                //                 resolve({
                //                     data: res,
                //                     page: query.page,
                //                     totalCount: 100
                //                 });
                //             })
                //         })

                       
                //     })
                // }
          
                data={tableData} 
                components={{
                    FilterRow: (rowProps) => {
                      const { columns } = rowProps;
                      console.log(columns)
            
                      return (
                        <>
                          <tr>
                            {columns.map((col,index) => {
                              if (col.field) {
                                return (
                                  <td>
                                    {col.type !== 'select'?
                                    
                                  
                                    <span>
                                    <input  
                                    type={col.type}
                                    placeholder={"search "+col.field}
                                    id={col.field}
                                   
                                    onChange={debounseChangeHandeler}
                                  
                                    />
                                  </span>:''
                                //   <Select
                                //       labelId="demo-simple-select-standard-label"
                                //       id="demo-simple-select-standard"
                                //       value={age}
                                //       onChange={handleChange}
                                //       label="Age"
                                //     >
                                //       <MenuItem value="">
                                //         <em>None</em>
                                //       </MenuItem>
                                //       <MenuItem value={10}>Ten</MenuItem>
                                //       <MenuItem value={20}>Twenty</MenuItem>
                                //       <MenuItem value={30}>Thirty</MenuItem>
                                // </Select>
                                                          }

                                
                                   
                                  </td>
                                );
                              }
                            })}
                          </tr>
                        </>
                      );
                    },
                  }}

            />
        </div>

    )
}


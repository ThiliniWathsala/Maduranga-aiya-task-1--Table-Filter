import React, { useMemo, useState, useEffect,useCallback} from "react";
import MaterialTable from 'material-table';
import { COLOMNS } from "./Columns";
import debounce from 'lodash.debounce';
import {tableIcons} from './TableIcon';


export default function Table({data, menuarray, setData, url, title}){

    const tableData = data; 
    const menuArray = menuarray; 
    let keyWord='';
    let columnName = '';
    const columns = COLOMNS;
    let baseUrl = url;

    // get filtered data
     const getData =()=>{
                        if(keyWord){
                            let filter = `${columnName}${'='}${keyWord}`
                            baseUrl+= filter;
                        }
                        console.log(baseUrl);
                        fetch(baseUrl).then(res=>{
                            res.json().then(res=>{
                                 // prepare your data and then call resolve like this:
                               console.log(res);
                               setData(res);
                               keyWord = '';
                               columnName = '';
                               baseUrl = url;

                            })
                        });
                      
                        console.log(keyWord)

     }

    const getSearchKeyWord=(e)=>{
        keyWord = e.target.value;  //set search word
        columnName = e.target.id;  // set column Name
        getData();    
    }

    // set a delay to onChange events, so we can trigger api call after type search word
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
                        pagin:true,
                        pageSizeOptions:[,5,10,20,50,100],
                        search:false,
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
                                      id={index}
                                      type={col.type}
                                      placeholder={"search "+col.field}
                                      id={col.field}
                                      onChange={debounseChangeHandeler}
                                      />
                                    </span>:
                                    <select id={col.field}  name={col.field}
                                     onChange={debounseChangeHandeler} >
                                      {
                                        menuArray.map((item,index)=>{
                                        return <option 
                                          id={index}
                                          label={item}
                                          value={item}
                                          key={index}
                                         
                                      >{item}</option>})
                                      } 
                                    </select>
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


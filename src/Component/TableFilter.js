import React, {useMemo, useState, useEffect, useCallback} from "react";
import debounce from 'lodash.debounce';


export default function(col, debounseChangeHandeler){
    return(
        <>
            <td>
                 {col.type !== 'select'?
                                    
                                  
                    <span>
                      <input  
                         type={col.type}
                         placeholder={"search "+col.field}
                         id={col.field}
                                   
                          onChange={e=>debounseChangeHandeler}
                                  
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
        </>
    )
}
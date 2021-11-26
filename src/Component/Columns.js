import {format} from 'date-fns';


export const COLOMNS = [
    {
        title: 'Id',
        field: 'id',
        // align: 'center'
        emptyValue:()=><em>null</em>,
        sorting:false,
        type:'text'
       
    },
    {
        title:'First Name',
        field: 'first_name',
        emptyValue:()=><em>null</em>,
        render: rowData => rowData.first_name,
        customFilterAndSearch: (term, rowData) => (rowData.first_name).indexOf(term) != -1
      
    },
    {
        title:'Last Name',
        field: 'last_name',
        emptyValue:()=><em>null</em>
    },
    {
        title: 'Gender',
        field: 'gender',
        // lookup:{Male:"Male", Female:"Female"},
        emptyValue:()=><em>null</em>,
        type:'select'
    
    },
    {
        title:'Date of Birth', 
        field: 'date_of_birth',
        emptyValue:()=><em>null</em>,
        type: 'date'
    },
    
    {
        title:'Country',
        field: 'country',
        emptyValue:()=><em>null</em>
    },
    {
        title:'Phone',
        field: 'phone',
        emptyValue:()=><em>null</em>
        // filtering: false
    },

]

import React from 'react';
import './company.css';
import 'antd/dist/antd.css';
import { paths } from '../../../swaggerCode/swaggerCode';
import axios from 'axios'
import {Row, Col} from 'antd';
import AddEntity from "../companyEntities/addEntity/addEntity"
import DataEntity from "../companyEntities/dataEntity/dataEntity"
import FilterEntity from "../companyEntities/filterEntity/filterEntity"
import PaginationEntity from "../companyEntities/paginationEntity/paginationEntity"

type getCompanies=paths["/api/Company"]["get"]["responses"]["200"]["content"]["application/json"]

export class Company extends React.Component<{},{}> {

  

    state={
        requestUrl:"https://hse-cms.herokuapp.com",
        requestPath:"/api/Company",
        NameStartsWith: "",

        SortingColumn: "Name",
        SortingColumnOptions:["Name"],

        SortDirection: "Ascending",
        SortDirectionOptions:["Ascending","Descending"],

        QuickSearch: "",
        PageLimit: 10,
        PageNumber: 1,

        SearchBy:"All",

        optionName:["SearchBy"],
        optionList:[["Ascending","Descending","All"]],
        text:["Искать по"],

        count: 0,
        items: [
            {
                id: "",
                name: ""
            }
        ]
    }

    isNull=(val:string):boolean=>{
        return val==="";
    }

    changeValue=(val:any,type:string,callback?:()=>void)=>{
        if (callback !== undefined) 
        this.setState({[type]:val},callback)  
        else this.setState({[type]:val})    
    }

    update(){ 
        let request:string="?";
        request+="&PageLimit="+this.state.PageLimit;
        request+="&PageNumber="+this.state.PageNumber;
        request+=this.isNull(this.state.NameStartsWith)?"":"&NameStartsWith="+this.state.NameStartsWith;
        request+=this.isNull(this.state.SortingColumn)?"":"&SortingColumn="+this.state.SortingColumn;
        request+=this.isNull(this.state.SortDirection)?"":"&SortDirection="+this.state.SortDirection;
        request+=this.isNull(this.state.QuickSearch)?"":"&QuickSearch="+this.state.QuickSearch;
        axios.get(
            this.state.requestUrl+this.state.requestPath+request,
            {
                headers: {
                "Authorization": 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiJmYWNlMWU1NS1iMGQ1LTFhYjUtMWU1NS1iZWYwMDFlZDEwMGYiLCJDb21wYW55SWQiOiJmYWNlMWU1NS1iMGQ1LTFhYjUtMWU1NS1iZWYwMDFlZDEwMGYiLCJyb2xlIjoiU3VwZXJBZG1pbiIsIm5iZiI6MTYxMjU1MDU1NywiZXhwIjoxNjE1MTQyNTU3LCJpYXQiOjE2MTI1NTA1NTd9.VqH4-kbHOqvqaDaW5Ei1IAVCkRyoCDDbHLKXsZppYBM9LMctww6ve5nm_rVl3d8YSO_p_B12cLAfez3x7la4PA'
              }
            }
        )
        .then(res => {
            console.log(res);
            this.setState({count:res.data.count})
            this.setState({items:res.data.items})
        })
        .catch(err => {  
            switch(err.response.status)
            {
                case 401:{
                    console.log("401"); 
                    break;
                }
                default:{
                    console.log("Undefined error"); 
                    break;
                }
            }
        })
    }

 

    
    setCountItems=(val:number)=>{
        this.setState({count:val})
    }

    onPageChange=(page:number, pageSize?: number | undefined)=>{
        this.setState({PageNumber:page},()=>this.update());
    }
    
    onMaxItemsChange=(current: number, size: number)=>{
        this.setState({PageNumber:current});
        this.setState({PageLimit:size},()=>this.update());
    }

    
    render(){
        return(
            <div>
                <FilterEntity
                updateCallback={this.update}
                changeValueCallback={this.changeValue}
                SortDirection={this.state.SortDirection}
                SortDirectionOptions={this.state.SortDirectionOptions}
                SortingColumn={this.state.SortingColumn}
                SortingColumnOptions={this.state.SortingColumnOptions}
                option={[this.state.SearchBy]}
                optionName={this.state.optionName}
                optionList={this.state.optionList}
                text={this.state.text}
                />
                <AddEntity/> 
                <DataEntity items={this.state.items}/>  
                <PaginationEntity 
                countItems={this.state.count}
                onPageChange={this.onPageChange}
                onMaxItemsChange={this.onMaxItemsChange}/> 
            </div>
            
        );
    }
        
    componentDidMount() {
        this.update();
    }

}




export default Company;

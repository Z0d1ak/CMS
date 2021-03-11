import React from 'react';
import './article.css';
import 'antd/dist/antd.css';
import { paths } from '../../../swaggerCode/swaggerCode';
import axios from 'axios'
import {Row, Col} from 'antd';
import AddEntity from "../companyEntities/addEntity/addEntity"
import DataEntity from "../companyEntities/dataEntity/dataEntity"
import FilterEntity from "../companyEntities/filterEntity/filterEntity"
import PaginationEntity from "../companyEntities/paginationEntity/paginationEntity"

type getArticle=paths["/api/Article"]["get"]["responses"]["200"]["content"]["application/json"]
type deleteArticle=paths["/api/Article/{id}"]["delete"]["parameters"]["path"]
type updateArticle=paths["/api/Article"]["put"]["requestBody"]["content"]["text/json"]
type addArticle=paths["/api/Article"]["post"]["requestBody"]["content"]["text/json"]


/**
 * Класс компонента компаний
 */
export class Article extends React.Component<{},{}> {

  

    state={
        requestUrl:"https://hse-cms.herokuapp.com",
        requestPath:"/api/Article",
        NameStartsWith: "",

        SortingColumn: "Title",
        SortingColumnOptions:["DeadLine","Title","CreationDate","State","TaskType"],

        SortDirection: "Ascending",
        SortDirectionOptions:["Ascending","Descending"],

        QuickSearch: "",
        PageLimit: 10,
        PageNumber: 1,

        SearchBy:"All",

        optionName:["SearchBy"],
        optionList:[["Name","All","Assigne","Author"]],
        text:["Искать по"],

        count: 0,
        items: [
            {
                id: "",
                name: ""
            },
            {
                id: "",
                name: ""
            },
            {
                id: "",
                name: ""
            },
            {
                id: "",
                name: ""
            },
            {
                id: "",
                name: ""
            },
            {
                id: "",
                name: ""
            },
            {
                id: "",
                name: ""
            },
            {
                id: "",
                name: ""
            },
            {
                id: "",
                name: ""
            },
            {
                id: "",
                name: ""
            },
        ],
        loading:false
    }

    isNull=(val:string):boolean=>{
        return val==="";
    }

    changeValue=(val:any,type:string,callback?:()=>void)=>{
        if (callback !== undefined) 
        this.setState({[type]:val},callback)  
        else this.setState({[type]:val})    
    }

    delete=(val:string)=>{
        axios.delete(
            this.state.requestUrl+this.state.requestPath+"/"+val,
            {
                headers: {
                    "Authorization": "Bearer "+sessionStorage.getItem("AuthUserSecurityToken")
                }
            }
        )
        .then(res => {
            console.log(res);
            this.update();
        })
        .catch(err => {  
            switch(err.response.status)
            {
                case 401:{
                    console.log("401"); 
                    break;
                }
                case 404:{
                    console.log("404"); 
                    break;
                }
                default:{
                    console.log("Undefined error"); 
                    break;
                }
            }
        })
    }

    create=(val:addArticle)=>{
        axios.post(this.state.requestUrl+this.state.requestPath,val,
        {
            headers: {
                "Authorization": "Bearer "+sessionStorage.getItem("AuthUserSecurityToken")
            }
        })
        .then(res => {
            console.log(res);
            this.update();
        })
        .catch(err => {  
            console.log(err); 
            switch(err.response.status)
            {
                case 401:{
                    console.log("401"); 
                    break;
                }
                case 409:{
                    console.log("404"); 
                    break;
                }
                default:{
                    console.log("Undefined error"); 
                    break;
                }
            }
        })
    }

    updateData=(val:updateArticle)=>{
        axios.put(this.state.requestUrl+this.state.requestPath,val,
        {
            headers: {
                "Authorization": "Bearer "+sessionStorage.getItem("AuthUserSecurityToken")
            }
        })
        .then(res => {
        console.log(res);
        })
        .catch(err => {  
        console.log(err); 
        switch(err.response.status)
            {
                case 401:{
                    console.log("401"); 
                    break;
                }
                case 404:{
                    console.log("404"); 
                    break;
                }
                case 409:{
                    console.log("404"); 
                    break;
                }
                default:{
                    console.log("Undefined error"); 
                    break;
                }
            }
        })
        
    }

    update(){ 
        this.setState({loading:true});
        let request:string="?";
        request+="&PageLimit="+this.state.PageLimit;
        request+="&PageNumber="+this.state.PageNumber;
        request+=this.isNull(this.state.NameStartsWith)?"":"&NameStartsWith="+this.state.NameStartsWith;
        request+=this.isNull(this.state.SortingColumn)?"":"&SortingColumn="+this.state.SortingColumn;
        request+=this.isNull(this.state.SortDirection)?"":"&SortDirection="+this.state.SortDirection;
        request+=this.isNull(this.state.QuickSearch)?"":"&QuickSearch="+this.state.QuickSearch;
        /*axios.get(
            this.state.requestUrl+this.state.requestPath+request,
            {
                headers: {
                    "Authorization": "Bearer "+sessionStorage.getItem("AuthUserSecurityToken")
                }
            }
        )
        .then(res => {
            console.log(res);
            this.setState({count:res.data.count})
            this.setState({items:res.data.items})
            this.setState({loading:false});
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
        })*/
        this.setState({count:10})
        this.setState({items:[
            {
                id: "face1e55-b0d5-1ab5-1e55-bef001ed100f",
                initiator: {
                    id: "face1e55-b0d5-1ab5-1e55-bef001ed100f",
                    companyId: "face1e55-b0d5-1ab5-1e55-bef001ed100f",
                    email: "admin@admin.com",
                    firstName: "Adminй",
                    lastName: "Adminй123",
                    roles: ["Author" , "Corrector"]
                },
                creationDate:"25.10.1999",
                state: "состояние",
                title: "Статья",
                task: "задание"
            }



        ]})
        this.setState({loading:false});
    }

 

    
    setCountItems=(val:number)=>{
        this.setState({count:val})
    }

    onPageChange=(page:number, pageSize?: number | undefined)=>{
        if (page===0){
            this.setState({PageNumber:1},()=>this.update());
        }
        else{
            this.setState({PageNumber:page},()=>this.update());
        }
    }
    
    onMaxItemsChange=(current: number, size: number)=>{
        //console.log(current);
        if (current===0){
            //console.log(current);
            this.setState({PageLimit:size,PageNumber:1},()=>this.update());
        }
        else{
            //console.log(current);
            this.setState({PageLimit:size,PageNumber:current},()=>this.update());
        }
        
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
                <AddEntity
                createCallback={this.create}
                /> 
                <DataEntity 
                loading={this.state.loading}    
                updateDataCallback={this.updateData} 
                deleteCallback={this.delete} 
                updateCallback={this.update} 
                changeValueCallback={this.changeValue} 
                items={this.state.items}/>  
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




export default Article;


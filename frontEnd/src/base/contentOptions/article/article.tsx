import React from 'react';
import './article.css';
import 'antd/dist/antd.css';
import { paths } from '../../../swaggerCode/swaggerCode';
import axios from 'axios'
import {Row, Col, notification} from 'antd';
import AddEntity from "../dataEntities/addEntity/addEntity"
import DataEntity from "../dataEntities/dataEntity/dataEntity"
import FilterEntity from "../dataEntities/filterEntity/filterEntity"
import PaginationEntity from "../dataEntities/paginationEntity/paginationEntity"

type getArticle=paths["/api/Article"]["get"]["responses"]["200"]["content"]["application/json"]
type deleteArticle=paths["/api/Article/{id}"]["delete"]["parameters"]["path"]
type updateArticle=paths["/api/Article"]["put"]["requestBody"]["content"]["text/json"]
type addArticle=paths["/api/Article"]["post"]["requestBody"]["content"]["text/json"]


/**
 * Класс компонента компаний
 */
export class Article extends React.Component<{},{}> {

  

    state={
        dataType:"article",
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
            this.update();
            notification.success({
                message: 'Удаление прошло успешно',
                description:
                  'Компания с id:'+val+" была удалена",
              });
        })
        .catch(err => {  
            switch(err.response.status)
            {
                case 401:{
                    notification.error({
                        message: 'Ошибка '+ err.response.status,
                        description:
                          "Недостаточно прав для удаления статьи"
                      });
                    break;
                }
                case 404:{
                    notification.error({
                        message: 'Ошибка '+ err.response.status,
                        description:
                          "Статья с id:"+ val+" не найдена"
                      });
                    break;
                }
                default:{
                    notification.error({
                        message: 'Ошибка '+ err.response.status,
                        description:
                          "Неопознанная ошибка"
                      });
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
            this.update();
            notification.success({
                message: 'Создание прошло успешно',
                description:
                  'Статья с id:'+val.id+" была успешно создана",
              });
        })
        .catch(err => {  
            console.log(err); 
            switch(err.response.status)
            {
                case 401:{
                    notification.error({
                        message: 'Ошибка '+ err.response.status,
                        description:
                          "Недостаточно прав для создания статьи"
                      });
                    break;
                }
                case 409:{
                    notification.error({
                        message: 'Ошибка '+ err.response.status,
                        description:
                          "Конфликт данных, убедитесь что данные корректны и не дублируют существующие"
                      }); 
                    break;
                }
                default:{
                    notification.error({
                        message: 'Ошибка '+ err.response.status,
                        description:
                          "Неопознанная ошибка"
                      });
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
            notification.success({
                message: 'Данные успешно обновлены',
                description:
                  'Данные статьи с id:'+val.id+" были успешно обновлены",
              });
        })
        .catch(err => {  
        console.log(err); 
        switch(err.response.status)
            {
                case 401:{
                    notification.error({
                        message: 'Ошибка '+ err.response.status,
                        description:
                        "Ошибка авторизации"
                      });
                    break;
                }
                case 403:{
                    notification.error({
                        message: "Ошибка"+ err.response.status,
                        description:
                        "Недостаточно прав для изменения данных статьи",
                      });
                    break;
                }
                case 404:{
                    notification.error({
                        message: "Ошибка"+ err.response.status,
                        description:
                          'Статья с id:'+val.id+" не найдена",
                      });
                    break;
                }
                case 409:{
                    notification.error({
                        message: 'Ошибка '+ err.response.status,
                        description:
                          "Конфликт данных, убедитесь что данные корректны и не дублируют существующие"
                      }); 
                    break;
                }
                default:{
                    notification.error({
                        message: 'Ошибка '+ err.response.status,
                        description:
                          "Неопознанная ошибка"
                      });
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
                "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                "initiator": {
                  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                  "companyId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                  "email": "user@example.com",
                  "firstName": "string",
                  "lastName": "string",
                  "roles": [
                    "SuperAdmin"
                  ]
                },
                "creationDate": "2021-03-11T22:18:00.743Z",
                "state": "Project",
                "title": "string",
                "content": "string",
                "tasks": [
                  {
                    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                    "type": 0,
                    "performer": {
                      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                      "companyId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                      "email": "user@example.com",
                      "firstName": "string",
                      "lastName": "string",
                      "roles": [
                        "SuperAdmin"
                      ]
                    },
                    "author": {
                      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                      "companyId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                      "email": "user@example.com",
                      "firstName": "string",
                      "lastName": "string",
                      "roles": [
                        "SuperAdmin"
                      ]
                    },
                    "creationDate": "2021-03-11T22:18:00.743Z",
                    "assignmentDate": "2021-03-11T22:18:00.743Z",
                    "сompletionDate": "2021-03-11T22:18:00.743Z",
                    "description": "string",
                    "comment": "string"
                  },
                  {
                    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                    "type": 0,
                    "performer": {
                      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                      "companyId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                      "email": "user@example.com",
                      "firstName": "string",
                      "lastName": "string",
                      "roles": [
                        "SuperAdmin"
                      ]
                    },
                    "author": {
                      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                      "companyId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                      "email": "user@example.com",
                      "firstName": "string",
                      "lastName": "string",
                      "roles": [
                        "SuperAdmin"
                      ]
                    },
                    "creationDate": "2021-03-11T22:18:00.743Z",
                    "assignmentDate": "2021-03-11T22:18:00.743Z",
                    "сompletionDate": "2021-03-11T22:18:00.743Z",
                    "description": "string",
                    "comment": "string"
                  },
                  {
                    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                    "type": 0,
                    "performer": {
                      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                      "companyId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                      "email": "user@example.com",
                      "firstName": "string",
                      "lastName": "string",
                      "roles": [
                        "SuperAdmin"
                      ]
                    },
                    "author": {
                      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                      "companyId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                      "email": "user@example.com",
                      "firstName": "string",
                      "lastName": "string",
                      "roles": [
                        "SuperAdmin"
                      ]
                    },
                    "creationDate": "2021-03-11T22:18:00.743Z",
                    "assignmentDate": "2021-03-11T22:18:00.743Z",
                    "сompletionDate": "2021-03-11T22:18:00.743Z",
                    "description": "string",
                    "comment": "string"
                  }
                ]
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
                dataType={this.state.dataType}
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
                dataType={this.state.dataType}
                createCallback={this.create}
                /> 
                <DataEntity 
                dataType={this.state.dataType}
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


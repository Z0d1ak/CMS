import React from 'react';
import 'antd/dist/antd.css';
import './employeeCard.css';
import {
    SettingOutlined,
    DeleteOutlined,
    EllipsisOutlined,
    UpOutlined,
    CheckOutlined,
} from '@ant-design/icons';
import { Divider } from 'antd';
import {Avatar,Card,Popconfirm, message } from 'antd';
import { Row, Col } from 'antd';
import {DataRow,DataRowEditable,DataRowList,DataRowListEditable} from "../dataRow/dataRow";
import {paths,/*components,operations*/ } from "../../../../swaggerCode/swaggerCode"
import axios from 'axios'

const { Meta } = Card;

const pathBase:string ="https://hse-cms.herokuapp.com";

type userData = paths["/api/User"]["get"]["responses"]["200"]["content"]["application/json"]["items"][0];

type userDataSearch = paths["/api/User"]["get"]["parameters"]["query"]

type userDataUpd = paths["/api/User"]["put"]["requestBody"]["content"]["text/json"]

type userid = paths["/api/User/{id}"]["delete"]["parameters"]["path"]
    
export class EmployeeCardEntity extends React.Component<{user:userData, updListCallback:any, updFieldCallback:any},{}> {

    state = {
        status:'narrow',
    };

    expandCardChange = () => {
        if(this.state.status==='narrow')
            this.setState({ status: 'expand'});
        else
            this.setState({ status: 'narrow'});
    };

    makeEditableCardChange = () => {
        if(this.state.status==='expand')
            this.setState({ status: 'editable'});
        else
        {
            this.setState({ status: 'expand'});
        }
    };

    deleteCard = () => {
        message.info('Успешно удалено');
        axios.delete(pathBase+"/api/User/"+this.props.user.id,
        {
           headers: {
            "Authorization": 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiJmYWNlMWU1NS1iMGQ1LTFhYjUtMWU1NS1iZWYwMDFlZDEwMGYiLCJDb21wYW55SWQiOiJmYWNlMWU1NS1iMGQ1LTFhYjUtMWU1NS1iZWYwMDFlZDEwMGYiLCJyb2xlIjoiU3VwZXJBZG1pbiIsIm5iZiI6MTYxMjU1MDU1NywiZXhwIjoxNjE1MTQyNTU3LCJpYXQiOjE2MTI1NTA1NTd9.VqH4-kbHOqvqaDaW5Ei1IAVCkRyoCDDbHLKXsZppYBM9LMctww6ve5nm_rVl3d8YSO_p_B12cLAfez3x7la4PA'
           }
        })
        .then(res => {
           console.log(res);
           })
        .catch(err => {  
           console.log(err); 
        })  
    };

    updateCard = () => {
        let data:userDataUpd={
                           id:this.props.user.id,
                           firstName:this.props.user.firstName,
                           lastName:this.props.user.lastName,
                           email:this.props.user.email,
                           roles:this.props.user.roles,
                        }
            axios.put(pathBase+"/api/User",data,
            {
                headers: {
                "Authorization": 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiJmYWNlMWU1NS1iMGQ1LTFhYjUtMWU1NS1iZWYwMDFlZDEwMGYiLCJDb21wYW55SWQiOiJmYWNlMWU1NS1iMGQ1LTFhYjUtMWU1NS1iZWYwMDFlZDEwMGYiLCJyb2xlIjoiU3VwZXJBZG1pbiIsIm5iZiI6MTYxMjU1MDU1NywiZXhwIjoxNjE1MTQyNTU3LCJpYXQiOjE2MTI1NTA1NTd9.VqH4-kbHOqvqaDaW5Ei1IAVCkRyoCDDbHLKXsZppYBM9LMctww6ve5nm_rVl3d8YSO_p_B12cLAfez3x7la4PA'
              }
            })
            .then(res => {
                console.log(res);
            })
            .catch(err => {  
                console.log(err); 
        })
    };


    DataRows= ():JSX.Element[] =>{
        return (
            [
                <Divider />,
                    <DataRow dataStr={this.props.user.firstName} titleStr="Имя : "/>,
                    <DataRow dataStr={this.props.user.lastName||"null"} titleStr="Фамилия : "/>,
                    <DataRow dataStr={this.props.user.email} titleStr="Почта : "/>,
                <Divider />,
                <DataRowList dataList={this.props.user.roles} titleStr="Роли : "/>
            ]
        )
    }

    DataRowsEditable=():JSX.Element[]=>{
        return (
            [
                <Divider />,
                    <DataRowEditable dataStr={this.props.user.firstName} titleStr="Имя : " typeName="firstName" editFieldCallback={this.props.updFieldCallback}/>,
                    <DataRowEditable dataStr={this.props.user.lastName||"null"} titleStr="Фамилия : " typeName="lastName" editFieldCallback={this.props.updFieldCallback}/>,
                    <DataRowEditable dataStr={this.props.user.email} titleStr="Почта : " typeName="email" editFieldCallback={this.props.updFieldCallback}/>,
                <Divider />,
                <DataRowListEditable dataList={this.props.user.roles} titleStr="Роли : " typeName="roles"  editListCallback={this.props.updListCallback}/>
            ]
        )
    }

    optionsNarrow=():JSX.Element[]=>{
        return (
            [<EllipsisOutlined onClick={()=>this.expandCardChange()}/>]
        )
    }

    optionsExpand=():JSX.Element[]=>{
        return (
            [<SettingOutlined onClick={()=>this.makeEditableCardChange()}/>,<UpOutlined onClick={()=>this.expandCardChange()}/>]
        )
    }

    optionsExpandEditable=():JSX.Element[]=>{
        return (
            [<Popconfirm placement="rightTop" title={"Вы точно хотите удалить этот объект?"} onConfirm={()=>this.deleteCard()} okText="Yes" cancelText="No"><DeleteOutlined/></Popconfirm>,<CheckOutlined onClick={()=>{this.makeEditableCardChange();this.updateCard();}}/>]
        )
    }

    render() {
        return (
            <Card className="userCard wide"
                hoverable={true}
                actions={
                    this.state.status==="narrow"?this.optionsNarrow():this.state.status==="expand"?this.optionsExpand():this.optionsExpandEditable()
                }
            >
                <Meta
                    avatar={<Avatar size={50}  src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                    title={<div className="titleCard">{this.props.user.firstName} {this.props.user.lastName||"null"}</div>}
                    description={<div className="titleDescriptionCard">{this.props.user.id}</div>}
                />
                {this.state.status==="narrow"?<div/>:this.state.status==="expand"?this.DataRows():this.DataRowsEditable()}
            </Card>
        );
    }

}



export class EmployeeCard extends React.Component<{user:userData},{userOfCard:userData}> {

    state = {
        userOfCard:{
            id: this.props.user.id,
            companyId: this.props.user.companyId,
            email: this.props.user.email,
            firstName: this.props.user.firstName,
            lastName: this.props.user.lastName,
            roles: this.props.user.roles
        }
    };

    updateDataFieldCallBack = (val:string,param:string) => {
        let buf:userData=this.state.userOfCard;
        switch(param)
        {
            case "id":
                buf.id=val;
                break;
            case "companyId":
                buf.companyId=val;
                break;
            case "email":
                buf.email=val;
                break;
            case "firstName":
                buf.firstName=val;
                break;
            case "lastName":
                buf.lastName=val;
                break;
        }
    };

    updateListFieldCallBack = (val:("SuperAdmin" | "CompanyAdmin" | "ChiefRedactor" | "Redactor" | "Author" | "Corrector")[],param:string) => {
        let buf:userData=this.state.userOfCard;
        switch(param)
        {
            case "roles":
                buf.roles=val;
        }
    };

    render(){
    
    return (<EmployeeCardEntity user={this.state.userOfCard} updListCallback={this.updateListFieldCallBack} updFieldCallback={this.updateDataFieldCallBack}/>)    
}
}



export class GenerateCustomCardList extends React.Component<{},{usersList:userData[]}> {

    state = {
        usersList:[]
    };

 

    render(){
    
    return (
        <Row>
            <Col span={1}></Col>
            <Col span={22}>
            {this.state.usersList.map((u, i) => {
                return (<EmployeeCard user={u} key={"ec"+i}/>)
            })}
            </Col>
            <Col span={1}></Col>
        </Row>
    )
        
}

async componentDidMount() {
    let data:userDataSearch={PageLimit:5,PageNumber:1}
    axios.get(pathBase+"/api/User"+"?PageLimit="+data.PageLimit+"&PageNumber="+data.PageNumber,
    {
        headers: {
        "Authorization": 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiJmYWNlMWU1NS1iMGQ1LTFhYjUtMWU1NS1iZWYwMDFlZDEwMGYiLCJDb21wYW55SWQiOiJmYWNlMWU1NS1iMGQ1LTFhYjUtMWU1NS1iZWYwMDFlZDEwMGYiLCJyb2xlIjoiU3VwZXJBZG1pbiIsIm5iZiI6MTYxMjU1MDU1NywiZXhwIjoxNjE1MTQyNTU3LCJpYXQiOjE2MTI1NTA1NTd9.VqH4-kbHOqvqaDaW5Ei1IAVCkRyoCDDbHLKXsZppYBM9LMctww6ve5nm_rVl3d8YSO_p_B12cLAfez3x7la4PA'
      } 
    }
    )
    .then(res => {
        console.log(res);
        this.setState({usersList:res.data.items});
    })
    .catch(err => {  
        console.log(err); 
      })
  }
}

export default GenerateCustomCardList;
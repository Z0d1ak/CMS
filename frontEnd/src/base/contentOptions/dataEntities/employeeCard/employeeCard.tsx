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
import { idText } from 'typescript';

import {useHistory} from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

const { Meta } = Card;


const pathBase:string ="https://hse-cms.herokuapp.com";

type userData = paths["/api/User"]["get"]["responses"]["200"]["content"]["application/json"]["items"][0];
type userDataSearch = paths["/api/User"]["get"]["parameters"]["query"]

class User{
    public firstname!: string;
    public lastname!: string;
    public email!: string;
    public id!: string;
    public foto!: string;
    public roles!: string[];
}


type userid = paths["/api/User/{id}"]["delete"]["parameters"]["path"]
    

export class EmployeeCard extends React.Component<{user:userData},{}> {

    state = {
        status:'narrow',
        firstName:'',
        lastName:'',
        email:'',
        id:'0',
        roles:['']
    };

    constructor(props:{user:userData}) {
        super(props);
        this.state.firstName = this.props.user.firstName;
        this.state.lastName = this.props.user.lastName||"null";
        this.state.email = this.props.user.email;
        this.state.roles = this.props.user.roles;
        this.state.id = this.props.user.id;
    };



    expandCardChange = () => {
        if(this.state.status=='narrow')
            this.setState({ status: 'expand'});
        else
            this.setState({ status: 'narrow'});
    };

    makeEditableCardChange = () => {
        if(this.state.status=='expand')
            this.setState({ status: 'editable'});
        else
        {
            //this.updateCard();
            this.setState({ status: 'expand'});
        }
    };

    
    


    deleteCard = () => {
        message.info('Успешно удалено');
    
        
             
                console.log('Sucsess:', "0");
                    axios.delete(pathBase+"/api/User/"+this.state.id,
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

    updateCard = (val:string) => {
        message.info('Изменения сохранены');
    };

    updateDataFieldCallBack = (val:string,param:string) => {
        this.setState({[param]:val});
    };

    updateListFieldCallBack = (val:string[],param:string) => {
        this.setState({[param]:val});
    };


    DataRows= ():JSX.Element[] =>{
        return (
            [
                <Divider />,
                <DataRow dataStr={this.state.firstName} titleStr="Имя : "/>,
                <DataRow dataStr={this.state.lastName} titleStr="Фамилия : "/>,
                <DataRow dataStr={this.state.email} titleStr="Почта : "/>,
                <Divider />,
                <DataRowList dataList={this.state.roles} titleStr="Роли : "/>
            ]
        )
    }

    DataRowsEditable=():JSX.Element[]=>{
        return (
            [
                <Divider />,
                <DataRowEditable dataStr={this.state.firstName} titleStr="Имя : " typeName="firstName" editFieldCallback={this.updateDataFieldCallBack}/>,
                <DataRowEditable dataStr={this.state.lastName} titleStr="Фамилия : " typeName="lastName" editFieldCallback={this.updateDataFieldCallBack}/>,
                <DataRowEditable dataStr={this.state.email} titleStr="Почта : " typeName="email" editFieldCallback={this.updateDataFieldCallBack}/>,
                <Divider />,
                <DataRowListEditable dataList={this.state.roles} titleStr="Роли : " typeName="roles"  editListCallback={this.updateListFieldCallBack}/>
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
            [<Popconfirm placement="topLeft" title={"Вы точно хотите удалить этот объект?"} onConfirm={()=>this.deleteCard()} okText="Yes" cancelText="No"><DeleteOutlined/></Popconfirm>,<CheckOutlined onClick={()=>this.makeEditableCardChange()}/>]
    )
    }

    render() {
        return (
            <Card className="userCard wide"
                hoverable={true}
                actions={
                    this.state.status=="narrow"?this.optionsNarrow():this.state.status=="expand"?this.optionsExpand():this.optionsExpandEditable()
                }
            >
                <Meta
                    avatar={<Avatar size={50}  src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                    title={<div className="titleCard">{this.state.firstName} {this.state.lastName}</div>}
                    description={<div className="titleDescriptionCard">{this.state.id}</div>}
                />
                {this.state.status=="narrow"?<div/>:this.state.status=="expand"?this.DataRows():this.DataRowsEditable()}
            </Card>
        );
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
                return (<EmployeeCard user={u}/>)
            })}
            </Col>
            <Col span={1}></Col>
        </Row>
    )
        
}

async componentDidMount() {
    let data:userDataSearch={PageLimit:20,PageNumber:1}
    axios.get(pathBase+"/api/User",
    {
        headers: {
        "Authorization": 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiJmYWNlMWU1NS1iMGQ1LTFhYjUtMWU1NS1iZWYwMDFlZDEwMGYiLCJDb21wYW55SWQiOiJmYWNlMWU1NS1iMGQ1LTFhYjUtMWU1NS1iZWYwMDFlZDEwMGYiLCJyb2xlIjoiU3VwZXJBZG1pbiIsIm5iZiI6MTYxMjU1MDU1NywiZXhwIjoxNjE1MTQyNTU3LCJpYXQiOjE2MTI1NTA1NTd9.VqH4-kbHOqvqaDaW5Ei1IAVCkRyoCDDbHLKXsZppYBM9LMctww6ve5nm_rVl3d8YSO_p_B12cLAfez3x7la4PA'
        ,"query":data
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
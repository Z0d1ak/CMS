import React from 'react';
import './dataCard.css';
import 'antd/dist/antd.css';
import { paths } from '../../../../../swaggerCode/swaggerCode';
import axios from 'axios'
import {Skeleton, Menu, Dropdown, Button, Space,Input,Typography,Row, Col,Card,Form,Cascader,Select,message,Divider,Popconfirm,Avatar } from 'antd';
import {
    UpOutlined,
    CheckOutlined,
    PlusOutlined,
    EllipsisOutlined,
    SettingOutlined,
    DeleteOutlined

} from '@ant-design/icons';
import Switch from 'react-bootstrap/esm/Switch';
import { spawn } from 'child_process';
import {DataRow,DataRowEditable,DataRowList,DataRowListEditable} from "../../../dataEntities/dataRow/dataRow";
import { Steps } from 'antd';

const { Step } = Steps;
const { Search } = Input;
const { Paragraph } = Typography;
const { Meta } = Card;
const { Title, Text} = Typography;


type company=paths["/api/Company"]["get"]["responses"]["200"]["content"]["application/json"]["items"][0]
type article=paths["/api/Article"]["post"]["responses"]["201"]["content"]["application/json"]
type role=paths["/api/Role"]["get"]["responses"]["200"]["content"]["application/json"]["items"][0]
type task=paths["/api/Article"]["post"]["responses"]["201"]["content"]["application/json"]["tasks"]
type emploe=paths["/api/User"]["get"]["responses"]["200"]["content"]["application/json"]["items"][0]

export class DataCard extends React.Component<{
        deleteItemCallback:(position: number)=>void,
        updateItemCallback:(position: number,item:{id:string,name:string})=>void,
        position:number,
        data: any,
        dataType:string,
        loading:boolean
    },{}> {

        state = {
            status:'narrow'
        };




        updateDataFieldCallBack = (val:string,param:string) => {
            switch(param)
            {
                case "id":
                    this.props.data.id=val;
                    break;
                case "name":
                    this.props.data.name=val;
                    break;
            }
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
            this.props.deleteItemCallback(this.props.position);
        };
    
        updateCard = () => {
            this.props.updateItemCallback(this.props.position,this.props.data);
        };
/*
        "task": {
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
    
  */  
        Header= ():JSX.Element =>{
            if(this.props.dataType=="article")
            return(
                <Skeleton title={{width:"30%"}} active loading={this.props.loading} paragraph={{ rows: 1,width:"50%"}}>
                    <Meta
                        title={<div className="titleCard">{this.props.data.title}</div>}
                        description={<div className="titleDescriptionCard">{this.props.data.id}</div>}
                    />
                    </Skeleton>
            );
            else
            return(
                <Skeleton title={{width:"30%"}} active loading={this.props.loading} paragraph={{ rows: 1,width:"50%"}}>
                    <Meta
                        title={<div className="titleCard">{this.props.data.name}</div>}
                        description={<div className="titleDescriptionCard">{this.props.data.id}</div>}
                    />
                </Skeleton>
            )
        }

        DataRows= ():JSX.Element[] =>{
            if(this.props.dataType=="article")
            return(
                [
                    <Divider />,
                    <Paragraph strong>Инициатор статьи</Paragraph>,
                    <Skeleton  title={{width:"100%"}} active loading={this.props.loading} paragraph={{ rows: 0}}>
                        <DataRow dataStr={this.props.data.initiator.firstName} titleStr="Имя : "/>
                        </Skeleton>,
                    <Skeleton  title={{width:"100%"}} active loading={this.props.loading} paragraph={{ rows: 0}}>
                    <DataRow dataStr={this.props.data.initiator.lastName} titleStr="Фамилия : "/>
                    </Skeleton>,
                    <Skeleton  title={{width:"100%"}} active loading={this.props.loading} paragraph={{ rows: 0}}>
                    <DataRow dataStr={this.props.data.initiator.email} titleStr="email : "/>
                    </Skeleton>,
                    <Divider />,
                    <Paragraph strong>Статус статьи</Paragraph>,
                    <Skeleton  title={{width:"100%"}} active loading={this.props.loading} paragraph={{ rows: 0}}>
                         <DataRow dataStr={this.props.data.id} titleStr="id : "/>
                         </Skeleton>,
                     <Skeleton  title={{width:"100%"}} active loading={this.props.loading} paragraph={{ rows: 0}}>
                     <DataRow dataStr={this.props.data.creationDate} titleStr="Cоздано : "/>
                     </Skeleton> ,
                     <Skeleton  title={{width:"100%"}} active loading={this.props.loading} paragraph={{ rows: 0}}>
                         <Row>
                         <Col span={2}></Col>
                        <Col span={20}>
                        <Steps direction="horizontal" current={2}>
                        {this.props.data.tasks.map((d:any, i:number) => {
                        return (
                            <Step key={i+"tk"} title={d.description} description={d.comment} />
                        )
                        })}
                        </Steps>
                        </Col>
                        </Row>
                    </Skeleton>
                ]  
            )
            else
            return (
                [
                    <Divider />,
                    <Skeleton  title={{width:"100%"}} active loading={this.props.loading} paragraph={{ rows: 0}}>
                        <DataRow dataStr={this.props.data.name} titleStr="Название : "/>
                        </Skeleton>,
                    <Divider />,
                    <Skeleton  title={{width:"100%"}} active loading={this.props.loading} paragraph={{ rows: 0}}>
                         <DataRow dataStr={this.props.data.id} titleStr="id : "/>
                         </Skeleton>
                ]
            )
        }
    
        DataRowsEditable=():JSX.Element[]=>{
            if(this.props.dataType=="article")
            return(
                [
                    
                     <Divider />,
                     <Paragraph strong>Задачи</Paragraph>,
                     <div>
                         {this.props.data.tasks.map((d:any, i:number) => {
                         return (
                             <Row>
                             <Col key={i+"tk"}>{d.description}</Col>
                             <Col key={i+"tk"}>{d.comment}</Col></Row>
                         )
                         })}
                         </div>,
                          <Divider />,
                         <Paragraph strong>Предпросмотр</Paragraph>,
                         <Skeleton  title={{width:"100%"}} active loading={this.props.loading} paragraph={{ rows: 0}}>
                            <div className="prev"></div>
                        </Skeleton>,
                        <Paragraph strong>Редактор</Paragraph>,
                        <Skeleton  title={{width:"100%"}} active loading={this.props.loading} paragraph={{ rows: 0}}>
                            <button className="red">редактор</button>
                       </Skeleton>
                ]  
            )
            else
            return (
                [
                    <Divider />,
                    <Skeleton  title={{width:"100%"}} active loading={this.props.loading} paragraph={{ rows: 0}}>
                        <DataRowEditable dataStr={this.props.data.name} titleStr="Название : " typeName="name" editFieldCallback={this.updateDataFieldCallBack}/>
                    </Skeleton>,
                    <Divider />,
                    <Skeleton  title={{width:"100%"}} active loading={this.props.loading} paragraph={{ rows: 0}}>
                    <DataRow dataStr={this.props.data.id} titleStr="id : "/>
                    </Skeleton>
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

        componentDidUpdate(prevProps:any, prevState:any, snapshot:any)
        {
            if (this.props.loading === false&&prevProps.loading === true) {
                this.setState({status:"narrow"})
            }
        }


    
        render() {
            return (
                
                <Card className="userCard wide"
                    hoverable={true}
                    actions={
                        this.state.status==="narrow"?this.optionsNarrow():this.state.status==="expand"?this.optionsExpand():this.optionsExpandEditable()
                    }
                >
                    {this.Header()}
                    
                    {this.state.status==="narrow"?<div/>:
                        this.state.status==="expand"?
                        this.DataRows():
                        this.DataRowsEditable()
                }
                </Card>

            );
        }

}


export default DataCard;

import React from 'react';
import './dataCard.css';
import 'antd/dist/antd.css';
import { paths } from '../../../../../swaggerCode/swaggerCode';
import axios from 'axios'
import { Menu, Dropdown, Button, Space,Input,Typography,Row, Col,Card,Form,Cascader,Select,message,Divider,Popconfirm,Avatar } from 'antd';
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
const { Search } = Input;
const { Paragraph } = Typography;
const { Meta } = Card;

type getCompany = paths["/api/Company"]["get"]["parameters"]["query"];


export class DataCard extends React.Component<{
        deleteItemCallback:(position: number)=>void,
        updateItemCallback:(position: number,item:{id:string,name:string})=>void,
        position:number,
        data: {
            id: string;
            name: string;
        }
    },{}> {

        state = {
            status:'narrow',
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

        
    
    
        DataRows= ():JSX.Element[] =>{
            return (
                [
                    <Divider />,
                        <DataRow dataStr={this.props.data.name} titleStr="Название : "/>,
                    <Divider />,
                         <DataRow dataStr={this.props.data.id} titleStr="id : "/>,
                ]
            )
        }
    
        DataRowsEditable=():JSX.Element[]=>{
            return (
                [
                    <Divider />,
                        <DataRowEditable dataStr={this.props.data.name} titleStr="Название : " typeName="name" editFieldCallback={this.updateDataFieldCallBack}/>,
                    <Divider />,
                    <DataRow dataStr={this.props.data.id} titleStr="id : "/>
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
                        title={<div className="titleCard">{this.props.data.name}</div>}
                        description={<div className="titleDescriptionCard">{this.props.data.id}</div>}
                    />
                    {this.state.status==="narrow"?<div/>:this.state.status==="expand"?this.DataRows():this.DataRowsEditable()}
                </Card>
            );
        }

}


export default DataCard;

import React from 'react';
import './dataEntity.css';
import 'antd/dist/antd.css';
import { paths } from '../../../../swaggerCode/swaggerCode';
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
import {DataRow,DataRowEditable,DataRowList,DataRowListEditable} from "../../dataEntities/dataRow/dataRow";
const { Search } = Input;
const { Paragraph } = Typography;
const { Meta } = Card;

type getCompany = paths["/api/Company"]["get"]["parameters"]["query"];

export class DataEntity extends React.Component<{
    items: { id: string, name: string}[]},{}> {

        
  
    render(){
        return(
            <Row>
                <Col span={1}></Col>
                <Col span={22}>
                {this.props.items.map((d, i) => {
                    return (<DataCard data={d} key={"dc"+i}/>)
                })}
                </Col>
                <Col span={1}></Col>
            </Row>
        );
    }
        
    componentDidMount() {
       
    }

}

export class DataCard extends React.Component<{
    data: {
        id: string;
        name: string;
    }},{}> {

        state = {
            status:'narrow',
        };

        updateDataFieldCallBack = (val:string,param:string) => {
            let buf:{ id: string, name: string}=this.props.data;
            switch(param)
            {
                case "id":
                    buf.id=val;
                    break;
                case "name":
                    buf.name=val;
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
         
        };
    
        updateCard = () => {
            
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
                        <DataRowEditable dataStr={this.props.data.name} titleStr="Название : " typeName="firstName" editFieldCallback={this.updateDataFieldCallBack}/>,
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


export default DataEntity;

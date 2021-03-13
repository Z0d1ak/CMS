import React from 'react';
import './multiplyPicker.css';
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
    DeleteOutlined,
    RollbackOutlined,
    CloseOutlined

} from '@ant-design/icons';
import Switch from 'react-bootstrap/esm/Switch';
import { spawn } from 'child_process';
import {DataRow,DataRowEditable,DataRowList,DataRowListEditable} from "../dataRow/dataRow";
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

export class MultiplyPicker extends React.Component<{
        updListCallback:(val:any) =>void,
        typeName:string,
        dataList:string[],
    },{}> {

        state={
            bufList:this.props.dataList
        }

        deleteUl(id:number):string[] {
            let updateArray = [...this.state.bufList];
            updateArray.splice(id, 1);
            this.setState({bufList:updateArray});
            this.props.updListCallback(updateArray);
            //console.log(this.state.bufList);
            //console.log(this.props.dataList);
            //console.log(updateArray);
            return updateArray;
        }
    
        addUl(el:string):string[] {
            let updateArray = [...this.state.bufList];
            updateArray.splice(this.state.bufList.length,0,el );
            this.setState({bufList:updateArray});
            this.props.updListCallback(updateArray);
            //console.log(this.state.bufList);
            //console.log(this.props.dataList);
            //console.log(updateArray);
            return updateArray;
        }

        updateOptionsMenuCallBack():JSX.Element {
            let optList:string[]=["SuperAdmin","CompanyAdmin","ChiefRedactor","Redactor","Author","Corrector"]
            return <Menu>
                {optList.map((r, i) => {
                    if(this.state.bufList.indexOf( r ) == -1 )
                    return (
                        
                        <Menu.Item key={i+"mi"} onClick={()=>this.addUl(r)}>
                            {r}
                        </Menu.Item>
                    )
                })}
            </Menu>
            
        }

        render() {
            return (
                
                <div>
                {this.props.dataList.map((d, i) => {
                    return (
                    <Button  key={i+"dl"} className="deleteButton" danger
                                        type="dashed"
                                        onClick={()=>this.deleteUl(i)}
                      >
                            {d} <CloseOutlined />
                    </Button>
                    )
                })}
                <Dropdown overlay={this.updateOptionsMenuCallBack()}>
                <Button
                    type="dashed"
                    onClick={() => {}}
                    style={{ width: '100%' }}
                    >
                    Добавить роль <PlusOutlined />
                  </Button>
                </Dropdown>
            </div>

            );
        }

}

export class RolesList extends React.Component<{data:string[],optList:string[]},{}> {

    state={
        data:this.props.data
    }

    deleteUl(id:number):string[] {
        console.log("del"+id);
        let updateArray = [...this.state.data];
        updateArray.splice(id, 1);
        console.log(updateArray);
        this.setState({data:updateArray});
        return updateArray;
    }

    addUl(el:string):string[] {
        console.log("add"+el);
        let updateArray = [...this.state.data];
        updateArray.splice(this.state.data.length,0,el );
        console.log(updateArray);
        this.setState({data:updateArray});
        return updateArray;
    }

    updateOptionsMenuCallBack():JSX.Element {
        let optList:string[]=["SuperAdmin","CompanyAdmin","ChiefRedactor","Redactor","Author","Corrector"]
        return <Menu>
            {optList.map((r, i) => {
                if(this.state.data.indexOf( r ) == -1 )
                return (
                    
                    <Menu.Item onClick={()=>this.addUl(r)}>
                        {r}
                    </Menu.Item>
                )
            })}
        </Menu>
        
    }

    render() {
     
     return(
        <div>
            {this.state.data.map((d, i) => {
                return (
                <Button  key={i+"dl"} className="deleteButton" danger
                                    type="dashed"
                                    onClick={()=>this.deleteUl(i)}
                  >
                        {d} <CloseOutlined />
                </Button>
                )
            })}
            <Dropdown overlay={this.updateOptionsMenuCallBack()}>
            <Button
                type="dashed"
                onClick={() => {}}
                style={{ width: '100%' }}
                >
                Добавить роль <PlusOutlined />
              </Button>
            </Dropdown>
        </div>
     ); 
    }
}


export default MultiplyPicker;

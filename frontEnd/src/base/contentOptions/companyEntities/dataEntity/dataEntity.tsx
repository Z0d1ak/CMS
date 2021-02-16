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
import {DataCard} from "../dataSubEntities/dataCard/dataCard";
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


export default DataEntity;

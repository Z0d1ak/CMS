import React from 'react';
import './paginationEntity.css';
import 'antd/dist/antd.css';
import { paths } from '../../../../swaggerCode/swaggerCode';
import axios from 'axios'
import { Menu, Dropdown, Button, Space,Input,Typography,Row, Col,Card,Form,Cascader,Select,Pagination } from 'antd';
import {
    UpOutlined,
    CheckOutlined,
    PlusOutlined
} from '@ant-design/icons';
import Switch from 'react-bootstrap/esm/Switch';
import { spawn } from 'child_process';
const { Search } = Input;
const { Paragraph } = Typography;

type getCompany = paths["/api/Company"]["get"]["parameters"]["query"];


export class PaginationEntity extends React.Component<{
    countItems:number,
    onPageChange:(page:number, pageSize?: number | undefined)=>void,
    onMaxItemsChange:(current: number, size: number)=>void
    },{}> {

    render(){
        return (
            <Row>
            <Col span={1}></Col>
            <Col span={22}>
                <Pagination defaultCurrent={1} defaultPageSize={10}
                 total={this.props.countItems} onChange={this.props.onPageChange}
                 onShowSizeChange={this.props.onMaxItemsChange} showSizeChanger
                 showTotal={total => `Total ${total} items`}/>
            </Col>
            <Col span={1}></Col>
            </Row>
        );
    }
    }


export default PaginationEntity;

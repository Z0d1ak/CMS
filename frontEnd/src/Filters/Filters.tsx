import React from 'react';
import { Row, Col, Divider } from 'antd';
import 'antd/dist/antd.css';
import './Filters.css';

import {Dropdown, Menu, message, Typography} from "antd";


import { Input } from 'antd';
const { Search } = Input;
const { Paragraph } = Typography;



export function SearchBox({}) {
    return (
        <Row>
            <Col span={24}><Search placeholder="Искать"/></Col>
            <Col span={4}></Col>
        </Row>


    )
}

export default SearchBox;
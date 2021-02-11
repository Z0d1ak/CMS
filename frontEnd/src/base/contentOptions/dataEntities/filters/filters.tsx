import React from 'react';
import { Row, Col, } from 'antd';
import 'antd/dist/antd.css';
import './filters.css';
import { Input } from 'antd';
const { Search } = Input;



export function SearchBox({}) {
    return (
        <Row>
            <Col span={24}><Search placeholder="Искать"/></Col>
            <Col span={4}></Col>
        </Row>


    )
}

export default SearchBox;
import React from 'react';
import './Employees.css';
import 'antd/dist/antd.css';
import {CustomCard, GenerateCustomCardList} from "../Cards/Cards";
import {Col, Pagination, Row} from "antd";
import SearchBox from "../Filters/Filters";

export class Employees extends React.Component<{},{}> {
    generatePagination() {
        return (
            <Row>
                <Col span={1}></Col>
                <Col span={22}>
                    <Pagination className="pagination" defaultCurrent={1} total={50} />
                </Col>
                <Col span={1}></Col>
            </Row>
        );
    };

    render() {
        return(<div>
            <Row>
                <Col span={1}></Col>
                <Col span={22}>
                    <SearchBox/>
                </Col>
                <Col span={1}></Col>
            </Row>
            <GenerateCustomCardList/>
            {this.generatePagination()}


        </div>);
    }
}

export default Employees;


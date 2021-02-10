import React from 'react';
import './employee.css';
import 'antd/dist/antd.css';
import { GenerateCustomCardList} from "../dataEntities/employeeCard/employeeCard";
import { Col, Pagination, Row} from "antd";
import SearchBox from "../dataEntities/filters/filters";
import AddEmployeeCard from "../dataEntities/addEmployeeCard/addEmployeeCard"

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
            <AddEmployeeCard/>
            <GenerateCustomCardList/>
            {this.generatePagination()}

        </div>);
    }
}

export default Employees;


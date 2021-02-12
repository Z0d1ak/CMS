import React from 'react';
import './article.css';
import 'antd/dist/antd.css';
import {BackTop, Col, Pagination, Row} from "antd";
import SearchBox from "../dataEntities/filters/filters";
import {GenerateCustomCardList} from "../dataEntities/articleCard/articleCard";


export class AllTexts extends React.Component<{},{}> {

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

                </Col>
                <Col span={1}></Col>
            </Row>
            <GenerateCustomCardList/>
            {this.generatePagination()}
            <BackTop>
                <div className="BackUp">Вверх</div>
            </BackTop>

        </div>);
    }
}

export default AllTexts;


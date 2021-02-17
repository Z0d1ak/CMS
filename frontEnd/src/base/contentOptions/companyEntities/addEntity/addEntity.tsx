import React from 'react';
import './addEntity.css';
import 'antd/dist/antd.css';
import {Row, Col } from 'antd';
import {AddBox} from "../addSubEntities/addBox/addBox"
import { paths } from '../../../../swaggerCode/swaggerCode';

type addCompany=paths["/api/Company"]["post"]["requestBody"]["content"]["text/json"]


export class AddEntity extends React.Component<{
    createCallback:(val:addCompany)=>void,
},{}> {

   
    render() {
        return (
            <Row>
            <Col span={1}></Col>
                <Col span={22}>
                <AddBox createCallback={this.props.createCallback}/>
                </Col>
                <Col span={1}></Col>
            </Row>
        );
    }

}

export default AddEntity;

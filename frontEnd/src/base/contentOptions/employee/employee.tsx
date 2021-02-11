import React from 'react';
import './employee.css';
import 'antd/dist/antd.css';
import { GenerateCustomCardList} from "../dataEntities/employeeCard/employeeCard";
import { Col, Pagination, Row} from "antd";
import SearchBox from "../dataEntities/filters/filters";
import AddEmployeeCard from "../dataEntities/addEmployeeCard/addEmployeeCard"

import {paths,/*components,operations*/ } from "../../../swaggerCode/swaggerCode"
import axios from 'axios'

const pathBase:string ="https://hse-cms.herokuapp.com";

type userData = paths["/api/User"]["get"]["responses"]["200"]["content"]["application/json"]["items"][0];
type userDataSearch = paths["/api/User"]["get"]["parameters"]["query"]

export class Employees extends React.Component<{},{}> {

    
  
 

           

/*
async componentDidMount() {
    let data:userDataSearch={PageLimit:20,PageNumber:1}
    axios.get(pathBase+"/api/User",
    {
        headers: {
        "Authorization": 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiJmYWNlMWU1NS1iMGQ1LTFhYjUtMWU1NS1iZWYwMDFlZDEwMGYiLCJDb21wYW55SWQiOiJmYWNlMWU1NS1iMGQ1LTFhYjUtMWU1NS1iZWYwMDFlZDEwMGYiLCJyb2xlIjoiU3VwZXJBZG1pbiIsIm5iZiI6MTYxMjU1MDU1NywiZXhwIjoxNjE1MTQyNTU3LCJpYXQiOjE2MTI1NTA1NTd9.VqH4-kbHOqvqaDaW5Ei1IAVCkRyoCDDbHLKXsZppYBM9LMctww6ve5nm_rVl3d8YSO_p_B12cLAfez3x7la4PA'
        ,"query":data
      } 
    }
    )
    .then(res => {
        console.log(res);
       
    })
    .catch(err => {  
        console.log(err); 
      })
  }
*/


    generatePagination() {
        return (
            <Row>
                <Col span={1}></Col>
                <Col span={22}>
                    <Pagination className="pagination" defaultCurrent={2} total={20} />
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


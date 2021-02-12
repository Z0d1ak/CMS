import React from 'react';
import './employee.css';
import 'antd/dist/antd.css';
import { GenerateCustomCardList} from "../dataEntities/employeeCard/employeeCard";
import { Col, Pagination, Row} from "antd";
import SearchBox from "../dataEntities/filters/filters";
import AddEmployeeCard from "../dataEntities/addEmployeeCard/addEmployeeCard"

import {paths,/*components,operations*/ } from "../../../swaggerCode/swaggerCode"
import axios from 'axios'
import { ThemeConsumer } from 'react-bootstrap/esm/ThemeProvider';

const pathBase:string ="https://hse-cms.herokuapp.com";

type userData = paths["/api/User"]["get"]["responses"]["200"]["content"]["application/json"]["items"][0];
type userDataSearch = paths["/api/User"]["get"]["parameters"]["query"]

export class Employees extends React.Component<{},{}> {

state={
    curPage:1,
    maxItemsOnPage:10,
    countItems:40,
    searchAllOptText:"",
    usersList:[]
}
  

ClearArray = () => {
    this.setState({ usersList: [] });
};

SetCurPage=(val:number)=>{
    this.setState({curPage:val},()=>this.GetUserData(val))
}

SetMaxItemsOnPage=(val:number)=>{
    this.setState({maxItemsOnPage:val})
}

SetCountItems=(val:number)=>{
    this.setState({countItems:val})
}

SetItemsList=(val:userData[])=>{
    this.ClearArray();
    this.setState({usersList:val},()=>{console.log(val)})
    console.log("set")
    console.log(this.state.usersList)
}
 

async GetUserData(page:number) {
    let data:userDataSearch={PageLimit:this.state.maxItemsOnPage,PageNumber:page}
    axios.get(pathBase+"/api/User"+"?PageLimit="+this.state.maxItemsOnPage+"&PageNumber="+this.state.curPage,
    {
        headers: {
        "Authorization": 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiJmYWNlMWU1NS1iMGQ1LTFhYjUtMWU1NS1iZWYwMDFlZDEwMGYiLCJDb21wYW55SWQiOiJmYWNlMWU1NS1iMGQ1LTFhYjUtMWU1NS1iZWYwMDFlZDEwMGYiLCJyb2xlIjoiU3VwZXJBZG1pbiIsIm5iZiI6MTYxMjU1MDU1NywiZXhwIjoxNjE1MTQyNTU3LCJpYXQiOjE2MTI1NTA1NTd9.VqH4-kbHOqvqaDaW5Ei1IAVCkRyoCDDbHLKXsZppYBM9LMctww6ve5nm_rVl3d8YSO_p_B12cLAfez3x7la4PA'
      } 
    }
    )
    .then(res => {
        console.log(res);
        this.SetItemsList(res.data.items);
        this.SetCountItems(res.data.count)//res.data.count)
    })
    .catch(err => {  
        console.log(err); 
      })
  }


OnPageChange=(page:number, pageSize?: number | undefined)=>{
    this.SetCurPage(page);
}

OnMaxItemsChange=(current: number, size: number)=>{
    this.SetCurPage(current);
    this.SetMaxItemsOnPage(size);
}

    generatePagination() {
        return (
            <Row>
                <Col span={1}></Col>
                <Col span={22}>
                    <Pagination className="pagination" defaultCurrent={1} defaultPageSize={10}
                     total={this.state.countItems} onChange={this.OnPageChange}
                     onShowSizeChange={this.OnMaxItemsChange} showSizeChanger
                     showTotal={total => `Total ${total} items`}/>
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
            <GenerateCustomCardList  usersList={this.state.usersList}/>
            {this.generatePagination()}

        </div>);
    }

    
async componentDidMount() {
    this.GetUserData(1);
  }

}

export default Employees;


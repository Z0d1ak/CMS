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
import { throws } from 'assert';

const pathBase:string ="https://hse-cms.herokuapp.com";

type userData = paths["/api/User"]["get"]["responses"]["200"]["content"]["application/json"]["items"][0];
type userDataSearch = paths["/api/User"]["get"]["parameters"]["query"]

export class Employees extends React.Component<{},{}> {

state={
    curPage:1,
    maxItemsOnPage:10,
    countItems:40,
    searchAllOptText:"",
    usersList:[],
    searcgOptValue:"всему",
    sortOptValue:"имя",
    dirOptValue:"возрастанию"
}

setsearcgOptValue = (val:string) => {
    this.setState({ searcgOptValue: val });
};

setsortOptValue = (val:string) => {
    this.setState({ sortOptValue: val  });
};

setdirOptValue = (val:string) => {
    this.setState({ dirOptValue: val  });
};

initSearch = (val:string) => {
    this.setState({searchAllOptText:val},()=>this.GetUserData(1))
    
};

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
    let Search="";
    let sortingColumn;
    let sortDirect;
    let role;
    switch (this.state.searcgOptValue){
        case "всему":
            {
                Search="&QuickSearch="+this.state.searchAllOptText;
                break;
            }
        case "имени":
            {
                Search="&FirstNameStartsWith="+this.state.searchAllOptText;
                break;
            }
        case "фамилии":
            {
                Search="&LastNameStartsWith="+this.state.searchAllOptText;
                break;
            }
        case "email":
            {
                Search="&EmailStartsWith="+this.state.searchAllOptText;
                break;
            }

    }

    switch (this.state.sortOptValue){
        case "имя":
            {
                sortingColumn="&SortingColumn="+"FirstName";
                break;
            }
        case "фамилия":
            {
                sortingColumn="&SortingColumn="+"LastName";
                break;
            }
        case "email":
            {
                sortingColumn="&SortingColumn="+"Email";
                break;
            }

    }

    switch (this.state.dirOptValue){
        case "возрастанию":
            {
                sortDirect="&SortDirection="+"Ascending";
                break;
            }
        case "убыванию":
            {
                sortDirect="&SortDirection="+"Descending";
                break;
            }
    }

    axios.get(pathBase+"/api/User"+"?PageLimit="+this.state.maxItemsOnPage+"&PageNumber="+this.state.curPage+sortDirect+sortingColumn+Search,
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
                    <SearchBox 
                    searcgOptValue={this.state.searcgOptValue} 
                    sortOptValue={this.state.sortOptValue}
                    dirOptValue={this.state.dirOptValue} 
                    setsearcgOptValue={this.setsearcgOptValue} 
                    setsortOptValue={this.setsortOptValue} 
                    setdirOptValue={this.setdirOptValue} 
                    initSearch={this.initSearch}/>
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


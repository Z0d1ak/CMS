import React from 'react';
import './company.css';
import 'antd/dist/antd.css';
import { paths } from '../../../swaggerCode/swaggerCode';
import axios from 'axios'
import { Menu, Dropdown, Button, Space,Input,Typography,Row, Col } from 'antd';
const { Search } = Input;
const { Paragraph } = Typography;

type getCompany = paths["/api/Company"]["get"]["parameters"]["query"];

export class Company extends React.Component<{},{}> {

    state={
        requestUrl:"https://hse-cms.herokuapp.com",
        requestPath:"/api/Company",
        NameStartsWith: "",
        SortingColumn: "Name",
        SortDirection: "Ascending",
        QuickSearch: "",
        PageLimit: 20,
        PageNumber: 1,
        SearchBy:"All"
    }

    isNull=(val:string):boolean=>{
        return val==="";
    }

    changeValue=(val:any,type:string,callback?:()=>void)=>{
        if (callback !== undefined) 
        this.setState({[type]:val},callback)  
        else this.setState({[type]:val})    
    }

    update(){ 
        let request:string="?";
        request+="&PageLimit="+this.state.PageLimit;
        request+="&PageNumber="+this.state.PageNumber;
        request+=this.isNull(this.state.NameStartsWith)?"":"&NameStartsWith="+this.state.NameStartsWith;
        request+=this.isNull(this.state.SortingColumn)?"":"&SortingColumn="+this.state.SortingColumn;
        request+=this.isNull(this.state.SortDirection)?"":"&SortDirection="+this.state.SortDirection;
        request+=this.isNull(this.state.QuickSearch)?"":"&QuickSearch="+this.state.QuickSearch;
        axios.get(
            this.state.requestUrl+this.state.requestPath+request
        )
        .then(res => {
            console.log(res);
        })
        .catch(err => {  
            switch(err.response.status)
            {
                case 401:{
                    console.log("401"); 
                    break;
                }
                default:{
                    console.log("Undefined error"); 
                    break;
                }
            }
        })
    }
    
    render(){
        return(
            <Row>
                <Col span={1}></Col>
                <Col span={22}>
                    <SearchBox 
                        updateCallback={this.update}
                        changeValueCallback={this.changeValue}
                    />
                    <SortBox 
                        SortDirection={this.state.SortDirection}
                        SortDirectionOptions={["Ascending","Descending"]}
                        SortingColumn={this.state.SortingColumn}
                        SortingColumnOptions={["Name"]}
                        updateCallback={this.update}
                        changeValueCallback={this.changeValue}
                    />
                    <ChooseBox 
                        option={this.state.SearchBy}
                        optionName={"SearchBy"}
                        optionList={["Ascending","Descending","All"]}
                        text={"Искать по"}
                        updateCallback={this.update}
                        changeValueCallback={this.changeValue}
                    />
                </Col>
                <Col span={1}></Col>
            </Row>
        );
    }
        
    componentDidMount() {
        this.update();
    }

}



export class SearchBox extends React.Component<{
        updateCallback:()=>void,
        changeValueCallback:(val:any,type:string,callback:()=>void)=>void
    },{}> {
    

    render(){
        return (
            <Row>
                    <Col span={24}>
                        <Search 
                            placeholder="Искать"  
                            onSearch={(value: string)=>this.props.changeValueCallback(value,"QuickSearch",this.props.updateCallback)}
                        />
                        
                    </Col>
            </Row>
        );
    }
}


export class SortBox extends React.Component<{
    SortDirection:string,
    SortDirectionOptions:string[],
    SortingColumn:string,
    SortingColumnOptions:string[],
    updateCallback:()=>void,
    changeValueCallback:(val:any,type:string,callback:()=>void)=>void
},{}> {

    SortDirectionGenerate=():JSX.Element=>{
        return <Menu>
         {this.props.SortDirectionOptions.map((u, i) => {
                if (u!==this.props.SortDirection) return (
                    <Menu.Item onClick={()=>this.props.changeValueCallback(u,"SortDirection",this.props.updateCallback)} key={"SortDirection"+i}>
                        <Paragraph>
                        {u}
                        </Paragraph>
                    </Menu.Item>
                )
            })}
        </Menu>
    }

    SortingColumnGenerate=():JSX.Element=>{
        return <Menu>
         {this.props.SortingColumnOptions.map((u, i) => {
                 if (u!==this.props.SortingColumn) return (
                    <Menu.Item onClick={()=>this.props.changeValueCallback(u,"SortingColumn",this.props.updateCallback)} key={"SortingColumn"+i}>
                        <Paragraph>
                        {u}
                        </Paragraph>
                    </Menu.Item>
                )
            })}
        </Menu>
    }
    
  
    render(){
        return (
            <Row>
                <Space size={5}>
                    <Paragraph className="text"> Сортировать</Paragraph> 
                    <Dropdown overlay={this.SortingColumnGenerate} placement="bottomLeft">
                        <Button>{this.props.SortingColumn}</Button>
                    </Dropdown>
                    <Paragraph className="text">по</Paragraph>
                    <Dropdown overlay={this.SortDirectionGenerate} placement="bottomLeft">
                        <Button>{this.props.SortDirection}</Button>
                    </Dropdown>
                </Space>
            </Row>
        );
    }
}


export class ChooseBox extends React.Component<{
    option:string,
    optionName:string,
    optionList:string[],
    text:string,
    updateCallback:()=>void,
    changeValueCallback:(val:any,type:string,callback:()=>void)=>void
},{}> {

    optionGenerate=():JSX.Element=>{
        return <Menu>
         {this.props.optionList.map((u, i) => {
                 if (u!==this.props.option) return (
                    <Menu.Item onClick={()=>this.props.changeValueCallback(u,this.props.optionName,this.props.updateCallback)} key={this.props.optionName+i}>
                        <Paragraph>
                        {u}
                        </Paragraph>
                    </Menu.Item>
                )
            })}
        </Menu>
    }
    
  
    render(){
        return (
            <Row>
                <Space size={5}>
                    <Paragraph> {this.props.text}</Paragraph> 
                    <Dropdown overlay={this.optionGenerate} placement="bottomLeft">
                        <Button>{this.props.option}</Button>
                    </Dropdown>
                </Space>
            </Row>
        );
    }
}

export default Company;

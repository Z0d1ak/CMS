import React from 'react';
import './filterEntity.css';
import 'antd/dist/antd.css';
import { paths } from '../../../../swaggerCode/swaggerCode';
import axios from 'axios'
import { Menu, Dropdown, Button, Space,Input,Typography,Row, Col,Card,Form,Cascader,Select } from 'antd';
import {
    UpOutlined,
    CheckOutlined,
    PlusOutlined
} from '@ant-design/icons';
import Switch from 'react-bootstrap/esm/Switch';
import { spawn } from 'child_process';
const { Search } = Input;
const { Paragraph } = Typography;

type getCompany = paths["/api/Company"]["get"]["parameters"]["query"];

export class FilterEntity extends React.Component<{
    updateCallback:()=>void
    changeValueCallback:(val:any,type:string,callback:()=>void)=>void
    SortDirection:string
    SortDirectionOptions:string[]
    SortingColumn:string
    SortingColumnOptions:string[]
    option:string[]
    optionName:string[]
    optionList:string[][]
    text:string[]
},{}> {
    


render(){
    return (
        
            <Row>
                <Col span={1}></Col>
                <Col span={22}>
                    <SearchBox 
                        updateCallback={this.props.updateCallback}
                        changeValueCallback={this.props.changeValueCallback}
                    />
                    <SortBox 
                        SortDirection={this.props.SortDirection}
                        SortDirectionOptions={this.props.SortDirectionOptions}
                        SortingColumn={this.props.SortingColumn}
                        SortingColumnOptions={this.props.SortingColumnOptions}
                        updateCallback={this.props.updateCallback}
                        changeValueCallback={this.props.changeValueCallback}
                    />
                    {this.props.option.map((u, i) => {
                        return (
                            <ChooseBox 
                            option={this.props.option[i]}
                            optionName={this.props.optionName[i]}
                            optionList={this.props.optionList[i]}
                            text={this.props.text[i]}
                            updateCallback={this.props.updateCallback}
                            changeValueCallback={this.props.changeValueCallback}
                            />
                        
                        )
                    })}
                   
                </Col>
                <Col span={1}></Col>
            </Row>
    );
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

export default FilterEntity;

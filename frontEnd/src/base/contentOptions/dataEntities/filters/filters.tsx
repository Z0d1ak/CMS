import React from 'react';
import { Row, Col, } from 'antd';
import 'antd/dist/antd.css';
import './filters.css';
import { Input } from 'antd';
import { Radio } from 'antd';
import { Menu, Dropdown, Button, Space } from 'antd';
import {Typography} from "antd";
const { Search } = Input;
const { Paragraph } = Typography;



    export class SearchBox extends React.Component<{roleValue:string,searcgOptValue:string,sortOptValue:string,dirOptValue:string,setsearcgOptValue:any,setsortOptValue:any,
        setdirOptValue:any, initSearch:any,setRoleValue:any},{}> {

    

     searcgOpt = (
        <Menu>
          <Menu.Item onClick={()=>this.props.setsearcgOptValue("всему")}>
            <Paragraph>
              всему
            </Paragraph>
          </Menu.Item>
          <Menu.Item onClick={()=>this.props.setsearcgOptValue("имени")}>
            <Paragraph>
              имени
            </Paragraph>
          </Menu.Item>
          <Menu.Item onClick={()=>this.props.setsearcgOptValue("фамилии")}>
            <Paragraph>
              фамилии
            </Paragraph>
          </Menu.Item>
          <Menu.Item onClick={()=>this.props.setsearcgOptValue("email")}>
            <Paragraph>
              email
            </Paragraph>
          </Menu.Item>
        </Menu>
      );

       sortOpt = (
        <Menu>
          <Menu.Item onClick={()=>this.props.setsortOptValue("имя")}>
            <Paragraph>
              имя
            </Paragraph>
          </Menu.Item>
          <Menu.Item onClick={()=>this.props.setsortOptValue("фамилия")}>
            <Paragraph>
              фамилия
            </Paragraph>
          </Menu.Item>
          <Menu.Item onClick={()=>this.props.setsortOptValue("email")}>
            <Paragraph>
              email
            </Paragraph>
          </Menu.Item>
        </Menu>
      );

       dirOpt = (
        <Menu>
          <Menu.Item onClick={()=>this.props.setdirOptValue("убыванию")}>
            <Paragraph>
              убыванию
            </Paragraph>
          </Menu.Item>
          <Menu.Item onClick={()=>this.props.setdirOptValue("возрастанию")}>
            <Paragraph>
              возрастанию
            </Paragraph>
          </Menu.Item>
        </Menu>
      );

      roleOpt = (
        <Menu>
          <Menu.Item onClick={()=>this.props.setRoleValue("Любая")}>
            <Paragraph>
            Любая
            </Paragraph>
          </Menu.Item>
          <Menu.Item onClick={()=>this.props.setRoleValue("SuperAdmin")}>
            <Paragraph>
            SuperAdmin
            </Paragraph>
          </Menu.Item>
          <Menu.Item onClick={()=>this.props.setRoleValue("CompanyAdmin")}>
            <Paragraph>
            CompanyAdmin
            </Paragraph>
          </Menu.Item>
          <Menu.Item onClick={()=>this.props.setRoleValue("ChiefRedactor")}>
            <Paragraph>
            ChiefRedactor
            </Paragraph>
          </Menu.Item>
          <Menu.Item onClick={()=>this.props.setRoleValue("Redactor")}>
            <Paragraph>
            Redactor
            </Paragraph>
          </Menu.Item>
          <Menu.Item onClick={()=>this.props.setRoleValue("Author")}>
            <Paragraph>
            Author
            </Paragraph>
          </Menu.Item>
          <Menu.Item onClick={()=>this.props.setRoleValue("Corrector")}>
            <Paragraph>
            Corrector
            </Paragraph>
          </Menu.Item>
        </Menu>
      );

render(){

    return (
        <div>
        <Row>
            <Col span={24}><Search placeholder="Искать" onSearch={this.props.initSearch}/></Col>
            <Col span={4}></Col>
        </Row>
        <Row className="rowSearchBar">
        <Space size={5}>
            <Paragraph className="text"> Искать по</Paragraph> 
            <Dropdown overlay={this.searcgOpt} placement="bottomLeft">
                <Button>{this.props.searcgOptValue}</Button>
            </Dropdown>
        </Space>
        </Row>
        <Row className="rowSearchBar">
        <Space size={5}>
            <Paragraph className="text"> Сортировать</Paragraph> 
            <Dropdown overlay={this.sortOpt} placement="bottomLeft">
                <Button>{this.props.sortOptValue}</Button>
            </Dropdown>
            <Paragraph className="text">по</Paragraph>
            <Dropdown overlay={this.dirOpt} placement="bottomLeft">
                <Button>{this.props.dirOptValue}</Button>
            </Dropdown>
        </Space>
        </Row>
        <Row className="rowSearchBar">
        <Space size={5}>
            <Paragraph className="text"> Роль </Paragraph> 
            <Dropdown overlay={this.roleOpt} placement="bottomLeft">
                <Button>{this.props.roleValue}</Button>
            </Dropdown>
        </Space>
        </Row>
        </div>

    )
}
}

export default SearchBox;
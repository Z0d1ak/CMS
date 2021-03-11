import React from 'react';
import './profile.css';
import 'antd/dist/antd.css';
import {Layout,BackTop,Row,Col,Button} from 'antd';
import {
    RollbackOutlined
} from '@ant-design/icons';
import { EmployeeCard} from "../base/contentOptions/dataEntities/employeeCard/employeeCard";
import {
    Route,
    withRouter
  } from "react-router-dom";
  import { paths } from '../swaggerCode/swaggerCode';
  import { Divider } from 'antd';
  import {useHistory} from "react-router-dom";
  import axios from 'axios';
  import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import {
    Link
  } from "react-router-dom";
  import {DataRow,DataRowEditable,DataRowList,DataRowListEditable} from "../base/contentOptions/dataEntities/dataRow/dataRow";
 // type userData=paths["/api/User/{id}"]["get"]["responses"]["200"]["content"]["application/json"]

 import {Dropdown, Menu, message, Typography,Space} from "antd";
 const { Title, Paragraph, Text} = Typography;


  type userData = paths["/api/User"]["get"]["responses"]["200"]["content"]["application/json"]["items"][0];
  
  type companyData = paths["/api/Company/{id}"]["get"]["responses"]["200"]["content"]["application/json"];

/**
 * Класс компонента профиля пользователя
 */
export class Profile extends React.Component<{},{}> {
    state={
        requestUrl:"https://hse-cms.herokuapp.com",
        userD:{
            id: "",
            companyId:"",
            email: "",
            firstName:"",
            lastName: "",
            roles: []
        },
        companyD : {
            id: "",
            name: ""
        },
        loading:true

    }
       render() {
        return(       
        <Layout className="site-layout whole-layout">
        <Layout.Header className="site-layout-background" style={{ padding: 0 }}>

        </Layout.Header>
        <Layout.Content
                    className="site-layout-background"
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                    }}
                >
                    <Row gutter={[0, 48]}>
                        <Col span={1}></Col>
                    </Row>
                    <Row gutter={[0, 48]}>
                        <Col span={1}></Col>
                        <Link to="/home/inwork">
                        <Button icon={<RollbackOutlined style={{ fontSize: '20px'}}/>} onClick={() =>{ 
                            console.log("back");
                        }}>
                        
                        
                        </Button>
                        </Link>
                    </Row>
                    <Row>
                        <Col span={1}></Col>
                        <Col span={22}>
                            <Title>Сотрудник</Title>
                        </Col>
                        <Col span={1}></Col>
                    </Row>
                    <Row>
                        <Col span={1}></Col>
                        <Col span={2}><Paragraph strong>Имя:</Paragraph></Col>
                        <Col span={20} ><Paragraph> {this.state.userD.firstName}</Paragraph></Col>
                        <Col span={1}></Col>
                    </Row>
                    <Row>
                        <Col span={1}></Col>
                        <Col span={2}><Paragraph strong>Фамилия:</Paragraph></Col>
                        <Col span={20} ><Paragraph> {this.state.userD.lastName}</Paragraph></Col>
                        <Col span={1}></Col>
                    </Row>
                    <Row>
                        <Col span={1}></Col>
                        <Col span={2}><Paragraph strong>email:</Paragraph></Col>
                        <Col span={20} ><Paragraph> {this.state.userD.email}</Paragraph></Col>
                        <Col span={1}></Col>
                    </Row>
                    <Row>
                        <Col span={1}></Col>
                        <Col span={2}><Paragraph strong>Роли:</Paragraph></Col>
                        <Col span={20} ><Paragraph> {this.state.userD.roles[0]}</Paragraph></Col>
                        <Col span={1}></Col>
                    </Row>
                    <Row>
                        <Col span={1}></Col>
                        <Col span={2}><Paragraph strong>ID:</Paragraph></Col>
                        <Col span={20} ><Paragraph> {this.state.userD.id}</Paragraph></Col>
                        <Col span={1}></Col>
                    </Row>
                    <Row>
                        <Col span={1}></Col>
                        <Col span={2}><Paragraph strong>CompId:</Paragraph></Col>
                        <Col span={20} ><Paragraph> {this.state.userD.companyId}</Paragraph></Col>
                        <Col span={1}></Col>
                    </Row>
                    <Divider />
                    <Row>
                        <Col span={1}></Col>
                        <Col span={22}>
                            <Title>Компания</Title>
                        </Col>
                        <Col span={1}></Col>
                    </Row>
                    <Row>
                        <Col span={1}></Col>
                        <Col span={2}><Paragraph strong>Название:</Paragraph></Col>
                        <Col span={20} ><Paragraph> {this.state.companyD.name}</Paragraph></Col>
                        <Col span={1}></Col>
                    </Row>
                    <BackTop>
                        <div className="BackUp">Вверх</div>
                    </BackTop>
                </Layout.Content>
        </Layout>
            
        );
    }

    
    componentDidMount()
    {

            this.setState({loading:true});
            let request:string="/"+sessionStorage.getItem('AuthUserId');
           
            axios.get(
                this.state.requestUrl+"/api/User"+request,
                {
                    headers: {
                        "Authorization": "Bearer "+sessionStorage.getItem("AuthUserSecurityToken")
                    }
                }
            )
            .then(res => {
                console.log(res.data);
                this.setState({userD:res.data})
                request="/"+res.data.companyId;
                axios.get(
                    this.state.requestUrl+"/api/Company"+request,
                    {
                        headers: {
                            "Authorization": "Bearer "+sessionStorage.getItem("AuthUserSecurityToken")
                        }
                    }
                )
                .then(res => {
                    console.log(res.data);
                    this.setState({companyD:res.data})
                    this.setState({loading:false});
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
    
}

export default Profile;


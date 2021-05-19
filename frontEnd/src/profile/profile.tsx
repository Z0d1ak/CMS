import React from 'react';
import './profile.css';
import 'antd/dist/antd.css';
import { Layout, BackTop, Row, Col, Button } from 'antd';
import {
    RollbackOutlined
} from '@ant-design/icons';
import { paths } from '../swaggerCode/swaggerCode';
import { Divider } from 'antd';
import axios from 'axios';
import {
    Link
} from "react-router-dom";
import CalendarHeatmap from 'react-calendar-heatmap';
import ReactTooltip from "react-tooltip";
import "react-calendar-heatmap/dist/styles.css";


// type userData=paths["/api/User/{id}"]["get"]["responses"]["200"]["content"]["application/json"]

import { Typography } from "antd";
const { Title, Paragraph, Text } = Typography;



/**
 * Класс компонента профиля пользователя
 */
export class Profile extends React.Component<{}, {}> {
    state = {
        requestUrl: "https://hse-cms.herokuapp.com",
        userD: {
            id: "",
            companyId: "",
            email: "",
            firstName: "",
            lastName: "",
            roles: []
        },
        companyD: {
            id: "",
            name: ""
        },
        loading: true

    };

    shiftDate(date, numDays) {
        const newDate = new Date(date);
        newDate.setDate(newDate.getDate() + numDays);
        return newDate;
    }

    getRange(count) {
        return Array.from({ length: count }, (_, i) => i);
    }

    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }


    render() {
        let today = new Date();
        const randomValues = this.getRange(200).map((index) => {
            return {
            date: this.shiftDate(today, -index),
            count: this.getRandomInt(1, 3)
            };
        });
        return (
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
                            <Button icon={<RollbackOutlined style={{ fontSize: '20px' }} />} onClick={() => {
                                console.log("back");
                            }}>

                            </Button>
                        </Link>
                    </Row>
                    <Row>
                        <Col span={1}></Col>
                        <Col span={12}>
                            <Title>Сотрудник</Title>
                        </Col>
                        <Col span={1}></Col>
                    </Row>
                    <Row>
                        <Col span={1}></Col>
                        <Col span={2}><Paragraph strong>Имя:</Paragraph></Col>
                        <Col span={10} ><Paragraph> {this.state.userD.firstName}</Paragraph></Col>
                        <Col span={1}></Col>
                    </Row>
                    <Row>
                        <Col span={1}></Col>
                        <Col span={2}><Paragraph strong>Фамилия:</Paragraph></Col>
                        <Col span={10} ><Paragraph> {this.state.userD.lastName}</Paragraph></Col>
                        <Col span={1}></Col>
                    </Row>
                    <Row>
                        <Col span={1}></Col>
                        <Col span={2}><Paragraph strong>Email:</Paragraph></Col>
                        <Col span={10} ><Paragraph> {this.state.userD.email}</Paragraph></Col>
                        <Col span={1}></Col>
                    </Row>
                    <Row>
                        <Col span={1}></Col>
                        <Col span={2}><Paragraph strong>Роли:</Paragraph></Col>
                        <Col span={10} ><Paragraph> {this.state.userD.roles[0]}</Paragraph></Col>
                        <Col span={1}></Col>
                    </Row>
                    <Divider />
                    <Row>
                        <Col span={1}></Col>
                        <Col span={12}>
                            <Title>Компания</Title>
                        </Col>
                        <Col span={1}></Col>
                    </Row>
                    <Row>
                        <Col span={1}></Col>
                        <Col span={2}><Paragraph strong>Название:</Paragraph></Col>
                        <Col span={10} ><Paragraph> {this.state.companyD.name}</Paragraph></Col>
                        <Col span={1}></Col>
                    </Row>
                    <Row>
                        <Col span={1}></Col>
                        <Col span={12} >
                             <div>
                                <Title>Активность</Title>

                                <CalendarHeatmap
                                    startDate={this.shiftDate(today, -150)}
                                    endDate={today}
                                    values={randomValues}
                                    classForValue={(value) => {
                                    if (!value) {
                                        return "color-empty";
                                    }
                                    return `color-gitlab-${value.count}`;
                                    }}
                                    tooltipDataAttrs={(value) => {
                                    return {
                                        "data-tip": `${value.date.toISOString().slice(0, 10)} has count: ${
                                        value.count
                                        }`
                                    };
                                    }}
                                    showWeekdayLabels={true}
                                    onClick={(value) =>
                                    alert(`Clicked on value with count: ${value.count}`)
                                    }
                                />
                                <ReactTooltip />
                            </div>
                        </Col>
                        <Col span={1}></Col>
                    </Row>
                   
                   
                     <BackTop>
                        <div className="BackUp">Вверх</div>
                    </BackTop>
                </Layout.Content>
            </Layout>

        );
    }


    componentDidMount() {

        this.setState({ loading: true });
        let request: string = "/" + sessionStorage.getItem('AuthUserId');

        axios.get(
            this.state.requestUrl + "/api/User" + request,
            {
                headers: {
                    "Authorization": "Bearer " + sessionStorage.getItem("AuthUserSecurityToken")
                }
            }
        )
            .then(res => {
                console.log(res.data);
                this.setState({ userD: res.data })
                request = "/" + res.data.companyId;
                axios.get(
                    this.state.requestUrl + "/api/Company" + request,
                    {
                        headers: {
                            "Authorization": "Bearer " + sessionStorage.getItem("AuthUserSecurityToken")
                        }
                    }
                )
                    .then(res => {
                        console.log(res.data);
                        this.setState({ companyD: res.data })
                        this.setState({ loading: false });
                    })
                    .catch(err => {
                        switch (err.response.status) {
                            case 401: {
                                console.log("401");
                                break;
                            }
                            default: {
                                console.log("Undefined error");
                                break;
                            }
                        }
                    })
            })
            .catch(err => {
                switch (err.response.status) {
                    case 401: {
                        console.log("401");
                        break;
                    }
                    default: {
                        console.log("Undefined error");
                        break;
                    }
                }
            })

    }

}

export default Profile;


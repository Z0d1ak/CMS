import React from 'react';
import './settings.css';
import 'antd/dist/antd.css';
import { Layout, BackTop, Row, Col, Button } from 'antd';
import {
    RollbackOutlined
} from '@ant-design/icons';
import {
    Link
} from "react-router-dom";

/**
 * Класс компонента настроек пользователя
 */
export class Settings extends React.Component<{}, {}> {


    render() {

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
                            Здесь будет настройки сервиса
                        </Row>
                    <Row>
                        <Col span={1}></Col>
                    </Row>
                    <BackTop>
                        <div className="BackUp">Вверх</div>
                    </BackTop>
                </Layout.Content>
            </Layout>
        );

    }
}


export default Settings;


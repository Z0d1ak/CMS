import React from 'react';
import './Login.css';
import 'antd/dist/antd.css';
import {Form, Input, Button, Checkbox, Col, Row} from 'antd';
import {CustomCard} from "../Cards/Cards";

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};

const onFinish = () => {
    console.log('Success:', "2");
};

const onFinishFailed = () => {
    console.log('Failed:', "1");
};

export class Login extends React.Component<{},{}> {




    render() {


          return (<div className="LoginForm">

              <Row>
                  <Col span={7}></Col>
                  <Col span={8}>
                <Form {...layout}
                    name="basic"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        label="Логин"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Пожалуйста введите логин!',
                            },
                        ]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label="Пароль"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Пожалуйста введите пароль!',
                            },
                        ]}
                    >
                        <Input.Password/>
                    </Form.Item>

                    <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                        <Checkbox>Запомнить меня</Checkbox>
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                        <Button className="buttonLogin" type="primary" htmlType="submit">
                            Войти
                        </Button>
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                        <Button className="buttonLogin" type="primary" htmlType="submit">
                            Зарегистрировать компанию
                        </Button>
                    </Form.Item>
                </Form>
              </Col>
        <Col span={9}></Col>
              </Row>
              </div>
            );
        }
    }


export default Login;


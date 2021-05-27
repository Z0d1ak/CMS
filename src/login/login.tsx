import React from 'react';
import './login.css';
import 'antd/dist/antd.css';
import { Form, Input, Button, Checkbox, Col, Row, notification } from 'antd';
import axios from 'axios'
import { paths,/*components,operations*/ } from "../swaggerCode/swaggerCode"
import { useState } from 'react';
import { useHistory } from "react-router-dom";
import { getUser, setUser} from "../const/shared"

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

const pathBase: string = "https://hse-cms.herokuapp.com";

type authenticationData = paths["/api/Auth/login"]["post"]["requestBody"]["content"]["text/json"];

type field =
    {
        name: string[];
        value: string,
    };

export class Login extends React.Component<{}, { fields: field[] }> {
    constructor(props: {}) {
        super(props);
        this.state = {
            fields: [
                {
                    name: ['username'],
                    value: 'admin@admin.com',
                },
                {
                    name: ['password'],
                    value: 'Master1234',
                }
            ]
        };
    }


    setFields(newFields: any) {
        this.setState({ fields: newFields });
    }

    render() {

        return (
            <LoginForm fields={this.state.fields} onChangeFields={(newFields: field[]) => { this.setFields(newFields); }} />
        );
    }
}






const LoginForm = (props: { fields: field[], onChangeFields: (newFields: any) => void }) => {


    const [loadings, setLoadings] = useState(false);
    const history = useHistory();

    const onFinish = () => {

        let auth: authenticationData = { email: props.fields[0].value, password: props.fields[1].value }
        axios.post(pathBase + "/api/Auth/login", auth)
            .then(res => {
                console.log(res);
                sessionStorage.setItem('AuthUserId', res.data.user.id);
                sessionStorage.setItem('AuthUserSecurityToken', res.data.securityToken);
                setUser(res.data.user)
                console.log(JSON.stringify(getUser()))
                history.push("/home/inwork");
            })
            .catch(err => {
                console.log(err)
                switch (err.response.status) {
                    case 401: {
                        notification.error({
                            message: 'Ошибка ' + err.response.status,
                            description:
                                "Ошибка авторизации"
                        });
                        break;
                    }
                    default: {
                        notification.error({
                            message: 'Ошибка ' + err.response.status,
                            description:
                                "Неопознанная ошибка"
                        });
                        break;
                    }
                }
                setLoadings(false);
            })

    };

    const onFinishFailed = () => {
        console.log('Failed:', "1");
    };

    const enterLoading = (index: any) => {

    };


    return (
        <div className="loginForm">

            <Row>
                <Col span={7}></Col>
                <Col span={8}>
                    <Form {...layout}
                        name="authentication"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                        fields={props.fields}
                        onFieldsChange={(_, allFields) => {
                            props.onChangeFields(allFields);
                        }}
                        onFinishFailed={onFinishFailed}
                    >
                        <Form.Item
                            label="Логин"
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    type: 'email',
                                    message: 'Пожалуйста введите логин!',
                                },
                            ]}
                        >
                            <Input disabled={loadings}></Input>
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
                            <Input.Password disabled={loadings}></Input.Password>
                        </Form.Item>

                        <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                            <Checkbox>Запомнить меня</Checkbox>
                        </Form.Item>

                        <Form.Item {...tailLayout}>
                            <Button type="primary" loading={loadings} onClick={() => setLoadings(true)} className="buttonLogin" htmlType="submit">
                                Войти
                    </Button>
                        </Form.Item>
                    </Form>
                </Col>
                <Col span={9}></Col>
            </Row>
        </div>
    );
};



export default { Login };


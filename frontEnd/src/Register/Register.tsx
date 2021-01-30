import React from 'react';
import './Register.css';
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

const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!',
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
};

export class Register extends React.Component<{},{}> {




    render() {


          return (<div className="LoginForm">

              <Row>
                  <Col span={7}></Col>
                  <Col span={8}>
                      <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
                          <Form.Item
                              name={['user', 'name']}
                              label="Имя"
                              rules={[
                                  {
                                      required: true,
                                      message: 'Пожалуйста введите имя!',
                                  },
                              ]}
                          >

                              <Input />
                          </Form.Item>

                          <Form.Item
                              name={['user', 'surname']}
                              label="Фамилия"
                              rules={[
                                  {
                                      required: true,
                                      message: 'Пожалуйста введите фамилию!',
                                  },
                              ]}
                          >

                              <Input />
                          </Form.Item>

                          <Form.Item
                              name={['user', 'email']}
                              label="Email"
                              rules={[
                                  {
                                      type: 'email',
                                      required: true,
                                      message: 'Пожалуйста введите email!',
                                  },
                              ]}
                          >
                              <Input />
                          </Form.Item>

                          <Form.Item
                              name={['user', 'Company']}
                              label="Название компании"
                              rules={[
                                  {
                                      required: true,
                                      message: 'Пожалуйста введите название компании!',
                                  },
                              ]}
                          >

                              <Input />
                          </Form.Item>


                          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                              <Button type="primary" htmlType="submit">
                                  Submit
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


export default Register;


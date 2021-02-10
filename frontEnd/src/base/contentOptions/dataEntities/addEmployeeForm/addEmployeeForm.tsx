import React from 'react';
import 'antd/dist/antd.css';
import './addEmployeeForm.css';
import {
    SettingOutlined,
    DeleteOutlined,
    EllipsisOutlined,
    UpOutlined,
    CheckOutlined,

} from '@ant-design/icons';
import { Divider } from 'antd';
import {Avatar,Card,Popconfirm, message } from 'antd';
import { Row, Col } from 'antd';

import {DataRow,DataRowEditable,DataRowList,DataRowListEditable} from "../dataRow/dataRow";
import {Form, Input, Button, Checkbox,} from 'antd';

const { Meta } = Card;

class User{
    public firstname!: string;
    public lastname!: string;
    public email!: string;
    public id!: string;
    public foto!: string;
    public roles!: string[];
}

const layout = {
  labelCol: { span: 2 },
  wrapperCol: { span: 0 },
};


export class AddEmployeeForm extends React.Component<{},{}> {

    
  
    onFinish = (values: any) => {
        console.log(values);
      };
    
      onReset = () => {
        
      };
    
      onFill = () => {
        
      };

  

    render() {
        return (
            
            <Row>
            <Col span={0}></Col>
            <Col span={22}>
        <Form {...layout}  name="control-ref">
            <Form.Item name="Name" label="Имя" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name="Surname" label="Фамилия" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name="Email" label="Почта" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name="Password" label="Пароль" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name="Role" label="Роль" rules={[{ required: true }]}>
                <Input />
            </Form.Item>

        </Form>
        </Col>
        <Col span={1}></Col>
        </Row>
        );
    }

}


export default AddEmployeeForm;
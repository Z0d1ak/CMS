import React from 'react';
import 'antd/dist/antd.css';
import './addEmployeeForm.css';
import {Card } from 'antd';
import { Row, Col } from 'antd';
import {Form, Input, Button, Checkbox,} from 'antd';
import {useHistory} from "react-router-dom";
import axios from 'axios'
import {paths,/*components,operations*/ } from "../../../../swaggerCode/swaggerCode"
import { v4 as uuidv4 } from 'uuid';

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
  labelCol: { span: 3 },
  wrapperCol: { span: 0 },
};

const pathBase:string ="https://hse-cms.herokuapp.com";

type userData = paths["/api/User"]["post"]["requestBody"]["content"]["text/json"]



type field=
    {
        name: string[];
        value: string,
    };

export class AddEmployeeForm extends React.Component<{closeAddForm:()=>void},{fields:field[]}> {

    constructor(props:{closeAddForm:()=>void}) {
        super(props);

        this.state = {
            fields:[
            {
                name: ['name'],
                value: 'Дмитрий',
            },
            {
                name: ['surname'],
                value: 'Дубина',
            },
            {
                name: ['email'],
                value: 'dodubina.spam@gmail.com',
            },
            {
                name: ['password'],
                value: '71400444443',
            },
            {
                name: ['roles'],
                value: 'SuperAdmin',
            }
            ]
        };
      }
    
      setFields (newFields:any) {
        this.setState({ fields:newFields });
    }

    render() {
        return (
            
            <NewUserForm  fields={this.state.fields} onChangeFields={(newFields:field[]) => {this.setFields(newFields);}} closeAddForm={this.props.closeAddForm}/> 
        );
    }

    componentDidUpdate() {
        
      }

}


const NewUserForm = (props:{fields:field[],onChangeFields:(newFields:any)=>void,closeAddForm:()=>void })=> {

    const history = useHistory();

    const onFinish = () => {
        
        console.log('Sucsess:', "0");
        let guis:string=uuidv4();
        console.log(guis);
        let data:userData={id:guis,
                           firstName:props.fields[0].value,
                           lastName:props.fields[1].value,
                           email:props.fields[2].value,
                           password:props.fields[3].value,
                           roles:["SuperAdmin"],
                        }
            axios.post(pathBase+"/api/User",data,
            {
                headers: {
                    "Authorization": "Bearer "+sessionStorage.getItem("AuthUserSecurityToken")
                }
            })
            .then(res => {
                console.log(res);
                props.closeAddForm();
                //history.push("/home");
            })
            .catch(err => {  
                console.log(err); 
              })

    };

    const onFinishFailed = () => {
        console.log('Failed:', "1");
    };


    return (
        <div>
          
           <Row>
            <Col span={0}></Col>
            <Col span={22}>
        <Form id="AddForm" {...layout}
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
            <Form.Item name="name" label="Имя" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name="surname" label="Фамилия" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name="email" label="Почта" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name="password" label="Пароль" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name="roles" label="Роль" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            

        </Form>
        </Col>
        <Col span={1}></Col>
        </Row>
        </div>
    );

    
  };



export default AddEmployeeForm;
import React from 'react';
import './addEntity.css';
import 'antd/dist/antd.css';
import { paths } from '../../../../swaggerCode/swaggerCode';
import axios from 'axios'
import {Input,Typography,Row, Col,Card,Form,Cascader,Select } from 'antd';
import {
    UpOutlined,
    CheckOutlined,
    PlusOutlined
} from '@ant-design/icons';


const { Paragraph } = Typography;

type getCompany = paths["/api/Company"]["get"]["parameters"]["query"];


export class AddEntity extends React.Component<{


},{}> {

   
    render() {
        return (
            <Row>
            <Col span={1}></Col>
                <Col span={22}>
                <AddBox/>
                </Col>
                <Col span={1}></Col>
            </Row>
        );
    }

}


export class AddBox extends React.Component<{},{}> {

    state = {
        status:'hide'
    };


    changeStatusValue=(val:any,type:string)=>{
        this.setState({[type]:val})    
    }


    submitSet = () => {
            var event = new Event('submit', {
                'bubbles'    : true, // Whether the event will bubble up through the DOM or not
                'cancelable' : true  // Whether the event may be canceled or not
            });
            document.getElementById("AddForm")?.dispatchEvent(event);
            //this.changeStatusValue("hide","status")
    };

    options=():JSX.Element[]=>{
        return (
            [<CheckOutlined onClick={()=>{this.submitSet();}}></CheckOutlined>,<UpOutlined onClick={()=>{this.changeStatusValue("hide","status")}}/>]
        )
    }
    

    render() {
        return (
                <Card className="addBox" 
                    hoverable={true} 
                    onClick={()=>{
                        if (this.state.status!=="expand")
                        this.changeStatusValue("expand","status")}}
                    actions={
                        this.state.status==="expand"?this.options():[]
                    }
                >
                    {this.state.status==="hide"?<PlusOutlined />:<AddForm/>}
                </Card>
        );
    }

}

type field=
    {
        name:string,
        value:string,
        type:string,
        label:string,
        options:
            {
                label:string,
                value:string
            }[]
        
    }

export class AddForm extends React.Component<{},{}> {

       state = {
        fields:[
            {
                name: 'companyTitle',
                value: 'Данные компании',
                type:'text',
                label:'Данные компании',
                options:[]
            },
        {
            name: 'companyName',
            value: 'ООО "ЛОЛКЕК"',
            type:'input',
            label:'Название:',
            options:[]
        },
        {
            name: 'adminTitle',
            value: 'Данные админа',
            type:'text',
            label:'Данные админа',
            options:[]
        },
        {
            name: 'firstName',
            value: 'Дмитрий',
            type:'input',
            label:'имя',
            options:[]
        },
        {
            name: 'lastName',
            value: 'Дубина',
            type:'input',
            label:'фамилия',
            options:[]
        },
        {
            name: 'email',
            value: 'dodubina.spam@gmail.com',
            type:'input',
            label:'email',
            options:[]
        },
        {
            name: 'password',
            value: '71400444443',
            type:'input',
            label:'пароль',
            options:[]
        },
        {
            name: 'picker',
            value: 'null',
            type:'singlePicker',
            label:'пикер',
            options:[
                {
                    label:"test",
                    value:"tttt"
                },
                {
                    label:"test1",
                    value:"tttt1"
                },
            ]
        },
        {
            name: 'picker2',
            value: 'null',
            type:'multiplyPicker',
            label:'пикер',
            options:[
                {
                    label:"test",
                    value:"tttt"
                },
                {
                    label:"test1",
                    value:"tttt1"
                },
            ]
        }
        ]
    };

    setValue=(newFields:field[])=>{
        this.setState({fields:newFields})
    }


    formGenerator=():JSX.Element=>{
        return (
            <Form id="AddForm" labelCol={{span:3} } wrapperCol={{span:20,offset:1}} fields={this.state.fields} >

                
                {this.state.fields.map((u, i) => {
                    switch(u.type){
                        case "input":{
                            return <Form.Item name={u.name} label={u.label} rules={[{ required: true }]}>
                                <Input/>
                            </Form.Item>
                            break;
                        }
                        case "singlePicker":{
                            return <Form.Item name={u.name} label={u.label} rules={[{ required: true }]}>
                            <Select onSelect={(value:string)=>{
                                 let buf=this.state.fields;
                                 u.value=value;
                                 this.setValue(buf);
                                 console.log(buf);
                            }}>
                              {u.options.map((uo, j) => {
                                  if(u.value!==uo.value)
                                  return(
                                    <Select.Option  value={uo.value} onClick={()=>{
                                       
                                    }}>{uo.label}</Select.Option>
                                  );
                              })}
                            </Select>
                          </Form.Item>
                            break;
                        }
                        case "multiplyPicker":{
                            return <Form.Item name={u.name} label={u.label} rules={[{ required: true }]}>
                            <Select onSelect={(value:string)=>{
                                 let buf=this.state.fields;
                                 u.value=value;
                                 this.setValue(buf);
                                 console.log(buf);
                            }}>
                              {u.options.map((uo, j) => {
                                  if(u.value!==uo.value)
                                  return(
                                    <Select.Option  value={uo.value} onClick={()=>{
                                       
                                    }}>{uo.label}</Select.Option>
                                  );
                              })}
                            </Select>
                          </Form.Item>
                            break;
                        }
                        case "text":{
                            return <Paragraph>
                                {u.value}
                            </Paragraph>
                            break;
                        }

                    }
                    
            })}
            </Form>



        );
    }

    render() {
        return (
            this.formGenerator()
        );
    }
}

export default AddEntity;

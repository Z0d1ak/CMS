import React from 'react';
import './addForm.css';
import 'antd/dist/antd.css';
import {Input,Typography,Form,Select } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import { paths } from '../../../../../swaggerCode/swaggerCode';
import { timingSafeEqual } from 'crypto';



type addCompany=paths["/api/Company"]["post"]["requestBody"]["content"]["text/json"]

const { Paragraph } = Typography;

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

export class AddForm extends React.Component<{
    createCallback:(val:addCompany)=>void
},{}> {

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
        }
        ],
        Company:{
            company: {
                id: "",
                name:"",
            },
            admin: {
                id: "",
                email: "",
                firstName: "",
                lastName: "",
                password: "",
            }
        }
    };


    onFinish = () => {
        console.log('Sucsess:', "0");
        let guis1:string=uuidv4();
        let guis2:string=uuidv4();
        let buf=this.state.Company;
        buf.admin.id=guis1;
        buf.company.id=guis2;
        this.props.createCallback(
            buf
        )
    };

    onFinishFailed = () => {
        console.log('Failed:', "1");
    };



    formGenerator=():JSX.Element=>{
        return (
            <Form id="AddForm" labelCol={{span:3} } wrapperCol={{span:20,offset:1}} fields={this.state.fields}
            
            onFinish={this.onFinish}
            onFinishFailed={this.onFinishFailed}
            onFieldsChange={(_, allFields) => {
                this.setState({
                    Company:{
                        company: {
                            id: "",
                            name:allFields[0].value,
                        },
                        admin: {
                            id: "",
                            email: allFields[3].value,
                            firstName: allFields[1].value,
                            lastName:allFields[2].value,
                            password: allFields[4].value,
                        }  
                    }
                })
              }}
            >

                
                {this.state.fields.map((u, i) => {
                    switch(u.type){
                        case "input":{
                            return <Form.Item name={u.name} label={u.label} rules={[{ required: true }]}>
                                <Input/>
                            </Form.Item>
                            break;
                        }
                        // case "singlePicker":{
                        //     return <Form.Item name={u.name} label={u.label} rules={[{ required: true }]}>
                        //     <Select onSelect={(value:string)=>{
                        //          let buf=this.state.fields;
                        //          u.value=value;
                        //          this.setValue(buf);
                        //          console.log(buf);
                        //     }}>
                        //       {u.options.map((uo, j) => {
                        //           if(u.value!==uo.value)
                        //           return(
                        //             <Select.Option  value={uo.value} onClick={()=>{
                                       
                        //             }}>{uo.label}</Select.Option>
                        //           );
                        //       })}
                        //     </Select>
                        //   </Form.Item>
                        //     break;
                        // }
                        // case "multiplyPicker":{
                        //     return <Form.Item name={u.name} label={u.label} rules={[{ required: true }]}>
                        //     <Select onSelect={(value:string)=>{
                        //          let buf=this.state.fields;
                        //          u.value=value;
                        //          this.setValue(buf);
                        //          console.log(buf);
                        //     }}>
                        //       {u.options.map((uo, j) => {
                        //           if(u.value!==uo.value)
                        //           return(
                        //             <Select.Option  value={uo.value} onClick={()=>{
                                       
                        //             }}>{uo.label}</Select.Option>
                        //           );
                        //       })}
                        //     </Select>
                        //   </Form.Item>
                        //     break;
                        // }
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

export default AddForm;

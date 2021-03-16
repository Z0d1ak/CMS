import React from 'react';
import './addForm.css';
import 'antd/dist/antd.css';
import { v4 as uuidv4 } from 'uuid';
import { paths } from '../../../../../swaggerCode/swaggerCode';
import { timingSafeEqual } from 'crypto';
import {Skeleton, Menu, Dropdown, Button, Space,Input,Typography,Row, Col,Card,Form,Cascader,Select,message,Divider,Popconfirm,Avatar } from 'antd';

import {MultiplyPicker,CMultiplyPicker} from '../../dataSubEntities/multiplyPicker/multiplyPicker';
import {
    UpOutlined,
    CheckOutlined,
    PlusOutlined,
    EllipsisOutlined,
    SettingOutlined,
    DeleteOutlined,
    RollbackOutlined,
    CloseOutlined

} from '@ant-design/icons';


type addCompany=paths["/api/Company"]["post"]["requestBody"]["content"]["text/json"]
type addUser=paths["/api/User"]["post"]["requestBody"]["content"]["text/json"]

const { Paragraph } = Typography;
type option=
{
    label:string,
    value:string
}

type field=
    {
        name:string,
        value:string,
        type:string,
        label:string,
        options:option[],
        chosedOptions:option[]        
    }

    const companyFields:field[]=[
        {
            name: 'companyTitle',
            value: 'Данные компании',
            type:'text',
            label:'Данные компании',
            options:[],
            chosedOptions:[]
        },
    {
        name: 'companyName',
        value: 'ООО "ЛОЛКЕК"',
        type:'input',
        label:'Название:',
        options:[],
        chosedOptions:[]
    },
    {
        name: 'adminTitle',
        value: 'Данные админа',
        type:'text',
        label:'Данные админа',
        options:[],
        chosedOptions:[]
    },
    {
        name: 'firstName',
        value: 'Дмитрий',
        type:'input',
        label:'Имя',
        options:[],
        chosedOptions:[]
    },
    {
        name: 'lastName',
        value: 'Дубина',
        type:'input',
        label:'Фамилия',
        options:[],
        chosedOptions:[]
    },
    {
        name: 'email',
        value: 'dodubina.spam@gmail.com',
        type:'input',
        label:'Email',
        options:[],
        chosedOptions:[]
    },
    {
        name: 'password',
        value: '71400444443',
        type:'input',
        label:'Пароль',
        options:[],
        chosedOptions:[]
    }
    ]

    const employeeFields:field[]=[
    {
        name: 'firstName',
        value: 'Дмитрий',
        type:'input',
        label:'Имя',
        options:[],
        chosedOptions:[]
    },
    {
        name: 'lastName',
        value: 'Дубина',
        type:'input',
        label:'Фамилия',
        options:[],
        chosedOptions:[]
    },
    {
        name: 'email',
        value: 'dodubina.spam@gmail.com',
        type:'input',
        label:'Email',
        options:[],
        chosedOptions:[]
    },
    {
        name: 'password',
        value: '71400444443',
        type:'input',
        label:'Пароль',
        options:[],
        chosedOptions:[]
    },
    {
        name: 'roles',
        value: 
        '71400444443',
        type:'multiplyPicker',
        label:'Роли',
        options:[
            {
                label:"SuperAdmin",
                value:"SuperAdmin"
            },
            {
                label:"CompanyAdmin",
                value:"CompanyAdmin"
            },
            {
                label:"ChiefRedactor",
                value:"ChiefRedactor"
            },
            {
                label:"Redactor",
                value:"Redactor"
            },
            {
                label:"Author",
                value:"Author"
            },
            {
                label:"Corrector",
                value:"Corrector"
            }    
        ],
        chosedOptions:[
        ]
    }
    ]

export class AddForm extends React.Component<{
    createCallback:(val:any)=>void,
    dataType:string
},{fields:field[]}> {

    constructor(props:{createCallback:(val:addCompany)=>void,
        dataType:string}) {
        super(props);
        switch(this.props.dataType) { 
            case "article": { 
                this.state = {
                    fields:companyFields
            }
                break;
            }
            case "employee": { 
                this.state = {
                    fields:employeeFields
            }
            break; 
            } 
            case "role": { 
                this.state = {
                    fields:companyFields
            }
                break;
            }
            case "company": { 
                this.state = {
                    fields:companyFields
            }
                break;
            }
            case "task": { 
                this.state = {
                    fields:companyFields
            }
                break;
            }
            default:  { 
                this.state = {
                    fields:companyFields
            }
                break;
            }
        }
        
    }
    

       state = {
        fields:[
            {
                name: 'companyTitle',
                value: 'Данные компании',
                type:'text',
                label:'Данные компании',
                options:[{
                    label:"",
                    value:""
                }],
                chosedOptions:[
                    {label:"",
                    value:""
                    }
                ]
                
            },
        {
            name: 'companyName',
            value: 'ООО "ЛОЛКЕК"',
            type:'input',
            label:'Название:',
            options:[],
            chosedOptions:[
                {label:"",
                value:""
                }
            ]
        },
        {
            name: 'adminTitle',
            value: 'Данные админа',
            type:'text',
            label:'Данные админа',
            options:[],
            chosedOptions:[
                {label:"",
                value:""
                }
            ]
        },
        {
            name: 'firstName',
            value: 'Дмитрий',
            type:'input',
            label:'имя',
            options:[],
            chosedOptions:[
                {label:"",
                value:""
                }
            ]
        },
        {
            name: 'lastName',
            value: 'Дубина',
            type:'input',
            label:'фамилия',
            options:[],
            chosedOptions:[
                {label:"",
                value:""
                }
            ]
        },
        {
            name: 'email',
            value: 'dodubina.spam@gmail.com',
            type:'input',
            label:'email',
            options:[],
            chosedOptions:[
                {label:"",
                value:""
                }
            ]
        },
        {
            name: 'password',
            value: '71400444443',
            type:'input',
            label:'пароль',
            options:[],
            chosedOptions:[
                {label:"",
                value:""
                }
            ]
        }
        ]
    };


    onFinish = () => {
        //console.log(this.state.fields);
        let buf;
        switch(this.props.dataType) { 
            case "article": { 
                buf={}
                break;
            }
            case "employee": { 
                let guis1:string=uuidv4();
                let roles:string[]=[]
                this.state.fields[4].chosedOptions.map((u, i) => {
                roles.splice(roles.length,0,u.value);
                })
                //console.log(roles);
                buf={
                        id: "",
                        email: this.state.fields[2].value,
                        firstName:  this.state.fields[0].value,
                        lastName: this.state.fields[1].value,
                        password:  this.state.fields[3].value,
                        roles: roles
                };
                
                buf.id=guis1;
                break; 
            } 
            case "role": { 
                buf={}
                break;
            }
            case "company": { 
                let guis1:string=uuidv4();
                let guis2:string=uuidv4();
                buf={
                    company: {
                        id: "",
                        name: this.state.fields[0].value,
                    },
                    admin: {
                        id: "",
                        email: this.state.fields[3].value,
                        firstName:  this.state.fields[1].value,
                        lastName: this.state.fields[2].value,
                        password:  this.state.fields[4].value,
                    }  
                };
                buf.admin.id=guis1;
                buf.company.id=guis2;
                break;
            }
            case "task": { 
                buf={}
            
                break;
            }
            default:  { 

                buf={}
                break;
            }
        }
    
        
        //console.log(buf);
        this.props.createCallback(
            buf
        )
    };

    onFinishFailed = () => {
        console.log('Failed:', "1");
    };


    updateListCallBack = (val:option[]) => {
        let buf=this.state.fields;
        buf[4].chosedOptions=val;
        this.setState({fields:buf});       
    };

   

    formGenerator=():JSX.Element=>{
        return (
            <Form id="AddForm" labelCol={{span:3} } wrapperCol={{span:20,offset:1}} fields={this.state.fields}
            
            onFinish={this.onFinish}
            onFinishFailed={this.onFinishFailed}
            onFieldsChange={(_, allFields) => {
                let buf=this.state.fields;
                buf[0].value=allFields[0].value;
                buf[1].value=allFields[1].value;
                buf[2].value=allFields[2].value;
                buf[3].value=allFields[3].value;
                buf[4].value=allFields[4].value;
                this.setState({
                   fields:buf
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
                         case "multiplyPicker":{
                             return <Form.Item name={u.name} label={u.label} rules={[{ required: true }]}>
                             <CMultiplyPicker  updListCallback={this.updateListCallBack} typeName="" dataList={u.chosedOptions} optionList={u.options}/>
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





export default AddForm;

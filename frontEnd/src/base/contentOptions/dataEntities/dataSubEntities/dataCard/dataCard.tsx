import React from 'react';
import './dataCard.css';
import 'antd/dist/antd.css';
import { paths } from '../../../../../swaggerCode/swaggerCode';
import axios from 'axios'
import {Skeleton, Menu, Dropdown, Button, Space,Input,Typography,Row, Col,Card,Form,Cascader,Select,message,Divider,Popconfirm,Avatar } from 'antd';
import {
    UpOutlined,
    CheckOutlined,
    PlusOutlined,
    EllipsisOutlined,
    SettingOutlined,
    DeleteOutlined

} from '@ant-design/icons';
import Switch from 'react-bootstrap/esm/Switch';
import { spawn } from 'child_process';
import {DataRow,DataRowEditable,DataRowList,DataRowListEditable} from "../dataRow/dataRow";
import { Steps } from 'antd';
import { MultiplyPicker } from "../multiplyPicker/multiplyPicker";
import { ConsoleLogger } from 'typedoc/dist/lib/utils';

const { Step } = Steps;
const { Search } = Input;
const { Paragraph } = Typography;
const { Meta } = Card;
const { Title, Text} = Typography;


type company=paths["/api/Company"]["get"]["responses"]["200"]["content"]["application/json"]["items"][0]
type article=paths["/api/Article"]["post"]["responses"]["201"]["content"]["application/json"]
type role=paths["/api/Role"]["get"]["responses"]["200"]["content"]["application/json"]["items"][0]
type task=paths["/api/Article"]["post"]["responses"]["201"]["content"]["application/json"]["tasks"]
type emploe=paths["/api/User"]["get"]["responses"]["200"]["content"]["application/json"]["items"][0]

export class DataCard extends React.Component<{
        deleteItemCallback:(position: number)=>void,
        updateItemCallback:(position: number,item:any)=>void,
        position:number,
        data: any,
        dataType:string,
        loading:boolean
    },{}> {

/*
        constructor(props:{deleteItemCallback:(position: number)=>void,
            updateItemCallback:(position: number,item:any)=>void,
            position:number,
            data: any,
            dataType:string,
            loading:boolean}) 
          {
            super(props);
            this.state = {status:'narrow',bufData:this.props.data};
          }*/

        state = {
            status:'narrow',
            bufData:this.props.data
        };




        updateDataFieldCallBack = (val:string,param:string) => {
            let buf=this.state.bufData;

            switch(param)
            {
                
                case "id":
                    buf.id=val;
                    this.setState({bufData:buf});  
                    break;
                case "name":
                    buf.name=val;
                    this.setState({bufData:buf});  
                    break;
                case "roles":
                    buf.roles=val;
                    this.setState({bufData:buf});  
                    break;
                    case "firstName":
                        buf.firstName=val;
                        this.setState({bufData:buf});  
                        break;
                    case "lastName":
                        buf.lastName=val;
                        this.setState({bufData:buf});  
                        break;
                    case "email":
                        buf.email=val;
                        this.setState({bufData:buf});  
                        break;

            }
        };

        updateListCallBack = (val:string) => {
            let buf=this.state.bufData;
            buf.roles=val;
            this.setState({bufData:buf});       
        };
    
        expandCardChange = () => {
            if(this.state.status==='narrow')
                this.setState({ status: 'expand'});
            else
                this.setState({ status: 'narrow'});
        };
    
        makeEditableCardChange = () => {
            if(this.state.status==='expand')
                this.setState({ status: 'editable'});
            else
            {
                this.setState({ status: 'expand'});
            }
        };
     
        deleteCard = () => {
            this.props.deleteItemCallback(this.props.position);
        };
    
        updateCard = () => {
            this.props.updateItemCallback(this.props.position, this.state.bufData);
        };

        isNull=(val:string):boolean=>{
            console.log(val);
            return val===""||val===null;
        }
/*
        switch(this.props.dataType) { 
            case "article": { 
             
            break; 
            } 
            case "employee": { 
             
            break; 
            } 
            case "role": { 
             
                break; 
            } 
            case "company": { 
             
                break; 
            }
            case "task": { 
             
                break; 
            } 
            default: { 
             
            break; 
            } 
        }
    
  */  
        Header= ():JSX.Element =>{
            
        switch(this.props.dataType) { 
            case "article": { 
                return(
                    <Skeleton title={{width:"30%"}} active loading={this.props.loading} paragraph={{ rows: 1,width:"50%"}}>
                        <Meta
                            title={<div className="titleCard">{this.props.data.title}</div>}
                            description={<div className="titleDescriptionCard">{this.props.data.id}</div>}
                        />
                        </Skeleton>
                );
            } 
            case "employee": { 
                return(
                    <Skeleton title={{width:"30%"}} active loading={this.props.loading} paragraph={{ rows: 1,width:"50%"}}>
                        <Meta
                        avatar={<Avatar size={50}  src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                        title={<div className="titleCard">{this.props.data.firstName}  {this.isNull(this.props.data.lastName)?"":this.props.data.lastName}</div>}
                        description={<div className="titleDescriptionCard">{this.props.data.id}</div>}
                    />
                        </Skeleton>
                );
            } 
            case "role": { 
                return(
                    <Skeleton title={{width:"30%"}} active loading={this.props.loading} paragraph={{ rows: 1,width:"50%"}}>
                        <Meta
                            title={<div className="titleCard">{this.props.data.name}</div>}
                            description={<div className="titleDescriptionCard">{this.props.data.id}</div>}
                        />
                    </Skeleton>
                );
            } 
            case "company": { 
                return(
                    <Skeleton title={{width:"30%"}} active loading={this.props.loading} paragraph={{ rows: 1,width:"50%"}}>
                        <Meta
                            title={<div className="titleCard">{this.props.data.name}</div>}
                            description={<div className="titleDescriptionCard">{this.props.data.id}</div>}
                        />
                    </Skeleton>
                );
            }
            case "task": { 
                return(
                    <div>task</div>
                );
            } 
            default: { 
                return(
                    <div>No such type</div>
                ) 
            } 
        }
        }

        DataRows= ():JSX.Element[] =>{
            switch(this.props.dataType) { 
                case "article": { 
                    return(
                        [
                            <Divider />,
                            <Paragraph strong>Инициатор статьи</Paragraph>,
                            <Skeleton  title={{width:"100%"}} active loading={this.props.loading} paragraph={{ rows: 0}}>
                                <DataRow dataStr={this.props.data.initiator.firstName} titleStr="Имя : "/>
                                </Skeleton>,
                            <Skeleton  title={{width:"100%"}} active loading={this.props.loading} paragraph={{ rows: 0}}>
                            <DataRow dataStr={this.props.data.initiator.lastName} titleStr="Фамилия : "/>
                            </Skeleton>,
                            <Skeleton  title={{width:"100%"}} active loading={this.props.loading} paragraph={{ rows: 0}}>
                            <DataRow dataStr={this.props.data.initiator.email} titleStr="email : "/>
                            </Skeleton>,
                            <Divider />,
                            <Paragraph strong>Статус статьи</Paragraph>,
                            <Skeleton  title={{width:"100%"}} active loading={this.props.loading} paragraph={{ rows: 0}}>
                                 <DataRow dataStr={this.props.data.id} titleStr="id : "/>
                                 </Skeleton>,
                             <Skeleton  title={{width:"100%"}} active loading={this.props.loading} paragraph={{ rows: 0}}>
                             <DataRow dataStr={this.props.data.creationDate} titleStr="Cоздано : "/>
                             </Skeleton> ,
                             <Skeleton  title={{width:"100%"}} active loading={this.props.loading} paragraph={{ rows: 0}}>
                                 <Row>
                                 <Col span={2}></Col>
                                <Col span={20}>
                                <Steps direction="horizontal" current={2}>
                                {this.props.data.tasks.map((d:any, i:number) => {
                                return (
                                    <Step key={i+"tk"} title={d.description} description={d.comment} />
                                )
                                })}
                                </Steps>
                                </Col>
                                </Row>
                            </Skeleton>
                        ]  
                    )
                } 
                case "employee": { 
                    return(
                        [
                            <Divider />,
                            <Skeleton  title={{width:"100%"}} active loading={this.props.loading} paragraph={{ rows: 3}}>
                                 <DataRow dataStr={this.props.data.firstName} titleStr="Имя : "/>
                                 {this.isNull(this.props.data.lastName)?"":<DataRow dataStr={this.props.data.lastName} titleStr="Фамилия : "/>}
                                 <DataRow dataStr={this.props.data.email} titleStr="Почта : "/>
                            </Skeleton>,
                            <Divider />,
                            <Skeleton  title={{width:"100%"}} active loading={this.props.loading} paragraph={{ rows: 0}}>
                                 <DataRowList dataList={this.props.data.roles} titleStr="Роли : "/>
                            </Skeleton>
                                 
                        ]
                    )
                } 
                case "role": { 
                    return(
                        [ 
                        <Divider />,
                            <Skeleton  title={{width:"100%"}} active loading={this.props.loading} paragraph={{ rows: 0}}>
                                <DataRow dataStr={this.props.data.name} titleStr="Название : "/>
                                </Skeleton>,
                            <Divider />,
                            <Skeleton  title={{width:"100%"}} active loading={this.props.loading} paragraph={{ rows: 0}}>
                                 <DataRow dataStr={this.props.data.id} titleStr="id : "/>
                                 </Skeleton>
                        ]
                    );
                } 
                case "company": { 
                    return(
                        [
                             <Divider />,
                            <Skeleton  title={{width:"100%"}} active loading={this.props.loading} paragraph={{ rows: 0}}>
                                <DataRow dataStr={this.props.data.name} titleStr="Название : "/>
                                </Skeleton>,
                            <Divider />,
                            <Skeleton  title={{width:"100%"}} active loading={this.props.loading} paragraph={{ rows: 0}}>
                                 <DataRow dataStr={this.props.data.id} titleStr="id : "/>
                                 </Skeleton>
                        ]
                    );
                }
                case "task": { 
                    return(
                        [<div>task</div>]
                    );
                } 
                default: { 
                    return (
                        [<div>No such type</div>]
                    ) 
                } 
            }
        }
    
        DataRowsEditable=():JSX.Element[]=>{
            switch(this.props.dataType) { 
                case "article": { 
                    return(
                        [
                            
                             <Divider />,
                             <Paragraph strong>Задачи</Paragraph>,
                             <div>
                                 {this.props.data.tasks.map((d:any, i:number) => {
                                 return (
                                     <Row>
                                     <Col key={i+"tk"}>{d.description}</Col>
                                     <Col key={i+"tk"}>{d.comment}</Col></Row>
                                 )
                                 })}
                                 </div>,
                                  <Divider />,
                                 <Paragraph strong>Предпросмотр</Paragraph>,
                                 <Skeleton  title={{width:"100%"}} active loading={this.props.loading} paragraph={{ rows: 0}}>
                                    <div className="prev"></div>
                                </Skeleton>,
                                <Paragraph strong>Редактор</Paragraph>,
                                <Skeleton  title={{width:"100%"}} active loading={this.props.loading} paragraph={{ rows: 0}}>
                                    <button className="red">редактор</button>
                               </Skeleton>
                        ]  
                    ) 
                } 
                case "employee": { 
                    return(
                        [
                            <Divider />,
                            <Skeleton  title={{width:"100%"}} active loading={this.props.loading} paragraph={{ rows: 3}}>
                                <DataRowEditable dataStr={this.state.bufData.firstName} titleStr="Имя : " typeName="firstName" editFieldCallback={this.updateDataFieldCallBack}/>
                                <DataRowEditable dataStr={this.state.bufData.lastName||"Нет данных"} titleStr="Фамилия : " typeName="lastName" editFieldCallback={this.updateDataFieldCallBack}/>
                                <DataRowEditable dataStr={this.state.bufData.email} titleStr="Почта : " typeName="email" editFieldCallback={this.updateDataFieldCallBack}/>
        
                                </Skeleton>,
                            <Divider />,
                            <Skeleton  title={{width:"100%"}} active loading={this.props.loading} paragraph={{ rows: 0}}>
                                <MultiplyPicker dataList={this.state.bufData.roles} typeName="roles" updListCallback={this.updateListCallBack}/>
                                 </Skeleton>
        
        
                        ]
                    );
                } 
                case "role": { 
                    return(
                        [ 
                        <Divider />,
                            <Skeleton  title={{width:"100%"}} active loading={this.props.loading} paragraph={{ rows: 0}}>
                                <DataRowEditable dataStr={this.props.data.name} titleStr="Название : " typeName="name" editFieldCallback={this.updateDataFieldCallBack}/>
                            </Skeleton>,
                            <Divider />,
                            <Skeleton  title={{width:"100%"}} active loading={this.props.loading} paragraph={{ rows: 0}}>
                            <DataRow dataStr={this.props.data.id} titleStr="id : "/>
                            </Skeleton>
                        ]
        
                    );
                } 
                case "company": { 
                    return(
                        [ 
                            <Divider />,
                                <Skeleton  title={{width:"100%"}} active loading={this.props.loading} paragraph={{ rows: 0}}>
                                    <DataRowEditable dataStr={this.props.data.name} titleStr="Название : " typeName="name" editFieldCallback={this.updateDataFieldCallBack}/>
                                </Skeleton>,
                                <Divider />,
                                <Skeleton  title={{width:"100%"}} active loading={this.props.loading} paragraph={{ rows: 0}}>
                                <DataRow dataStr={this.props.data.id} titleStr="id : "/>
                                </Skeleton>
                            ]
                    ); 
                }
                case "task": { 
                    return(
                        [<div>task</div>]
                    );
                } 
                default: { 
                    return (
                        [<div>No such type</div>]
                    )
                } 
            }
        }
    
        optionsNarrow=():JSX.Element[]=>{
            return (
                [<EllipsisOutlined onClick={()=>this.expandCardChange()}/>]
            )
        }
    
        optionsExpand=():JSX.Element[]=>{
            return (
                [<SettingOutlined onClick={()=>this.makeEditableCardChange()}/>,<UpOutlined onClick={()=>this.expandCardChange()}/>]
            )
        }
    
        optionsExpandEditable=():JSX.Element[]=>{
            return (
                [<Popconfirm placement="rightTop" title={"Вы точно хотите удалить этот объект?"} onConfirm={()=>this.deleteCard()} okText="Yes" cancelText="No"><DeleteOutlined/></Popconfirm>,<CheckOutlined onClick={()=>{this.makeEditableCardChange();this.updateCard();}}/>]
            )
        }

        componentDidUpdate(prevProps:any, prevState:any, snapshot:any)
        {
            if (this.props.loading === false&&prevProps.loading === true) {
                this.setState({status:"narrow"})
            }
        }


    
        render() {
            this.state.bufData=this.props.data;
            return (
                
                <Card className="userCard wide"
                    hoverable={true}
                    actions={
                        this.state.status==="narrow"?this.optionsNarrow():this.state.status==="expand"?this.optionsExpand():this.optionsExpandEditable()
                    }
                >
                    {this.Header()}
                    
                    {this.state.status==="narrow"?<div/>:
                        this.state.status==="expand"?
                        
                        this.DataRows().map((d, i) => {
                            return(React.cloneElement(d, { key: i+"dr" }));
                        }):
                        this.DataRowsEditable().map((d, i) => {
                            return(React.cloneElement(d, { key: i+"dre" }));
                        })
                }
                </Card>

            );
        }

}


export default DataCard;

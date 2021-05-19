import React from 'react';
import './dataCard.css';
import 'antd/dist/antd.css';
import { paths } from '../../../../../swaggerCode/swaggerCode';
import { Skeleton, Button, Input, Typography, Row, Col, Card, Divider, Popconfirm, Avatar } from 'antd';
import {
    UpOutlined,
    CheckOutlined,
    PlusOutlined,
    EllipsisOutlined,
    SettingOutlined,
    DeleteOutlined

} from '@ant-design/icons';
import { DataRow, DataRowEditable, DataRowList } from "../dataRow/dataRow";
import axios from 'axios'
import { notification } from 'antd';
import { Steps } from 'antd';
import { MultiplyPicker } from "../multiplyPicker/multiplyPicker";

import { Redactor, ArticleV } from "../../../../../redactor/redactor"
import {
    Route,
    Redirect,
    Link
} from "react-router-dom";


const { Step } = Steps;
const { Search } = Input;
const { Paragraph } = Typography;
const { Meta } = Card;
const { Title, Text } = Typography;


type company = paths["/api/Company"]["get"]["responses"]["200"]["content"]["application/json"]["items"][0]
type article = paths["/api/Article"]["post"]["responses"]["201"]["content"]["application/json"]
type role = paths["/api/Role"]["get"]["responses"]["200"]["content"]["application/json"]["items"][0]
type task = paths["/api/Article"]["post"]["responses"]["201"]["content"]["application/json"]["tasks"]
type emploe = paths["/api/User"]["get"]["responses"]["200"]["content"]["application/json"]["items"][0]
type t = paths["/api/Task/take"]["post"]["parameters"]

export class DataCard extends React.Component<{
    deleteItemCallback: (position: number) => void,
    updateItemCallback: (position: number, item: any) => void,
    position: number,
    data: any,
    dataType: string,
    loading: boolean
}, {}> {

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
        status: 'narrow',
        bufData: this.props.data
    };




    updateDataFieldCallBack = (val: string, param: string) => {
        let buf = this.state.bufData;

        switch (param) {

            case "id":
                buf.id = val;
                this.setState({ bufData: buf });
                break;
            case "name":
                buf.name = val;
                this.setState({ bufData: buf });
                break;
            case "roles":
                buf.roles = val;
                this.setState({ bufData: buf });
                break;
            case "firstName":
                buf.firstName = val;
                this.setState({ bufData: buf });
                break;
            case "lastName":
                buf.lastName = val;
                this.setState({ bufData: buf });
                break;
            case "email":
                buf.email = val;
                this.setState({ bufData: buf });
                break;

        }
    };

    updateListCallBack = (val: string) => {
        let buf = this.state.bufData;
        buf.roles = val;
        this.setState({ bufData: buf });
    };

    expandCardChange = () => {
        if (this.state.status === 'narrow')
            this.setState({ status: 'expand' });
        else
            this.setState({ status: 'narrow' });
    };

    makeEditableCardChange = () => {
        if (this.state.status === 'expand')
            this.setState({ status: 'editable' });
        else {
            this.setState({ status: 'expand' });
        }
    };

    deleteCard = () => {
        this.props.deleteItemCallback(this.props.position);
    };

    updateCard = () => {
        this.props.updateItemCallback(this.props.position, this.state.bufData);
    };

    isNull = (val: string): boolean => {
        return val === "" || val === null;
    }

    Header = (): JSX.Element => {

        switch (this.props.dataType) {
            case "article": {
                return (
                    <Skeleton title={{ width: "30%" }} active loading={this.props.loading} paragraph={{ rows: 1, width: "50%" }}>
                        <Meta
                            title={<div className="titleCard">{this.props.data.title}</div>}
                        />
                    </Skeleton>
                );
            }
            case "employee": {
                return (
                    <Skeleton title={{ width: "30%" }} active loading={this.props.loading} paragraph={{ rows: 1, width: "50%" }}>
                        <Meta
                            avatar={<Avatar size={50} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                            title={<div className="titleCard">{this.props.data.firstName}  {this.isNull(this.props.data.lastName) ? "" : this.props.data.lastName}</div>}
                        />
                    </Skeleton>
                );
            }
            case "role": {
                return (
                    <Skeleton title={{ width: "30%" }} active loading={this.props.loading} paragraph={{ rows: 1, width: "50%" }}>
                        <Meta
                            title={<div className="titleCard">{this.props.data.name}</div>}
                        />
                    </Skeleton>
                );
            }
            case "company": {
                return (
                    <Skeleton title={{ width: "30%" }} active loading={this.props.loading} paragraph={{ rows: 1, width: "50%" }}>
                        <Meta
                            title={<div className="titleCard">{this.props.data.name}</div>}
                        />
                    </Skeleton>
                );
            }
            case "task": {
                return (
                    <Skeleton title={{ width: "30%" }} active loading={this.props.loading} paragraph={{ rows: 1, width: "50%" }}>
                        <Meta
                            title={<div className="titleCard">{this.props.data.description}</div>}
                        />
                    </Skeleton>
                );
            }
            default: {
                return (
                    <div>No such type</div>
                )
            }
        }
    }

    openArticle = (id: string) => {

        return <Redirect from='/home/inwork' to='/article/:id/' />
        return <Route path="/article/:id/" component={ArticleV} />
    }

    editArticle = (id: string) => {

        return <Redirect from='/home/inwork' to='/redactor/:id/' />
        return <Route path="/redactor/:id/" component={Redactor} />

    }


    DataRows = (): JSX.Element[] => {
        switch (this.props.dataType) {
            case "article": {
                return (
                    [
                        <Divider />,
                        <Paragraph strong>Инициатор статьи</Paragraph>,
                        <Skeleton title={{ width: "100%" }} active loading={this.props.loading} paragraph={{ rows: 0 }}>
                            <DataRow dataStr={this.props.data.initiator.firstName} titleStr="Имя : " />
                        </Skeleton>,
                        <Skeleton title={{ width: "100%" }} active loading={this.props.loading} paragraph={{ rows: 0 }}>
                            <DataRow dataStr={this.props.data.initiator.lastName} titleStr="Фамилия : " />
                        </Skeleton>,
                        <Skeleton title={{ width: "100%" }} active loading={this.props.loading} paragraph={{ rows: 0 }}>
                            <DataRow dataStr={this.props.data.initiator.email} titleStr="Email : " />
                        </Skeleton>,
                        <Divider />,
                        <Paragraph strong>Статус статьи</Paragraph>,
                        <Skeleton title={{ width: "100%" }} active loading={this.props.loading} paragraph={{ rows: 0 }}>
                            <DataRow dataStr={this.props.data.creationDate} titleStr="Cоздано : " />
                        </Skeleton>,
                        <Skeleton title={{ width: "100%" }} active loading={this.props.loading} paragraph={{ rows: 0 }}>
                            <Row>
                                <Col span={2}></Col>
                                <Col span={20}>
                                    <Steps direction="horizontal" current={2}>
                                        {
                                            () => {
                                                if (this.props.data.tasks !== null) {
                                                    this.props.data.task.map((d: any, i: number) => {
                                                        return (
                                                            <Step key={i + "tk"} title={d.description} description={d.comment} />
                                                        )
                                                    })
                                                }
                                                else {
                                                    return "null"

                                                }
                                            }}
                                    </Steps>
                                </Col>
                            </Row>
                        </Skeleton>
                    ]
                )
            }
            case "employee": {
                return (
                    [
                        <Divider />,
                        <Skeleton title={{ width: "100%" }} active loading={this.props.loading} paragraph={{ rows: 3 }}>
                            <DataRow dataStr={this.props.data.firstName} titleStr="Имя : " />
                            {this.isNull(this.props.data.lastName) ? "" : <DataRow dataStr={this.props.data.lastName} titleStr="Фамилия : " />}
                            <DataRow dataStr={this.props.data.email} titleStr="Почта : " />
                        </Skeleton>,
                        <Divider />,
                        <Skeleton title={{ width: "100%" }} active loading={this.props.loading} paragraph={{ rows: 0 }}>
                            <DataRowList dataList={this.props.data.roles} titleStr="Роли : " />
                        </Skeleton>

                    ]
                )
            }
            case "role": {
                return (
                    [
                        <Divider />,
                        <Skeleton title={{ width: "100%" }} active loading={this.props.loading} paragraph={{ rows: 0 }}>
                            <DataRow dataStr={this.props.data.name} titleStr="Название : " />
                        </Skeleton>,
                        <Divider />,
                    ]
                );
            }
            case "company": {
                return (
                    [
                        <Divider />,
                        <Skeleton title={{ width: "100%" }} active loading={this.props.loading} paragraph={{ rows: 0 }}>
                            <DataRow dataStr={this.props.data.name} titleStr="Название : " />
                        </Skeleton>,
                        <Divider />,
                    ]
                );
            }
            case "task": {
                return (
                    [
                        <Divider />,
                        <Paragraph strong>Задание</Paragraph>,
                        <Skeleton title={{ width: "100%" }} active loading={this.props.loading} paragraph={{ rows: 3 }}>
                            <DataRow dataStr={this.props.data.description} titleStr="Формулировка : " />
                            <DataRow dataStr={this.props.data.creationDate} titleStr="Дата создания : " />
                            <DataRow dataStr={this.props.data.assignmentDate} titleStr="Дата поручения : " />
                        </Skeleton>,
                        <Divider />,
                        <Paragraph strong>Инициатор</Paragraph>,
                        <Skeleton title={{ width: "100%" }} active loading={this.props.loading} paragraph={{ rows: 3 }}>
                            <Skeleton title={{ width: "100%" }} active loading={this.props.loading} paragraph={{ rows: 0 }}>
                                <DataRow dataStr={this.props.data.author.firstName} titleStr="Имя : " />
                            </Skeleton>
                            <Skeleton title={{ width: "100%" }} active loading={this.props.loading} paragraph={{ rows: 0 }}>
                                <DataRow dataStr={this.props.data.author.lastName} titleStr="Фамилия : " />
                            </Skeleton>
                            <Skeleton title={{ width: "100%" }} active loading={this.props.loading} paragraph={{ rows: 0 }}>
                                <DataRow dataStr={this.props.data.author.email} titleStr="Email : " />
                            </Skeleton>
                        </Skeleton>,
                        <Divider />,
                    ]
                );
            }
            default: {
                return (
                    [<div>No such type</div>]
                )
            }
        }
    }


    /*
{
                "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                "type": 0,
                "performer": {
                  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                  "companyId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                  "email": "user@example.com",
                  "firstName": "string",
                  "lastName": "string",
                  "roles": [
                    "SuperAdmin"
                  ]
                },
                "author": {
                  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                  "companyId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                  "email": "user@example.com",
                  "firstName": "string",
                  "lastName": "string",
                  "roles": [
                    "SuperAdmin"
                  ]
                },
                "creationDate": "2021-03-11T22:18:00.743Z",
                "assignmentDate": "2021-03-11T22:18:00.743Z",
                "сompletionDate": "2021-03-11T22:18:00.743Z",
                "description": "string",
                "comment": "string"
              },
    */
    DataRowsEditable = (): JSX.Element[] => {
        switch (this.props.dataType) {
            case "article": {
                return (
                    [

                        <Divider />,
                        <Paragraph strong>Задачи</Paragraph>,
                        <div>
                            {this.props.data.task !== null
                                ? [this.props.data.task].map((d: any, i: number) => {
                                    return (
                                        <Row>
                                            <Col key={i + "tk"}>{d.description}</Col>
                                            <Col key={i + "tk"}>{d.comment}</Col></Row>
                                    )
                                })
                                : <>Отсутствует</>
                            }

                        </div>,
                        <Divider />,
                        <Paragraph strong>Предпросмотр</Paragraph>,
                        <Skeleton title={{ width: "100%" }} active loading={this.props.loading} paragraph={{ rows: 0 }}>
                            <Link to={'/article/' + this.props.data.id}>
                                <Button className="butttonart" onClick={() => this.openArticle(this.props.data.id)}>Открыть статью</Button>
                            </Link>
                        </Skeleton>,
                        <Paragraph strong>Редактор</Paragraph>,
                        <Skeleton title={{ width: "100%" }} active loading={this.props.loading} paragraph={{ rows: 0 }}>
                            <Link to={'/redactor/' + this.props.data.id}>
                                <Button className="butttonart" onClick={() => this.editArticle(this.props.data.id)}>
                                    Открыть редактор
                                    </Button>
                            </Link>


                        </Skeleton>



                     
                    ]
                )
            }
            case "employee": {
                return (
                    [
                        <Divider />,
                        <Skeleton title={{ width: "100%" }} active loading={this.props.loading} paragraph={{ rows: 3 }}>
                            <DataRowEditable dataStr={this.state.bufData.firstName} titleStr="Имя : " typeName="firstName" editFieldCallback={this.updateDataFieldCallBack} />
                            <DataRowEditable dataStr={this.state.bufData.lastName || "Нет данных"} titleStr="Фамилия : " typeName="lastName" editFieldCallback={this.updateDataFieldCallBack} />
                            <DataRowEditable dataStr={this.state.bufData.email} titleStr="Почта : " typeName="email" editFieldCallback={this.updateDataFieldCallBack} />
                            {/* {
                                (this.props.data.roles.includes("CompanyAdmin") || this.props.data.id === sessionStorage.getItem("AuthUserId"))
                                && <DataRowEditable dataStr={this.state.bufData.password} titleStr="Новый пароль : " typeName='password' editFieldCallback={this.updateDataFieldCallBack} />
                            } */}
                        </Skeleton>,
                        <Divider />,
                        <Skeleton title={{ width: "100%" }} active loading={this.props.loading} paragraph={{ rows: 0 }}>

                            <Row className="DataRow">
                                <Col span={3} className='title'><Paragraph className='DataRowTitle'>{"Роли: "}</Paragraph></Col>
                                <Col span={4}  className="DataRowList">

                                    <MultiplyPicker dataList={this.state.bufData.roles} typeName="roles" updListCallback={this.updateListCallBack} />

                                </Col>
                            </Row>
                        </Skeleton>


                    ]
                );
            }
            case "role": {
                return (
                    [
                        <Divider />,
                        <Skeleton title={{ width: "100%" }} active loading={this.props.loading} paragraph={{ rows: 0 }}>
                            <DataRowEditable dataStr={this.props.data.name} titleStr="Название : " typeName="name" editFieldCallback={this.updateDataFieldCallBack} />
                        </Skeleton>,
                        <Divider />,
                    ]

                );
            }
            case "company": {
                return (
                    [
                        <Divider />,
                        <Skeleton title={{ width: "100%" }} active loading={this.props.loading} paragraph={{ rows: 0 }}>
                            <DataRowEditable dataStr={this.props.data.name} titleStr="Название : " typeName="name" editFieldCallback={this.updateDataFieldCallBack} />
                        </Skeleton>,
                        <Divider />,
                    ]
                );
            }
            case "task": {
                return (
                    [
                        <Divider />,
                        <Paragraph strong>Управление заданием</Paragraph>,
                        <Skeleton title={{ width: "100%" }} active loading={this.props.loading} paragraph={{ rows: 0 }}>
                              

                            {this.props.data.сompletionDate==null?<Link to={'/home/inwork'}><Button className="red"  onClick={()=>this.finish(this.props.data.id)}>Завершить</Button>
                            </Link>:<></>}
            
                        </Skeleton>,
                        <Paragraph strong>Взять в работу</Paragraph>,
                        <Skeleton title={{ width: "100%" }} active loading={this.props.loading} paragraph={{ rows: 0 }}>
                             {this.props.data.assignmentDate==null?<Button className="red" onClick={()=>this.take(this.props.data.id)}>Взять</Button>:<></>}
                            
                        </Skeleton>
                    ]
                );
            }
            default: {
                return (
                    [<div>No such type</div>]
                )
            }
        }
    }

    optionsNarrow = (): JSX.Element[] => {
        return (
            [<EllipsisOutlined onClick={() => this.expandCardChange()} />]
        )
    }

    
    take = (idd:string) => {
        console.log(this.props.data);
        axios.post("https://hse-cms.herokuapp.com/api/Task/take?taskId="+idd,{},
            {
                headers: {
                    "Authorization": "Bearer " + sessionStorage.getItem("AuthUserSecurityToken")
                }
            })
            .then(res => {
                console.log(res)
                 window.location.reload(false);
            })
            .catch(err => {
                console.log(err);
                switch (err.response.status) {
                    case 401: {
                        notification.error({
                            message: 'Ошибка ' + err.response.status,
                            description:
                                "Недостаточно прав для создания статьи"
                        });
                        break;
                    }
                    case 409: {
                        notification.error({
                            message: 'Ошибка ' + err.response.status,
                            description:
                                "Конфликт данных, убедитесь что данные корректны и не дублируют существующие"
                        });
                        break;
                    }
                    default: {
                        notification.error({
                            message: 'Ошибка ' + err.response.status,
                            description:
                                err.response.body
                        });
                        break;
                    }
                }
            })
    }



    finish = (idd:string) => {
        console.log(this.props.data);
        let val={
            id:idd,
            comment: "finished"
        }
        
        axios.post("https://hse-cms.herokuapp.com" + "/api/Task/finish", val,
            {
                headers: {
                    "Authorization": "Bearer " + sessionStorage.getItem("AuthUserSecurityToken")
                }
            })
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err);
                switch (err.response.status) {
                    case 401: {
                        notification.error({
                            message: 'Ошибка ' + err.response.status,
                            description:
                                "Недостаточно прав для создания статьи"
                        });
                        break;
                    }
                    case 409: {
                        notification.error({
                            message: 'Ошибка ' + err.response.status,
                            description:
                                "Конфликт данных, убедитесь что данные корректны и не дублируют существующие"
                        });
                        break;
                    }
                    default: {
                        notification.error({
                            message: 'Ошибка ' + err.response.status,
                            description:
                                err.response.body
                        });
                        break;
                    }
                }
            })
    }


    

    optionsExpand = (): JSX.Element[] => {
        return (
            [<SettingOutlined onClick={() => this.makeEditableCardChange()} />, <UpOutlined onClick={() => this.expandCardChange()} />]
        )
    }

    optionsExpandEditable = (): JSX.Element[] => {
        return (
            [<Popconfirm placement="rightTop" title={"Вы точно хотите удалить этот объект?"} onConfirm={() => this.deleteCard()} okText="Yes" cancelText="No"><DeleteOutlined /></Popconfirm>, <CheckOutlined onClick={() => { this.makeEditableCardChange(); this.updateCard(); }} />]
        )
    }

    componentDidUpdate(prevProps: any, prevState: any, snapshot: any) {
        if (this.props.loading === false && prevProps.loading === true) {
            this.setState({ status: "narrow" })
        }
    }



    render() {
        this.state.bufData = this.props.data;
        return (

            <Card className="userCard wide"
                hoverable={true}

                actions={
                    this.state.status === "narrow" ? this.optionsNarrow() : this.state.status === "expand" ? this.optionsExpand() : this.optionsExpandEditable()
                }
            >
                {this.Header()}

                {this.state.status === "narrow" ? <div /> :
                    this.state.status === "expand" ?

                        this.DataRows().map((d, i) => {
                            return (React.cloneElement(d, { key: i + "dr" }));
                        }) :
                        this.DataRowsEditable().map((d, i) => {
                            return (React.cloneElement(d, { key: i + "dre" }));
                        })
                }
            </Card>

        );
    }

}


export default DataCard;

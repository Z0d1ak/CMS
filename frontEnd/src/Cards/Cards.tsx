import React from 'react';
import 'antd/dist/antd.css';
import './Cards.css';
import {
    SettingOutlined,
    DeleteOutlined,
    EllipsisOutlined,
    UpOutlined,
    CheckOutlined,

} from '@ant-design/icons';
import { Typography,Divider } from 'antd';
import {Avatar,Dropdown,Card,Popconfirm, message,Menu } from 'antd';
import { Row, Col } from 'antd';

import {DataRow,DataRowEditable,DataRowList,DataRowListEditable} from "../DataRow/DataRow";


const { Meta } = Card;

class User{
    public firstname!: string;
    public lastname!: string;
    public email!: string;
    public id!: string;
    public foto!: string;
    public roles!: string[];
}



export class CustomCard extends React.Component<{testUser:User},{}> {

    state = {
        status:'narrow',
        firstname:'',
        lastname:'',
        email:'',
        id:'0',
        roles:['']
    };

    constructor(props:{testUser:User}) {
        super(props);
        this.state.firstname = this.props.testUser.firstname;
        this.state.lastname = this.props.testUser.lastname;
        this.state.email = this.props.testUser.email;
        this.state.roles = this.props.testUser.roles;
        this.state.id = this.props.testUser.id;
    };



    expandCardChange = () => {
        if(this.state.status=='narrow')
            this.setState({ status: 'expand'});
        else
            this.setState({ status: 'narrow'});
    };

    makeEditableCardChange = () => {
        if(this.state.status=='expand')
            this.setState({ status: 'editable'});
        else
        {
            //this.updateCard();
            this.setState({ status: 'expand'});
        }
    };

    deleteCard = () => {
        message.info('Успешно удалено');

    };

    updateCard = (val:string) => {
        message.info('Изменения сохранены');
    };

    updateDataFieldCallBack = (val:string,param:string) => {
        this.setState({[param]:val});
    };

    updateListFieldCallBack = (val:string[],param:string) => {
        this.setState({[param]:val});
    };


    DataRows= ():JSX.Element[] =>{
        return (
            [
                <Divider />,
                <DataRow dataStr={this.state.firstname} titleStr="Имя :"/>,
                <DataRow dataStr={this.state.lastname} titleStr="Фамилия :"/>,
                <DataRow dataStr={this.state.email} titleStr="Почта :"/>,
                <Divider />,
                <DataRowList dataList={this.state.roles} titleStr="Роли :"/>
            ]
        )
    }

    DataRowsEditable=():JSX.Element[]=>{
        return (
            [
                <Divider />,
                <DataRowEditable dataStr={this.state.firstname} titleStr="Имя :" typeName="firstname" editFieldCallback={this.updateDataFieldCallBack}/>,
                <DataRowEditable dataStr={this.state.lastname} titleStr="Фамилия :" typeName="lastname" editFieldCallback={this.updateDataFieldCallBack}/>,
                <DataRowEditable dataStr={this.state.email} titleStr="Почта :" typeName="email" editFieldCallback={this.updateDataFieldCallBack}/>,
                <Divider />,
                <DataRowListEditable dataList={this.state.roles} titleStr="Роли :" typeName="roles"  editListCallback={this.updateListFieldCallBack}/>
            ]
        )
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
            [<Popconfirm placement="topLeft" title={"Вы точно хотите удалить этот объект?"} onConfirm={()=>this.deleteCard()} okText="Yes" cancelText="No"><DeleteOutlined/></Popconfirm>,<CheckOutlined onClick={()=>this.makeEditableCardChange()}/>]
    )
    }

    render() {
        return (
            <Card className="userCard wide"
                hoverable={true}
                actions={
                    this.state.status=="narrow"?this.optionsNarrow():this.state.status=="expand"?this.optionsExpand():this.optionsExpandEditable()
                }
            >
                <Meta
                    avatar={<Avatar size={50}  src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                    title={<div className="titleCard">{this.state.firstname} {this.state.lastname}</div>}
                    description={<div className="titleDescriptionCard">{this.state.id}</div>}
                />
                {this.state.status=="narrow"?<div/>:this.state.status=="expand"?this.DataRows():this.DataRowsEditable()}
            </Card>
        );
    }

}






export function GenerateCustomCardList({},{}) {
    let usersList:User[] =GetUserList();
    return (
        <Row>
            <Col span={1}></Col>
            <Col span={22}>
            {usersList.map((u, i) => {
                return (<CustomCard testUser={u}/>)
            })}
            </Col>
            <Col span={1}></Col>
        </Row>
    )
}

export function GetUserList(): User[] {
    let userOne: User = new User();
    userOne.email="bbelov@edu.hse.ru"
    userOne.firstname="Борис"
    userOne.lastname="Белов"
    userOne.id="1312313";
    userOne.roles=
        [
            "Дизайнер",
            "Студент"
        ];
    userOne.foto = "https://www.google.com/url?sa=i&url=https%3A%2F%2Fproforientator.ru%2Fpublications%2Farticles%2Fprofessiya-programmist.html&psig=AOvVaw1XWvaroqESYDscMlBEuqzx&ust=1610547806934000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCJjAzqHMlu4CFQAAAAAdAAAAABAD";

    let userTwo: User = new User();
    userTwo.email="doFilonenko@mail.ru"
    userTwo.firstname="Иван"
    userTwo.lastname="Филоненко"
    userTwo.id="131345353";
    userTwo.roles=
        [
            "Студент"
        ];
    userTwo.foto = "https://www.google.com/url?sa=i&url=https%3A%2F%2Fproforientator.ru%2Fpublications%2Farticles%2Fprofessiya-programmist.html&psig=AOvVaw1XWvaroqESYDscMlBEuqzx&ust=1610547806934000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCJjAzqHMlu4CFQAAAAAdAAAAABAD";

    let userThree: User = new User();
    userThree.email="ggwp@gmail.com"
    userThree.firstname="Дмитрий"
    userThree.lastname="Дубина"
    userThree.id="131212341313";
    userThree.roles=
        [
            "Разработчик",
            "Верстальщик",
            "Студент"
        ];
    userThree.foto = "https://www.google.com/url?sa=i&url=https%3A%2F%2Fproforientator.ru%2Fpublications%2Farticles%2Fprofessiya-programmist.html&psig=AOvVaw1XWvaroqESYDscMlBEuqzx&ust=1610547806934000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCJjAzqHMlu4CFQAAAAAdAAAAABAD";

    let userFour: User = new User();
    userFour.email="13123123oofofo33@yandex.ru"
    userFour.firstname="Чечен"
    userFour.lastname="Арбузов"
    userFour.id="erg3434";
    userFour.roles=
        [
            "Дизайнер",
            "Разработчик",
            "Верстальщик",
            "Студент",
            "бекэндер",
            "Водитель"
        ];
    userFour.foto = "https://www.google.com/url?sa=i&url=https%3A%2F%2Fproforientator.ru%2Fpublications%2Farticles%2Fprofessiya-programmist.html&psig=AOvVaw1XWvaroqESYDscMlBEuqzx&ust=1610547806934000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCJjAzqHMlu4CFQAAAAAdAAAAABAD";

    let userFive: User = new User();
    userFive.email="hh@gmail.com"
    userFive.firstname="Генадий"
    userFive.lastname="Глухов"
    userFive.id="0000234";
    userFive.roles=
        [
        ];
    userFive.foto = "https://www.google.com/url?sa=i&url=https%3A%2F%2Fproforientator.ru%2Fpublications%2Farticles%2Fprofessiya-programmist.html&psig=AOvVaw1XWvaroqESYDscMlBEuqzx&ust=1610547806934000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCJjAzqHMlu4CFQAAAAAdAAAAABAD";
    let userOneq: User = new User();
    userOneq.email="bbelov@edu.hse.ru"
    userOneq.firstname="Борис"
    userOneq.lastname="Белов"
    userOneq.id="1312313";
    userOneq.roles=
        [
            "Дизайнер",
            "Студент"
        ];
    userOne.foto = "https://www.google.com/url?sa=i&url=https%3A%2F%2Fproforientator.ru%2Fpublications%2Farticles%2Fprofessiya-programmist.html&psig=AOvVaw1XWvaroqESYDscMlBEuqzx&ust=1610547806934000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCJjAzqHMlu4CFQAAAAAdAAAAABAD";

    let userTwoq: User = new User();
    userTwoq.email="doFilonenko@mail.ru"
    userTwoq.firstname="Иван"
    userTwoq.lastname="Филоненко"
    userTwoq.id="131345353";
    userTwoq.roles=
        [
            "Студент"
        ];
    userTwo.foto = "https://www.google.com/url?sa=i&url=https%3A%2F%2Fproforientator.ru%2Fpublications%2Farticles%2Fprofessiya-programmist.html&psig=AOvVaw1XWvaroqESYDscMlBEuqzx&ust=1610547806934000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCJjAzqHMlu4CFQAAAAAdAAAAABAD";

    let userThreeq: User = new User();
    userThreeq.email="ggwp@gmail.com"
    userThreeq.firstname="Дмитрий"
    userThreeq.lastname="Дубина"
    userThreeq.id="131212341313";
    userThreeq.roles=
        [
            "Разработчик",
            "Верстальщик",
            "Студент"
        ];
    userThree.foto = "https://www.google.com/url?sa=i&url=https%3A%2F%2Fproforientator.ru%2Fpublications%2Farticles%2Fprofessiya-programmist.html&psig=AOvVaw1XWvaroqESYDscMlBEuqzx&ust=1610547806934000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCJjAzqHMlu4CFQAAAAAdAAAAABAD";

    let userFourq: User = new User();
    userFourq.email="13123123oofofo33@yandex.ru"
    userFourq.firstname="Чечен"
    userFourq.lastname="Арбузов"
    userFourq.id="erg3434";
    userFourq.roles=
        [
            "Дизайнер",
            "Разработчик",
            "Верстальщик",
            "Студент",
            "бекэндер",
            "Водитель"
        ];
    userFour.foto = "https://www.google.com/url?sa=i&url=https%3A%2F%2Fproforientator.ru%2Fpublications%2Farticles%2Fprofessiya-programmist.html&psig=AOvVaw1XWvaroqESYDscMlBEuqzx&ust=1610547806934000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCJjAzqHMlu4CFQAAAAAdAAAAABAD";

    let userFiveq: User = new User();
    userFiveq.email="hh@gmail.com"
    userFiveq.firstname="Генадий"
    userFiveq.lastname="Глухов"
    userFiveq.id="0000234";
    userFiveq.roles=
        [
        ];
    userFiveq.foto = "https://www.google.com/url?sa=i&url=https%3A%2F%2Fproforientator.ru%2Fpublications%2Farticles%2Fprofessiya-programmist.html&psig=AOvVaw1XWvaroqESYDscMlBEuqzx&ust=1610547806934000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCJjAzqHMlu4CFQAAAAAdAAAAABAD";

    return [userOne,userTwo,userThree,userFour,userFive,userOneq,userTwoq,userThreeq,userFourq,userFiveq];
}

export default GenerateCustomCardList;
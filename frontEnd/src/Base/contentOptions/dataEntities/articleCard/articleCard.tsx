import React from 'react';
import 'antd/dist/antd.css';
import './articleCard.css';
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

import {DataRow,DataRowEditable,DataRowList,DataRowListEditable} from "../dataRow/dataRow";


const { Meta } = Card;



class Article{
    public ID!: string;
    public initiatorID!: string;
    public companyID!: string;
    public creationDate!: string;
    public statusArt!: string;
    public title!: string;
    public contest!: string;
}



export class CustomCard extends React.Component<{art:Article},{}> {

    state = {
        status:'narrow',
        ID: '',
        initiatorID: '',
        companyID: '',
        creationDate: '',
        statusArt: '',
        title: '',
        contest:'',
    };

    constructor(props:{art:Article}) {
        super(props);
        this.state.ID = this.props.art.ID;
        this.state.initiatorID = this.props.art.initiatorID;
        this.state.companyID = this.props.art.companyID;
        this.state.creationDate = this.props.art.creationDate;
        this.state.statusArt= this.props.art.statusArt;
        this.state.contest = this.props.art.contest;
        this.state.title = this.props.art.title;
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
                <DataRow dataStr={this.state.statusArt} titleStr="Имя :"/>,
            ]
        )
    }

    DataRowsEditable=():JSX.Element[]=>{
        return (
            [<div/>]
        );
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
                    title={<div className="titleCard">{this.state.title}</div>}
                    description={<div className="titleDescriptionCard">{this.state.ID}</div>}
                />
                {this.state.status=="narrow"?<div/>:this.state.status=="expand"?this.DataRows():this.DataRowsEditable()}
            </Card>
        );
    }

}






export function GenerateCustomCardList({},{}) {
    let usersList:Article[] =GetArticlesList();
    return (
        <Row>
            <Col span={1}></Col>
            <Col span={22}>
            {usersList.map((u, i) => {
                return (<CustomCard art={u}/>)
            })}
            </Col>
            <Col span={1}></Col>
        </Row>
    )
}

export function GetArticlesList(): Article[] {
    let art: Article = new Article();
    art.ID = '2134512341243';
    art.initiatorID = '0000001-12342134-3432342-2134234';
    art.companyID = '2342134234-234234234-234234-2341243';
    art.creationDate = '28.11.2021';
    art.statusArt= 'done';
    art.contest = 'conten0t';
    art.title = 'testArt 33333333333333333333333333rrrrrrr';

    let art1: Article = new Article();
    art.ID = '21345123434341243';
    art.initiatorID = '0000001-12342133454-3432342-2134234';
    art.companyID = '2342134234-23423434234-234234-2341243';
    art.creationDate = '28.10.2121';
    art.statusArt= 'done';
    art.contest = 'conten1t';
    art.title = '125335 rfc';


    let art2: Article = new Article();
    art.ID = '213451234221243';
    art.initiatorID = '0000001-12342134-3432342-213423434';
    art.companyID = '234213423664-234234234-234234-2341243';
    art.creationDate = '23.10.2021';
    art.statusArt= 'done';
    art.contest = 'content2';
    art.title = 'testArt rfcrf443214234   rfcrfcr  rfc';

    let art3: Article = new Article();
    art.ID = '2134512356641243';
    art.initiatorID = '000340001-12342134-3432342-2134234';
    art.companyID = '2342134234-2364234234-234234-2341243';
    art.creationDate = '20.10.2021';
    art.statusArt= 'done';
    art.contest = 'content3';
    art.title = 'testArt r444';

    return  [art,art1,art2,art3]
}

export default GenerateCustomCardList;
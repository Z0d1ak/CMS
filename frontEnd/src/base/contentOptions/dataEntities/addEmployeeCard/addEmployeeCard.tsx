import React from 'react';
import 'antd/dist/antd.css';
import './addEmployeeCard.css';
import {
    SettingOutlined,
    DeleteOutlined,
    EllipsisOutlined,
    UpOutlined,
    CheckOutlined,
    PlusOutlined

} from '@ant-design/icons';
import { Divider } from 'antd';
import {Avatar,Card,Popconfirm, message } from 'antd';
import { Row, Col } from 'antd';

import {DataRow,DataRowEditable,DataRowList,DataRowListEditable} from "../dataRow/dataRow";
import {AddEmployeeForm} from "../addEmployeeForm/addEmployeeForm";

const { Meta } = Card;

class User{
    public firstname!: string;
    public lastname!: string;
    public email!: string;
    public id!: string;
    public foto!: string;
    public roles!: string[];
}



export class AddEmployeeCard extends React.Component<{},{}> {

    state = {
        status:'hide',
    };

    openAddForm = () => {
        if(this.state.status=='hide')
        this.setState({ status: 'expand'});

    };

    closeAddForm = () => {
        if(this.state.status=='expand')
        this.setState({ status: 'hide'});
    };


    sendFormData = () => {

    };

    options=():JSX.Element[]=>{
        return (
            [<CheckOutlined onClick={()=>{this.sendFormData()}}/>,<UpOutlined onClick={()=>{this.closeAddForm()}}/>]
        )
    }
    

    render() {
        return (

            <Row>
                <Col span={1}></Col>
                <Col span={22}>
                    <Card className="userCard wide addbutton" 
                    hoverable={true} 
                    onClick={this.openAddForm}
                    actions={
                        this.state.status=="expand"?this.options():[]
                    }
                    >
                    {this.state.status=="hide"?<PlusOutlined />:<AddEmployeeForm/>}
                    </Card>
                </Col>
                <Col span={1}></Col>
            </Row>
           
        );
    }

}





export default AddEmployeeCard;
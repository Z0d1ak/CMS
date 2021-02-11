import React from 'react';
import 'antd/dist/antd.css';
import './addEmployeeCard.css';
import {
    UpOutlined,
    CheckOutlined,
    PlusOutlined

} from '@ant-design/icons';
import {Card } from 'antd';
import { Row, Col } from 'antd';


import {AddEmployeeForm} from "../addEmployeeForm/addEmployeeForm";


export class AddEmployeeCard extends React.Component<{},{}> {

    state = {
        status:'hide',
    };

    openAddForm = () => {
        if(this.state.status==='hide')
        this.setState({ status: 'expand'});

    };

    closeAddForm = () => {
        if(this.state.status==='expand')
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
                        this.state.status==="expand"?this.options():[]
                    }
                    >
                    {this.state.status==="hide"?<PlusOutlined />:<AddEmployeeForm/>}
                    </Card>
                </Col>
                <Col span={1}></Col>
            </Row>
           
        );
    }

}





export default AddEmployeeCard;
import React from 'react';
import './addBox.css';
import 'antd/dist/antd.css';
import { AddForm } from '../addForm/addForm';
import { Card, } from 'antd';
import {
    UpOutlined,
    CheckOutlined,
    PlusOutlined
} from '@ant-design/icons';
import { paths } from '../../../../../swaggerCode/swaggerCode';



type addCompany = paths["/api/Company"]["post"]["requestBody"]["content"]["text/json"]


export class AddBox extends React.Component<{
    createCallback: (val: any) => void,
    dataType: string,
}, {}> {

    state = {
        status: 'hide'
    };


    changeStatusValue = (val: any, type: string) => {
        this.setState({ [type]: val })
    }


    submitSet = () => {
        var event = new Event('submit', {
            'bubbles': true, // Whether the event will bubble up through the DOM or not
            'cancelable': true  // Whether the event may be canceled or not
        });
        document.getElementById("AddForm")?.dispatchEvent(event);
        //this.changeStatusValue("hide","status")
    };

    options = (): JSX.Element[] => {
        return (
            [<CheckOutlined onClick={() => { this.submitSet(); }}></CheckOutlined>, <UpOutlined onClick={() => { this.changeStatusValue("hide", "status") }} />]
        )
    }



    render() {
        return (
            <Card className="addBox" id="addboxId"
                hoverable={true}
                onClick={() => {
                    if (this.state.status !== "expand")
                        this.changeStatusValue("expand", "status")
                }}
                actions={
                    this.state.status === "expand" ? this.options() : []
                }
            >
                {this.state.status === "hide" ? <PlusOutlined /> : <AddForm
                    createCallback={this.props.createCallback}
                    dataType={this.props.dataType}
                    closeForm={this.changeStatusValue}
                />}
            </Card>
        );
    }

}

export default AddBox;

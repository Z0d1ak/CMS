import React from 'react';
import './multiplyPicker.css';
import 'antd/dist/antd.css';
import { paths } from '../../../../../swaggerCode/swaggerCode';
import { Menu, Dropdown, Button, Input, Typography, Card, } from 'antd';
import {

    PlusOutlined,
    CloseOutlined

} from '@ant-design/icons';
import { Steps } from 'antd';

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

export class MultiplyPicker extends React.Component<{
    updListCallback: (val: any) => void,
    typeName: string,
    dataList: string[],
}, {}> {

    state = {
        bufList: this.props.dataList
    }

    deleteUl(id: number): string[] {
        let updateArray = [...this.state.bufList];
        updateArray.splice(id, 1);
        this.setState({ bufList: updateArray });
        this.props.updListCallback(updateArray);
        //console.log(this.state.bufList);
        //console.log(this.props.dataList);
        //console.log(updateArray);
        return updateArray;
    }

    addUl(el: string): string[] {
        let updateArray = [...this.state.bufList];
        updateArray.splice(this.state.bufList.length, 0, el);
        this.setState({ bufList: updateArray });
        this.props.updListCallback(updateArray);
        //console.log(this.state.bufList);
        //console.log(this.props.dataList);
        //console.log(updateArray);
        return updateArray;
    }

    updateOptionsMenuCallBack(): JSX.Element {
        let optList: string[] = ["SuperAdmin", "CompanyAdmin", "ChiefRedactor", "Redactor", "Author", "Corrector"]
        return <Menu>
            {optList.map((r, i) => {
                if (this.state.bufList.indexOf(r) == -1)
                    return (

                        <Menu.Item key={i + "mi"} onClick={() => this.addUl(r)}>
                            {r}
                        </Menu.Item>
                    )
            })}
        </Menu>

    }

    render() {
        return (

            <div>
                {this.props.dataList.map((d, i) => {
                    return (
                        <Button key={i + "dl"} className="deleteButton" danger
                            type="dashed"
                            onClick={() => this.deleteUl(i)}
                        >
                            {d} <CloseOutlined />
                        </Button>
                    )
                })}
                <Dropdown overlay={this.updateOptionsMenuCallBack()}>
                    <Button className="addButtun"
                        type="dashed"
                        onClick={() => { }}
                        style={{ width: '100%' }}
                    >
                        Добавить роль <PlusOutlined />
                    </Button>
                </Dropdown>
            </div>

        );
    }

}

type option =
    {
        label: string,
        value: string
    }

export class CMultiplyPicker extends React.Component<{
    updListCallback: (val: any) => void,
    typeName: string,
    dataList: option[],
    optionList: option[]
}, {}> {

    state = {
        bufList: this.props.dataList
    }

    deleteUl(id: number): option[] {
        let updateArray = [...this.state.bufList];
        updateArray.splice(id, 1);
        this.setState({ bufList: updateArray });
        this.props.updListCallback(updateArray);
        //console.log(this.state.bufList);
        //console.log(this.props.dataList);
        //console.log(updateArray);
        return updateArray;
    }

    addUl(el: option): option[] {
        let updateArray = [...this.state.bufList];
        updateArray.splice(this.state.bufList.length, 0, el);
        this.setState({ bufList: updateArray });
        this.props.updListCallback(updateArray);
        //console.log(this.state.bufList);
        //console.log(this.props.dataList);
        //console.log(updateArray);
        return updateArray;
    }

    updateOptionsMenuCallBack(): JSX.Element {

        return <Menu>
            {this.props.optionList.map((r, i) => {
                if (this.state.bufList.indexOf(r) == -1)
                    return (

                        <Menu.Item key={i + "mi"} onClick={() => this.addUl(r)}>
                            {r.label}
                        </Menu.Item>
                    )
            })}
        </Menu>

    }

    render() {
        return (

            <div>
                {this.props.dataList.map((d, i) => {
                    return (
                        <Button key={i + "dl"} className="deleteButton" danger
                            type="dashed"
                            onClick={() => this.deleteUl(i)}
                        >
                            {d.label} <CloseOutlined />
                        </Button>
                    )
                })}
                <Dropdown overlay={this.updateOptionsMenuCallBack()}>
                    <Button
                        type="dashed"
                        onClick={() => { }}
                        style={{ width: '100%' }}
                    >
                        Добавить роль <PlusOutlined />
                    </Button>
                </Dropdown>
            </div>

        );
    }

}



export default { CMultiplyPicker, MultiplyPicker };

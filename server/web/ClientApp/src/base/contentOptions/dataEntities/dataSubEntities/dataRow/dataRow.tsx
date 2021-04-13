import React from 'react';
import { Row, Col, Button } from 'antd';
import 'antd/dist/antd.css';
import './dataRow.css';
import {
    CloseOutlined,
    EditOutlined,
    PlusOutlined
} from '@ant-design/icons';
import { Dropdown, Menu, message, Typography, Space } from "antd";
const { Paragraph } = Typography;


export interface IDataRowE {
    dataStr: string
    titleStr: string
    typeName: string
    editFieldCallback: (val: string, param: string) => void;
}

export interface IDataRowListE {
    dataList: string[]
    titleStr: string
    typeName: string
    editListCallback: (val: string[], param: string) => void;
}

export interface IDataRow {
    dataStr: string
    titleStr: string
}

export interface IDataRowList {
    dataList: string[]
    titleStr: string
}

export function DataRowEditable({ dataStr, titleStr, typeName, editFieldCallback }: IDataRowE) {
    const [editableStr, setEditableStr] = React.useState(dataStr);
    return (
        <Row className="DataRow">
            <Col span={3} className='title' >
                <Paragraph className='DataRowTitle'>{titleStr}</Paragraph>
            </Col>
            <Col span={19}>
                <Paragraph className='DataRowData' editable={{
                    maxLength: 10000,
                    icon: <EditOutlined />,
                    tooltip: 'Изменить',
                    onChange: (editableStr) => { setEditableStr(editableStr); editFieldCallback(editableStr, typeName); },
                }}>
                    {editableStr}
                </Paragraph>
            </Col>
        </Row>
    )
}

export function DataRow({ dataStr, titleStr }: IDataRow) {
    return (
        <Row className="DataRow">
            <Col span={3} className='title'><Paragraph className='DataRowTitle'>{titleStr}</Paragraph></Col>
            <Col span={20} ><Paragraph className='DataRowData'>{dataStr}</Paragraph></Col>
        </Row>
    )
}

export function DataRowList({ dataList, titleStr }: IDataRowList) {
    return (
        <Row className="DataRow">
            <Col span={3} className='title'><Paragraph className='DataRowTitle'>{titleStr}</Paragraph></Col>
            <Col span={4} className="DataRowList">

                {dataList.map((r, i) => {
                    return (
                        <Row key={i + "rw"}>
                            <Col span={1}></Col>
                            <Col span={22} className="optionText">{r}</Col>
                            <Col span={1}></Col>
                        </Row>)
                })}

            </Col>
        </Row>
    )
}


export function DataRowListEditable({ dataList, titleStr, typeName, editListCallback }: IDataRowListE) {

    function deleteUl(id: number, list: string[]): string[] {
        let updateArray = [...list];
        updateArray.splice(id, 1);
        message.info(id);
        editListCallback(updateArray, typeName);
        return updateArray;
    }

    function addUl(el: string, list: string[]): string[] {
        let updateArray = [...list];
        updateArray.splice(list.length, 0, el);
        editListCallback(updateArray, typeName);
        return updateArray;
    }

    function updateOptionsMenuCallBack(): JSX.Element {
        let optList: string[] = ["SuperAdmin", "CompanyAdmin", "ChiefRedactor", "Redactor", "Author", "Corrector"]
        return <Menu>
            {optList.map((r, i) => {
                return (
                    <Menu.Item onClick={() => editListCallback(addUl(r, dataList), typeName)}>
                        {r}
                    </Menu.Item>
                )
            })}
        </Menu>
    }


    return (
        <Row className="DataRow">
            <Col span={3} className='title'><Paragraph className='DataRowTitle'>{titleStr}</Paragraph></Col>
            <Col span={4} ><Paragraph className='DataRowList'>
                <ul>
                    {dataList.map((r, i) => {
                        return (

                            <Button className="deleteButton" danger
                                type="dashed"
                                onClick={() => editListCallback(deleteUl(i, dataList), typeName)}

                            >
                                {r} <CloseOutlined />
                            </Button>


                        )
                    })}

                    <div>

                        <Dropdown overlay={updateOptionsMenuCallBack()}>
                            <Button
                                type="dashed"
                                onClick={() => { }}
                                style={{ width: '100%' }}
                            >
                                Добавить роль <PlusOutlined />
                            </Button>
                        </Dropdown>
                    </div>
                </ul>
            </Paragraph></Col>
        </Row>

    )
}

export default DataRow;
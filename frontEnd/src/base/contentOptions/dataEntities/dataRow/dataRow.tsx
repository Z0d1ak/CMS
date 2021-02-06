import React from 'react';
import { Row, Col } from 'antd';
import 'antd/dist/antd.css';
import './dataRow.css';
import {
    CloseOutlined,
    EditOutlined,
    PlusOutlined
} from '@ant-design/icons';
import {Dropdown, Menu, message, Typography} from "antd";
const { Paragraph } = Typography;


export interface IDataRowE {
    dataStr: string
    titleStr: string
    typeName:string
    editFieldCallback: (val:string,param:string) => void;
}

export interface IDataRowListE {
    dataList: string[]
    titleStr: string
    typeName:string
    editListCallback: (val:string[],param:string) => void;
}

export interface IDataRow {
    dataStr: string
    titleStr: string
}

export interface IDataRowList {
    dataList: string[]
    titleStr: string
}

export function DataRowEditable({dataStr, titleStr,typeName,editFieldCallback}: IDataRowE) {
    const [editableStr, setEditableStr] = React.useState(dataStr);
    return (
        <Row className="DataRow">
            <Col span={4} >
                <Paragraph className='DataRowTitle'>{titleStr}</Paragraph>
            </Col>
            <Col span={20}>
                <Paragraph className='DataRowData'editable={{
                maxLength: 40,
                icon: <EditOutlined />,
                tooltip: 'Изменить',
                onChange:(editableStr)=>{setEditableStr(editableStr);editFieldCallback(editableStr,typeName);},
            }}>
                    {editableStr}
                </Paragraph>
            </Col>
        </Row>
    )
}

export function DataRow({dataStr, titleStr}: IDataRow) {
    return (
        <Row className="DataRow">
            <Col span={4}><Paragraph className='DataRowTitle'>{titleStr}</Paragraph></Col>
            <Col span={4}><Paragraph className='DataRowData'>{dataStr}</Paragraph></Col>
        </Row>
    )
}

export function DataRowList({dataList, titleStr}: IDataRowList) {
    return (
        <Row className="DataRow">
            <Col span={4}><Paragraph className='DataRowTitle'>{titleStr}</Paragraph></Col>
            <Col span={6}><Paragraph className='DataRowList'>
                <ul>
                    {dataList.map((r, i) => {
                        return (<li>{r}</li> )
                    })}
                </ul>
            </Paragraph></Col>
        </Row>
    )
}


export function DataRowListEditable({dataList, titleStr,typeName,editListCallback}: IDataRowListE) {
    const [editableList, setEditableList] = React.useState(dataList);

    function deleteUl(id:number,list:string[]):string[] {
        let updateArray = [...list];
        updateArray.splice(id, 1);
        message.info(id);
        editListCallback(updateArray,typeName);
        return updateArray;
    }

    function addUl(el:string,list:string[]):string[] {
        let updateArray = [...list];
        updateArray.splice(list.length,0,el );
        editListCallback(updateArray,typeName);
        return updateArray;
    }

    function updateOptionsMenuCallBack():JSX.Element {
        let optList:string[]=["Конструктор","Дизайнер","Корова","Собака"]
        return <Menu>
            {optList.map((r, i) => {
                return (
                    <Menu.Item onClick={()=>setEditableList(addUl(r,dataList))}>
                        {r}
                    </Menu.Item>
                )
            })}
        </Menu>
    }

    return (
        <Row className="DataRow">
            <Col span={4}><Paragraph className='DataRowTitle'>{titleStr}</Paragraph></Col>
            <Col span={6}><Paragraph className='DataRowList'>
                <ul>
                    {editableList.map((r, i) => {
                        return (
                            <li>
                                {r} <CloseOutlined className='DeleteIcon' onClick={()=>setEditableList(deleteUl(i,dataList))}/>
                            </li>
                        )
                    })}
                    <div>
                        <Dropdown overlay={updateOptionsMenuCallBack()}>
                            <PlusOutlined className='AddIcon'/>
                        </Dropdown>
                    </div>
                </ul>
            </Paragraph></Col>
        </Row>

    )
}

export default DataRow;
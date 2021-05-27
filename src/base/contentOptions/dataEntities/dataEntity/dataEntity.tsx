import React from 'react';
import './dataEntity.css';
import 'antd/dist/antd.css';
import { Row, Col } from 'antd';
import { DataCard } from "../dataSubEntities/dataCard/dataCard";
import { paths } from '../../../../swaggerCode/swaggerCode';
import { Empty } from 'antd';
type updateCompany = paths["/api/Company"]["put"]["requestBody"]["content"]["text/json"]


export class DataEntity extends React.Component<{
    items: any[],
    loading: boolean,
    dataType: string,
    updateCallback: () => void,
    changeValueCallback: (val: any, type: string, callback: any) => void,
    updateDataCallback: (val: any) => void,
    deleteCallback: (val: string) => void
}, {}> {

    updateItem = (position: number, item: any) => {
        let buf = this.props.items;
        buf[position] = item;
        this.props.changeValueCallback(buf, "items", this.props.updateDataCallback(item))
    }

    deleteItem = (position: number) => {
        let buf = this.props.items;
        let objId: string = buf[position].id
        buf.splice(position, 1);
        this.props.changeValueCallback(buf, "items", this.props.deleteCallback(objId))
    }

    render() {

        return (
            <div>


                {
                    this.props.items.length !== 0 ?
                        this.props.items.map((d, i) => {
                            return (
                                <Row key={"Row" + i}>
                                    <Col span={1}></Col>
                                    <Col span={22}>
                                        <DataCard
                                            deleteItemCallback={this.deleteItem}
                                            updateItemCallback={this.updateItem}
                                            position={i}
                                            data={d}
                                            key={"DC" + i}
                                            loading={this.props.loading}
                                            dataType={this.props.dataType}

                                        />
                                    </Col>
                                    <Col span={1}></Col>
                                </Row>
                            )
                        })
                        : <Empty />
                }
            </div>
        );
    }
}


export default DataEntity;

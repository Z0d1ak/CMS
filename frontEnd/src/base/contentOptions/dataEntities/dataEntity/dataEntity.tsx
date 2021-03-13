import React from 'react';
import './dataEntity.css';
import 'antd/dist/antd.css';
import {Row, Col } from 'antd';
import {DataCard} from "../dataSubEntities/dataCard/dataCard";
import { paths } from '../../../../swaggerCode/swaggerCode';
type updateCompany=paths["/api/Company"]["put"]["requestBody"]["content"]["text/json"]


export class DataEntity extends React.Component<{
    items: any[],
    loading:boolean,
    dataType:string,
    updateCallback:()=>void,
    changeValueCallback:(val:any,type:string,callback:any)=>void,
    updateDataCallback:(val:any)=>void,
    deleteCallback:(val:string)=>void
    },{}> {
    
    updateItem=(position: number, item:{id:string,name:string})=>{
        let buf=this.props.items;
        buf[position]=item;
        this.props.changeValueCallback(buf,"items",this.props.updateDataCallback(item))
    }

    deleteItem=(position: number)=>{
        let buf=this.props.items;
        buf.splice(position, 1);
        this.props.changeValueCallback(buf,"items",this.props.deleteCallback(this.props.items[position].id))
    }

    render(){
        return(
           <div>
                {this.props.items.map((d, i) => {
                    return (
                        <Row key={"Row"+i}>
                            <Col span={1}></Col>
                            <Col span={22}>
                                <DataCard 
                                    deleteItemCallback={this.deleteItem}
                                    updateItemCallback={this.updateItem}
                                    position={i}
                                    data={d} 
                                    key={"DC"+i}
                                    loading={this.props.loading}
                                    dataType={this.props.dataType}
                                    
                                />
                            </Col>
                            <Col span={1}></Col>
                        </Row>
                    )
                })}
            </div>
        );
    }
}


export default DataEntity;

import React from 'react';
import './paginationEntity.css';
import 'antd/dist/antd.css';
import { Row, Col, Pagination } from 'antd';

/**
 * Класс компонента страниц, используют стандартный компонент ant design Pagination.
 * @param countItems Количество найденых объектов по критериям запроса.
 * @param onPageChange Колбек функции на смену стараницы.
 * @param onMaxItemsChange Колбек функции на смену колличества объектов, отображаемых на одной старнице.
 */
export class PaginationEntity extends React.Component<{
    countItems: number,
    onPageChange: (page: number, pageSize?: number | undefined) => void,
    onMaxItemsChange: (current: number, size: number) => void
}, {}> {

    render() {
        return (

            this.props.countItems !== 0 ?
                <Row className="paginationEntity">
                    <Col span={1}></Col>
                    <Col span={22}>
                        <Pagination defaultCurrent={1} defaultPageSize={10}
                            total={this.props.countItems} onChange={this.props.onPageChange}
                            onShowSizeChange={this.props.onMaxItemsChange} showSizeChanger
                            showTotal={total => `Total ${total} items`} />
                    </Col>
                    <Col span={1}></Col>
                </Row> : <div />
        );
    }
}


export default PaginationEntity;

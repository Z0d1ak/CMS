import React from 'react';
import './filterEntity.css';
import 'antd/dist/antd.css';
import { Row, Col } from 'antd';
import { SearchBox } from "../filterSubEntities/searchBox/searchBox"
import { SortBox } from "../filterSubEntities/sortBox/sortBox"
import { ChooseBox } from "../filterSubEntities/chooseBox/chooseBox"

/**
 * Класс компонента фильтров, для поиска объектов удовлетворяющих критериям.
 * @param updateCallback Колбек функции на обновление отображения страницы.
 * @param changeValueCallback Колбек функции на обновление значения переменой, в родительском компоненте.
 * @param SortDirection Текущая выбранная опция направления сортировки.
 * @param SortDirectionOptions Массив опций выпадающего меню направлений сортировки.
 * @param SortingColumn Текущая выбранная опция критериея сортировки.
 * @param SortingColumnOptions Массив опций выпадающего меню критериев сортировки.
 * @param option Массив текущих выбранных опций.
 * @param optionName Массив наименований пересенных, которым соотвествуют option, в родительском компоненте.
 * @param optionList Массив массивов опций выпадающего меню.
 * @param text Массив текстов перед компонентами, для визуального пояснения выбора.
 */

export class FilterEntity extends React.Component<{
    dataType: string,
    updateCallback: () => void
    changeValueCallback: (val: any, type: string, callback: () => void) => void
    SortDirection: string
    SortDirectionOptions: string[]
    SortingColumn: string
    SortingColumnOptions: string[]
    option: string[]
    optionName: string[]
    optionList: string[][]
    text: string[]
}, {}> {

    /*
      switch(this.props.dataType) { 
                case "article": { 
                 
                break; 
                } 
                case "employee": { 
                 
                break; 
                } 
                case "role": { 
                 
                    break; 
                } 
                case "company": { 
                 
                    break; 
                }
                case "task": { 
                 
                    break; 
                } 
                default: { 
                 
                break; 
                } 
            }
    */
    render() {
        return (
            <div className="filterEntity">
                <Row>
                    <Col span={1} />
                    <Col span={22}>
                        <SearchBox
                            updateCallback={this.props.updateCallback}
                            changeValueCallback={this.props.changeValueCallback}
                        />
                    </Col>
                    <Col span={1}></Col>
                </Row>
                <Row>
                    <Col span={1}></Col>
                    <Col span={22}>
                        <SortBox
                            SortDirection={this.props.SortDirection}
                            SortDirectionOptions={this.props.SortDirectionOptions}
                            SortingColumn={this.props.SortingColumn}
                            SortingColumnOptions={this.props.SortingColumnOptions}
                            updateCallback={this.props.updateCallback}
                            changeValueCallback={this.props.changeValueCallback}
                        />
                    </Col>
                    <Col span={1}></Col>
                </Row>

                {this.props.option.map((u, i) => {
                    return (
                        <Row key={"Row" + i}>
                            <Col span={1}></Col>
                            <Col span={22}>
                                <ChooseBox
                                    option={this.props.option[i]}
                                    optionName={this.props.optionName[i]}
                                    optionList={this.props.optionList[i]}
                                    text={this.props.text[i]}
                                    updateCallback={this.props.updateCallback}
                                    changeValueCallback={this.props.changeValueCallback}
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


export default FilterEntity;

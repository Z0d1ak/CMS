import React from 'react';
import './sortBox.css';
import 'antd/dist/antd.css';
import { Menu, Dropdown, Button, Space, Typography } from 'antd';


/**
 * Класс компонента для установки критерия сортировки и ее напрвления.
 * @param SortDirection Текущая выбранная опция направления сортировки.
 * @param SortDirectionOptions Массив опций выпадающего меню направлений сортировки.
 * @param SortingColumn Текущая выбранная опция критериея сортировки.
 * @param SortingColumnOptions Массив опций выпадающего меню критериев сортировки.
 * @param updateCallback Колбек функции на обновление отображения страницы.
 * @param changeValueCallback Колбек функции на обновление значения переменой, в родительском компоненте.
 */
export class SortBox extends React.Component<{
    SortDirection: string,
    SortDirectionOptions: string[],
    SortingColumn: string,
    SortingColumnOptions: string[],
    updateCallback: () => void,
    changeValueCallback: (val: any, type: string, callback: () => void) => void
}, {}> {

    /**
    * Функция генерирующая выпадающий список на основании props, для выбора направления сортировки.
    */
    SortDirectionGenerate = (): JSX.Element => {
        return <Menu>
            {this.props.SortDirectionOptions.map((u, i) => {
                if (u !== this.props.SortDirection) return (
                    <Menu.Item onClick={() => this.props.changeValueCallback(u, "SortDirection", this.props.updateCallback)} key={"SortDirection" + i}>
                        <Typography.Paragraph>
                            {u}
                        </Typography.Paragraph>
                    </Menu.Item>
                )
            })}
        </Menu>
    }


    /**
     * Функция генерирующая выпадающий список на основании props, для выбора критерия сортировки.
     */
    SortingColumnGenerate = (): JSX.Element => {
        return <Menu>
            {this.props.SortingColumnOptions.map((u, i) => {
                if (u !== this.props.SortingColumn) return (
                    <Menu.Item onClick={() => this.props.changeValueCallback(u, "SortingColumn", this.props.updateCallback)} key={"SortingColumn" + i}>
                        <Typography.Paragraph>
                            {u}
                        </Typography.Paragraph>
                    </Menu.Item>
                )
            })}
        </Menu>
    }


    render() {
        return (
            <Space size={5}>
                <Typography.Paragraph className="text"> Сортировать</Typography.Paragraph>
                <Dropdown overlay={this.SortingColumnGenerate} placement="bottomLeft">
                    <Button>{this.props.SortingColumn}</Button>
                </Dropdown>
                <Typography.Paragraph className="text">по</Typography.Paragraph>
                <Dropdown overlay={this.SortDirectionGenerate} placement="bottomLeft">
                    <Button>{this.props.SortDirection}</Button>
                </Dropdown>
            </Space>
        );
    }
}


export default SortBox;

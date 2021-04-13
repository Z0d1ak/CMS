import React from 'react';
import './chooseBox.css';
import 'antd/dist/antd.css';
import { Menu, Dropdown, Button, Space, Typography } from 'antd';


/**
 * Класс компонента выбора некой опции, для задания критерия поиска.
 * @param option Текущая выбранная опция.
 * @param optionName Наименование пересенной, которой соотвествуеют option, в родительском компоненте.
 * @param optionList Массив опций выпадающего меню.
 * @param text Текст перед компонентом, для визуального пояснения выбора.
 * @param updateCallback Колбек функции на обновление отображения страницы.
 * @param changeValueCallback Колбек функции на обновление значения переменой, которой соотвествуеют option, в родительском компоненте.
 */
export class ChooseBox extends React.Component<{
    option: string,
    optionName: string,
    optionList: string[],
    text: string,
    updateCallback: () => void,
    changeValueCallback: (val: any, type: string, callback: () => void) => void
}, {}> {


    /**
     * Функция генерирующая выпадающий список на основании props
     */
    optionGenerate = (): JSX.Element => {
        return <Menu>
            {this.props.optionList.map((u, i) => {
                if (u !== this.props.option) return (
                    <Menu.Item onClick={() => this.props.changeValueCallback(u, this.props.optionName, this.props.updateCallback)} key={this.props.optionName + i}>
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
                <Typography.Paragraph> {this.props.text}</Typography.Paragraph>
                <Dropdown overlay={this.optionGenerate} placement="bottomLeft">
                    <Button>{this.props.option}</Button>
                </Dropdown>
            </Space>
        );
    }
}

export default ChooseBox;

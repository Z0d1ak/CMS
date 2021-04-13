import React from 'react';
import './searchBox.css';
import 'antd/dist/antd.css';

import { Input } from 'antd';


/**
 * Класс компонента поля ввода для поиска, используют стандартный компонент ant design Input.Search.
 * @param updateCallback Колбек функции на обновление отображения страницы.
 * @param changeValueCallback Колбек функции на обновление значения переменой, в родительском компоненте. В данном случае QuickSearch.
 */
export class SearchBox extends React.Component<{
    updateCallback: () => void,
    changeValueCallback: (val: any, type: string, callback: () => void) => void
}, {}> {


    render() {
        return (
            <Input.Search
                placeholder="Искать"
                onSearch={(value: string) => this.props.changeValueCallback(value, "QuickSearch", this.props.updateCallback)}
                className={"searchBox"}
            />

        );
    }
}


export default SearchBox;

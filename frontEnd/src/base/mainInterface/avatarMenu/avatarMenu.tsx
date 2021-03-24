import React from 'react';
import 'antd/dist/antd.css';
import './avatarMenu.css';
import { Menu } from 'antd';
import {
    Link,
    Route
} from "react-router-dom";
import { Dropdown } from 'antd';
import { Avatar } from 'antd';
import {
    UserOutlined
} from '@ant-design/icons';

/**
 * Интерфейс для построения меню.
 * @param text Текст-пояснение опции
 * @param link Ссылка в рамках React Router.
 */
interface menuOpt {
    text: string;
    link: string;
}

/**
 * Массив опций меню
 */
const avatarMenuContent: Array<menuOpt> = [
    { text: "Профиль", link: "/profile" },
    { text: "Настройки", link: "/settings" },
    { text: "Выход", link: "/login" },
];


/**
 * Сбор всех ссылок для React-router, для родительского компонента
 */
export function getLinksAvatarMenu() {
    return (
        avatarMenuContent.map((r, i) => {
            return (
                <Route path={r.link} key={"al" + i}>

                </Route>
            )
        })
    );
};


/**
 * Генерирует компонент меню на основе масива
 */
function generateMenu() {
    return (
        avatarMenuContent.map((r, i) => {
            return (
                <Menu.Item key={i + "am"}>
                    <Link to={r.link}>{r.text}</Link>
                </Menu.Item>
            )
        }
        ));
};


/**
 * Компонент меню при значке аватара.
 */
export class AvatarMenu extends React.Component<{}, {}> {

    render() {
        return (

            <Dropdown overlay={
                <Menu>
                    {generateMenu()}
                </Menu>
            } placement="bottomLeft">
                <Avatar className="userBox" size={40} icon={<UserOutlined />} />
            </Dropdown>
        );
    }
}

export default { getLinksAvatarMenu, AvatarMenu };


import React from 'react';
import 'antd/dist/antd.css';
import './leftMenu.css';
import { Layout, Menu } from 'antd';
import {
    UsbOutlined,
    SnippetsOutlined,
    IdcardOutlined,
    AreaChartOutlined,
    BankOutlined,
    FunctionOutlined
} from '@ant-design/icons';

import {
    Link,
    Route
} from "react-router-dom";


import Employees from "../../contentOptions/employee/employee"
import Company from "../../contentOptions/company/company"
import Article from "../../contentOptions/article/article"
import Infographic from "../../contentOptions/infographics/infographics"
import Task from "../../contentOptions/task/task"
import Role from '../../contentOptions/role/role';
import { getUser} from "../../../const/shared"
import {MediaSources} from "../../../mediasources/mediaSources"




/**
 * Интерфейс для построения меню.
 * @param text Текст-пояснение к иконке
 * @param link Ссылка в рамках React Router.
 * @param icon Иконка.
 * @param component Генерируемый по нажатию компонент в поле Content в Layout.
 */
interface menuOpt {
    text: string;
    link: string;
    icon: JSX.Element;
    component: JSX.Element;
}

/**
 * Массив опций меню
 */
const leftMenuContent: Array<menuOpt> = [
    //{ text: "Статьи", link: "/home/inwork", icon: <SnippetsOutlined />, component: < Article /> }
    //{ text: "Компании", link: "/home/company", icon: <BankOutlined />, component: <Company /> },
    //{ text: "Роли", link: "/home/role", icon: <FunctionOutlined />, component: <Role /> },
    //{ text: "Сотрудники", link: "/home/emplo", icon: <IdcardOutlined />, component: <Employees /> },
    //{ text: "Инфографика", link: "/home/info", icon: <AreaChartOutlined />, component: <Infographic /> }
];


/**
 * Сбор всех ссылок для React-router, для родительского компонента
 */
export function getLinksLeftMenu() {
    return (
        getMenuOpt().map((r, i) => {
            return (
                <Route path={r.link} key={"ll" + i} >
                    {r.component}
                </Route>
            )
        })
    );
};

function getMenuOpt(){
    let menu = [...leftMenuContent]
    var user = getUser();
    if(!user.roles.includes("SuperAdmin")){
        menu.push({ text: "Статьи", link: "/home/inwork", icon: <SnippetsOutlined />, component: < Article /> })
    }

    if(user.roles.includes("ChiefRedactor")){
        menu.push({ text: "Сотрудники", link: "/home/emplo", icon: <IdcardOutlined />, component: <Employees /> })
        menu.push({ text: "Инфографика", link: "/home/info", icon: <AreaChartOutlined />, component: <Infographic /> })
    }
    if(user.roles.includes("CompanyAdmin")){
        menu.push({ text: "Сотрудники", link: "/home/emplo", icon: <IdcardOutlined />, component: <Employees /> })
        //menu.push({ text: "Инфографика", link: "/home/info", icon: <AreaChartOutlined />, component: <Infographic /> })
        menu.push({ text: "Роли", link: "/home/role", icon: <FunctionOutlined />, component: <Role /> })
        menu.push({ text: "Платформы", link: "/home/media", icon: <FunctionOutlined />, component: <MediaSources /> })        
    }
    if(user.roles.includes("SuperAdmin")){
        menu.push({ text: "Компании", link: "/home/company", icon: <BankOutlined />, component: <Company /> })
        menu.push({ text: "Сотрудники", link: "/home/emplo", icon: <IdcardOutlined />, component: <Employees /> })
    }
    return menu
}   
/**
 * Генерирует компонент меню на основе масива
 */
function generateMenu() {
    return (<Menu theme="dark" mode="inline" defaultSelectedKeys={['2']}>
        {getMenuOpt().map((r, i) => {
            return (
                <Menu.Item key={i + "lm"} icon={r.icon}>
                    <Link to={r.link}>{r.text}</Link>
                </Menu.Item>
            )
        })}
    </Menu>);
};

/**
 * Компонент левого меню.
 * @param collapsed Состояние меню (расшиернное/суженное)
 */
export class LeftMenu extends React.Component<{ collapsed: boolean }, {}> {
    render() {
        return (
            <Layout.Sider trigger={null} collapsible collapsed={this.props.collapsed}>
                <div className="logo" />
                {generateMenu()}
            </Layout.Sider>
        );
    }
}

export default { getLinksLeftMenu, LeftMenu };


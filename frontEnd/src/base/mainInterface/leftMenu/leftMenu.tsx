import React from 'react';
import 'antd/dist/antd.css';
import './leftMenu.css';
import {Layout, Menu} from 'antd';
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




/**
 * Интерфейс для построения меню.
 * @param text Текст-пояснение к иконке
 * @param link Ссылка в рамках React Router.
 * @param icon Иконка.
 * @param component Генерируемый по нажатию компонент в поле Content в Layout.
 */
interface menuOpt {
    text:string;
    link:string;
    icon:JSX.Element;
    component:JSX.Element;
}

/**
 * Массив опций меню
 */
const leftMenuContent: Array<menuOpt> = [ 
    {text:"В работе",link:"/home/inwork", icon:<UsbOutlined/>,component: <Task/>},
    {text:"Статьи",link:"/home/alltexts", icon:<SnippetsOutlined />,component:< Article/>},
    {text:"Компании",link:"/home/company", icon:<BankOutlined />,component: <Company/>},
    {text:"Роли",link:"/home/role", icon:<FunctionOutlined />,component:<Role/>},
    {text:"Сотрудники",link:"/home/emplo", icon:<IdcardOutlined />,component:<Employees/>},
    {text:"Инфографика",link:"/home/info", icon:<AreaChartOutlined />,component:<Infographic/>}
];  


/**
 * Сбор всех ссылок для React-router, для родительского компонента
 */
export function getLinksLeftMenu() {
    return (
        leftMenuContent.map((r, i) => {
            return (
                <Route path={r.link}  key={"ll"+i} >
                    {r.component}
                </Route>
            )
        })
    );
};


/**
 * Генерирует компонент меню на основе масива
 */
function generateMenu() {
    return (<Menu theme="dark" mode="inline" defaultSelectedKeys={['2']}>
        {leftMenuContent.map((r, i) => {
            return (
                <Menu.Item key={i+"lm"} icon={r.icon}>
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
export class LeftMenu extends React.Component<{collapsed:boolean},{}> {
    render() {
        return (
                <Layout.Sider trigger={null} collapsible collapsed={this.props.collapsed}>
                    <div className="logo" />
                    {generateMenu()}
                </Layout.Sider>
        );
    }
}

export default {getLinksLeftMenu,LeftMenu}; 


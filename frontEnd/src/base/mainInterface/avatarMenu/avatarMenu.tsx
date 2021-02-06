import React from 'react';
import 'antd/dist/antd.css';
import './avatarMenu.css';
import { Menu} from 'antd';
import {
    Link,
    Route
  } from "react-router-dom";
  import {Dropdown} from 'antd';
import {Avatar} from 'antd';
import {
    UserOutlined
} from '@ant-design/icons';


interface menuOpt {
    text:string;
    link:string;
}

const avatarMenuContent: Array<menuOpt> = [ 
    {text:"Профиль",link:"/home/profile"},
    {text:"Настройки",link:"/home/settings"},
    {text:"Выход",link:"/login"},
];  

export function getLinksAvatarMenu() {
    return (
        avatarMenuContent.map((r, i) => {
            return (
                <Route path={r.link} >

                </Route>
            )
        })
    );
};

function generateMenu() {
    return (
        avatarMenuContent.map((r, i) => {
            return (
                <Menu.Item key={i+"am"}>
                    <Link to={r.link}>{r.text}</Link>
                </Menu.Item>
            )
        }
    ));
};

export class AvatarMenu extends React.Component<{},{}> {

    render() {
        return (
            
            <Dropdown overlay={
                <Menu>
                   {generateMenu()}
                </Menu>
            } placement="bottomLeft">
                <Avatar className="userBox" size={40} icon={<UserOutlined />}/>
            </Dropdown>
             );
    }
}

export default {getLinksAvatarMenu,AvatarMenu}; 


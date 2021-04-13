import React from 'react';
import 'antd/dist/antd.css';
import './mainPart.css';
import { Layout } from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined
} from '@ant-design/icons';

import {
    Switch,
} from "react-router-dom";

import { LeftMenu, getLinksLeftMenu } from "../leftMenu/leftMenu"
import { getLinksAvatarMenu, AvatarMenu } from "../avatarMenu/avatarMenu"
import { BackTop } from "antd";


/**
 * Класс компонента основания отображения (одинаковой части), используют стандартный компонент ant design Layout и его побочные компоненты
 */
export class MainPart extends React.Component<{}, {}> {
    state = {
        collapsed: false,
        contentBox: null
    };

    /**
     * Метод для сужения/расширения бокового меню 
     * collapsed=true => меню свернуто
    */
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    /**
     * Вызывает методы получения ссылок в рамках React Router относительно каждого меню (AvatarMenu, LeftMenu)
     */
    getLinks() {
        return (
            <Switch>
                {getLinksAvatarMenu()}
                {getLinksLeftMenu()}
            </Switch>
        );
    };



    render() {
        return (
            <Layout className="whole-layout">
                <LeftMenu collapsed={this.state.collapsed} />
                <Layout className="site-layout">
                    <Layout.Header className="site-layout-background" style={{ padding: 0 }}>
                        {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                            className: 'trigger',
                            onClick: this.toggle,
                        })}
                        <AvatarMenu />
                    </Layout.Header>
                    <Layout.Content
                        className="site-layout-background"
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                        }}
                    >
                        {this.getLinks()}
                        <BackTop>
                            <div className="BackUp">Вверх</div>
                        </BackTop>
                    </Layout.Content>
                </Layout>
            </Layout>
        );
    }
}

export default MainPart;


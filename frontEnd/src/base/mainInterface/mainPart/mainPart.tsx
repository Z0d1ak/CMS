import React from 'react';
import 'antd/dist/antd.css';
import './mainPart.css';
import {Layout} from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined
} from '@ant-design/icons';

import {
      Switch,
  } from "react-router-dom";

import {LeftMenu,getLinksLeftMenu} from "../leftMenu/leftMenu"
import {getLinksAvatarMenu,AvatarMenu} from "../avatarMenu/avatarMenu"
import {BackTop} from "antd";
const { Header, Content } = Layout;




export class MainPart extends React.Component<{},{}> {
    state = {
        collapsed: false,
        contentBox:<div></div>
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

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
            <Layout>
                <LeftMenu collapsed={this.state.collapsed}/>
                <Layout className="site-layout">
                    <Header className="site-layout-background" style={{ padding: 0 }}>
                        {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                            className: 'trigger',
                            onClick: this.toggle,
                        })}
                        <AvatarMenu/>
                    </Header>
                    <Content
                        className="site-layout-background"
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: 280,
                        }}
                    >
           
                        {this.getLinks()}

                        <BackTop>
                            <div className="BackUp">Вверх</div>
                        </BackTop>
                    </Content>
                </Layout>
            </Layout>  
        );
    }
}

export default MainPart;


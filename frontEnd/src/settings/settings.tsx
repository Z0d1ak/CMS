import React from 'react';
import './settings.css';
import 'antd/dist/antd.css';
import {Layout,BackTop,Row,Col,Button} from 'antd';
import {
    RollbackOutlined,
    CloseOutlined,
    PlusOutlined
} from '@ant-design/icons';
import {
    Link,
    Route,
    withRouter
  } from "react-router-dom";

  import {useHistory} from "react-router-dom";
  import {Dropdown, Menu, message, Typography,Space} from "antd";
const { Paragraph } = Typography;
  
/**
 * Класс компонента настроек пользователя
 */
export class Settings extends React.Component<{},{}> {


       render() {
        
        return(
            
            <Layout className="site-layout whole-layout">
            <Layout.Header className="site-layout-background" style={{ padding: 0 }}>

            </Layout.Header>
            <Layout.Content
                        className="site-layout-background"
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                        }}
                    >
                        <Row gutter={[0, 48]}>
                            <Col span={1}></Col>
                        </Row>
                        <Row gutter={[0, 48]}>
                            <Col span={1}></Col>
                            
                            <Link to="/home/inwork">
                        <Button icon={<RollbackOutlined style={{ fontSize: '20px'}}/>} onClick={() =>{ 
                            console.log("back");
                        }}>
                        
                        
                        </Button>
                        </Link>
                        </Row>
                        <Row>
                            <Col span={1}></Col>
                            Здесь будет настройки сервиса
                        </Row>
                        <Row>
                            <Col span={1}></Col>
                            <RolesList data={["a","b","c","d"]}></RolesList>
                        </Row>
                        <BackTop>
                            <div className="BackUp">Вверх</div>
                        </BackTop>
                    </Layout.Content>
            </Layout>
            );

    }
}

export class RolesList extends React.Component<{data:string[]},{}> {

    state=
    {
        data:this.props.data
    }

    deleteUl(id:number):string[] {
        console.log("del"+id);
        let updateArray = [...this.state.data];
        updateArray.splice(id, 1);
        console.log(updateArray);
        this.setState({data:updateArray});
        return updateArray;
    }

    addUl(el:string):string[] {
        console.log("add"+el);
        let updateArray = [...this.state.data];
        updateArray.splice(this.state.data.length,0,el );
        console.log(updateArray);
        this.setState({data:updateArray});
        return updateArray;
    }

    updateOptionsMenuCallBack():JSX.Element {
        let optList:string[]=["SuperAdmin","CompanyAdmin","ChiefRedactor","Redactor","Author","Corrector"]
        return <Menu>
            {optList.map((r, i) => {
                if(this.state.data.indexOf( r ) == -1 )
                return (
                    
                    <Menu.Item onClick={()=>this.addUl(r)}>
                        {r}
                    </Menu.Item>
                )
            })}
        </Menu>
        
    }

    render() {
     
     return(
        <div>
            {this.state.data.map((d, i) => {
                return (
                <Button  key={i+"dl"} className="deleteButton" danger
                                    type="dashed"
                                    onClick={()=>this.deleteUl(i)}
                  >
                        {d} <CloseOutlined />
                </Button>
                )
            })}
            <Dropdown overlay={this.updateOptionsMenuCallBack()}>
            <Button
                type="dashed"
                onClick={() => {}}
                style={{ width: '100%' }}
                >
                Добавить роль <PlusOutlined />
              </Button>
            </Dropdown>
        </div>
     ); 
    }
}

export default Settings;


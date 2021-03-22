import React from 'react';
import './redactor.css';
import 'antd/dist/antd.css';
import { useDrag } from 'react-dnd'
import { useDrop } from 'react-dnd'
import {Form, Input, Button, Checkbox, Col, Row,notification,Card,Table,Divider,Typography,Image,Carousel} from 'antd';
import {HTML5Backend} from "react-dnd-html5-backend";
import { DndProvider} from "react-dnd";
import { useState } from 'react';
import { isThisTypeNode } from 'typescript';
import Grid from 'antd/lib/card/Grid';
import Item from 'antd/lib/list/Item';
import Paragraph from 'antd/lib/skeleton/Paragraph';
import{DataRowEditable} from "../base/contentOptions/dataEntities/dataSubEntities/dataRow/dataRow"
import {
    DeleteOutlined,
    CheckOutlined,
    CloseOutlined,
    CaretLeftOutlined,
    CaretRightOutlined,
    VerticalLeftOutlined,
    VerticalRightOutlined,
    EditOutlined 
} from '@ant-design/icons';
import axios from 'axios'
import { OmitProps } from 'antd/lib/transfer/ListBody';
import { paths } from '../swaggerCode/swaggerCode';

type getArticle=paths["/api/Article/{id}"]["get"]["responses"]["200"]["content"]["application/json"]
type deleteArticle=paths["/api/Article/{id}"]["delete"]["parameters"]["path"]
type updateArticle=paths["/api/Article"]["put"]["requestBody"]["content"]["text/json"]
type addArticle=paths["/api/Article"]["post"]["requestBody"]["content"]["text/json"]


//Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiI1MWE4YjZmZC0wYWEwLTQ5MWUtOWMzNC1hZGRiZGZlNDgzMjQiLCJDb21wYW55SWQiOiJmZjA4Y2IzMS05YzBhLTQ1N2EtYTljNC0wNWYwNjZlMzAxYjUiLCJyb2xlIjoiQ29tcGFueUFkbWluIiwibmJmIjoxNjE2NDQ2NzYwLCJleHAiOjE2MTkwMzg3NjAsImlhdCI6MTYxNjQ0Njc2MH0.YbQtvyJpgWS6_V0k0dDtaEgJMut2v0JDT5TPeKEGWfzJ4c9U9C7DYmJjKmKqIw4J-hrldmyykeB4tB0AYm1xRw
//Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiJmMDdjM2E5My04MTU2LTRhZDAtOWY5ZC1iOTYyY2Q0MWI4ODEiLCJDb21wYW55SWQiOiJmZjA4Y2IzMS05YzBhLTQ1N2EtYTljNC0wNWYwNjZlMzAxYjUiLCJyb2xlIjoiQ2hpZWZSZWRhY3RvciIsIm5iZiI6MTYxNjQ0Njg4NywiZXhwIjoxNjE5MDM4ODg3LCJpYXQiOjE2MTY0NDY4ODd9.IU5baTAuSnm96nFmg81eTgNqjf1sH7wsdbxhF4mXP0KWYA9dK3F4mdHS_IwBPxcgNRnvnqfCexWVBqYirU9KJg

export class Redactor extends React.Component<{id:string},{    
    
}> {

    state={
        dataType:"Redactor",
        requestUrl:"https://hse-cms.herokuapp.com",
        requestPath:"/api/Article/",
        loading:false,
        article:{
            id:"",
            title:"",
            content:'[[{"x":0,"y":0,"width":1,"content":null,"cOpt":null,"cOptVal":null},{"x":1,"y":0,"width":1,"content":null,"cOpt":null,"cOptVal":null},{"x":2,"y":0,"width":1,"content":null,"cOpt":null,"cOptVal":null},{"x":3,"y":0,"width":1,"content":null,"cOpt":null,"cOptVal":null},{"x":4,"y":0,"width":1,"content":null,"cOpt":null,"cOptVal":null},{"x":5,"y":0,"width":1,"content":null,"cOpt":null,"cOptVal":null},{"x":6,"y":0,"width":1,"content":null,"cOpt":null,"cOptVal":null},{"x":7,"y":0,"width":1,"content":null,"cOpt":null,"cOptVal":null},{"x":8,"y":0,"width":1,"content":null,"cOpt":null,"cOptVal":null},{"x":9,"y":0,"width":1,"content":null,"cOpt":null,"cOptVal":null},{"x":10,"y":0,"width":1,"content":null,"cOpt":null,"cOptVal":null},{"x":11,"y":0,"width":1,"content":null,"cOpt":null,"cOptVal":null},{"x":12,"y":0,"width":1,"content":null,"cOpt":null,"cOptVal":null},{"x":13,"y":0,"width":1,"content":null,"cOpt":null,"cOptVal":null},{"x":14,"y":0,"width":1,"content":null,"cOpt":null,"cOptVal":null},{"x":15,"y":0,"width":1,"content":null,"cOpt":null,"cOptVal":null},{"x":16,"y":0,"width":1,"content":null,"cOpt":null,"cOptVal":null},{"x":17,"y":0,"width":1,"content":null,"cOpt":null,"cOptVal":null},{"x":18,"y":0,"width":1,"content":null,"cOpt":null,"cOptVal":null},{"x":19,"y":0,"width":1,"content":null,"cOpt":null,"cOptVal":null},{"x":20,"y":0,"width":1,"content":null,"cOpt":null,"cOptVal":null},{"x":21,"y":0,"width":1,"content":null,"cOpt":null,"cOptVal":null},{"x":22,"y":0,"width":1,"content":null,"cOpt":null,"cOptVal":null},{"x":23,"y":0,"width":1,"content":null,"cOpt":null,"cOptVal":null}]]'
        }
    }

    updateCallback=(content:string)=>{
        let buf=this.state.article;
        buf.content=content;
        this.setState({article:buf})
    }
    

    updateData=(val:string)=>{
        let buf={
            id: this.state.article.id,
            title: this.state.article.title,
            content: val
          }
        axios.put(this.state.requestUrl+this.state.requestPath,buf,
        {
            headers: {
                "Authorization": "Bearer "+sessionStorage.getItem("AuthUserSecurityToken")
            }
        })
        .then(res => {
            notification.success({
                message: 'Данные успешно обновлены',
                description:
                  'Данные статьи с id:'+buf.id+" были успешно обновлены",
              });
        })
        .catch(err => {  
        console.log(err); 
        switch(err.response.status)
            {
                case 401:{
                    notification.error({
                        message: 'Ошибка '+ err.response.status,
                        description:
                        "Ошибка авторизации"
                      });
                    break;
                }
                case 403:{
                    notification.error({
                        message: "Ошибка"+ err.response.status,
                        description:
                        "Недостаточно прав для изменения данных статьи",
                      });
                    break;
                }
                case 404:{
                    notification.error({
                        message: "Ошибка"+ err.response.status,
                        description:
                          'Статья с id:'+buf.id+" не найдена",
                      });
                    break;
                }
                case 409:{
                    notification.error({
                        message: 'Ошибка '+ err.response.status,
                        description:
                          "Конфликт данных, убедитесь что данные корректны и не дублируют существующие"
                      }); 
                    break;
                }
                default:{
                    notification.error({
                        message: 'Ошибка '+ err.response.status,
                        description:
                          "Неопознанная ошибка"
                      });
                    break;
                }
            }
        })
        
    }

    update(){ 
        this.setState({loading:true});
        let request:string=this.props.id;
      
        axios.get(
            this.state.requestUrl+this.state.requestPath+request,
            {
                headers: {
                    "Authorization": "Bearer "+sessionStorage.getItem("AuthUserSecurityToken")
                }
            }
        )
        .then(res => {
            console.log(res);
            this.setState({article:res.data});
        })
        .catch(err => {  
            switch(err.response.status)
            {
                case 401:{
                    console.log("401"); 
                    break;
                }
                default:{
                    console.log("Undefined error"); 
                    break;
                }
            }
        })
    }

 

    render() {
        console.log(JSON.parse(this.state.article.content));
        return(
            <DndProvider backend={HTML5Backend}>
          
        <Row>
        <Col span={1}></Col>
            <Col span={22} >
            <DataBlock/>
            </Col>
            <Col span={1}></Col>
        </Row>

         <Row >
            <Col span={1}></Col>
            <Col span={16}>
            <ArticleBlock rows={5} cels={24}  updateCallback={this.updateCallback} save={this.updateData} gridArticle={this.state.article.content=="null"||this.state.article==null?null:JSON.parse(this.state.article.content)}/>
            </Col>
            <Col span={6}>
            <OptionsBlock/>
            </Col>
            <Col span={1}></Col>
        </Row>
 
    
        
        </DndProvider>
        );
        
    }
    componentDidMount() {
        this.update();
    }
}



  

export class DataBlock extends React.Component<{},{}> {

    render() {
        return(
            <Card className="dataPoolTop" title="Задание">
            content
            
        </Card>
        );
    }
}





export class TextBlock extends React.Component<{
    styleTypes:string[]
    styleValues:string[]
},{}> {



    render() {
        return(
            <Typography.Paragraph className={"grey"} 
            style={{ [this.props.styleTypes[1]]: this.props.styleValues[1],
            [this.props.styleTypes[2]]: this.props.styleValues[2]
        }}>{this.props.styleValues[0]}</Typography.Paragraph>
        );
    }
}


export class ImgBlock extends React.Component<{
    styleTypes:string[],
    styleValues:string[]
},{}> {



    render() {
        return(
            <Image className={"grey"} 
            src={this.props.styleValues[0]}
            style={{ [this.props.styleTypes[1]]: this.props.styleValues[1]+"px",
            [this.props.styleTypes[2]]: this.props.styleValues[2]+"px"
        }}></Image>
        );
    }
}


export class OptionsBlock extends React.Component<{},{}> {
    render() {
        return(
            <Card className="partsPoolright">
               <BlockImg name={"text"}/>
               <BlockImg name={"img"}/>
            </Card>
        );
    }
}


const ItemTypes = {
    OPTION: 'option',
}


function BlockImg(props:{ name:string}) {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: ItemTypes.OPTION,
        collect: (monitor) => ({
          isDragging: !!monitor.isDragging()
        }),
        item:{name:props.name}
      }))

    return(
        <div ref={drag} className="test">{props.name}</div>
    );
}












function Instuments(props:{ 
    cOpt:string[],
    cOptVal:string[],
    delete:()=>void, 
    edit:()=>void,
    mvR:()=>void,
    mvL:()=>void,
    aR:()=>void,
    rR:()=>void,
    aL:()=>void,
    rL:()=>void,
    changeOption:(newOptVal:string[])=>void
}
    ) {
        const [visible, setVisible] = useState(false);

    return(
        <>
        <DeleteOutlined className={"deleteButton buttonStyle"} onClick={props.delete}/>
        <EditOutlined className={"editButton buttonStyle"} onClick={()=>setVisible(!visible)}/>
        <CaretRightOutlined className={"moveRightButton buttonStyle"} onClick={props.mvR}/>

        <CaretLeftOutlined className={"moveLeftButton buttonStyle"} onClick={props.mvL}/>

        <VerticalLeftOutlined className={"addRightButton buttonStyle"} onClick={props.aR}/>
        <VerticalRightOutlined className={"reduceRightButton buttonStyle" }onClick={props.rR}/>
        <VerticalRightOutlined className={"addLeftButton buttonStyle"}onClick={props.aL}/>
        <VerticalLeftOutlined className={"reduceLeftButton buttonStyle"}onClick={props.rL}/>
        <Settings changeOption={props.changeOption} visible={visible} cOpt={props.cOpt} cOptVal={props.cOptVal}></Settings>
        </>
    );
}

function Settings(props:{visible:boolean ,
    cOpt:string[],
    cOptVal:string[],
    changeOption:(newOptVal:string[])=>void
}
    ) {



    return(
        props.visible?
        <Card className={"settingsForm"} onClick={()=>{/*console.log(props.cOpt)*/}}>
            {props.cOptVal.map((r,i)=>{
               return(<DataRowEditable dataStr={props.cOptVal[i]} titleStr={props.cOpt[i]+":"} typeName={""+i} 
               editFieldCallback={(val: string, param: string)=>editFieldCallback(val,param,props.cOptVal,props.changeOption)}/>)
            })}
        </Card>:
        <></>
    );
}

function editFieldCallback(val: string, param: string, cOptVal:string[],changeOption:(newOptVal:string[])=>void){

    let buf:string[]=cOptVal;
    var i: number = +param;
    buf[i]=val;
    changeOption(buf);
    
}

function Cell(props:{x:number,y:number,width:number,
    content:string|null,
    cOpt:string[]|null,
    cOptVal:string[]|null,
    edit:()=>void,
    mvR:(x:number,y:number)=>void,
    mvL:(x:number,y:number)=>void,
    aR:(x:number,y:number)=>void,
    rR:(x:number,y:number)=>void,
    aL:(x:number,y:number)=>void,
    rL:(x:number,y:number)=>void,
    delete:(x:number,y:number)=>void, 
    insert:(x:number,y:number,item:string, cOpt:string[], cOptVal:string[])=>void, 
    changeOption:(x:number,y:number,newOptVal:string[])=>void
}) {


    const [{ isOver }, drop] = useDrop(
        () => ({
          accept: "option",
          drop: (item:{name:string}) => {
              //console.log(item)
              switch(item.name) {
                case 'text':
                    props.insert(props.x,props.y,"text",["text","font-size","color"],["text","6px","green"])
                    break;
                case 'img':
                    props.insert(props.x,props.y,"img",["img","width","height"],["https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png","100px","150px"])
                    break;
                  default:
                    break;
              }
              
          },
          collect: (monitor) => ({
            isOver: !!monitor.isOver()
          }),
          hover:(item)=>{

          }
          
        })
      )

    const [visible, setVisible] = useState(true);

    return(
        
        <Col span={props.width}>
            <div  ref={drop} className="redactorCell" onClick={()=>{if(props.content!=null)setVisible(!visible);}}><>
            {(() => {
          //console.log(props.content);
          switch(props.content) {
          case 'text':
              return (<TextBlock  styleTypes={props.cOpt!} styleValues={props.cOptVal!}/>)
          case 'img':
              return(<ImgBlock  styleTypes={props.cOpt!} styleValues={props.cOptVal!}/>)
            default:
              return(<></>)
          }
        })()}
            
            
            </>
         </div>
         {props.content!==null&&visible?<Instuments
            edit={props.edit}
            mvR={()=>{props.mvR(props.x,props.y)}}
            mvL={()=>{props.mvL(props.x,props.y)}}
            aR={()=>{props.aR(props.x,props.y)}}
            rR={()=>{props.rR(props.x,props.y)}}
            aL={()=>{props.aL(props.x,props.y)}}
            rL={()=>{props.rL(props.x,props.y)}}
            delete={()=>{props.delete(props.x,props.y)}}
            cOpt={props.cOpt!}
            cOptVal={props.cOptVal!}
            changeOption={(newOptVal:string[])=>props.changeOption(props.x,props.y,newOptVal)}
            />:<></>}
        </Col>
        
    
    );
}


    type cel={
        x:number,
        y:number,
        width:number,
        content:string|null,
        cOpt:string[]|null,
        cOptVal:string[]|null
    }



    export class ArticleBlock extends React.Component<{rows:number,  updateCallback:(content:string)=>void, cels:number, gridArticle:cel[][]|null, save:(val:string)=>void},{
        rows:number,
            cels:number,
            grid:cel[][],

    }> {

        changeOption=(x:number,y:number,newOptVal:string[])=>{
            this.setState({grid:this.props.gridArticle!})
            let buf:cel[][]=this.state.grid;
            buf[y][x].cOptVal=newOptVal;
            this.setState({grid:buf})
            this.props.updateCallback(JSON.stringify(this.state.grid));
        }

        updRowVals=(y:number)=>{
            this.setState({grid:this.props.gridArticle!})
            let buf:cel[][]=this.state.grid;
            for (var j = 0; j < this.state.grid[y].length; j++) {
            
                buf[y][j].x=j;
                buf[y][j].y=y;
            }
            this.setState({grid:buf})
            this.props.updateCallback(JSON.stringify(this.state.grid));
        }

        delete=(x:number,y:number)=>{
            this.setState({grid:this.props.gridArticle!})
            console.log("delete");
            console.log(x+":"+y);
            let buf:cel[][]=this.state.grid;
            let bufw=this.state.grid[y][x].width;
            buf[y].splice(x,1);
            for(let i=0;i< bufw;i++)
            {
                let zel={
                    x:x+i,
                    y:y,
                    width: 1,
                    content: null,
                    cOpt:null,
                    cOptVal:null
                }
                buf[y].splice(x+i,0,zel);
            }
            this.setState({grid:buf})
            this.updRowVals(y);
            this.props.updateCallback(JSON.stringify(this.state.grid));
        } 
        edit=()=>{
            console.log("edit");
        }
        mvR=(x:number,y:number)=>{
            this.setState({grid:this.props.gridArticle!})
            console.log("mvR");
            console.log(x+":"+y);
            if(x+1<this.state.grid[y].length){
            let buf:cel[][]=this.state.grid;
            let gridel1:cel=buf[y][x+1];
            gridel1.x=x;
            let gridel2:cel=buf[y][x];
            gridel2.x=x+1;
            buf[y][x]=gridel1;
            buf[y][x+1]=gridel2;
            this.setState({grid:buf})
            }
            this.updRowVals(y);
            this.props.updateCallback(JSON.stringify(this.state.grid));
        }
        mvL=(x:number,y:number)=>{
            this.setState({grid:this.props.gridArticle!})
            console.log("mvL");
            console.log(x+":"+y);
            if(x>0){
                let buf:cel[][]=this.state.grid;
                let gridel1:cel=buf[y][x-1];
                gridel1.x=x;
                let gridel2:cel=buf[y][x];
                gridel2.x=x-1;
                buf[y][x]=gridel1;
                buf[y][x-1]=gridel2;
                this.setState({grid:buf})
                }
                this.updRowVals(y);
                this.props.updateCallback(JSON.stringify(this.state.grid));
        }
        aR=(x:number,y:number)=>{
            this.setState({grid:this.props.gridArticle!})
            console.log("ar");
            console.log(x+":"+y);
            if(x+1<this.state.grid[y].length)
            if(this.state.grid[y][x+1].content==null){
                let buf:cel[][]=this.state.grid;
                let gridel:cel=buf[y][x];
                gridel.width=gridel.width+1;
                buf[y].splice(x,2,gridel);  
                this.setState({grid:buf})
            }
                this.updRowVals(y);
                this.props.updateCallback(JSON.stringify(this.state.grid));
        }
        rR=(x:number,y:number)=>{
            this.setState({grid:this.props.gridArticle!})
            console.log("rr");
            console.log(x+":"+y);
            if(this.state.grid[y][x].width>1){
                let buf:cel[][]=this.state.grid;
                let gridel:cel=buf[y][x];
                    gridel.width=gridel.width-1;
                    gridel.x=gridel.x;
                    let el:cel={
                        x:x,
                        y:y,
                        width:1,
                        content:null,
                        cOpt:null,
                        cOptVal:null
                    }
                    buf[y].splice(x,1,gridel,el);  
                this.setState({grid:buf})
                }
                this.updRowVals(y);
                this.props.updateCallback(JSON.stringify(this.state.grid));
        }
        aL=(x:number,y:number)=>{
            this.setState({grid:this.props.gridArticle!})
            console.log("al");
            console.log(x+":"+y);
            if(x>=1&&this.state.grid[y][x-1].content==null){
                let buf:cel[][]=this.state.grid;
                let gridel:cel=buf[y][x];
                gridel.width=gridel.width+1;
                gridel.x=gridel.x-1;
                buf[y].splice(x-1,2,gridel);  
                this.setState({grid:buf})
            }
            this.updRowVals(y);
            this.props.updateCallback(JSON.stringify(this.state.grid));
        }
        rL=(x:number,y:number)=>{
            this.setState({grid:this.props.gridArticle!})
            console.log("rl");
            console.log(x+":"+y);
            if(this.state.grid[y][x].width>1){
                let buf:cel[][]=this.state.grid;
                let gridel:cel=buf[y][x];
                    gridel.width=gridel.width-1;
                    gridel.x=gridel.x+1;
                    let el:cel={
                        x:x,
                        y:y,
                        width:1,
                        content:null ,
                        cOpt:null,
                        cOptVal:null 
                    }
                    buf[y].splice(x,1,el,gridel);  
                this.setState({grid:buf})
                }
                this.updRowVals(y);
                this.props.updateCallback(JSON.stringify(this.state.grid));
        }

        addRow=()=>{
            this.setState({grid:this.props.gridArticle!})
            let buf:cel[][]=this.state.grid;
            let gridRow:cel[] =[]
            for (var j = 0; j < this.state.cels; j++) {
                let el:cel={
                    x:j,
                    y:this.state.rows,
                    width:1,
                    content:null ,
                    cOpt:null,
                    cOptVal:null 
                }
               gridRow.splice(j,0,el);
            }
            buf.splice(this.state.rows+1,0,gridRow);
            this.setState({rows:this.state.rows+1}); 
            this.setState({grid:buf})
            this.props.updateCallback(JSON.stringify(this.state.grid));
        }

        deleteRow=(y:number)=>{
            this.setState({grid:this.props.gridArticle!})
             let buf:cel[][]=this.state.grid;
             buf.splice(y,1);

             for (let i=0;i<buf.length;i++)
             {
                for (let j=0;j<buf[i].length;j++)
             {
                 buf[i][j].y=i
             } 
             }
            
             this.setState({rows:this.state.rows-1})
             this.setState({grid:buf})
             this.props.updateCallback(JSON.stringify(this.state.grid));
        }

        insert=(x:number,y:number,item:string, cOpt:string[], cOptVal:string[])=>{
            this.setState({grid:this.props.gridArticle!})
            console.log(x+":"+y);
            let buf:cel[][]=this.state.grid;
            let bufel={
                x:x,
                y:y,
                width: this.state.grid[y][x].width,
                content: item,
                cOpt:cOpt,
                cOptVal:cOptVal
            }
            buf[y][x]=bufel;
            this.setState({grid:buf})
            this.updRowVals(y);
            this.props.updateCallback(JSON.stringify(this.state.grid));
        }    


        update=()=>{
            console.log(JSON.stringify(this.state.grid))
        }   
        
        send=()=>{
            console.log(JSON.stringify(this.state.grid))
        }
        /*insertComponent=(x:number,y:number,width:number,component:JSX.Element)=>{
            if(x+width>24) {x=24-width}
            let buf:JSX.Element[][]=this.state.grid;
            buf[y].splice(x,width,<Cell x={x} y={y} width={width} content={component} insertComponent={()=>{}} deleteComponent={this.deleteComponent}/>);
            this.setState({grid:buf})
        }*/




        constructor(props:{rows:number, updateCallback:(content:string)=>void, cels:number, gridArticle:cel[][]|null, save:(val:string)=>void}) {
            super(props);

            if (this.props.gridArticle!==null){
                this.state={
                    rows:this.props.rows,
                    cels:this.props.cels,
                    grid:this.props.gridArticle!
                }
            }
            else{
                this.state={
                    rows:this.props.rows,
                    cels:this.props.cels,
                    grid:[]
                }
                let buf:cel[][]=[]
                for (var i = 0; i < this.state.rows; i++) {
                    let gridRow:cel[] =[]
                    for (var j = 0; j < this.state.cels; j++) {
                        let el:cel={
                            x:j,
                            y:i,
                            width:1,
                            content:null ,
                            cOpt:null,
                            cOptVal:null 
                        }
                       gridRow.splice(j,0,el);
                    }
                    buf.splice(i,0,gridRow);
                }
                this.state={
                    rows:this.props.rows,
                    cels:this.props.cels,
                    grid:buf
                }
            }
           // this.state.grid[3][3].content=ComponentsBlock[6];
            //this.state.grid[3][6].content=ComponentsBlock[6];
           // console.log(this.state.grid)
        }

        /*
        <Cell x={1} y={1} width={1} content={<>2</>}
                    edit={this.edit}
                    mvR={this.mvR}
                    mvL={this.mvL}
                    mvT={this.mvT}
                    mvB={this.mvB}
                    aR={this.aR}
                    rR={this.rR}
                    aL={this.aL}
                    rL={this.rL}
                    delete={this.delete}
        */
        
        render() {
            
            return(
                <Card className="articleBody"  title="Макет саттьи">
                {this.state.grid.map((r,i)=>{
                return(
                <Row>
                    <Col span={1}></Col>
                    <Col span={22}>
                <Row className={"redactorRow"}>
                {r.map((c,j)=>{
                   return(
                    <Cell x={this.props.gridArticle![i][j].x} y={this.props.gridArticle![i][j].y} width={this.props.gridArticle![i][j].width} 
                    content={this.props.gridArticle![i][j].content }
                    cOpt={this.props.gridArticle![i][j].cOpt}
                    cOptVal={this.props.gridArticle![i][j].cOptVal}
                    edit={this.edit}
                    mvR={this.mvR}
                    mvL={this.mvL}
                    aR={this.aR}
                    rR={this.rR}
                    aL={this.aL}
                    rL={this.rL}
                    delete={this.delete}
                    insert={this.insert}
                    changeOption={this.changeOption}
                    />
    
                   ); 
                })}
                <DeleteOutlined className={"delRowButton"} type="dashed" onClick={()=>this.deleteRow(i)}/>
                </Row>
                </Col>
                <Col span={1}></Col>
                 </Row>
                )
             })}
             {this.state.rows}: {this.state.cels}
             <Divider/>

             <Row >
                <Col span={1}></Col>

                <Col span={22}>
                <Button type="dashed" onClick={()=>this.addRow()}>Add</Button>
                <Button type="dashed" onClick={()=>this.update()}>Update</Button>
                <Button type="dashed" onClick={()=>{console.log(JSON.stringify(this.state.grid));this.props.save(JSON.stringify(this.state.grid))}}>Save</Button>
                </Col>
                <Col span={1}></Col>
             </Row>
                </Card>
            );
        }

      

    }

export default Redactor;


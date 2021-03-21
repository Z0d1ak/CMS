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

export class Redactor extends React.Component<{},{}> {

    render() {
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
            <ArticleBlock rows={5} cels={24} gridArticle={null}/>
            </Col>
            <Col span={6}>
            <OptionsBlock/>
            </Col>
            <Col span={1}></Col>
        </Row>
 
    
        
        </DndProvider>
        );
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

export class OptionsBlock extends React.Component<{},{}> {
    render() {
        return(
            <Card className="partsPoolright">
               <BlockImg name={"text"} pos={0}/>
               <BlockImg name={"img"}pos={1}/>
               <BlockImg name={"coment"}pos={2}/>
               <BlockImg name={"video"}pos={3}/>
               <BlockImg name={"audio"}pos={4}/>
               <BlockImg name={"link"}pos={5}/>
               <BlockImg name={"Carusel"}pos={6}/>
            </Card>
        );
    }
}

const ItemTypes = {
    OPTION: 'option',
  }


function BlockImg(props:{ name:string, pos:number}) {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: ItemTypes.OPTION,
        collect: (monitor) => ({
          isDragging: !!monitor.isDragging()
        }),
        item:{item:ComponentsBlock[props.pos], cOpt:ComponentsBlockOpt[props.pos], cOptVal:ComponentsBlockOptVals[props.pos]}
      }))

    return(
        <div ref={drag} className="test">{props.name}</div>
    );
}

const ComponentsBlockOpt:string[][]=[
    ["text","font-size","color"],
    ["allign"],
    ["allign"],
    ["allign"],
    ["allign"],
    ["allign"]
]

const ComponentsBlockOptVals:string[][]=[
    ["abc","12","green"],
    ["center"],
    ["center"],
    ["center"],
    ["center"],
    ["center"]
]




const ComponentsBlock:JSX.Element[]=[
    <Typography.Paragraph className={"grey"} style={{ [ComponentsBlockOpt[0][1]]: ComponentsBlockOptVals[0][1], [ComponentsBlockOpt[0][2]]: ComponentsBlockOptVals[0][2] }}>{ComponentsBlockOptVals[0][0]}</Typography.Paragraph>,
    <Image  src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"/>,
    <>2</>,
    <>3</>,
    <>4</>,
    <>5</>,
    <Carousel afterChange={()=>{}}>
    <div>
      <h3 className={"contentStyle"}>1</h3>
    </div>
    <div>
      <h3 className={"contentStyle"}>2</h3>
    </div>
    <div>
      <h3 className={"contentStyle"}>3</h3>
    </div>
    <div>
      <h3 className={"contentStyle"}>4</h3>
    </div>
  </Carousel>,
]




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
        <Settings visible={visible} cOpt={props.cOpt} cOptVal={props.cOptVal}></Settings>
        </>
    );

    /*
     DeleteOutlined,
    CheckOutlined,
    CloseOutlined,
    CaretLeftOutlined,
    CaretRightOutlined,
    VerticalLeftOutlined,
    VerticalRightOutlined,
    EditOutlined
    */
}

function Settings(props:{visible:boolean ,
    cOpt:string[],
    cOptVal:string[]
}
    ) {
    return(
        props.visible?
        <Card className={"settingsForm"} onClick={()=>{console.log(props.cOpt)}}>
            {props.cOptVal.map((r,i)=>{
               return(<DataRowEditable dataStr={props.cOptVal[i]} titleStr={props.cOpt[i]+":"} typeName={"opt"+i} editFieldCallback={()=>{}}/>)
            })}
        </Card>:
        <></>
    );

    /*
     DeleteOutlined,
    CheckOutlined,
    CloseOutlined,
    CaretLeftOutlined,
    CaretRightOutlined,
    VerticalLeftOutlined,
    VerticalRightOutlined,
    EditOutlined
    */
}

function Cell(props:{x:number,y:number,width:number,content:JSX.Element|null,
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
    insert:(x:number,y:number,item:JSX.Element, cOpt:string[], cOptVal:string[])=>void, 
}) {


    const [{ isOver }, drop] = useDrop(
        () => ({
          accept: "option",
          drop: (item:{item:JSX.Element,cOpt:string[],cOptVal:string[]}) => {
              props.insert(props.x,props.y,item.item,item.cOpt,item.cOptVal)
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
            <div  ref={drop} className="redactorCell" onClick={()=>{if(props.content!=null)setVisible(!visible);}}><>{props.content}</>
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
            />:<></>}
        </Col>
        
    
    );
}


    type cel={
        x:number,
        y:number,
        width:number,
        content:JSX.Element|null,
        cOpt:string[]|null,
        cOptVal:string[]|null
    }



    export class ArticleBlock extends React.Component<{rows:number, cels:number, gridArticle:cel[][]|null},{
        rows:number,
            cels:number,
            grid:cel[][],
    }> {

        updRowVals=(y:number)=>{
            let buf:cel[][]=this.state.grid;
            for (var j = 0; j < this.state.grid[y].length; j++) {
            
                buf[y][j].x=j;
                buf[y][j].y=y;
            }
            this.setState({grid:buf})
        }

        delete=(x:number,y:number)=>{
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
        } 
        edit=()=>{
            console.log("edit");
        }
        mvR=(x:number,y:number)=>{
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
        }
        mvL=(x:number,y:number)=>{
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
        }
        aR=(x:number,y:number)=>{
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
        }
        rR=(x:number,y:number)=>{
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
        }
        aL=(x:number,y:number)=>{
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
        }
        rL=(x:number,y:number)=>{
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
        }

        addRow=()=>{
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
        }

        deleteRow=(y:number)=>{
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
        }

        insert=(x:number,y:number,item:JSX.Element, cOpt:string[], cOptVal:string[])=>{
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
        }    

        /*insertComponent=(x:number,y:number,width:number,component:JSX.Element)=>{
            if(x+width>24) {x=24-width}
            let buf:JSX.Element[][]=this.state.grid;
            buf[y].splice(x,width,<Cell x={x} y={y} width={width} content={component} insertComponent={()=>{}} deleteComponent={this.deleteComponent}/>);
            this.setState({grid:buf})
        }*/




        constructor(props:{rows:number, cels:number, gridArticle:cel[][]|null}) {
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
            console.log(this.state.grid)
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
                    <Cell x={this.state.grid[i][j].x} y={this.state.grid[i][j].y} width={this.state.grid[i][j].width} content={this.state.grid[i][j].content }
                    cOpt={this.state.grid[i][j].cOpt}
                    cOptVal={this.state.grid[i][j].cOptVal}
                    edit={this.edit}
                    mvR={this.mvR}
                    mvL={this.mvL}
                    aR={this.aR}
                    rR={this.rR}
                    aL={this.aL}
                    rL={this.rL}
                    delete={this.delete}
                    insert={this.insert}
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
                </Col>
                <Col span={1}></Col>
             </Row>
                </Card>
            );
        }

    
    }

export default Redactor;


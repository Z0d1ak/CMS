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
        item:ComponentsBlock[props.pos]
      }))

    return(
        <div ref={drag} className="test">{props.name}</div>
    );
}
const ComponentsBlock:JSX.Element[]=[
    <Typography.Paragraph className={"grey"}>The useDrophook provides a way for you to wire in your component into the DnD system as a drop target. By passing in a specification into the useDrophook, you can specify including what types of data items the drop-target will accept, what props to collect, and more. This function returns an array containing a ref to attach to the Drop Target node and the collected props.</Typography.Paragraph>,
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
    delete:()=>void, 
    edit:()=>void,
    mvR:()=>void,
    mvL:()=>void,
    mvT:()=>void,
    mvB:()=>void,
    aR:()=>void,
    rR:()=>void,
    aL:()=>void,
    rL:()=>void}
    ) {

    return(
        <>
        <Button className={"deleteButton buttonStyle"} onClick={props.delete}> d</Button>
        <Button className={"editButton buttonStyle"} onClick={props.edit}> e</Button>
        <Button className={"moveRightButton buttonStyle"} onClick={props.mvR}> mr</Button>
        <Button className={"moveTopButton buttonStyle" } onClick={props.mvT}> mt</Button>
        <Button className={"moveLeftButton buttonStyle"} onClick={props.mvL}> ml</Button>
        <Button className={"moveBottomButton buttonStyle"} onClick={props.mvB}> mb</Button>
        <Button className={"addRightButton buttonStyle"} onClick={props.aR}> ar</Button>
        <Button className={"reduceRightButton buttonStyle" }onClick={props.rR}> rr</Button>
        <Button className={"addLeftButton buttonStyle"}onClick={props.aL}> al</Button>
        <Button className={"reduceLeftButton buttonStyle"}onClick={props.rL}> rl</Button>
        </>
    );
}

function Cell(props:{x:number,y:number,width:number,content:JSX.Element|null,
    edit:()=>void,
    mvR:(x:number,y:number)=>void,
    mvL:(x:number,y:number)=>void,
    mvT:(x:number,y:number)=>void,
    mvB:(x:number,y:number)=>void,
    aR:(x:number,y:number)=>void,
    rR:(x:number,y:number)=>void,
    aL:(x:number,y:number)=>void,
    rL:(x:number,y:number)=>void,
    delete:()=>void, 
    insert:(x:number,y:number,item:JSX.Element)=>void, 
}) {


    const [{ isOver }, drop] = useDrop(
        () => ({
          accept: "option",
          drop: (item:JSX.Element) => {
              props.insert(props.x,props.y,item)
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
            <div  ref={drop} className="redactorCell" onClick={()=>{setVisible(!visible);console.log(visible)}}><>{props.content}</>
         </div>
         {props.content!==null&&visible?<Instuments
            edit={props.edit}
            mvR={()=>{props.mvR(props.x,props.y)}}
            mvL={()=>{props.mvL(props.x,props.y)}}
            mvT={()=>{props.mvT(props.x,props.y)}}
            mvB={()=>{props.mvB(props.x,props.y)}}
            aR={()=>{props.aR(props.x,props.y)}}
            rR={()=>{props.rR(props.x,props.y)}}
            aL={()=>{props.aL(props.x,props.y)}}
            rL={()=>{props.rL(props.x,props.y)}}
            delete={props.delete}
            />:<></>}
        </Col>
        
    
    );
}


    type cel={
        x:number,
        y:number,
        width:number,
        content:JSX.Element|null
    }



    export class ArticleBlock extends React.Component<{rows:number, cels:number, gridArticle:cel[][]|null},{
        rows:number,
            cels:number,
            grid:cel[][],
    }> {


        delete=()=>{
            console.log("delete");
       /*     let buf:JSX.Element[][]=this.state.grid;
            buf[y].splice(x,1);
            for (var j = 0; j < width; j++) {
                buf[y].splice(x+j,0, <Cell x={y+j} y={y} width={1} content={<></>} insertComponent={this.insertComponent}deleteComponent={this.deleteComponent}/>);
            }
            this.setState({grid:buf})*/
        } 
        edit=()=>{
            console.log("edit");
        }
        mvR=(x:number,y:number)=>{
            console.log("mvR");
            if(x+this.state.grid[y][x].width<24){
            let buf:cel[][]=this.state.grid;
            let gridel:cel=buf[y][x+1];
            buf[y][x+1]=buf[y][x];
            buf[y][x]=gridel; 
            buf[y][x+1].x= buf[y][x+1].x+1;
            buf[y][x].x= buf[y][x].x-1;
            this.setState({grid:buf})
            }
        }
        mvL=(x:number,y:number)=>{
            console.log("mvL");
            if(x>0){
                let buf:cel[][]=this.state.grid;
                let gridel:cel=buf[y][x-1];
                buf[y][x-1]=buf[y][x];
                buf[y][x]=gridel; 
                buf[y][x-1].x= buf[y][x-1].x-1;
                buf[y][x].x= buf[y][x].x+1;
                this.setState({grid:buf})
                }
        }
        mvT=()=>{
            console.log("mvt");
        }
        mvB=()=>{
            console.log("mvb");
        }
        aR=(x:number,y:number)=>{
            console.log("ar");
            if(x+this.state.grid[y][x].width<=23){
                let buf:cel[][]=this.state.grid;
                let gridel:cel=buf[y][x];
                if(buf[y][x+1].content==null)
                {
                    gridel.width=gridel.width+1;
                    buf[y].splice(x,2,gridel);  
                }
                this.setState({grid:buf})
                }
        }
        rR=(x:number,y:number)=>{
            console.log("rr");
            if(this.state.grid[y][x].width>1){
                let buf:cel[][]=this.state.grid;
                let gridel:cel=buf[y][x];
                    gridel.width=gridel.width-1;
                    gridel.x=gridel.x;
                    let el:cel={
                        x:x,
                        y:y,
                        width:1,
                        content:null 
                    }
                    buf[y].splice(x,1,gridel,el);  
                this.setState({grid:buf})
                }
        }
        aL=(x:number,y:number)=>{
            console.log("al");
            if(x>=1){
                let buf:cel[][]=this.state.grid;
                let gridel:cel=buf[y][x];
                if(buf[y][x-1].content==null)
                {
                    gridel.width=gridel.width+1;
                    gridel.x=gridel.x-1;
                    buf[y].splice(x-1,2,gridel);  
                }
                this.setState({grid:buf})
                }
        }
        rL=(x:number,y:number)=>{
            console.log("rl");
            if(this.state.grid[y][x].width>1){
                let buf:cel[][]=this.state.grid;
                let gridel:cel=buf[y][x];
                    gridel.width=gridel.width-1;
                    gridel.x=gridel.x+1;
                    let el:cel={
                        x:x,
                        y:y,
                        width:1,
                        content:null 
                    }
                    buf[y].splice(x,1,el,gridel);  
                this.setState({grid:buf})
                }
        }

        addRow=()=>{
            let buf:cel[][]=this.state.grid;
            let gridRow:cel[] =[]
            for (var j = 0; j < this.state.cels; j++) {
                let el:cel={
                    x:j,
                    y:this.state.rows+1,
                    width:1,
                    content:null 
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
             this.setState({grid:buf})
        }

        insert=(x:number,y:number,item:JSX.Element)=>{
            let buf:cel[][]=this.state.grid;
            buf[y][x].content=item;
            this.setState({grid:buf})
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
                            content:null 
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
            this.state.grid[3][3].content=ComponentsBlock[6];
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
                <>
                <Row className={"redactorRow"}>
                {r.map((c,j)=>{
                   return(
                    <Cell x={this.state.grid[i][j].x} y={this.state.grid[i][j].y} width={this.state.grid[i][j].width} content={this.state.grid[i][j].content}
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
                    insert={this.insert}
                    />
    
                   ); 
                })}
                <Button className={"delRowButton"} type="dashed" onClick={()=>this.deleteRow(i)}>del+{i}</Button>
                </Row>
                 </>
                )
             })}
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


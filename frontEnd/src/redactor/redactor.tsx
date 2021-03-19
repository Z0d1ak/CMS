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
            <ArticleBlock rows={10} cels={24}/>
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

function Block(props:{x:number,y:number,width:number}) {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: ItemTypes.OPTION,
        collect: (monitor) => ({
          isDragging: !!monitor.isDragging()
        })
      }))

    return(
        <Col span={props.width}>
        <div ref={drag} className="test">textblock</div>
        </Col>
    );
}

function BlockImg(props:{ name:string, pos:number}) {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: ItemTypes.OPTION,
        collect: (monitor) => ({
          isDragging: !!monitor.isDragging()
        }),
        item:{pos:props.pos}
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

function Cell(props:{x:number,y:number,width:number,content:JSX.Element,insertComponent:(x:number,y:number,width:number,component:JSX.Element)=>void}) {
    //const [content, setContent] = useState(<></>);
    const [{ isOver }, drop] = useDrop(
        () => ({
          accept: "option",
          drop: (item:any) => {
              console.log(props.x+":"+props.y+":"+props.width+":"+item.pos)
              props.insertComponent(props.x,props.y,3,ComponentsBlock[item.pos])
          },
          collect: (monitor) => ({
            isOver: !!monitor.isOver()
          })
        })
      )
    return(
        <Col span={props.width}>
            <div ref={drop} className="white">{props.content}</div>
        </Col>

    );
}



    export class ArticleBlock extends React.Component<{
        rows:number
        cels:number
    },{
        grid:JSX.Element[][]
    }> {

        addRow=()=>{
            let buf:JSX.Element[][]=this.state.grid;
            let gridRow:JSX.Element[] =[]
            for (var j = 0; j < this.props.cels; j++) {
                gridRow.splice(j,0,<Cell x={j} y={this.props.rows+1} width={1} content={<></>} insertComponent={this.insertComponent}/>);
            }
            buf.splice(buf.length,0,gridRow);
            this.setState({grid:buf})
        }

        deleteRow=(y:number)=>{
            let buf:JSX.Element[][]=this.state.grid;
            buf.splice(y,1);
            this.setState({grid:buf})
        }

        insertComponent=(x:number,y:number,width:number,component:JSX.Element)=>{
            if(x+width>24) {x=24-width}
            let buf:JSX.Element[][]=this.state.grid;
            buf[y].splice(x,width,<Cell x={x} y={y} width={width} content={component} insertComponent={()=>{}}/>);
            this.setState({grid:buf})
        }

        constructor(props:{rows:number
            cels:number}) {
            super(props);
            this.state={grid:[]}
            for (var i = 0; i < this.props.rows; i++) {
                let gridRow:JSX.Element[] =[]
                for (var j = 0; j < this.props.cels; j++) {
                   gridRow.splice(j,0,<Cell x={j} y={i} width={1} content={<></>} insertComponent={this.insertComponent}/>);
                }
                this.state.grid.splice(this.state.grid.length,0,gridRow);
            }
          }
        
        render() {
            return(
                <Card className="articleBody"  title="Макет саттьи">
                {this.state.grid.map((r,i)=>{
                return(
                <Row className={"redactorRow"}>
                {r.map((c,j)=>{
                   return(
                    this.state.grid[i][j]
                   ); 
                })}
                </Row>
                )
             })}
             <Divider/>

             <Row >
                <Col span={1}></Col>
                <Col span={4}>
                <Button type="dashed" onClick={this.addRow}>Add</Button>
                </Col>
                <Col span={4}>
                <Button type="dashed" onClick={()=>this.deleteRow(3)}>Delete</Button>
                </Col>
                <Col span={14}>
  
                </Col>
                <Col span={1}></Col>
             </Row>
                </Card>
            );
        }

    
    }

export default Redactor;


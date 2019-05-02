import React,{Component} from 'react';
import url from "../url";

class TableRow extends Component{
    constructor(props) {
        super(props);
        this.state={
            text:"",
            shown:true
        };
    }
    handleUpdateClick=()=>{
        this.setState({
            shown: !this.state.shown
        });
    }
    handleChange=(e)=>{
        this.setState({
            text:e.target.value
        })
    }

    handleUpdateSubmit = (event,text,id)=>{
        event.preventDefault();
        let todoItem={
            id:id,
            isDone:false,
            text
        }
        fetch(url,{
            method:"PATCH",
            headers:{

                "Content-Type": "application/json"
            },
            body:JSON.stringify(todoItem)
        })
            .then(res=>res.json())
            .then(result=>{
                if(result.nModified===1){
                    this.handleUpdateClick();
                    this.props.displayData();
                    console.log(" updated data res :"+    JSON.stringify(result));
                }
            })
            .catch(err=>console.log("Error in update : "+err));
    }

    render() {
        let {row}=this.props;
        var status=row.isDone? <i className="fas fa-check-circle"></i>:
            <i className="fas fa-clock"></i>;
        var id=row._id;
        let i=this.props.i;
        var hidden = {
            display: this.state.shown ? "none" : "block"
        }
        return(
            <tr id={id}>
                <td>{i++}</td> <td>{row.text}
                <form onSubmit={(event=>{this.handleUpdateSubmit(event,this.state.text,id)})}>
                    <input type="text" style={hidden} value={this.state.value} name={"text"} onChange={this.handleChange}/>
                </form>
            </td>
                <td onClick={()=>this.props.handleStatus(id,row.text,!row.isDone)}>
                    {status}
                </td>
                <td onClick={()=>this.props.handleDelete(id)}><i className="fas fa-trash"></i></td>
                <td onClick={this.handleUpdateClick}> <i className="fas fa-edit"></i> </td>
            </tr>
        );
        }

}
export default TableRow;
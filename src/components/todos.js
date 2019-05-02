import React from "react";
import "./todos.css";
import url from "../url";
import TableRow from "./tableRow";
class Todos extends React.Component{
    constructor(props) {
        super(props);
    }
    handleStatus=(id,text,isDone)=>{
        let todoItem={
            id:id,
            isDone:isDone,
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
                    this.props.displayData();
                }
            })
            .catch(err=>console.log("Error in update : "+err));
    }
    render() {
        let todos=this.props.todos;
        let i=1;
        return(
            <div className={"todos"}>
                <table>
                    <caption>Todos</caption>
                    <thead>
                    <tr>
                        <th>Sr.</th>    <th> Description</th> <th>Status</th> <th> Delete</th> <th>Edit</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        todos.map(row=>{
                            return(
                                <TableRow row={row} i={i++}
                                    handleStatus={this.handleStatus}
                                    handleDelete={this.props.handleDelete}
                                    displayData={this.props.displayData}
                                />
                            )
                        })
                    }
                    </tbody>
                </table>
            </div>
        );
    }
}
export default Todos;
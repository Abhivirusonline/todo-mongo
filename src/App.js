import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import './App.css';
import Todos from "./components/todos";
import url from "./url";
import Header from "./components/Header/Header";
import AddItem from "./components/AddItem/AddItem";


class App extends Component {
    constructor(props){
        super(props);
        this.state={
            todos:[],
            loading:true
        };
    }

    handleDelete=(id)=>{
        fetch(url+"/?id="+id,{method:'delete'})
            .then(res=>res.json())
            .then(result=>{
                if(result.deletedCount===1){
                    this.displayData();
                }
                console.log("result in delete is :"+JSON.stringify(result));
            })
            .catch(err=>console.log(err));
    }
    handleAdd=(data)=>{
        let todoItem={
            text:data,
            isDone:false

        }
        fetch(url,{
            method:'post',
            headers:{

                "Content-Type": "application/json"
            },
            body:JSON.stringify(todoItem)
        })
            .then(res=>res.json())
            .then(result=>{
                this.displayData();
                console.log(" added data res :"+    JSON.stringify(result));
            })
            .catch(err=>console.log(err));
    }
    displayData=()=>{
        fetch(url)
            .then(res=>res.json())
            .then(result=>{
                this.setState({
                    todos:result,
                    loading:false
                })
            })
            .catch(err=>console.log(err));
    }

    componentDidMount() {
        this.displayData();
    }

    render() {
    return (
      <div className="App">
          <Router>
              <Header/>
              <Route
              exact path={"/AddItem"}
              component={()=><AddItem handleAdd={this.handleAdd}/>}

              />
          </Router>
            <Todos todos={this.state.todos} handleDelete={this.handleDelete} displayData={this.displayData}/>
      </div>
    );
  }
}

export default App;

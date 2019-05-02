import React,{Component} from "react";

class AddItem extends Component{
    constructor(props) {
        super(props);
        this.state={
                text:""
        };
    }
    handleChange=(e)=>{
        this.setState({
            text:e.target.value
        })
    }
    handleClick=(e)=>{
        e.preventDefault();
        this.props.handleAdd(this.state.text);
    }
    render() {
        return(
            <div className={"AddItem"}>
                <form onSubmit={(event => this.handleClick(event))}>
                    <input type="text"  name={"name"} onChange={this.handleChange} placeholder={"Insert todo"} required/>
                </form>
            </div>
        );
    }

}

export default AddItem;
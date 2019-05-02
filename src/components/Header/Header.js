import React from "react";
import {Link} from "react-router-dom";
const Header=()=>{
    return(
        <nav>
            <Link to={"./"}>Todos</Link>
            <Link to={"./AddItem"}>Add Item</Link>
        </nav>
    );
}
export default Header;
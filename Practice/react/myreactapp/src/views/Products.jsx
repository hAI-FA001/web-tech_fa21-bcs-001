import { useEffect, useState } from "react";
import {axios} from "axios";

const Products = () => {
    // assume data will be available at some layer
    // use Todos logic to map student data to compo -> complexity increase, put student in separate tag/compo
    // & pass name/address as prop
    
    const [products, setProduct] = useState([{name: "Wahaj", price: 100}]);
    
    // use axios or fetch
    const getData = () => {
        // need http protocol too
        // CORS problem -> server blocks API calls from other domains
        // fix using CORS package in express server
        // but problem: state not maintained, compo will unmount and go into mounting state again if navigate
        axios.get("http://localhost:4000");
    };

    // use* = hooks, hooks are attached on diff lifecycle of compo (create, load/unload, mount, unmount, ..., destroy)
    // useEffect called whenever change in lifecycle/state
    // react = page loaded, then js runs to make app (page already loaded)
    useEffect(() => {
        // can put getData() here, but will be called infinitely (cuz state changed again and again)
    }, []);  // dependencies/state variables to monitor, empty = no dep

    return ( <div>
        <h1>Products</h1>
        {products.map(p => (
            <div>
                <h1>p.name</h1>
                <span>p.price</span>
            </div>
        ))}
    </div> );
}
 
export default Products;
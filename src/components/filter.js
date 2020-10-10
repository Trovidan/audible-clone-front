import { Checkbox, FormControlLabel } from '@material-ui/core';
import React, { useState} from 'react'

export default function Filter(props){
    const categories = props.categories;
    const [show,setShow] = useState(true);
    const [render,setRender] = useState(true);
    function toggleShow(){
        let newShow = show===true?false:true;
        setShow(newShow);
    }
    function handleChange(index){
        let newState = props.categories;
        newState[index].selected = newState[index].selected === true? false:true;
        props.changeState(newState);
        setRender(!render);
    }
    function handleReset(){
        props.reset()
        setRender(!render);
    }
    let nothingJSX = (<></>);
    let categoryJSX = categories.map( (category,index) =>
        <div key={category.title}  className="category-filter-options">
            <FormControlLabel onChange={() => handleChange(index)} control={<Checkbox name={category.title} checked={category.selected} />} label={category.title} />
        </div>
    );
    return (
        <div className="category-filter">
            <button className="category-filter-title" onClick = {toggleShow}> {props.title} </button>
            <button onClick={handleReset}>Clear</button>
            {show?categoryJSX:nothingJSX}
        </div>
    )
}
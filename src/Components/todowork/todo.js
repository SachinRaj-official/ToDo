import React, {useState, useEffect} from 'react';

import "./style.css";

const getLocalData=()=>{
    const lists=localStorage.getItem("mytodoList");
    if(lists){
        return JSON.parse(lists);
    } else{
        return [];
    }

};

const Todo = () => {
    const [inputdata, setInputData] =  useState("");
    const [items, setItems] = useState(getLocalData());
    const [isEditItem, setisEditItem] = useState("");
    const [toggleButton, settoggleButton] = useState(false);

    //add the items Funtion
    const addItem= ()=>{
        if(!inputdata){
            alert("Please Fill the Data");
        } else if(inputdata &&toggleButton){
            setItems(
                items.map((curElem)=>{
                    if(curElem.id === isEditItem){
                        return{...curElem, name: inputdata}
                    }
                    return curElem;
                })
            );
        setInputData("");
        setisEditItem();
        settoggleButton(false);
        } 
        else{
            const myNewInputData ={
                id: new Date().getTime().toString(),
                name: inputdata,
            }
            setItems([...items, myNewInputData]);
            setInputData("");
        }
    };
    //Edit the items
    const editItem= (index)=>{
        const item_edit= items.find((curElem)=>{
            return curElem.id===index;
        });
        setInputData(item_edit.name);
        setisEditItem(index);
        settoggleButton(true);
    };

    //How to Delete Items Section
    const deleteItem =(index)=>{
        const updatedItem = items.filter((curElem)=> {
            return curElem.id !== index;
        });
        setItems(updatedItem);
    };

    //Remove ALL 
    const removeAll=()=>{
        setItems([]);

    };
    //Adding Local Storage
    useEffect(() => {
        localStorage.setItem("mytodoList", JSON.stringify(items));
    }, [items]);

    return (
        <>
        <div className="main-div">
            <div className="child-div">
                <figure>
                    <img src="write.png" alt="LOGO" />
                    <figcaption>ADD your List</figcaption>
                    </figure>
                    <div className="addItems">
                        <input 
                        type="text" 
                        placeholder="✍ Add Items" 
                        className="form-control" 
                        value={inputdata} 
                        onChange={(Event)=> setInputData(Event.target.value)}
                        />
                        { toggleButton ? (<i className="far fa-edit add-btn" onClick={addItem}></i>) : (<i className="fa fa-plus add-btn" onClick={addItem}></i>)}
                
                        
                        </div>
                        {/*Show our Items */}
                        <div className="showItems">

                            {items.map((curElem, index)=>{
                                return(
                                    <div className="eachItem" key={curElem.id}>
                                <h3>{curElem.name}</h3>
                                <div className="todo-btn">
                                <i className="far fa-edit add-btn" onClick={()=> editItem(curElem.id)}></i>
                                <i className="far fa-trash-alt add-btn" onClick={()=>
                                deleteItem(curElem.id)}></i>
                                </div>
                            </div>

                                );

                            })}
                        </div>
                        {/*Remove all Button*/}
                        <div className="showItems">
                            <button className="btn effect04" data-sm-link-text="Remove All" onClick={removeAll}>
                                <span>Check List</span>
                            </button>
                        </div>                  
            </div>
        </div> 
        </>
    )
}

export default Todo;

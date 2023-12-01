import React from 'react';
import { useState } from 'react';
import './App.css';



function App() {

  const [listItems,setListItems] = useState([]);

  const [message,setMessage] = useState({
    text: "",
    id:""
  });

  const [editableItem,setEditableItem] = useState({
    id: "",
    isEditing: false
  })





  const messageChange = (e)=>{
    setMessage({
      text: e.target.value,
      id: ""
    })
  }

  const addItems =(e)=>{
    e.preventDefault()
    if(message.text===""){
      alert("Please Enter Something")
    }
    else{
      let newTudo = {
        text: message.text,
        id: new Date().getTime().toString()
      }
      setListItems([
        ...listItems,
        newTudo]
      )
  
      setMessage({
        text:"",
        id:""
      })
    }
  }


  const Editable = (id)=>{
    let items = listItems.find((eachItem)=>eachItem.id===id);
    setMessage({
      ...message,
      text: items.text,
      id: items.id
    })
    setEditableItem({
      ...editableItem,
      isEditing:true,
      id: items.id
    })
  }

  const itemChange =(e)=>{
    e.preventDefault()

    let newTudos = listItems.map((eachItem)=>{
      if(eachItem.id===editableItem.id){
        return {
          text: message.text,
          id: editableItem.id
        }
      }
      else{
        return eachItem
      }
    })

    setListItems(newTudos)

    setEditableItem({
      ...editableItem,
      isEditing:false
    })
    setMessage({
      text:"",
      id:""
    })
  }

  const deleteItem = (id)=>{
    let updateList = listItems.filter((eachItem)=>{
      return eachItem.id!==id
    })
    setListItems(updateList)
  }
  
  return (
    <div className="App">
      <h2 className='heading'>Tudo List By Using React Js</h2>
      <form className='form'>
        <input placeholder='Enter Text' value={message.text} onChange={(e)=>messageChange(e)}/>
        {
          editableItem.isEditing ? 
          <button className='editable-btn' onClick={itemChange} >Edit</button> : <button className='add-btn' onClick={addItems}>Add</button>
        }
      </form>
      <hr/>
      {
        listItems.length===0 ? <p className='no-item-text'>There is no Items in the List</p> : <ul>
          {
            listItems.map((eachItem)=>{
              const {text,id} = eachItem;
              return <li key={id}>
                <span>{text}</span>
                <button className='btn1' onClick={(e)=>Editable(id)}><i className="fa-solid fa-pen-to-square"></i></button>
                <button className='del-btn' onClick={()=>deleteItem(id)}><i className="fa-solid fa-trash-can"></i></button>
              </li>
            })
          }
        </ul>
      }
    </div>
  );
}

export default App;

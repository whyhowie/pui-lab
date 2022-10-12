import React, { useState, useEffect } from "react";
import './App.css'


const useLocalStorage = (storageKey, fallbackState) => {
    const [value, setValue] = useState(
      JSON.parse(localStorage.getItem(storageKey)) ?? fallbackState
    );
  
    useEffect(() => {
      localStorage.setItem(storageKey, JSON.stringify(value));
    }, [value, storageKey]);
  
    return [value, setValue];
  }

const categoryButtonStyle = {
    width: '100px',
}

const CategoryList = (props) => {
    const [isAddingNew, setAddingNew] = useState(false)
    const [newCategory, setNewCategory] = useState("")
    const [categoryList, setCategoryList] = useLocalStorage("categoryList", [
        {name: "All", color: "black"}
    ])

    return (
        <div>
            <p>Show Category:</p>
            {categoryList.map(
                (category, idx) => {
                    return <button key={idx}
                    style={categoryButtonStyle}
                    onClick={() => {props.filterButtonHandler(category.name)}}>
                        {category.name}
                    </button>
                }
            )}
            <div><button style={{...categoryButtonStyle, backgroundColor: '#212121'}}></button></div>

            
        </div>
    )
}

export default CategoryList
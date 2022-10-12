import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Notecard from './Notecard';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notecardData: [
        {
          imageURL: "assets/warhol-frog.png", 
          noteTitle: "This is the First Note", 
          noteBody: "Here is some body text for the first note.", 
          noteCategory: "Work",
          noteFooter: "Sep 1 2022, 10:25"
        },
        {
          imageURL: "assets/warhol-orangutan.png", 
          noteTitle: "This is the Second Note", 
          noteBody: "And here is some body text for the second note! What could be next?", 
          noteCategory: "Leisure",
          noteFooter: "Sep 1 2022, 10:25"
        },
        {
          imageURL: "assets/warhol-eagle.png", 
          noteTitle: "This is the Third Note", 
          noteBody: "Yep, you guessed it, here is some body text for the third note.", 
          noteCategory: "Work",
          noteFooter: "Sep 1 2022, 10:25"
        }
      ],
      editorNoteTitle: "",
      editorNoteBody: "",
      selectedNoteIndex: null,
      isEditing: false,
      filterCategory: null,
    }
  }

  handleTitleChange = (event) => {
    const newTitle = event.target.value;
    this.setState(prevState => ({
      ...prevState,
      editorNoteTitle: newTitle
    }));
  }

  handleBodyChange = (event) => {
    const newBody = event.target.value;
    this.setState(prevState => ({
      ...prevState,
      editorNoteBody: newBody
    }));
  }

  editButtonHandler = (noteIndex) => {
    const noteTitle = this.state.notecardData[noteIndex].noteTitle;
    const noteBody = this.state.notecardData[noteIndex].noteBody;

    this.setState(prevState => ({
      ...prevState,
      editorNoteTitle: noteTitle,
      editorNoteBody: noteBody,
      selectedNoteIndex: noteIndex,
      isEditing: true
    }));
    console.log(this.state.selectedNoteIndex);
  }

  deleteButtonHandler = (noteIndex) => {
    const newNotecardData = this.state.notecardData
    newNotecardData.splice(noteIndex, 1)
    this.setState({notecardData: newNotecardData})
  }


  filterButtonHandler = (category) => {
    this.setState({filterCategory: category})
  }

  addNote = () => {
    let newNotecardItem = {
      imageURL: "assets/warhol-butterfly.png", 
      noteTitle: "This is a brand new Note", 
      noteBody: "Here is some body text for the first note.", 
      noteCategory: "Leisure",
      noteFooter: "Sep 1 2022, 10:25"
    }

    let newNotecardData = this.state.notecardData
    newNotecardData.push(newNotecardItem)
    this.setState({notecardData: newNotecardData})
  }
  // submitNote = () => {
  //   if (this.state.selectedNoteIndex != null) {
  //     console.log(this.state.notecardData);
  //     let newNotecardData = this.state.notecardData;
  //     newNotecardData[this.state.selectedNoteIndex].noteTitle = this.state.editorNoteTitle;
  //     newNotecardData[this.state.selectedNoteIndex].noteBody = this.state.editorNoteBody;

  //     this.setState(prevState => ({
  //       ...prevState,
  //       notecardData: newNotecardData,
  //       editorNoteTitle: "",
  //       editorNoteBody: "",
  //       selectedNoteIndex: null
  //     }));
  //   }
  // }  
  submitNote = () => {
    console.log(this.state.selectedNoteIndex)
    if (this.state.selectedNoteIndex != null) {
      let newNotecardData = this.state.notecardData
      newNotecardData[this.state.selectedNoteIndex].noteTitle = this.state.editorNoteTitle;
      newNotecardData[this.state.selectedNoteIndex].noteBody = this.state.editorNoteBody;
      this.setState(prevState => ({
        ...prevState,
        notecardData: newNotecardData,
        editorNoteTitle: "",
        editorNoteBody: "",
        selectedNoteIndex: null,
        isEditing: false
      }))
    }
  };
  

  render() {
    const buttonStyle = {
      width: "100px",
      backgroundColor: "white",
      fontColor: "black"
    }


    return (

      <div className="App">
        <div id="container">
          <header>
            <img id="logo-img" src="assets/pen-to-square-solid.svg" />
            <h1> PUI-NOTE </h1>
          </header>
          <div id="notecard-list">
            {this.state.notecardData.map (
              (notecard, idx) => {
                return <Notecard 
                key = {idx}
                noteIndex = {idx}
                imageURL= {this.state.notecardData[idx].imageURL} 
                noteTitle= {this.state.notecardData[idx].noteTitle} 
                noteBody= {this.state.notecardData[idx].noteBody} 
                noteCategory= {this.state.notecardData[idx].noteCategory}
                noteFooter= {this.state.notecardData[idx].noteFooter}
                onEdit= {this.editButtonHandler}
                onDelete= {this.deleteButtonHandler} />
              }
            )}
          </div>
          
          <button style={buttonStyle} onClick={() => this.filterButtonHandler("Work")}>Work</button>
          <button style={buttonStyle} onClick={() => this.filterButtonHandler("Leisure")}>Leisure</button>
          <button style={buttonStyle} onClick={() => this.filterButtonHandler(null)}>All</button>
          <br/>
          <button style={buttonStyle} onClick={this.addNote}>Add a new note</button>
          <br/>
          <br/>
          <br/>
          <br/>

          
          { this.state.isEditing &&
            <div id="note-editor" className="edit-mode">
              <div id="btn-new-note">
                EDIT NOTE
              </div>
              <div className="note-editor-contents">
                <div className="note-editor-left">
                  <form>
                    <input id="note-editor-title" placeholder="Title of Your Note..."
                      name="dummy" maxLength="50" onChange={this.handleTitleChange} value={this.state.editorNoteTitle}>
                    </input>
                    <textarea id="note-editor-body" placeholder="Body of Your Note..."
                      rows="15" maxLength="1000" onChange={this.handleBodyChange} value={this.state.editorNoteBody}>
                    </textarea>
                  </form>
                </div>
                <div className="note-editor-right">
                  <div className="material-symbols-outlined icon icon-done" onClick={this.submitNote}>
                    done
                  </div>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    );
  }
}

export default App;

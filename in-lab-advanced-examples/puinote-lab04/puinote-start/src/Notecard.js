import React, { Component } from 'react';
import './Notecard.css';

class Notecard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isExpanded: false
    }

    this.toggleNote = this.toggleNote.bind(this)
  }

  toggleNote() {
    this.setState({
      isExpanded: !this.state.isExpanded
    })
  }


  render() {
    let notecardClass = 'notecard';

    if (this.state.isExpanded) {
      notecardClass += " expanded";
    }
    // note: rerenders every time the state changes
    // so we don't have to specifically remove the "expanded" class

    const categoryStyle  = {
      width: "fit-content",
      border: "1px solid",
      borderRadius: "18px",
      borderColor: this.props.noteCategory == "Work" ? "blue" : "green",
      backgroundColor: this.props.noteCategory == "Work" ? "blue" : "green",
      margin: "5px",
      padding: "5px 10px",

    }

    return (
      <div className={notecardClass}>         
        <div className="notecard-left">
          <div className="notecard-main-content">
            <img className="notecard-thumbnail" src={this.props.imageURL}/>
            <div className="notecard-text">
              <div className="note-category" style={categoryStyle}>
                {this.props.noteCategory}
              </div>
              <div className="note-title-container">
                <div className="note-title">
                  {this.props.noteTitle}
                </div>
              </div>
              <div className="note-body">
                {this.props.noteBody}
              </div>
            </div>
          </div>
          <div className="notecard-footer">
            {this.props.noteFooter}
          </div>
        </div>
        <div className="notecard-right">
          <div className="icon icon-expand material-symbols-outlined" onClick={this.toggleNote}>
            expand_more
          </div>
          <div className="icon icon-collapse material-symbols-outlined" onClick={this.toggleNote}>
            expand_less
          </div>
          <div className="toolbar">
            <div className="material-symbols-outlined icon icon-edit" onClick={() => this.props.onEdit(this.props.noteIndex)}>
              edit
            </div>
            <div className="material-symbols-outlined icon icon-delete" onClick={() => this.props.onDelete(this.props.noteIndex)}>
              delete
            </div>
          </div>
        </div> 
      </div>
    );
  }
}

export default Notecard
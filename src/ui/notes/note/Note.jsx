import React from "react";
import './Note.css'
import NoteForm from "../../noteForm/NoteForm.jsx";
import * as API from "../../../services/notes";

export default class Note extends React.Component {
    state = {
        id: 0,
        color: "#CCCCCC",
        title: "Invisible text",
        text: "If you can see it, something gone wrong. Please close this page and never open it again.",
        editing: false
    };

    prev_state = {};

    constructor(props, context) {
        super(props, context);
        this.state = {id: props.id, color: props.color, title: props.title, text: props.text};
    }

    startEditing(e) {
        e.preventDefault();
        this.setState({editing: true, text: this.state.text})
    }

    stopEditing(e) {
        switch (e.target.operation) {
            case "Delete":{
                this.setState({editing: false});
                API.delete_note(this.state.id).then(API.force_reload);
                break;
            }
            case "Cancel": {
                this.setState({editing: false});
                break;
            }
            case "Send": {
                this.setState(e.data);
                this.setState({editing: false});
                API.update_note(e.data).then(API.force_reload);
                break;
            }
            default: {

                break;
            }
        }
        e.preventDefault();
        e.stopPropagation();
    }

    render() {
        if (!this.state.editing)
            return <article onClick={(e) => this.startEditing(e)} className="note-card"
                            style={{borderColor: this.state.color}}>
                <h3>{this.state.title}</h3>
                <p className="note-card_text">{this.state.text}</p>
            </article>;
        else
            return <div onClick={(e) => this.stopEditing(e)}>
                <NoteForm id={this.state.id} color={this.state.color} title={this.state.title}
                          text={this.state.text} editing={this.state.editing}/>
            </div>

    }
}

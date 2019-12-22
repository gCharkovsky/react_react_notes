import React from "react";
import './NotesBrowser.css'
import Header from "../../ui/header/Header.jsx";
import Notes from "../../ui/notes/Notes.jsx";
import NoteForm from "../../ui/noteForm/NoteForm.jsx";
import * as API from "../../services/notes.js";

export default class NotesBrowser extends React.Component {
    state = {
        darkTheme: true,
        notes_content: [],
        position: 0
    };

    constructor(props, context) {
        super(props, context);
        document.addEventListener("toggle-theme", () => {
            this.setState({darkTheme: !this.state.darkTheme});
            console.log("theme changed. Just believe me.")
        });
        document.addEventListener("notes-update", () => {
            this.getNotes();
        });
    }

    getNotes() {
        API.get_notes(this.state.position).then((res) => {
            this.setState({notes_content: res.data});
            console.log(res.data);
            console.log("loaded");
        });
    }

    componentDidMount() {
        this.getNotes();
    }

    render() {
        return <div className={"content"}>
            <Header/>
            <NoteForm editing={false} color={"navy"}/>
            <Notes notes_content={this.state.notes_content}/>
        </div>
    }
}

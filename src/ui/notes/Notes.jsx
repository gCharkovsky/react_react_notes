import React from "react";
import Note from './note/Note.jsx'
import './Notes.css'

export default class Notes extends React.Component {
    render() {
        let notes = this.props.notes_content.map((content) => <Note key={content.id} id={content.id}
                                                                    color={content.color}
                                                                    title={content.title}
                                                                    text={content.text}/>);
        return <section>{notes}</section>
    }
}

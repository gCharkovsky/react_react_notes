import React from "react";
import './NoteForm.css'
import IconButton from "../ui-kit/buttons/iconButton/IconButton.jsx";
import Textarea from "../ui-kit/textarea/Textarea.jsx";
import ColorPicker from "../ui-kit/colorPicker/ColorPicker.jsx";
import * as API from "../../services/notes";

export default class NoteForm extends React.Component {
    state = {
        id: 0,
        title: "",
        text: "",
        color: "black",
        editing: false
    };


    constructor(props, context) {
        super(props, context);
        this.state = {id: props.id, color: props.color, title: props.title, text: props.text, editing: props.editing};
        console.log("inited");
        console.log(this.state);
    }

    tryToSend(e) {
        if (e.target === "Cancel" || e.target === "Send" || e.target === "Delete") {
            if (!this.state.editing) {
                if (e.target === "Cancel") {
                    this.setState({
                        id: 0,
                        title: "",
                        text: "",
                        color: "gray"
                    });
                    console.log("cleaned")
                } else {
                    console.log(this.state);
                    API.add_note(this.state).then(API.force_reload);
                }
            }
            e.target = {operation: e.target, id: this.state.id};
            e.data = this.state;
        } else {
            console.log("stop this shit!");
            e.preventDefault();
            e.stopPropagation();
        }
    }

    riseEdit(e) {
        e.type = "click";
        e.data = this.state;
    }

    updateText(e) {
        if (e.isHeader) {
            this.setState({title: e.target.value})
        } else {
            this.setState({text: e.target.value})
        }
        this.riseEdit(e)
    }

    updateColor(e) {
        if (e.color !== undefined) {
            this.setState({color: e.color});
            console.log("Tsvetochek" + e.color);
            e.color = undefined;
        }
        this.riseEdit(e)
    }

    render() {

        return <form action="" className="note-form"
                     onSubmit={(e) => e.preventDefault()}>
            <div className="note-form__input-block" onChange={(e) => this.updateText(e)}>
                <Textarea placeholder="Title" rows="1" isHeader={true} text={this.state.title}/>
                <Textarea placeholder="Take a note..." rows="3" text={this.state.text}/>
            </div>

            <div className="note-form__action-block" onClick={(e) => this.updateColor(e)}>
                <ColorPicker color={this.state.color}/>
                <div className="action-block__controls"
                     onClick={(e) => this.tryToSend(e)}>
                    {this.props.editing ? <IconButton name={"Delete"}/> : ""}
                    <IconButton type={"reset"} name={"Cancel"} color_type={"secondary"}/>
                    <IconButton type={"reset"} name={"Send"}/>
                </div>
            </div>
        </form>
    }
}

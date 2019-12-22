import React from "react";
import './IconButton.css'
import * as MySvgCollection from "././../../../../assets/Icons/index.js"


export default class IconButton extends React.Component {
    Icon;
    color_type = "primary";

    constructor(props) {
        super(props);
        this.Icon = MySvgCollection[props.name + "Icon"];

    }

    handeleClick(e){
        e.target = this.props.name;
    }

    render() {
        return <button type={this.props.type} className={"icon-button"} onClick={(e) => this.handeleClick(e)}>
            <this.Icon
                style={{fill: "var(--" + this.color_type + "-color)", stroke: "var(--" + this.color_type + "-color)"}}/>
        </button>
    }
}

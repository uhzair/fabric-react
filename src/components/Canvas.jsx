import React, {Component} from 'react';
import {fabric} from "fabric";

class Canvas extends Component {

    componentDidMount() {
        this.canvas = new fabric.Canvas('canvas');
        fabric.Object.prototype.objectCaching = false;
        this.props.canvas(this.canvas);
    }

    render() {
        return (
            <canvas id="canvas" width="800" height="500"/>
        );
    }
}

export default Canvas;
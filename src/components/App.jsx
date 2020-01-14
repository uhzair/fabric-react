import React, {Component} from 'react';
import Canvas from './Canvas.jsx';
import {fabric} from "fabric";

class App extends Component {

    state = {
        'currObjText': '',
        'currFontSize': 30
    };

    componentDidMount() {
        this.canvas.on({'object:selected': this.objectSelected, 'selection:updated': this.objectSelected});
        this.canvas.on('selection:cleared', this.clearInputs);
    }

    objectSelected = () => {
        if (this.canvas.getActiveObject() != null && this.canvas.getActiveObject().type === "text") {
            let newText = this.canvas.getActiveObject().text;
            let newFSize = this.canvas.getActiveObject().fontSize;
            this.setState({'currObjText': newText, 'currFontSize': newFSize});
        }
    };

    clearInputs = () => {
        this.setState({'currObjText': '', 'currFontSize': 30});
    };

    addText = (event) => {
        let enteredText = event.target.value;
        if (enteredText != null && enteredText) {
            let object;
            if (this.canvas.getActiveObject() != null && this.canvas.getActiveObject().type === "text") {
                object = this.canvas.getActiveObject();
                object.text = enteredText;
            } else {
                object = new fabric.Text(enteredText, {
                    fill: '#fff', left: 200, top: 200, fontSize: 30
                });
                this.canvas.add(object);
            }
            this.canvas.renderAll();
            this.canvas.setActiveObject(object);
        }
    };

    handleChange = (event) => {
        let newText = event.target.value;
        this.setState({'currObjText': newText});
    };

    applyFont = (event) => {
        if (this.canvas.getActiveObject() != null && this.canvas.getActiveObject().type === "text") {
            let activeObj = this.canvas.getActiveObject();
            activeObj.fontFamily = event.target.text;
            this.canvas.renderAll();
        }
    };

    styleText = (what) => {
        if (this.canvas.getActiveObject() != null && this.canvas.getActiveObject().type === "text") {
            let activeObj = this.canvas.getActiveObject();
            switch (what) {
                case 'Bold':
                    activeObj.fontWeight = (activeObj.fontWeight === 'bold') ? '' : 'bold';
                    break;
                case 'Italics':
                    activeObj.fontStyle = (activeObj.fontStyle === 'italic') ? '' : 'italic';
                    break;
                case 'Underline':
                    activeObj.underline = !activeObj.underline;
                    break;
                default:
                    break;
            }
            this.canvas.renderAll();
        }
    };

    align = (direction) => {
        if (this.canvas.getActiveObject() != null && this.canvas.getActiveObject().type === "text") {
            let activeObj = this.canvas.getActiveObject();
            activeObj.textAlign = direction;
            this.canvas.renderAll();
        }
    };

    fontSize = (event) => {
        if (this.canvas.getActiveObject() != null && this.canvas.getActiveObject().type === "text") {
            let activeObj = this.canvas.getActiveObject();
            activeObj.fontSize = event.target.value;
            this.canvas.renderAll();
            this.setState({'currFontSize': event.target.value});
        }
    };

    textColor = (event) => {
        if (this.canvas.getActiveObject() != null && this.canvas.getActiveObject().type === "text") {
            let activeObj = this.canvas.getActiveObject();
            activeObj.fill = event.target.value;
            this.canvas.renderAll();
        }
    };

    flip = (direction) => {
        if (this.canvas.getActiveObject() != null && this.canvas.getActiveObject().type === "text") {
            this.canvas.getActiveObject().toggle('flip' + direction);
            this.canvas.renderAll();
        }
    };

    render() {
        return (
            <div className="container-fluid">
                <h1 className="mt-2">Fabric</h1>
                <div className="row px-3 py-2">
                    <div className="col-lg-1 col-md-6 border p-1 text-center sectionDiv">
                        <div className="nav flex-column nav-pills mt-1" id="v-pills-tab" role="tablist"
                             aria-orientation="vertical">
                            <a className="nav-link active" id="v-pills-text-tab" data-toggle="pill" href="#v-pills-text"
                               role="tab" aria-controls="v-pills-text" aria-selected="true">Text</a>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 border p-1 sectionDiv">
                        <div className="tab-content px-2" id="v-pills-tabContent">
                            <div className="tab-pane fade show active scrollable" id="v-pills-text" role="tabpanel"
                                 aria-labelledby="v-pills-text-tab">
                                <div>
                                    <h2 className="text-center mt-1">Add Text</h2>
                                    <div className="form-group">
                                        <label htmlFor="textContent">Enter Text</label>
                                        <textarea className="form-control" rows="3"
                                                  autoComplete="off" onBlur={(event) => this.addText(event)}
                                                  onChange={(event) => this.handleChange(event)}
                                                  value={this.state.currObjText}/>
                                    </div>
                                    <div className="form-group">
                                        <div className="dropdown">
                                            <button className="form-control btn btn-secondary btn-sm dropdown-toggle"
                                                    type="button" data-toggle="dropdown">
                                                Font Family
                                            </button>
                                            <div className="dropdown-menu" aria-labelledby="ffDropdownBtn">
                                                <a className="dropdown-item fontApply" href="/#"
                                                   onClick={(event) => this.applyFont(event)}>Arial</a>
                                                <a className="dropdown-item fontApply" href="/#"
                                                   onClick={(event) => this.applyFont(event)}>Arial Black</a>
                                                <a className="dropdown-item fontApply" href="/#"
                                                   onClick={(event) => this.applyFont(event)}>Calibri</a>
                                                <a className="dropdown-item fontApply" href="/#"
                                                   onClick={(event) => this.applyFont(event)}>Stencil</a>
                                                <a className="dropdown-item fontApply" href="/#"
                                                   onClick={(event) => this.applyFont(event)}>Garamond</a>
                                                <a className="dropdown-item fontApply" href="/#"
                                                   onClick={(event) => this.applyFont(event)}>Verdana</a>
                                                <a className="dropdown-item fontApply" href="/#"
                                                   onClick={(event) => this.applyFont(event)}>Georgia</a>
                                                <a className="dropdown-item fontApply" href="/#"
                                                   onClick={(event) => this.applyFont(event)}>Comic Sans MS</a>
                                                <a className="dropdown-item fontApply" href="/#"
                                                   onClick={(event) => this.applyFont(event)}>Trebuchet MS</a>
                                                <a className="dropdown-item fontApply" href="/#"
                                                   onClick={(event) => this.applyFont(event)}>Impact</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="col-sm-6 d-inline-block float-left ">
                                            <button className="col-sm-3 btn btn-sm btn-info mt-1 ml-2"
                                                    onClick={() => this.styleText('Bold')}>
                                                <strong>B</strong>
                                            </button>
                                            <button className="col-sm-3 btn btn-sm btn-info mt-1 ml-2"
                                                    onClick={() => this.styleText('Italics')}>
                                                <i>I</i>
                                            </button>
                                            <button
                                                className="col-sm-3 btn btn-sm btn-info mt-1 ml-2"
                                                onClick={() => this.styleText('Underline')}>
                                                <u>U</u>
                                            </button>
                                        </div>
                                        <div className="col-sm-6 d-inline-block float-right ">
                                            <button className="col-sm-3 btn btn-sm btn-info mt-1 ml-2"
                                                    onClick={() => this.align('left')}>L
                                            </button>
                                            <button className="col-sm-3 btn btn-sm btn-info mt-1 ml-2"
                                                    onClick={() => this.align('center')}>C
                                            </button>
                                            <button className="col-sm-3 btn btn-sm btn-info mt-1 ml-2"
                                                    onClick={() => this.align('right')}>R
                                            </button>
                                        </div>
                                    </div>
                                    <div className="clearfix"/>
                                    <div className="form-group mt-3">
                                        <label htmlFor="fontSize" className="float-left">Font Size</label>
                                        <span className="float-right">{this.state.currFontSize}</span>
                                        <input type="range" className="form-control-range" min="1"
                                               max="100" defaultValue="30" autoComplete="off"
                                               onChange={(event) => this.fontSize(event)}/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="fontColor">Color</label>
                                        <input type="color" className="form-control"
                                               defaultValue="#ffffff"
                                               onChange={(event) => this.textColor(event)}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-8 col-md-12 border p-0 sectionDiv">
                        <div className="col-sm-12 m-2">
                            <button id="flip-X" className="btn btn-info btn-sm ml-2" onClick={() => this.flip('X')}>
                                Flip X
                            </button>
                            <button id="flip-Y" className="btn btn-info btn-sm ml-2" onClick={() => this.flip('Y')}>
                                Flip Y
                            </button>
                        </div>
                        <Canvas canvas={(canvas) => {
                            this.canvas = canvas
                        }}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
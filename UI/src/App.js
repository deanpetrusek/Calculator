import React, { Component } from 'react';
import { GetColorByName, GetAllColors } from './colorRepository';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MenuItem from 'material-ui/MenuItem';
import { GetOhmValue } from './GetOhmValue';
import SelectField from 'material-ui/SelectField';
import Paper from 'material-ui/Paper';

class Band extends Component {
  constructor(props){
    super(props);
    this.state = {
      value: null
    };
  }
  changed(e,i,v){
    this.setState({value: v});
    this.props.changedFunction(e,i,v);
  }
  render (){
    const colorContainerStyle = {
      height: "5px",
      backgroundColor: this.state.value || "white"
    }

    if(this.state.value === "White"){
      colorContainerStyle.borderStyle = "solid";
      colorContainerStyle.borderWidth = "1px";
      colorContainerStyle.borderColor = "#e2e2e2"
    }
    var textFormatter = this.props.itemTextFormat;
    var onChange = (e,i,v) => {this.changed(e,i,v)};
    var colors = this.props.colors
      .map((color, i) => {
        var text = textFormatter(color);
        return <MenuItem primaryText={text} key={i} value={color.Color}/>
      });
    return <div><SelectField floatingLabelText={this.props.label} value={this.state.value} onChange={onChange}>{colors}</SelectField><div style={colorContainerStyle}></div></div>
  }
}

class SignificantDigitBand extends Band {
  constructor(props){
    super(props);
    this.textFormat = (color) => { return color.Color + " (" + color.SignificantFigures + ")"};
  }
  render(){
    var colors = this.props.colors.filter(x => x.SignificantFigures != null);
    return <Band colors={colors} 
      itemTextFormat={this.textFormat}
      label={this.props.label}
      changedFunction={this.props.changedFunction}/>
  }
}

class MultiplierBand extends Band {
  constructor(props){
    super(props);
    this.textFormat = (color) => { return color.Color + " (x" + color.Multiplier + ")"};
  }
  render(){
    var colors = this.props.colors.filter(x => x.Multiplier != null);
    return <Band colors={colors} 
      itemTextFormat={this.textFormat}
      label={this.props.label}
      changedFunction={this.props.changedFunction}/>
  }
}

class ToleranceBand extends Band {
  constructor(props){
    super(props);
    this.textFormat = (color) => { return color.Color + " (±" + color.Tolerance + ")"};
  }
  render(){
    var colors = this.props.colors.filter(x => x.Tolerance != null);
    return <Band colors={colors} 
      itemTextFormat={this.textFormat}
      label={this.props.label}
      changedFunction={this.props.changedFunction}/>
  }
}

class OhmValue extends Component {
  constructor(props){
    super(props);
  }
  render(){
    const style = {
      textAlign: "center",
      marginTop: "30px",
      fontSize: "20px"
    }
    if(this.props.ohmValue != null){
      return <div style={style}>{this.props.ohmValue.Minimum + " - " + this.props.ohmValue.Maximum} Ohms</div>
    }
    return <div style={style}>Please select all band colors</div>
  }
}

class App extends Component {
  async componentDidMount(){
    var results = await GetAllColors();
    this.setState({
      allColors: results,
      firstBand: null,
      secondBand: null,
      thirdBand: null,
      fourthBand: null,
      ohmValue: null
    });
  }
  constructor(props){
    super(props);
    this.state = {allColors: []};
  }
  canGetValue(){
    var valueAvailable = this.state.firstBand != null
      && this.state.secondBand != null
      && this.state.thirdBand != null
      && this.state.fourthBand != null;
    return valueAvailable;
  }
  async getOhmValue(){
    var val = await GetOhmValue(this.state.firstBand, this.state.secondBand, this.state.thirdBand ,this.state.fourthBand);
    this.setState({ohmValue : val}); 
  }
  setStateAndGetData(state){
    this.setState(state, () => {
      if(this.canGetValue()){
        this.getOhmValue();
      }
    });
  }
  render() {
    const style = {
      marginLeft: "auto",
      marginRight: "auto",
      width: "256px"
    }
    var setFirstBand = (e,i,v) => {this.setStateAndGetData({firstBand: v})};
    var setSecondBand = (e,i,v) => {this.setStateAndGetData({secondBand: v})};
    var setThirdBand = (e,i,v) => {this.setStateAndGetData({thirdBand: v})};
    var setFourthBand = (e,i,v) => {this.setStateAndGetData({fourthBand: v})};
    return (
      <MuiThemeProvider>
        <div style={style}>
          <h2>Ohm Value Calculator</h2>
          <SignificantDigitBand 
            digitName="1st"
            label="1st Band, 1st Digit" 
            colors={this.state.allColors} 
            changedFunction={setFirstBand}/><br />
          <SignificantDigitBand 
            digitName="2nd" 
            label="2nd Band, 2nd Digit"
            colors={this.state.allColors} 
            changedFunction={setSecondBand}/><br />
          <MultiplierBand 
            label="3rd Band, Multiplier"
            colors={this.state.allColors} 
            changedFunction={setThirdBand}/><br />
          <ToleranceBand 
            label="4th Band, Tolerance"
            colors={this.state.allColors} 
            changedFunction={setFourthBand}/>
            <OhmValue ohmValue={this.state.ohmValue}/>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;

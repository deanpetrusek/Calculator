import React, { Component } from 'react';
import { GetAllColors } from './Repositories/GetAllColors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { GetOhmValue } from './Repositories/GetOhmValue';
import OhmValue from './Components/OhmValue'
import ToleranceBand from './Components/ToleranceBand'
import MultiplierBand from './Components/MultiplierBand'
import SignificantDigitBand from './Components/SignificantDigitBand'

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

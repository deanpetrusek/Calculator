import React, { Component } from 'react';
import Band from './Band'

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

  export default SignificantDigitBand
import React, { Component } from 'react';
import Band from './Band'

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

  export default MultiplierBand
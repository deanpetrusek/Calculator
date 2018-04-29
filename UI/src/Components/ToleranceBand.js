import React from 'react';
import Band from './Band'

class ToleranceBand extends Band {
    constructor(props){
      super(props);
      this.textFormat = (color) => { return color.Color + " (±" + color.Tolerance + ")"};
    }
    render(){
      var colors = [];
      if(this.props.colors !== undefined){
        colors = this.props.colors.filter(x => x.Tolerance != null);
      }
      return <Band colors={colors} 
        itemTextFormat={this.textFormat}
        label={this.props.label}
        changedFunction={this.props.changedFunction}/>
    }
  }

  export default ToleranceBand
import React, { Component } from 'react';
class OhmValue extends Component {
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

  export default OhmValue
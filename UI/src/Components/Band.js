import React, { Component } from 'react';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';

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

  export default Band
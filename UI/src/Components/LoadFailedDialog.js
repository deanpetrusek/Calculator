import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

export default class LoadFailedDialog extends React.Component {

  handleOpen = () => {
    this.setState({open: true});
  };
  handleClose = () => {
    this.setState({open: false});
  };

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Retry"
        primary={true}
        keyboardFocused={true}
        onClick={this.props.reloadAction}
      />,
    ];

    return (
      <div>
        <Dialog
          title="Failed to load initial data"
          actions={actions}
          modal={false}
          open={this.props.open}
          onRequestClose={this.handleClose}
        >
          Do you want to try to fetch the data again?
        </Dialog>
      </div>
    );
  }
}
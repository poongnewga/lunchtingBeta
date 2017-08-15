import React from 'react';
import { TouchableOpacity } from 'react-native';

class TouchButton extends React.Component {
  render() {
    return(
      <TouchableOpacity style={[{
        borderRadius: 6, borderColor: '#f46958',
        width: this.props.btnWidth, height: this.props.btnHeight,
        backgroundColor: this.props.btnColor, alignItems: 'center', justifyContent: 'center'
      }, this.props.style]}
        onPress={this.props.onPress}
      >
        {this.props.children}
      </TouchableOpacity>
    );
  }
}

export { TouchButton };

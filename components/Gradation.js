// View 에 그라데이션을 입힌 것.
import React, { Component } from 'react';
import { LinearGradient } from 'expo';
// const { LinearGradient } = Components;

class Gradation extends Component {
  render() {
    return (
      <LinearGradient
        style={[this.props.style, {backgroundColor: 'transparent'}]}
        colors={this.props.colors}
        start={[0.4,0.1]}
        end={[0.9,0.8]}
      >
        {this.props.children}
      </LinearGradient>
    )
  }
}

export { Gradation }

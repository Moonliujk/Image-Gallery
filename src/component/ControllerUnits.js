

import React, {Component} from 'react';
import './ControllerUnits.scss';

class ControllerUnits extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();

    if (this.props.arrange.isCenter) {
      this.props.inverse();
    } else {
      this.props.center();
    }
  }

  render() {
    let unitClass = "controller-unit";

    unitClass += this.props.arrange.isCenter ? ' is-center' : '';

    return (
      <span className={unitClass} onClick={this.handleClick}></span>
    );
  }
}

export default ControllerUnits;

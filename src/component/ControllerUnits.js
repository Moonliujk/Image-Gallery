

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

    // 根据不同的图片状态，显示不同的按钮状态
    if (this.props.arrange.isCenter) {
      // 居中状态
      unitClass += ' is-center';

      if (this.props.arrange.isInverse) {
        // 反转状态
        unitClass += ' is-inverse';
      }
    }

    return (
      <span className={unitClass} onClick={this.handleClick}></span>
    );
  }
}

export default ControllerUnits;

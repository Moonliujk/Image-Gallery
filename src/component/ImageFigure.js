import React, {Component} from 'react';
import './ImageFigure.scss';

class ImageFigure extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();

    if (this.props.arrange.isCenter) {  // 判断图片是否居中
      this.props.inverse();  // 图片居中，则翻转图片
    } else {
      this.props.center();   // 图片不居中，则让其居中
    }
  }

  render() {
    // 获取布局信息
    let styleObj = {};
    let arrange = this.props.arrange;
    styleObj.left = arrange.pos.left;
    styleObj.top = arrange.pos.top;

    if (arrange.rotate) {    // 有旋转角度且不为0
      styleObj['transform'] = `rotate(${arrange.isCenter ? '0' : arrange.rotate}deg)`;
    }

    if (arrange.isCenter) {
      styleObj.zIndex = 11;
    }

    let imgFigureClass = "img-figure";
    imgFigureClass += this.props.arrange.isInverse ? ' img-inverse' : '';

    return (
      <figure className={imgFigureClass} style={styleObj} onClick={this.handleClick}>
        <img src = {this.props.data.imgUrl}
             alt = {this.props.data.title}
             className = "fig-img"/>
        <figcaption>
          <h2 className = "img-title">{this.props.data.title}</h2>
          <div className="img-back">
            <p>{this.props.data.desc}</p>
          </div>
        </figcaption>
      </figure>
    );
  }
}

export default ImageFigure;

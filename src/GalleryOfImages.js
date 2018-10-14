

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './GalleryOfImages.scss';
import imageData from './data/imageDatas.json';  // 获取图片路径
import ImageFigure from './component/ImageFigure';
import ControllerUnits from './component/ControllerUnits';


// Q: require 与 import 区别
// 将图片路径赋值给对象
let imageDatas = (function(imageDataArr) {
  let singleImg = null;

  for (let i=0, length = imageDataArr.length; i<length; i++) {
    singleImg = imageDataArr[i];
    singleImg.imgUrl = require('./image/' + singleImg.filename);
    imageDataArr[i] = singleImg;
  }

  return imageDataArr;
})(imageData);

// 使用管理者模式，将数据有一个组件统一管理，方便调试
class GalleryOfImages extends Component {
  constructor(props) {
    super(props);
    this.Constant = {
      centerPos: {
        left: 0,
        top: 0
      },
      hPosRange: {  // 水平方向取值范围
        leftSecX: [0, 0],
        rightSecX: [0, 0],
        y: [0, 0]
      },
      vPosRange: {  // 垂直方向取值范围
        x: [0, 0],
        topY: [0, 0]
      },
    };
    // 创建ref
    this.stage = React.createRef();
    this.rerange = this.rerange.bind(this);
    this.inverseImg = this.inverseImg.bind(this);
    this.centerImg = this.centerImg.bind(this);
    this.state = {
      imgsArrangeArr: [
        /*{
          pos: {
            left: '0',
            top: '0'
          },
          rotate: 0,  旋转信息
          isInverse: false,  翻转图片
          isCenter: false,  是否居中显示
        }*/
      ]
    };
  }

  /**
   * 区间内部随机取值
   * @param  {[type]} bottom [区间下极限]
   * @param  {[type]} top    [区间上极限]
   * @return {[type]}        [随机值]
   */
  getRandomAtRange(bottom, top) {
    return Math.ceil(Math.random() * (top - bottom) + bottom);
  }

  /**
   * 获得0 - 30之间的正负随机值
   * @return {[Number]} 随机值
   */
  get30Random() {
    return (Math.random() > 0.5 ? '' : '-') + Math.floor(Math.random() * 31);
  }

  inverseImg(index) {
    return () => {
      let imgsArrangeArr = this.state.imgsArrangeArr;

      imgsArrangeArr[index].isInverse = !imgsArrangeArr[index].isInverse;

      this.setState({
        imgsArrangeArr
      });
    };
  }

  centerImg(index) {
    return () => {
      this.rerange(index);
    };
  }

  /**
   * 重排图片
   * @param  {[type]} centerIndex [description]
   * @return {[type]}             [description]
   */
  rerange(centerIndex) {
    let imgsArrangeArr = this.state.imgsArrangeArr,
      Constant = this.Constant,
      centerPos = Constant.centerPos,
      hPosRange = Constant.hPosRange,
      vPosRange = Constant.vPosRange,
      hPosRangeLeftSecX = hPosRange.leftSecX,
      hPosRangeRightSecX = hPosRange.rightSecX,
      hPosRangeY = hPosRange.y,
      vPosRangeTopY = vPosRange.topY,
      vPosRangeX = vPosRange.x,

      imgsArrangeTopArr = [],
      // 去一个或者0个图片置于顶端
      topImgNum = Math.floor(Math.random * 2),
      topImgSpliceIndex = 0,

      imgsArrangeCenterArr = imgsArrangeArr.splice(centerIndex, 1);

        // 居中 centerIndex 图片
    imgsArrangeCenterArr[centerIndex] = {
      pos: centerPos,
      rotate: 0,
      isCenter: true
    };

    // 取出上侧图片的状态信息
    topImgSpliceIndex = Math.ceil(Math.random() * (imgsArrangeArr.length - topImgNum));
    imgsArrangeTopArr = imgsArrangeArr.splice(topImgSpliceIndex, topImgNum);
    // 为上侧图片赋值位置信息
    imgsArrangeTopArr.forEach((item, index) => {
      item = {
        pos: {
          top: this.getRandomAtRange(vPosRangeTopY[0], vPosRangeTopY[1]),
          left: this.getRandomAtRange(vPosRangeX[0], vPosRangeX[1])
        },
        rotate: this.get30Random()
      };
    });

    // 为两侧图片实现布局
    for (let i=0, j=imgsArrangeArr.length, mid=j / 2; i<j; i++) {
      let hPosRangeLORX = null;

      // 将数组对半分，前半部分图片放置在左边，后半部分图片放置在右边
      if (i < mid) {
        hPosRangeLORX = hPosRangeLeftSecX;
      } else {
        hPosRangeLORX = hPosRangeRightSecX;
      }

      imgsArrangeArr[i] = {
        pos: {
          top: this.getRandomAtRange(hPosRangeY[0], hPosRangeY[1]),
          left: this.getRandomAtRange(hPosRangeLORX[0], hPosRangeLORX[1])
        },
        rotate: this.get30Random()
      };
    }

    // 将状态信息合并
    if (imgsArrangeTopArr && imgsArrangeTopArr[0]) {
      imgsArrangeArr.splice(topImgSpliceIndex, 0, imgsArrangeTopArr[0]);
    }

    imgsArrangeArr.splice(centerIndex, 0, imgsArrangeCenterArr[centerIndex]);

    this.setState({
      imgsArrangeArr
    });
  }

  componentDidMount() {
    // 计算舞台大小
    let stageDOM = ReactDOM.findDOMNode(this.stage.current),
      stageW = stageDOM.scrollWidth,
      stageH = stageDOM.scrollHeight,
      halfStageW = Math.ceil(stageW / 2),
      halfStageH = Math.ceil(stageH / 2);

    // 计算imageFigure大小
    let imgFigureDOM = ReactDOM.findDOMNode(this.refs.imgFigure0),
      imgW = imgFigureDOM.scrollWidth,
      imgH = imgFigureDOM.scrollHeight,
      halfImgW = Math.ceil(imgW / 2),
      halfImgH = Math.ceil(imgH / 2);

    // 计算中心位置点
    this.Constant.centerPos = {
      left: halfStageW - halfImgW,
      top: halfStageH - halfImgH
    };
    // 计算左侧、右侧图片位置点
    this.Constant.hPosRange.leftSecX[0] = -halfImgW;
    this.Constant.hPosRange.leftSecX[1] = halfStageW - halfImgW * 3;
    this.Constant.hPosRange.rightSecX[0] = halfStageW + halfImgW;
    this.Constant.hPosRange.rightSecX[1] = stageW - halfImgW;
    this.Constant.hPosRange.y[0] = -halfImgH;
    this.Constant.hPosRange.y[1] = stageH - halfImgH;
    // 计算上册图片位置点
    this.Constant.vPosRange.topY[0] = -halfImgH;
    this.Constant.vPosRange.topY[1] = halfStageH - halfImgH * 3;
    this.Constant.vPosRange.x[0] = halfStageW - imgW;
    this.Constant.vPosRange.x[1] = halfStageW;

    this.rerange(0);
  }

  render() {
    let imgFigures = [],
      controllerUnits = [];

    imageDatas.forEach((item, index) => {
      if (!this.state.imgsArrangeArr[index]) {
        this.state.imgsArrangeArr[index] = {
          pos: {
            left: 0,
            top: 0
          },
          rotate: 0,
          isInverse: false,
          isCenter: false
        };
      }

      imgFigures.push(<ImageFigure
                        data={item}
                        inverse={this.inverseImg(index)}
                        arrange={this.state.imgsArrangeArr[index]}
                        center={this.centerImg(index)}
                        key={item.filename}
                        ref={"imgFigure" + index} />);

      controllerUnits.push(<ControllerUnits
                              key={index}
                              inverse={this.inverseImg(index)}
                              center={this.centerImg(index)}
                              arrange={this.state.imgsArrangeArr[index]} />);
    });

    return (
      <section className="stage" ref={this.stage}>
        <section className="image-sec">
          {imgFigures}
        </section>
        <nav className="controller-nav">
          {controllerUnits}
        </nav>
      </section>
    );
  }
}

export default GalleryOfImages;

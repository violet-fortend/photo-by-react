require('normalize.css/normalize.css');
require('styles/App.sass');

import React from 'react';

// 获取图片相关的数据
var imageDatas = require('json!../data/imageData.json');

// 利用自执行函数， 将图片名信息转成图片URL路径信息
imageDatas = (function genImageURL(imageDatasArr) {
  for (var i = 0, j = imageDatasArr.length; i < j; i++) {
    var singleImageData = imageDatasArr[i];

    singleImageData.imageURL = require('../images/' + singleImageData.fileName);

    imageDatasArr[i] = singleImageData;
  }

  return imageDatasArr;
})(imageDatas);

class ImgFigure extends React.Component{
  render(){
    return (
        <figure className='img-figure'>
          <img src={this.props.data.imageURL} alt={this.props.data.title}/>
          <figcaption>
            <h2 className='img-title'>{this.props.data.title}</h2>
          </figcaption>
        </figure>
    );
  }
}

class AppComponent extends React.Component {
  Constant: {
    centerPos: {
      left: 0,
      right: 0
    },
    hPosRange: { //水平方向的取值范围
      leftSecX: [0,0],
      rightSecX: [0,0],
      y: [0,0]
    },
    vPosRange: { //垂直方向的取值范围
      x: [0,0],
      topY: [0,0]
    }
  };

  componentDidMount(){
    //组件加载以后，为每张图片计算其位置范围
    //首先拿到舞台的大小
    var stageDOM = React.findDOMNode(this.refs.stage),
    stageW = stageDOM.scrollWidth,
    stageH = stageDOM.scrollHeight,
    halfStageW = Math.ceil(stageW/2),
    halfStageH = Math.ceil(stageH/2);

  }

  render() {
    var controllerUnits =[];
    var imgFigures = [];
    imageDatas.forEach(function (value,index) {
      imgFigures.push(<ImgFigure data={value} key={index}/>);
    });

    return (
        <section className='stage' ref='stage'>
          <section className='img-sec'>
            {imgFigures}
          </section>
          <nav className='controller-nav'>
            {controllerUnits}
          </nav>
        </section>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;

import React from 'react';

class LazyLoadImg extends React.Component {
  constructor() {
    super();
    this.renderImgOnCanvas = this.renderImgOnCanvas.bind(this);
  }
  renderImgOnCanvas() {
    const { imgUrl } = this.props;
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    // img.crossOrigin = 'Anonymous';
    img.onload = function() {
      canvas.width = this.width;
      canvas.height = this.height;
      ctx.drawImage(this, 0, 0);
      // const dataURL = canvas.toDataURL('image/jpeg');
      // console.log('----dataURL: ', dataURL);
    };
    img.src = imgUrl;
  }
  componentDidMount() {
    this.renderImgOnCanvas();
  }
  componentDidUpdate(prevProps, prevState) {
    const { imgUrl } = this.props;
    if (imgUrl && imgUrl !== prevProps.imgUrl) {
      this.renderImgOnCanvas();
    }
  }

  render() {
    return <canvas id="canvas" />;
  }
}

export default class CanvasImgViewer extends React.Component {
  constructor() {
    super();
    this.state = {
      width: 350,
      height: 150,
    };
    this.onChangeWidth = this.onChangeWidth.bind(this);
    this.onChangeHeight = this.onChangeHeight.bind(this);
  }
  onChangeWidth({ target: { value } }) {
    this.setState(({ height }) => ({ width: value, height }));
  }
  onChangeHeight({ target: { value } }) {
    this.setState(({ width }) => ({ width, height: value }));
  }
  render() {
    const baseUrl = 'https://via.placeholder.com/';
    const { width, height } = this.state;
    return (
      <div className="App">
        <label htmlFor="width">
          Width:{' '}
          <input
            name="width"
            type="number"
            onChange={this.onChangeWidth}
            value={width || 0}
          />
        </label>
        <label htmlFor="height">
          Width:{' '}
          <input
            name="height"
            type="number"
            onChange={this.onChangeHeight}
            value={height || 0}
          />
        </label>
        <LazyLoadImg imgUrl={`${baseUrl}${width || 1}x${height || 1}`} />
      </div>
    );
  }
}

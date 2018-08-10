import React, { PureComponent } from "react";
import styled from "styled-components";

const SliderContainer = styled.div`
  height: 20px;
  width: 400px;
  border: 1px solid #666;
  position: relative;
`;

const SliderTrack = styled.div`
  height: 20px;
  background: blue;
  width: ${({ percent }) => percent + "%"};
`;

const SliderHead = styled.div`
  height: 30px;
  width: 30px;
  border: 1px solid #444;
  background: yellow;
  position: absolute;
  top: -5px;
  left: ${({ percent }) => percent - 4 + "%"};
`;

export default class SimpleSlider extends PureComponent {
  state = {
    percent: 0
  };

  onSliderClicked(evt) {
    this.setState({ percent: 50 });
  }
  render() {
    const { percent } = this.state;
    return (
      <SliderContainer onClick={this.onSliderClicked.bind(this)}>
        <SliderTrack percent={percent} />
        <SliderHead percent={percent} />
      </SliderContainer>
    );
  }
}

import React, { Component, PureComponent } from "react";
import styled from "styled-components";

const collapsibleItems = [
  {
    title: "🐴",
    contents: (
      <div>
        Horses can sleep both lying down and standing up. Domestic horses have a
        lifespan of around 25 years. A 19th century horse named 'Old Billy' is
        said to have lived 62 years.
      </div>
    )
  },
  {
    title: "🦏",
    contents: (
      <div>
        Rhino skin maybe thick but it can be quite sensitive to sunburns and
        insect bites which is why they like wallow so much – when the mud dries
        it acts as protection from the sunburns and insects.
      </div>
    )
  },
  {
    title: "🦄",
    contents: (
      <div>
        If you’re looking to hunt a unicorn, but don’t know where to begin, try
        Lake Superior State University in Sault Ste. Marie, Michigan. Since
        1971, the university has issued permits to unicorn questers.
      </div>
    )
  }
];

// TODOs
// 2. handles Tab
// 3. handle animation

class CollapsibleButton extends PureComponent {
  render() {
    const { children, onItemClicked } = this.props;
    return <button onClick={onItemClicked}>{children}</button>;
  }
}

class Collapsible extends Component {
  state = {
    activeKeys: new Set()
  };

  onItemClicked(index) {
    this.setState((prev, { stateReducer = normalCollapsibleReducer }) =>
      stateReducer(prev, { index })
    );
  }
  render() {
    const { direction = "down" } = this.props;
    const opens = this.state.activeKeys;

    return (
      <div>
        {collapsibleItems.map(({ title, contents }, index) => (
          <div key={index}>
            {opens.has(index) && direction === "up" ? contents : null}
            <CollapsibleButton
              onItemClicked={this.onItemClicked.bind(this, index)}
            >
              {title}
            </CollapsibleButton>
            {opens.has(index) && direction === "down" ? contents : null}
          </div>
        ))}
      </div>
    );
  }
}

function normalCollapsibleReducer(state, { index }) {
  const { activeKeys } = state;
  if (activeKeys.has(index)) {
    activeKeys.delete(index);
  } else {
    activeKeys.add(index);
  }
  return { ...state, activeKeys };
}

function singleOpenedReducer(state, source) {
  const { activeKeys } = state;
  const { index } = source;

  if (activeKeys.size > 0 && !activeKeys.has(index)) {
    return { ...state, activeKeys: new Set([index]) };
  }

  return normalCollapsibleReducer(state, source);
}

function CollapsibleExample(props) {
  return <Collapsible {...props} />;
}

const DemoContainer = styled.div`
  text-align: left;
`;

const DemoItem = styled.li`
  margin-down: 50px;
  list-style: none;
`;

export default function Demo() {
  const demos = [
    {
      demoTitle: "Direction: up",
      direction: "up"
    },
    {
      demoTitle: "Direction: down",
      direction: "down"
    },
    {
      demoTitle: "Single Opened",
      stateReducer: singleOpenedReducer
    }
  ];
  return (
    <DemoContainer>
      {demos.map(({ demoTitle, ...props }, index) => (
        <DemoItem key={index}>
          <h3>{demoTitle}</h3>
          <CollapsibleExample {...props} />
        </DemoItem>
      ))}
    </DemoContainer>
  );
}

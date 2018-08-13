import React, { Component } from 'react';
import styled from 'styled-components';
import posed from 'react-pose';

const collapsibleItems = [
  {
    title: 'Kiwifruit 🥝',
    contents: `The kiwifruit, native to northern China, first arrived in New Zealand at the turn of
the 20th century; it was then known as the Chinese Gooseberry.
Consuming fruits and vegetables of all kinds is associated with a reduced risk of heart disease,
diabetes, cancer, and other conditions.`,
  },
  {
    title: 'Avocado 🥑',
    contents: `The avocado (Persea americana) is a tree, long thought to have originated in South
Central Mexico, classified as a member of the flowering plant family Lauraceae.
The fruit of the plant, also called an avocado (or avocado pear or alligator pear), is botanically
a large berry containing a single large seed known as a "pit" or a "stone".`,
  },
  {
    title: 'Pineapple 🍍',
    contents: `The pineapple (Ananas comosus) is a tropical plant with an edible multiple fruit
consisting of coalesced berries, also called pineapples, and the most economically significant plant
in the family Bromeliaceae.`,
  },
];

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

function ensureOneOpenedReducer(state, source) {
  const { activeKeys } = state;
  const { index } = source;

  if (activeKeys.size > 0) {
    return { ...state, activeKeys: new Set([index]) };
  }

  return { ...state, activeKeys: new Set([0]) };
}

const CollapsibleButton = styled.button`
  background: ${props => (props.isActive ? 'palevioletred' : 'white')};
  cursor: pointer;
`;

const CollapsibleContent = styled.pre`
  margin: 2px 0;
`;

const AnimatedCollapsibleContent = posed.pre({
  active: { opacity: 1, top: 30 },
  inactive: { opacity: 0, top: 100 },
});

function CollapsibleItem({ item, index, isActive, direction, onItemClicked }) {
  return (
    <div>
      {isActive && direction === 'up' ? (
        <CollapsibleContent>{item.contents}</CollapsibleContent>
      ) : null}
      <CollapsibleButton
        isActive={isActive}
        onClick={() => onItemClicked(index)}>
        {item.title}
      </CollapsibleButton>
      {isActive && direction === 'down' ? (
        <CollapsibleContent>{item.contents}</CollapsibleContent>
      ) : null}
    </div>
  );
}

class Collapsible extends Component {
  static defaultProps = {
    stateReducer: normalCollapsibleReducer,
    onStateChange: () => {},
  };

  state = {
    activeKeys: new Set(this.props.activeKeys),
  };

  onItemClicked(index) {
    this.setState(
      (prev, { stateReducer }) => stateReducer(prev, { index }),
      this.props.onStateChanged,
    );
  }
  render() {
    const { direction = 'down', render } = this.props;
    const activeKeys = this.state.activeKeys;

    return render({
      activeKeys,
      direction,
      onItemClicked: this.onItemClicked.bind(this),
    });
  }
}

function Accordion(props) {
  return (
    <Collapsible
      {...props}
      render={({ activeKeys, direction, onItemClicked }) => (
        <div>
          {collapsibleItems.map((item, index) => (
            <CollapsibleItem
              key={index}
              item={item}
              index={index}
              direction={direction}
              isActive={activeKeys.has(index)}
              onItemClicked={onItemClicked}
            />
          ))}
        </div>
      )}
    />
  );
}

function Tabs(props) {
  return (
    <Collapsible
      activeKeys={[0]}
      {...props}
      stateReducer={ensureOneOpenedReducer}
      render={({ activeKeys, direction, onItemClicked }) => {
        const tabs = collapsibleItems.map((item, index) => (
          <CollapsibleButton
            key={index}
            isActive={activeKeys.has(index)}
            onClick={() => onItemClicked(index)}>
            {item.title}
          </CollapsibleButton>
        ));

        const contents = collapsibleItems.map(
          (item, index) =>
            activeKeys.has(index) ? (
              <CollapsibleContent key={index}>
                {item.contents}
              </CollapsibleContent>
            ) : null,
        );

        return (
          <div>
            {direction === 'up' ? contents : null}
            {tabs}
            {direction === 'down' ? contents : null}
          </div>
        );
      }}
    />
  );
}

function AnimatedTabs(props) {
  return (
    <Collapsible
      activeKeys={[0]}
      {...props}
      stateReducer={ensureOneOpenedReducer}
      render={({ activeKeys, direction, onItemClicked }) => {
        const tabs = collapsibleItems.map((item, index) => (
          <CollapsibleButton
            key={index}
            isActive={activeKeys.has(index)}
            onClick={() => onItemClicked(index)}>
            {item.title}
          </CollapsibleButton>
        ));

        const contents = collapsibleItems.map((item, index) => (
          <AnimatedCollapsibleContent
            key={index}
            pose={activeKeys.has(index) ? 'active' : 'inactive'}
            style={{ position: 'absolute' }}>
            {item.contents}
          </AnimatedCollapsibleContent>
        ));

        return (
          <div style={{ position: 'relative' }}>
            {direction === 'up' ? contents : null}
            {tabs}
            {direction === 'down' ? contents : null}
          </div>
        );
      }}
    />
  );
}

const DemoContainer = styled.div`
  text-align: left;
  margin-left: 40px;
`;

const DemoItem = styled.li`
  margin-bottom: 100px;
  list-style: none;
`;

export default function Demo() {
  const demos = [
    {
      demoTitle: 'Accordion: up',
      Component: Accordion,
      direction: 'up',
    },
    {
      demoTitle: 'Accordion: down',
      Component: Accordion,
      direction: 'down',
    },
    {
      demoTitle: 'Accordion: Single Opened',
      Component: Accordion,
      stateReducer: singleOpenedReducer,
    },
    {
      demoTitle: 'Tab: down',
      Component: Tabs,
      direction: 'down',
    },
    {
      demoTitle: 'Tab: up',
      Component: Tabs,
      direction: 'up',
    },
    {
      demoTitle: 'AnimatedTabs: down',
      Component: AnimatedTabs,
      direction: 'down',
    },
  ];
  return (
    <DemoContainer>
      {demos.map(({ demoTitle, Component, ...props }, index) => (
        <DemoItem key={index}>
          <h3>{demoTitle}</h3>
          <Component {...props} />
        </DemoItem>
      ))}
    </DemoContainer>
  );
}

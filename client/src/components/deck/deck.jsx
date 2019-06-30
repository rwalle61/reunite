import React from 'react';
import PropTypes from 'prop-types';

import Flex, { FlexItem } from 'mineral-ui/Flex';

import PersonCard from '../person-card';
import apiRequests from '../../utils/apiRequests';

const { flexStyle } = require('../../styles/flex-styles');

class Deck extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      choices: [],
      decisionId: null,
    };
  }

  componentDidMount = async () => {
    const { startingDecisionID } = this.props;
    const response = await this.getDeckChoices(startingDecisionID);
    this.setState({ choices: response.data.choices });
  }

  componentDidUpdate = async (prevProps, prevState) => {
    const { decisionId } = this.state;
    const { onError } = this.props;
    try {
      if (prevState && prevState.decisionId !== decisionId) {
        const response = await this.getDeckChoices(decisionId);
        this.setState({ choices: response.data.choices });
      }
    } catch (err) {
      onError();
    }
  }

  getDeckChoices = async decisionId => apiRequests.getChoices(decisionId)

  reactToCardClick = (nextDecisionId) => {
    const { onFailure } = this.props;
    if (nextDecisionId) {
      this.setState({ decisionId: nextDecisionId });
    } else {
      onFailure();
    }
  }

  reactToMatch = (personId) => {
    const { onMatch } = this.props;
    onMatch(personId);
  }

  renderChildren = (choices) => {
    const { onError } = this.props;
    const children = [];
    choices.forEach((choice) => {
      const personId = choice.persons_id;
      const nextDecisionId = choice.next_decision_id;
      children.push(
        <FlexItem key={personId} data-cy="deck">
          <PersonCard
            id={personId}
            onMatch={(() => this.reactToMatch(personId))}
            onClick={() => this.reactToCardClick(nextDecisionId)}
            onError={onError}
          />
        </FlexItem>,
      );
    });
    return children;
  }

  render = () => {
    const { choices } = this.state;
    return (
      <div className="cardContainer">
        <Flex
          wrap
          {...flexStyle}
        >
          {this.renderChildren(choices)}
        </Flex>
      </div>
    );
  }
}

Deck.defaultProps = {
  onFailure: () => {},
  onMatch: () => {},
  onError: () => {},
};

Deck.propTypes = {
  onError: PropTypes.func,
  onFailure: PropTypes.func,
  onMatch: PropTypes.func,
  startingDecisionID: PropTypes.string.isRequired,
};

export default Deck;

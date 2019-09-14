import React from 'react';

import PropTypes from 'prop-types';
import Flex, { FlexItem } from 'mineral-ui/Flex';
import Card, { CardImage, CardBlock } from 'mineral-ui/Card';

import IconNext from 'mineral-ui-icons/IconPlayCircleOutline';
import Button from 'mineral-ui/Button';

import Translate from '../../../locales/translate';

const { iconStyle } = require('../../../styles/icon-styles');
const { flexStyle } = require('../../../styles/flex-styles');
const { matchCardStyle, cardBlockStyle } = require('../../../styles/card-styles');
const { buttonStyle } = require('../../../styles/button-styles');
const { numPhotosInTotal } = require('../../../config');

const WelcomeCard = (props) => {
  const { moveOn } = props;
  const nextIcon = <IconNext style={iconStyle} />;

  return (
    <div className="singleCardContainer" data-cy="welcome-card">
      <Flex wrap {...flexStyle}>
        <FlexItem>
          <Card className="generalCard" style={matchCardStyle}>
            <CardImage className="logoImage" src="reunite-dark.svg" alt="gradient placeholder" />
            <CardBlock style={cardBlockStyle}>
              <p>
                {/* TODO: soft code this to the total number of photos. using sprintf? https://github.com/alexei/sprintf.js */}
                <Translate string="welcomePanel.message-1" />
              </p>
            </CardBlock>
            <CardBlock style={cardBlockStyle}>
              <p>
                <Translate string="welcomePanel.message-2" />
              </p>
            </CardBlock>
            <CardBlock>
              <p>
                <Translate string="welcomePanel.message-3" />
              </p>
            </CardBlock>
            <CardBlock>
              <p>
                <Translate string="welcomePanel.message-4" />
              </p>
            </CardBlock>
            <CardBlock style={cardBlockStyle}>
              <Button style={buttonStyle} data-cy="begin" iconStart={nextIcon} onClick={moveOn}>
                <Translate string="button.begin" />
              </Button>
            </CardBlock>
          </Card>
        </FlexItem>
      </Flex>
    </div>
  );
};

WelcomeCard.defaultProps = {
  moveOn: () => {},
};

WelcomeCard.propTypes = {
  moveOn: PropTypes.func,
};

export default WelcomeCard;

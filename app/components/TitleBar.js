import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

import { changeLanguage } from '../actions/language';
import translate from './Translate';

class TitleBar extends Component {
  render() {
    const { title, language, changeLanguage, strings } = this.props;
    return (
      <AppBar
        title={strings[title]}
        showMenuIconButton={false}
        iconElementRight={
          <IconMenu
            iconButtonElement={
              <IconButton><MoreVertIcon /></IconButton>
            }
            targetOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
            value={language}
            onChange={(ev, value) => { changeLanguage(value); }}
          >
            <MenuItem value="en" primaryText="English" />
            <MenuItem value="fr" primaryText="French" />
          </IconMenu>
        }
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    language: state.language
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ changeLanguage }, dispatch);
}

TitleBar.propTypes = {
  title: PropTypes.string.isRequired,
  language: PropTypes.string,
  changeLanguage: PropTypes.func,
  strings: PropTypes.object.isRequired
};
TitleBar.defaultProps = {
  language: 'en',
  changeLanguage: () => {},
};

export default compose(
                  translate('TitleBar'),
                  connect(mapStateToProps, mapDispatchToProps)
               )(TitleBar);

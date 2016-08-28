import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

import { changeLanguage } from '../actions/language';

class TitleBar extends Component {
  render() {
    const { title, language, changeLanguage } = this.props;
    return (
      <AppBar
        title={title}
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
};
TitleBar.defaultProps = {
  language: 'en',
  changeLanguage: () => {},
};

export default connect(mapStateToProps, mapDispatchToProps)(TitleBar);

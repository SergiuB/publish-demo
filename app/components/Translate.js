import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import en from '../i18n/en';
import fr from '../i18n/fr';

const languages = {
  en,
  fr
};

const translate = (key) => Component => {
  class TranslationComponent extends React.Component {
    render() {
      const { language, ...otherProps } = this.props;
      const strings = languages[language]
        ? languages[language][key]
        : languages.en[key]; // default to english
      return <Component {...otherProps} strings={strings} />;
    }
  }

  TranslationComponent.propTypes = {
    language: PropTypes.string
  };

  const mapStateToProps = (state) => {
    const { language } = state;
    return { language };
  };

  return connect(mapStateToProps)(TranslationComponent);
};

export default translate;

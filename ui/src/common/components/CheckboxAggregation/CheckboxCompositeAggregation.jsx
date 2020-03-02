import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import CheckboxAggregation from './CheckboxAggregation';

class CheckboxCompositeAggregation extends Component {
  constructor(props) {
    super(props);
    this.requestMoreData = this.requestMoreData.bind(this);
  }

  requestMoreData(selections, after) {
    // SEND NEW REQUEST WITH after
    const { onChange } = this.props;
    console.log('CALLING ONCHANGE');
    console.log(after);
    onChange(selections, after); // TODO change this
  }

  render() {
    return (
      <CheckboxAggregation
        requestMoreData={this.requestMoreData}
        {...this.props}
      />
    );
  }
}

CheckboxCompositeAggregation.propTypes = {
  onChange: PropTypes.func.isRequired,
  buckets: PropTypes.instanceOf(Immutable.List).isRequired,
  name: PropTypes.string.isRequired,
  splitDisplayName: PropTypes.bool,
  bucketHelp: PropTypes.object,
  selections: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.string,
  ]),
  afterKey: PropTypes.string,
};

CheckboxCompositeAggregation.defaultProps = {
  selections: null,
  splitDisplayName: false,
};

export default CheckboxCompositeAggregation;

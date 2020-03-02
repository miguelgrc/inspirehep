import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import CheckboxAggregation from './CheckboxAggregation';

function CheckboxSimpleAggregation(props) {
  return <CheckboxAggregation {...props} />;
}

CheckboxSimpleAggregation.propTypes = {
  onChange: PropTypes.func.isRequired,
  buckets: PropTypes.instanceOf(Immutable.List).isRequired,
  name: PropTypes.string.isRequired,
  splitDisplayName: PropTypes.bool,
  bucketHelp: PropTypes.object,
  selections: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.string,
  ]),
};

CheckboxSimpleAggregation.defaultProps = {
  selections: null,
  splitDisplayName: false,
};

export default CheckboxSimpleAggregation;

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import RangeAggregation from './RangeAggregation';
import MultiSelectAggregation from './MultiSelectAggregation';
import CheckboxCompositeAggregation from './CheckboxAggregation/CheckboxCompositeAggregation';
import CheckboxSimpleAggregation from './CheckboxAggregation/CheckboxSimpleAggregation';

class AggregationFilter extends Component {
  render() {
    const { aggregationType, ...aggregationProps } = this.props;
    switch (aggregationType) {
      case 'range':
        return <RangeAggregation {...aggregationProps} />;
      case 'multiselect':
        return <MultiSelectAggregation {...aggregationProps} />;
      case 'checkbox-composite':
        return <CheckboxCompositeAggregation {...aggregationProps} />;
      case 'checkbox':
      default:
        return <CheckboxSimpleAggregation {...aggregationProps} />;
    }
  }
}

AggregationFilter.propTypes = {
  aggregationType: PropTypes.oneOf([
    'range',
    'checkbox',
    'multiselect',
    'checkbox-composite',
  ]).isRequired,
};

export default AggregationFilter;

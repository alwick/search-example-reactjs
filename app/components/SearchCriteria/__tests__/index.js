import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import SearchCriteria from '../SearchCriteria.jsx';

describe('Search Criteria', function() {
  it('Renders the search box.', function() {
    const criteria = ReactTestUtils.renderIntoDocument(
      <SearchCriteria />
    );

    const searchText = criteria.refs.searchText;
    expect(searchText.props.type).to.equal('text');
    expect(searchText.props.placeholder).to.equal('Enter Search Text');
  });
});

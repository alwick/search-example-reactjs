import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import SearchCriteria from '../index.js';
import expect from 'expect';

describe('Search Criteria', function() {
  it('Renders the search box.', function() {
    const criteria = ReactTestUtils.renderIntoDocument(
      <SearchCriteria />
    );

    const searchText = criteria.refs.searchText;
    expect(searchText.type).toEqual('text');
    expect(searchText.placeholder).toEqual('Enter Search Text');
  });
});

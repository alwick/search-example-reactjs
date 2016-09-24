import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';
import Header from '../index';
import styles from '../style';
import expect from 'expect';

describe('Header', function() {
  it('displays the title', function() {
    const header = ReactTestUtils.renderIntoDocument(
      <Header />
    );

    const title = ReactTestUtils.findRenderedDOMComponentWithTag(header, 'h1');
    const dom = ReactDOM.findDOMNode(title);
    expect(dom.innerHTML).toEqual('Search Example');
  });
});

import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import SearchResults from '../index.js';
import expect from 'expect';

describe('Search Results', function() {
  it('Dont display anything if no results and not searching.', function() {
    const results = ReactTestUtils.renderIntoDocument(
      <SearchResults searching={false} results={[]}/>
    );

    const resultsObj = results.refs;
    expect(results.refs.children).toBe(undefined);
  });

  it('Display searching if searching indicator is <true>.', function() {
    const results = ReactTestUtils.renderIntoDocument(
        <SearchResults searching={true} results={[]}/>
    );

    const spinner = ReactTestUtils.findRenderedDOMComponentWithClass(results, 'fa-spinner');
    expect(spinner).toNotBe(undefined);
  });

  it('Display searching if searching indicator is <true> even if there are results.', function() {
    const results = ReactTestUtils.renderIntoDocument(
        <SearchResults searching={true} results={[{firstName:'Foo'}]}/>
    );

    const spinner = ReactTestUtils.findRenderedDOMComponentWithClass(results, 'fa-spinner');
    expect(spinner).toNotBe(undefined);
  });

  it('Display results if searching indicator is <false> and there are results.', function() {
    const results = ReactTestUtils.renderIntoDocument(
        <SearchResults searching={false} results={[{firstName:'Foo'}]}/>
    );

    const spinners = ReactTestUtils.scryRenderedDOMComponentsWithClass(results, 'fa-spinner');
    expect(spinners.length).toEqual(0);

    const itemsList = ReactTestUtils.findRenderedDOMComponentWithTag(results, 'ul');
    expect(itemsList).toExist();

    const item = ReactTestUtils.findRenderedDOMComponentWithTag(results, 'li');
    expect(item).toExist();
    expect(item.innerHTML).toEqual('Foo');
  });

  it('Display multiple results if searching indicator is <false> and there are results.', function() {
    const results = ReactTestUtils.renderIntoDocument(
        <SearchResults searching={false} results={[{firstName:'Foo'},{firstName:'Another One'}]}/>
    );

    const spinners = ReactTestUtils.scryRenderedDOMComponentsWithClass(results, 'fa-spinner');
    expect(spinners.length).toEqual(0);

    const itemsList = ReactTestUtils.findRenderedDOMComponentWithTag(results, 'ul');
    expect(itemsList).toExist();

    const items = ReactTestUtils.scryRenderedDOMComponentsWithTag(results, 'li');
    expect(items[0].innerHTML).toEqual('Foo');
    expect(items[1].innerHTML).toEqual('Another One');
  });
});

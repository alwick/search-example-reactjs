import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import SearchResults from '../SearchResults.jsx';

describe('Search Results', function() {
  it('Dont display anything if no results and not searching.', function() {
    const results = ReactTestUtils.renderIntoDocument(
      <SearchResults searching={false} results={[]}/>
    );

    const resultsObj = results.refs;
    expect(results.refs.children).to.be.undefined;
  });

  it('Display searching if searching indicator is <true>.', function() {
    const results = ReactTestUtils.renderIntoDocument(
        <SearchResults searching={true} results={[]}/>
    );

    const spinner = ReactTestUtils.findRenderedDOMComponentWithClass(results, 'fa-spinner');
    expect(spinner).to.not.be.undefined;
  });

  it('Display searching if searching indicator is <true> even if there are results.', function() {
    const results = ReactTestUtils.renderIntoDocument(
        <SearchResults searching={true} results={[{firstName:'Foo'}]}/>
    );

    const spinner = ReactTestUtils.findRenderedDOMComponentWithClass(results, 'fa-spinner');
    expect(spinner).to.not.be.undefined;
  });

  it('Display results if searching indicator is <false> and there are results.', function() {
    const results = ReactTestUtils.renderIntoDocument(
        <SearchResults searching={false} results={[{firstName:'Foo'}]}/>
    );

    const spinners = ReactTestUtils.scryRenderedDOMComponentsWithClass(results, 'fa-spinner');
    expect(spinners).to.be.empty;

    const itemsList = ReactTestUtils.findRenderedDOMComponentWithTag(results, 'ul');
    expect(itemsList).to.not.be.empty;

    const item = ReactTestUtils.findRenderedDOMComponentWithTag(results, 'li');
    expect(item).to.not.be.empty;
    expect(item.props.children).to.equal('Foo');
  });

  it('Display multiple results if searching indicator is <false> and there are results.', function() {
    const results = ReactTestUtils.renderIntoDocument(
        <SearchResults searching={false} results={[{firstName:'Foo'},{firstName:'Another One'}]}/>
    );

    const spinners = ReactTestUtils.scryRenderedDOMComponentsWithClass(results, 'fa-spinner');
    expect(spinners).to.be.empty;

    const itemsList = ReactTestUtils.findRenderedDOMComponentWithTag(results, 'ul');
    expect(itemsList).to.not.be.empty;

    const items = ReactTestUtils.scryRenderedDOMComponentsWithTag(results, 'li');
    console.log(items);
    expect(items[0].props.children).to.equal('Foo');
    expect(items[1].props.children).to.equal('Another One');
  });
});

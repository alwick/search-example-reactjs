import React from 'react';
import render from '../../render';
import {TApplication as Application} from '../index';
import expect from 'expect';

describe('Application Component', function() {
  const props = {}
  it('displays the component', function() {
    const {output} = render(<Application {...props}/>);

    expect(output.props.children.type).toEqual('div');
  });
});

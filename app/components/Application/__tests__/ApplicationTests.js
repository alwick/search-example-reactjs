import React from 'react';
import render from '../../render';
import {TApplication as Application} from '../Application';

describe('Application', function() {
  const props = {}
  it('displays the component', function() {
    const {output} = render(<Application {...props}/>);

    expect(output.props.children.length).to.equal(1);
  });
});

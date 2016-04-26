import React from 'react';
import render from '../../render';
import {TApplication as Application} from '../Application';

describe('Application Component', function() {
  const props = {}
  it('displays the component', function() {
    const {output} = render(<Application {...props}/>);

    expect(output.props.children.type).to.equal('div');
  });
});

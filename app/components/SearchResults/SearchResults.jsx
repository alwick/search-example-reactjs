import React from 'react';

/**
 * Import locally scoped styles using css-loader
 * See style.sass in this directory.
 *
 * More info: https://github.com/webpack/css-loader#local-scope
 */
import styles from './style';
import {Panel,Row,Col,Button,Input,ListGroup,ListGroupItem} from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

export default class SearchResults extends React.Component {

    render() {
        const {results,searching} = this.props;

        return (
            <Panel header="Search Results">
                <Row>
                    {searching ?
                        <FontAwesome spin name="spinner"/> :
                        <ListGroup fill>
                            {results.map((result, index) => {
                                return <ListGroupItem key={'result-'+index}>{result.firstName}</ListGroupItem>;
                            })}
                        </ListGroup>
                    }
                </Row>
            </Panel>
        );
    }
}

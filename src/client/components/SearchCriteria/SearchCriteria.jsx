import React from 'react';

/**
 * Import locally scoped styles using css-loader
 * See style.sass in this directory.
 *
 * More info: https://github.com/webpack/css-loader#local-scope
 */
import styles from './style';
import {Panel,Row,Col,Button,Input} from 'react-bootstrap';

export default class SearchCriteria extends React.Component {

    search() {
        const {dispatch,actions} = this.props;

        dispatch( actions.onSearch( this.refs.searchText.getValue() ));
    }

    render() {
        const search = this.search.bind(this);

        return (
            <Panel header="Search Criteria">
                <Row>
                    <Col xs={6} md={8}>
                        <Input ref="searchText" type="text" placeholder="Enter Search Text"/>
                    </Col>
                    <Col xs={6} md={4}>
                        <Button onClick={search}>Go</Button>
                    </Col>
                </Row>
            </Panel>
        );
    }
}

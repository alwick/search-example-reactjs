import React from 'react';
import Header from '../Header/Header';
import SearchCriteria from '../SearchCriteria/SearchCriteria';
import SearchResults from '../SearchResults/SearchResults';
import {connect} from 'react-redux';
import {Grid,Row,Col} from 'react-bootstrap';
import {onSearch} from './applicationActions';

/**
 * Import locally scoped styles using css-loader
 * See style.sass in this directory.
 *
 * More info: https://github.com/webpack/css-loader#local-scope
 */
import styles from './style';

export default class Application extends React.Component {
  render() {
    const {dispatch,searching,results} = this.props;

    return <div className={styles.main}>
      <div className={styles.wrap}>
        <Header />

        <main className={styles.body}>
          <Grid fluid={true}>
            <Row>
              <p>Enter search criteria, then press the <b>Go</b> button to get the results from the server.</p>
            </Row>
            <Row>
                <SearchCriteria
                    actions={{onSearch: (criteria) => { dispatch( onSearch(criteria) )}}}
                />
            </Row>
            <Row>
                <SearchResults results={results} searching={searching}/>
            </Row>
          </Grid>
        </main>
      </div>
    </div>;
  }
}

function mapStateToProps(state) {
  return {
    results: state.application.results,
    searching: state.application.searching,
  };
}
export default connect(mapStateToProps)(Application);
export {Application as TApplication};

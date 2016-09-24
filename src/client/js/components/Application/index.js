import React from 'react';
import {bindActionCreators} from 'redux';
import Header from '../Header/index';
import SearchCriteria from '../SearchCriteria';
import SearchResults from '../SearchResults';
import {connect} from 'react-redux';
import {Grid,Row,Col} from 'react-bootstrap';
import * as ApplicationActions from './applicationActions';

/**
 * Import locally scoped styles using scss-loader
 * See style.sass in this directory.
 *
 * More info: https://github.com/webpack/css-loader#local-scope
 */
import styles from './style';

export class Application extends React.Component {
  render() {
    const {searching,results,actions} = this.props;

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
                    actions={{onSearch: (criteria) => { actions.onSearch(criteria) }}}
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
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(ApplicationActions, dispatch),
});

export default connect(mapStateToProps,mapDispatchToProps)(Application);
export {Application as TApplication};

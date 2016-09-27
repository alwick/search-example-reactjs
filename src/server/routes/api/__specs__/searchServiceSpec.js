import expect from 'expect';
import searchService from '../searchService';

describe('searchServiceTest', ()=> {
    afterEach(() => {
        expect.restoreSpies()
    })

    it('Search should return result if a match', (done)=> {
        searchService.handleRequest(
            {query: {criteria:'foo'}},
            {send: (results) => {
                expect(results.length).toEqual(1);
                expect(results[0].lastName).toEqual('Bar');
                done();
            }});
    });
});
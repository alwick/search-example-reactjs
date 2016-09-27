import superagent from 'superagent';
import expect from 'expect';
import request from 'supertest';
import bodyParser from 'body-parser';
import app from '../../app';

describe('searchServiceTest', ()=> {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));

    afterEach(() => {
        expect.restoreSpies()
    })

    it('Should return the html if no cookie set', (done)=> {
        request(app)
            .get('/api/search?criteria=foo')
            .expect('Content-Type', /html/)
            .expect(200)
            .end((err, result) => {
                const results = result.body;
                expect(results.length).toEqual(1, 'Should return 1 result.');
                done();
            });
    });
});
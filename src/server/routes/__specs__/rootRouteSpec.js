import expect from 'expect';
import request from 'supertest';
import bodyParser from 'body-parser';
import app from '../../app';

describe('rootServiceTest', ()=> {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));

    afterEach(() => {
        expect.restoreSpies()
    })

    it('Should return the html if no cookie set', (done)=> {
        request(app)
            .get('/')
            .expect('Content-Type', /html/)
            .expect(200)
            .end((err, result) => {
                expect(result.text.indexOf('<html>')).toBeGreaterThan(0, 'Should return html.');
                done();
            });
    });
});
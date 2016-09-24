import {Router} from 'express';
import useragent from 'useragent';
import fs from 'fs';
import AppShell from '../components/AppShell';
import UnsupportedBrowser from '../components/UnsupportedBrowser';

const router = Router();// eslint-disable-line

let assetManifest;

router.get('/', (req, res) => {
    const ua = useragent.is(req.headers['user-agent']);
    const meta = {
        title: 'Wickidcool Table Sorting Example',
        ua
    };

    if (!assetManifest) {
        assetManifest = JSON.parse(fs.readFileSync('./build/static/asset-manifest.json', 'utf8'));
    }

    /* eslint-disable */
    const html = (ua.ie && ua.version < 10) ?
        UnsupportedBrowser() :
        AppShell(assetManifest,meta);
    /* eslint-enable */
    res.send(html);
});

export default router;

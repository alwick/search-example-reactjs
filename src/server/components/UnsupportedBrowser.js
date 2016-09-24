/*eslint-disable*/
import {minify} from 'html-tagged-literals';

const UnsupportedHtml = () => {

    return minify `<!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Browser Not Supported</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
      </head>
      <body>
        <div id="browser-check-overlay"></div>
        <div id="browser-check" class="alert alert-warning">
            <img alt="Northwestern Mutual Logo" src="data:image/png;base64,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" />
            <div id="browser-check-inner">
                <h1>Your browser is no longer supported.</h1>
                <p><strong>We no longer support your version of Internet Explorer (9 or below).</strong></p><br/>
                <p>For better security and a better online experience, upgrade to the latest version of <a href="http://www.microsoft.com/windows/internet-explorer/" class="external-link" target="_blank">Internet Explorer</a> (10 or higher).
                <br/><br/>
                <p>Once installation is complete you will need to log in again.</p>
                <br/>
            </div>
        </div>
        <style>
            #browser-check-inner {
                margin: 0 auto;
                padding: 2em 4em 7em 4em;
            }

            #browser-check-inner h1 {
                font-size: 25px;
            }

            #browser-check-inner p {
                margin: 5px;
                font-style: normal;
            }

            #browser-check-inner strong {
                font-size: 1.2em;
                font-style: normal;
            }

            #browser-check-inner a, #browser-check-inner a:visited {
                border-bottom: none;
                font-style: normal;
            }

            #browser-check-inner .button {
                padding: 1em 1.5em;
            }

            #browser-check {
                background-color: white;
                border-radius: 5px;
                position: fixed;
                top: 9em;
                left: 30%;
                width: 45%;
                z-index: 10000;
            }

            #browser-check img {
                    width: 18em;
                    position: absolute;
                    bottom: 3em;
                    right: 2em;
            }

            #browser-check-overlay {
                background-color: #444;
                opacity: .8;

                height: 100%;
                width: 100%;
                top:0;
                left:0;
                position: fixed;
                z-index: 9999;
            }
        </style>
      </body>
    </html>`;
};

module.exports = UnsupportedHtml;

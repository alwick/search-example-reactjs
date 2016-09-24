import {minify} from 'html-tagged-literals';

const AppShell = (assetManifest,meta) => {
    const hasPreload = (meta.ua.chrome);
    const {vendor, main} = assetManifest;

    return minify`
    <!DOCTYPE html>
    <html>
        <head>
          <meta charset="utf-8">
          <title>${meta.title}</title>
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">
          ${hasPreload ? `
              <link rel="preload" href="${vendor.js}" as="script">
              <link rel="preload" href="${main.js}" as="script">
              ${main.css ? `<link rel="preload" href="${main.css}" as="style">` : ''}
          ` : `
              <link rel="prefetch" href="${vendor.js}">
              <link rel="prefetch" href="${main.js}">
              ${main.css ? `<link rel="prefetch" href="${main.css}">` : ''}
          `}
            ${main.css ? `<link rel="stylesheet" href="${main.css}">` : ''}
            <link rel="icon" href="/favicon/favicon.ico">
        </head>
        <body>
            <div id="app"></div>

            <script src="${vendor.js}"></script>
            <script src="${main.js}"></script>
        </body>
    </html>`;
};

export default AppShell;

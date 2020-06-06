const fs = require("fs");
const path = require("path");


module.exports = {
    // extraWatchFiles: ["**/*.md", "**/*.vue"],
    title: "SAINT-CLAIR SAINT-GUENOLE",
    locales: {
        '/': {
            lang: 'fr-FR',
            title: 'SAINT-CLAIR SAINT-GUENOLE',
            description: 'Livret de prières et de chants.'
        }
    },
    head: [
        ['link', { rel: 'icon', href: `/logo.png` }],
        ['link', { rel: 'manifest', href: '/manifest.json' }],
        ['link', { rel: 'canonical', href: 'https://saintclair-saintguenole.netlify.app' }],
        ['meta', { name: 'theme-color', content: '#ffffff' }],
        ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
        ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'white' }],
        ['link', { rel: 'apple-touch-icon', href: `/icons/apple-touch-icon-152x152.png` }],
        ['link', { rel: 'mask-icon', href: '/icons/safari-pinned-tab.svg', color: '#ffffff' }],
        ['meta', { name: 'msapplication-TileImage', content: '/icons/msapplication-icon-144x144.png' }],
        ['meta', { name: 'msapplication-TileColor', content: '#2b5797' }],
        ['link', { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300&display=swap' }],
        ['link', { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Oswald:700&display=swap' }]
    ],
    plugins: [
        [
        'sitemap', { hostname: 'https://saintclair-saintguenole.netlify.app'}
        ],
        [
          '@vuepress/google-analytics',
          { ga: '' }
        ],
        ['@vuepress/pwa', {
          serviceWorker: true,
          updatePopup: true
        }
        ],
        ['@vuepress/back-to-top']
    ],
    themeConfig: {
        //host: 'localhost',
        docsDir: 'pages',
        logo: '',
        smoothScroll: true,
        nav: [{
                text: 'Chants',
                link: '/chants/'
            },
            {
                text: 'Prières',
                link: '/prieres/'
            },
            {
                text: 'Aide',
                link: '/pages/'
            }
        ],
        sidebar: {
          "/chants/": getSideBar("chants", "Carnet de chants"),
          "/prieres/": getSideBar("prieres", "Carnet de prières"),
          "/pages/": getSideBar("pages", "Besoin d'aide")
        },
        searchPlaceholder: 'Rechercher'
    }
}




function getSideBar(folder, title) {
  const extension = [".md"];

  const files = fs
    .readdirSync(path.join(`${__dirname}/../${folder}`))
    .filter(
      item =>
        item.toLowerCase() != "readme.md" &&
        fs.statSync(path.join(`${__dirname}/../${folder}`, item)).isFile() &&
        extension.includes(path.extname(item))
    );

  return [{ title: title, children: ["", ...files] }];
}

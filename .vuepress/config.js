module.exports = {
    // extraWatchFiles: ["**/*.md", "**/*.vue"],
    title: "SAINT-CLAIR SAINT-GUENOLE",
    locales: {
        '/': {
            lang: 'fr-FR',
            title: 'SAINT-CLERC SAINT-GUENOLE',
            description: 'Carnet de chants.'
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
          { ga: 'UA-12345678-9' }
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
        logo: '/logo.png',
        smoothScroll: true,
        nav: [{
                text: 'Nos prestations',
                link: '/pages/'
            },
            {
                text: 'Mentions légales',
                link: '/pages/mentions-legales.html'
            }
        ],
        sidebar: {
          '/pages/': getGuideSidebar('Chants', 'Advanced'),
        }
        searchPlaceholder: 'Rechercher'
    }
}


function getGuideSidebar (groupA, groupB) {
  return [
    {
      title: groupA,
      collapsable: false,
      children: [
        '',
        'getting-started',
        'directory-structure',
        'basic-config',
        'assets',
        'markdown',
        'using-vue',
        'i18n',
        'deploy'
      ]
    },
    {
      title: groupB,
      collapsable: false,
      children: [
        'frontmatter',
        'permalinks',
        'markdown-slot',
        'global-computed'
      ]
    }
  ]
}

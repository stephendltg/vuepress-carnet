'use strict'

/**
 * Name: Serveur http
 * Description: Serveur http de fichier statique
 * Main Module: JUNO06
 * Author: Epyo - stephen
 * Version: 1.0
 */

const server = require('http');
const url = require('url')
const fs = require('fs')
const path = require('path')

/** --------------------------------------------------------------------------------------------- */
/** CONFIGURATION
/** --------------------------------------------------------------------------------------------- */

const port = 3010
const ipServer = 'localhost'
const contentDir = '/.vuepress/dist'
const mimeType = {
  '.ico': 'image/x-icon',
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.xml': 'application/xml',
  '.css': 'text/css',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.wav': 'audio/wav',
  '.mp3': 'audio/mpeg',
  '.weba': 'audio/webm',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.mpeg': 'video/mpeg',
  '.svg': 'image/svg+xml',
  '.pdf': 'application/pdf',
  '.doc': 'application/msword',
  '.eot': 'application/vnd.ms-fontobject',
  '.ttf': 'application/font-sfnt',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.zip': 'application/zip'
}

/** --------------------------------------------------------------------------------------------- */
/** SERVER HTTP
/** --------------------------------------------------------------------------------------------- */

server.createServer( function (req, res) {
 
  res.removeHeader('Content-Encoding')
  res.setHeader('X-XSS-Protection', '1; mode=block')
  res.removeHeader('X-Powered-By')
  res.setHeader('X-Content-Type-Options', 'nosniff')
  res.setHeader('Access-Control-Allow-Origin', '*')

 

  /**
     *  REQUEST
     *
     */

  // découpe l'URL
  const parsedUrl = url.parse(req.url)

  // Extrait le chemin de l'URL
  let pathname = `.${contentDir + parsedUrl.pathname}`

 
  fs.exists(pathname, function (exist) {
    if (!exist) {
      // si le fichier n'existe pas, renvoie 404
      res.statusCode = 404
      res.end(`:-( 404 - File ${pathname.replace(/\.*$/, '')} not found !`)
      return
    }

    // s'il s'agit d'un répertoire, on tente d'y trouver un fichier index.html
    if (fs.statSync(pathname).isDirectory()) {
      pathname += '/index.html'
    }

    // lecture du fichier local
    fs.readFile(pathname, null, function (err, data) {
      if (err) {
        res.statusCode = 500
        res.end(`:-( 500- Error getting the file: ${err}.`)
      } else {
        // extraction du suffixe de fichier selon le chemin basé sur l'URL fournie. ex. .js, .doc, ...
        const ext = path.parse(pathname).ext

        // si le fichier est trouvé, définit le content-type et envoie les données
        res.setHeader('Content-type', mimeType[ext] || 'text/plain')
        console.log(pathname)
        res.end(data)
      }
    })
  })
}).listen(parseInt(port), () => {
  console.log(`Node.js server is ready, listening on http://${ipServer}:${port} `)
})

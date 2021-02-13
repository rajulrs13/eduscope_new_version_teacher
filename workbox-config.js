module.exports = {
  "globDirectory": "dist/",
  "globPatterns": [
    "**/*.{html,css,jpeg,jpg,js,map}"
  ],
  "swDest": "dist/sw.js",
  "swSrc": "src-sw.js",
  maximumFileSizeToCacheInBytes: 7000000
};
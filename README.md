[![Netlify Status](https://api.netlify.com/api/v1/badges/33082393-0ebf-49ac-b6c6-8b2b2688a485/deploy-status)](https://app.netlify.com/sites/distracted-kilby-30f83b/deploys)

Personal Resume
===============
Source Code for LouiseHermosa.com resume page.

![preview](preview.png)

## For Development
The following must be installed globally
- `npm i -g bower` - [Bower](https://bower.io/) to rewrite dependencies in `bower.json`
- `npm i -g gulp-cli` - [Gulp CLI](https://gulpjs.com/) to run Gulp 4

```bash
# install dependencies
npm install
npm run bower

# compile files, run local server, and watch files for changes
gulp develop
```

## For Production
```bash
npm install && npm run prod
```

Then serve `dist/` folder.

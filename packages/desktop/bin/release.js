const path = require('path');
const fs = require('fs');
const packager = require('electron-packager');
const pkg = require('../package');

const CWD = path.resolve(__dirname, '../');

//electron-packager . Mditor --ignore='node_modules' --overwrite --out=release  --icon=./design/icon.icns
packager({
  name: 'Mditor',
  appBundleId: 'net.xhou.mditor',
  appCategoryType: 'public.app-category.utilities',
  dir: CWD,
  out: `${CWD}/release`,
  appVersion: pkg.version,
  arch: 'x64',
  icon: `${CWD}/design/icon.icns`,
  overwrite: true,
  electronVersion: '1.6.2',
  platform: "darwin",
  "osx-sign": {
    type: "distribution"
  },
  'extend-info': `${__dirname}/info.plist`,
  ignore: [
    /node_modules/,
    /design/,
    /docs/,
    /release/,
    /test/,
    /bin/,
    /(\.DS_Store|\.babelrc|\.eslintrc\.yml|electron-builder\.yml|server\.yml|ignore|\.conf\.js|\.rename|\.config\.js|\.map|jasmine\.json)$/
  ]
}, function (err, appPaths) {
  if (err) console.error(err);
  console.log('packaged', appPaths);

  //处理 deps
  let pkgFile = path.resolve(__dirname, '../release/Mditor-darwin-x64/Mditor.app/Contents/Resources/app/package.json');
  let buffer = fs.readFileSync(pkgFile);
  let pkgObj = JSON.parse(buffer.toString());
  delete pkgObj.devDependencies;
  delete pkgObj.scripts;
  delete pkgObj.dev;
  fs.writeFile(pkgFile, JSON.stringify(pkgObj, null, 2));

});
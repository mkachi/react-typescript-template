# react-typescript-template
My react-typescript project template

## Scripts

* **build** : webpack build project
* **develop** : start webpack-dev-server
* **proxy** : start webpack-dev-server and proxy server for external access
* **lint** : eslint rule check
* **lint-fix** : modify the code to eslint rules

## Config

`scripts/config.js`

* **src** : source code directory path
* **out** : build result directory path
* **assets** : assets directory path
* **public** : public directory path
* **showLintError** : Whether to show errors according to eslint rules
* **useLint** : Whether eslint rules are checked
* **useAnalyzer** : Whether to use bundle size visualization in development
* **useAnalyzerReport** : Whether to use bundle reports in production builds
* **usePWA** : Whether to use PWA settings
* **useCompression** : Whether to use gzip compression
* **extractCSS** : Use separate css file
* **copyAssets** : List of files to be copied from public folder to build folder
* **`assets`**
  * **imageLimit** : image bundle size limit
  * **fontLimit** : font bundle size limit
  * **videoLimit** : video bundle size limit
  * **audioLimit** : audio bundle size limit
* **`devServer`**
  * **host** : development server host
  * **port** : development server port
  * **proxy** : development server proxy port
  * **open** : open development server
* **`analyzer`**
  * **host** : analyzer page server host
  * **port** : analyzer page server port
* **`alias`** : path alias, Also define it in your `tsconfig.json > compilerOptions > paths`
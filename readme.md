# 🦄 superlogs-loader
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-2-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->
SuperLogs webpack loader for [webpack](https://webpack.js.org/)

Superlogs is a super logical logging solution.

This package will find and replace doccomments with superlogs at build time.

## Install:

```bash
$ npm install --save-dev superlogs-loader
```

or using yarn

```bash
$ yarn add superlogs-loader --dev
```

## Configuration:

In your `webpack.config.js`:

```javascript
module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.ts?$/,
        loader: 'superlogs-loader',
        options: {
          
        }
      }
    ]
  }
}
```

or for `razzle` 
```js
module.exports = {
  // ...
  modify: (config, { target, dev }, webpack) => {
    config.module.rules.push(
      {
        test: /\.ts?$/,
        loader: 'superlogs-loader',
        options: {
          
        }
      }
    );
  }
}  
```

## Usage
### method
In your target file
```js
/**
 * @method method description
 */
```

This will be replaced after build with `superlogs`
```js
logs.addMethod('method description');

```

### step
In your target file
```js
/**
 * @step step description
 */
```

This will be replaced after build with `superlogs`
```js
logs.addStep('step description');

```

### data
In your target file
```js
/**
 * @data debugVar
 */
```

This will be replaced after build with `superlogs`
```js
logs.addData('debugVar', debugVar);

```

### mongo
In your target file
```js
/**
 * @mongo mongo description
 */
```

This will be replaced after build with `superlogs`
```js
logs.addMongo('mongo description');

```

### dispatch
In your target file
```js
/**
 * @dispatch dispatch type
 * @payload setPayload(true)
 */
```

This will be replaced after build with `superlogs`
```js
logs.addDispatch('dispatch description', setPayload(true));

```


---

## Contributing:

Feel free to open issues to propose stuff and participate. 

Pull requests are also welcome.

## Licence:

[MIT](http://en.wikipedia.org/wiki/MIT_License)

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://aganglada.com"><img src="https://avatars.githubusercontent.com/u/922348?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Alejandro Garcia Anglada</b></sub></a><br /><a href="https://github.com/aganglada/superlogs-loader/commits?author=aganglada" title="Code">💻</a> <a href="#ideas-aganglada" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://github.com/mathiasscheffe"><img src="https://avatars.githubusercontent.com/u/62892503?v=4?s=100" width="100px;" alt=""/><br /><sub><b>mathiasscheffe</b></sub></a><br /><a href="https://github.com/aganglada/superlogs-loader/commits?author=mathiasscheffe" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

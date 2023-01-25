# @kult/core

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![GitHub Issues](https://img.shields.io/github/issues/michael616kriel/kult-core.svg)](https://github.com/michael616kriel/kult-core/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/michael616kriel/kult-core.svg)](https://github.com/michael616kriel/kult-core/pulls)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

</div>


Kult core is a open-source framework for developing NodeJs applications and API's.

Have a look at our [docs](https://michael616kriel.github.io/kult-docs/) for more information.

## Installation

yarn:
```
yarn add @kult/core @kult/cli
```

NPM:
```
npm i @kult/core @kult/cli
```

## Usage

### Create a application:
/src/index.ts
```typescript
import { Application } from '@kult/core';

const app = new Application();
app.start();
```
 
### Create a controller:
/src/app/controllers/hello.controller.ts
```typescript
import { KultController, Get, Post, Put, Delete } from '@kult/core';

@KultController()
class HelloController {
  @Get('/user')
  get() {
    return 'Hello World';
  }

  @Post('/user')
  post() {
    return 'Hello World';
  }

  @Put('/user')
  put() {
    return 'Hello World';
  }

  @Delete('/user')
  delete() {
    return 'Hello World';
  }
}

export default HelloController;
```

### Create a plugin:
/src/plugins/logger/index.ts
```typescript
import { KultPlugin } from '@kult/core';

@KultPlugin('Logger')
export default class Logger {
  constructor() {
    // Do something here...
  }
}
```

## Environment Variables

Server:
```
PORT=3000
```

Database:
```
DATABASE_TYPE='postgres'
DATABASE_HOST='localhost'
DATABASE_PORT=5444
DATABASE_USERNAME='admin'
DATABASE_PASWWORD='admin'
DATABASE_DATABASE='development'
```

## Running
yarn:
```
yarn dev
```

NPM:
```
npm run dev
```

## Building
yarn:
```
yarn build
```

NPM:
```
npm run build
```

## Built Using <a name = "built_using"></a>

- [KoaJs](https://koajs.com/) 
- [TypeOrm](https://typeorm.io/) 
- [NodeJs](https://nodejs.org/en/) 
- [TypeScript](https://www.typescriptlang.org/) 

## Authors <a name = "authors"></a>

- [@michael616kriel](https://github.com/michael616kriel) - Idea & Initial work

See also the list of [contributors](https://github.com/michael616kriel/kult-core/contributors) who participated in this project.
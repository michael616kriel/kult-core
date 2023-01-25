# @kult/core

Kult core is a open-source framework for developing NodeJs applications and API's.


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
import { Controller, Get, Post, Put, Delete } from '@kult/core';

@Controller()
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
import { NovaPlugin } from '@kult/core';

@NovaPlugin('Logger')
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

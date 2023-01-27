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


### Project folder structure
- `src/app`
  - `/models`
  - `/controllers`
- `src/config`
  - `server.ts`
  - `database.ts`
  - `plugins.ts`
- `src/plugins`
- `src/index.ts`

### Application:

```typescript
import { Application } from '@kult/core';

const app = new Application();
app.start();
```
 
### Controllers:

```typescript
import { KultController, Get, Application, ControllerBase, Context } from '@kult/core';

@KultController('/users')
class UserController extends ControllerBase {

  constructor(app: Application) {
    super(app);
  }

  @Get('/find')
  find(ctx: Context) {
    return 'Hello World';
  }

  @Post('/update')
  post(ctx: Context) {
    return 'Hello World';
  }

  @Put('/create')
  put(ctx: Context) {
    return 'Hello World';
  }

  @Delete('/remove')
  delete(ctx: Context) {
    return 'Hello World';
  }
}

export default UserController;
```

### Create a plugin:

```typescript
import { Application, KultPlugin, PluginBase } from '@kult/core';

@KultPlugin('Logger')
export default class Logger extends PluginBase {
  constructor(app: Application) {
    super(app)
  }
}
```

### Environment Variables

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
DATABASE_PASSWORD='admin'
DATABASE_DATABASE='development'
```

### Database Models

```typescript title="src/app/model/user.model.ts"
import { Column, Entity } from 'typeorm';

@Entity()
export default class User {
  @Column({ primary: true })
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  filename: string;

  @Column()
  views: number;

  @Column()
  isPublished: boolean;
}
```

### Model Respositories

```typescript title="src/app/controllers/user.controller.ts"
import {
  KultController,
  Get,
  Application,
  ControllerBase,
  Context,
} from '@kult/core';
import User from '../models/user.model';

@KultController('/users')
class UserController extends ControllerBase {

  constructor(app: Application) {
    super(app);
  }

  @Get('/find')
  async find(ctx: Context) {
    const { datasource } = this.app.database;
    const users = await datasource?.getRepository(User).find();
    return users;
  }
  
}

export default UserController;
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

## Examples
  - [Plugin template](https://github.com/michael616kriel/kult-plugin-template)
  - [Project template](https://github.com/michael616kriel/kult-template)
  - [Todo application](https://github.com/michael616kriel/kult-todo-example)

## Community
  - [Discord](https://discord.gg/dRwGqHvE)
 
## Built Using <a name = "built_using"></a>

- [KoaJs](https://koajs.com/) 
- [TypeOrm](https://typeorm.io/) 
- [NodeJs](https://nodejs.org/en/) 
- [TypeScript](https://www.typescriptlang.org/) 

## Authors <a name = "authors"></a>

- [@michael616kriel](https://github.com/michael616kriel) - Idea & Initial work

See also the list of [contributors](https://github.com/michael616kriel/kult-core/contributors) who participated in this project.
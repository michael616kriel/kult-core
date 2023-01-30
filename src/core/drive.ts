import {
  existsSync,
  readFileSync,
  rmdirSync,
  rmSync,
  statSync,
  writeFileSync,
} from 'fs';
import { join } from 'path';
import { getProjectRoot } from 'utils/helpers';

export class Drive {
  static remove(path: string) {
    const root = getProjectRoot();
    const relativePath = join(root, path);
    if (existsSync(relativePath)) {
      const stats = statSync(relativePath);
      if (stats.isFile()) {
        rmSync(relativePath);
      }
      if (stats.isDirectory()) {
        rmdirSync(relativePath);
      }
    }
  }

  static read(path: string) {
    const root = getProjectRoot();
    const relativePath = join(root, path);
    return readFileSync(relativePath);
  }

  static write(path: string, content: string | NodeJS.ArrayBufferView) {
    const root = getProjectRoot();
    const relativePath = join(root, path);
    writeFileSync(relativePath, content);
  }
}

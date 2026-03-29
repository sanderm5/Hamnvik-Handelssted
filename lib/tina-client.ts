import fs from 'fs';
import path from 'path';
import YAML from 'yaml';

const contentDir = path.join(process.cwd(), 'content');

export function readYaml<T = Record<string, unknown>>(collection: string, filename: string): T {
  const filePath = path.join(contentDir, collection, `${filename}.yaml`);
  const raw = fs.readFileSync(filePath, 'utf-8');
  return YAML.parse(raw) as T;
}

export function readAllYaml<T = Record<string, unknown>>(collection: string): Array<T & { _filename: string }> {
  const dir = path.join(contentDir, collection);
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.yaml'));
  return files.map(f => {
    const raw = fs.readFileSync(path.join(dir, f), 'utf-8');
    const data = YAML.parse(raw) as T;
    return { ...data, _filename: f.replace('.yaml', '') };
  });
}

export function readPage<T = Record<string, unknown>>(pageName: string, locale: string = 'nb'): T {
  const filename = locale === 'en' ? `${pageName}.en` : pageName;
  return readYaml<T>('pages', filename);
}

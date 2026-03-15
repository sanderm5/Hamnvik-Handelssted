import fs from 'node:fs';
import path from 'node:path';
import { parse } from 'yaml';

const contentDir = path.join(process.cwd(), 'src/content');

function readYaml<T>(filePath: string): T {
  try {
    const raw = fs.readFileSync(filePath, 'utf-8');
    return parse(raw) as T;
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    throw new Error(`Kunne ikke lese innholdsfil: ${filePath}\n${message}`);
  }
}

function readCollection<T>(dirName: string): Array<{ slug: string; entry: T }> {
  const dir = path.join(contentDir, dirName);
  try {
    return fs.readdirSync(dir)
      .filter((f) => f.endsWith('.yaml'))
      .map((f) => ({
        slug: f.replace('.yaml', ''),
        entry: readYaml<T>(path.join(dir, f)),
      }));
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    throw new Error(`Kunne ikke lese innholdsmappe: ${dir}\n${message}`);
  }
}

export const reader = {
  singletons: {
    hjem: { read: () => readYaml(path.join(contentDir, 'pages/hjem.yaml')) },
    omOss: { read: () => readYaml(path.join(contentDir, 'pages/om-oss.yaml')) },
    kontakt: { read: () => readYaml(path.join(contentDir, 'pages/kontakt.yaml')) },
    servering: { read: () => readYaml(path.join(contentDir, 'pages/servering.yaml')) },
    overnatting: { read: () => readYaml(path.join(contentDir, 'pages/overnatting.yaml')) },
    kulturformidling: { read: () => readYaml(path.join(contentDir, 'pages/kulturformidling.yaml')) },
    krambu: { read: () => readYaml(path.join(contentDir, 'pages/krambu.yaml')) },
    bilder: { read: () => readYaml(path.join(contentDir, 'pages/bilder.yaml')) },
  },
  collections: {
    referanser: {
      all: () => readCollection('referanser'),
    },
    nyheter: {
      all: () => readCollection('nyheter'),
    },
  },
};

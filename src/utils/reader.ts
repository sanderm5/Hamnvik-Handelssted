import fs from 'node:fs';
import path from 'node:path';
import { parse } from 'yaml';

const contentDir = path.join(process.cwd(), 'src/content');

function readYaml<T>(filePath: string): T {
  const raw = fs.readFileSync(filePath, 'utf-8');
  return parse(raw) as T;
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
      all: () => {
        const dir = path.join(contentDir, 'referanser');
        return fs.readdirSync(dir)
          .filter((f) => f.endsWith('.yaml'))
          .map((f) => ({
            slug: f.replace('.yaml', ''),
            entry: readYaml(path.join(dir, f)),
          }));
      },
    },
    nyheter: {
      all: () => {
        const dir = path.join(contentDir, 'nyheter');
        return fs.readdirSync(dir)
          .filter((f) => f.endsWith('.yaml'))
          .map((f) => ({
            slug: f.replace('.yaml', ''),
            entry: readYaml(path.join(dir, f)),
          }));
      },
    },
  },
};

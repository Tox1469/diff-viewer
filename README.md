[![CI](https://img.shields.io/github/actions/workflow/status/Tox1469/diff-viewer/ci.yml?style=flat-square&label=ci)](https://github.com/Tox1469/diff-viewer/actions)
[![License](https://img.shields.io/github/license/Tox1469/diff-viewer?style=flat-square)](LICENSE)
[![Release](https://img.shields.io/github/v/release/Tox1469/diff-viewer?style=flat-square)](https://github.com/Tox1469/diff-viewer/releases)
[![Stars](https://img.shields.io/github/stars/Tox1469/diff-viewer?style=flat-square)](https://github.com/Tox1469/diff-viewer/stargazers)

---

# diff-viewer

Visualizador de diff textual com coloracao ANSI baseado em LCS (longest common subsequence).

## Instalacao

```bash
npm install diff-viewer
```

## Uso

```ts
import { formatDiff, header, diffStats } from "diff-viewer";

console.log(header("antes.txt","depois.txt"));
console.log(formatDiff("linha 1\nlinha 2","linha 1\nlinha 2 alterada"));
console.log(diffStats("a\nb","a\nc"));
```

## API

- `diffLines(a, b)` retorna array de `DiffLine` tipadas
- `formatDiff(a, b, { color? })` string colorizada ANSI
- `diffStats(a, b)` contadores added/removed/unchanged
- `header(oldName, newName, color?)` cabecalho no estilo unified diff

## Licenca

MIT (c) 2026 Tox
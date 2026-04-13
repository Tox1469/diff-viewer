const RESET = "\x1b[0m";
const RED = "\x1b[31m";
const GREEN = "\x1b[32m";
const GRAY = "\x1b[90m";
const CYAN = "\x1b[36m";

export interface DiffLine {
  type: "equal" | "add" | "remove";
  value: string;
  oldLine?: number;
  newLine?: number;
}

export function diffLines(a: string, b: string): DiffLine[] {
  const al = a.split("\n");
  const bl = b.split("\n");
  const m = al.length;
  const n = bl.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  for (let i = m - 1; i >= 0; i--) {
    for (let j = n - 1; j >= 0; j--) {
      dp[i][j] = al[i] === bl[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
    }
  }
  const out: DiffLine[] = [];
  let i = 0, j = 0, oi = 1, ni = 1;
  while (i < m && j < n) {
    if (al[i] === bl[j]) {
      out.push({ type: "equal", value: al[i], oldLine: oi++, newLine: ni++ });
      i++; j++;
    } else if (dp[i + 1][j] >= dp[i][j + 1]) {
      out.push({ type: "remove", value: al[i], oldLine: oi++ });
      i++;
    } else {
      out.push({ type: "add", value: bl[j], newLine: ni++ });
      j++;
    }
  }
  while (i < m) out.push({ type: "remove", value: al[i++], oldLine: oi++ });
  while (j < n) out.push({ type: "add", value: bl[j++], newLine: ni++ });
  return out;
}

export function formatDiff(a: string, b: string, opts: { color?: boolean } = {}): string {
  const color = opts.color ?? true;
  const lines = diffLines(a, b);
  const c = (code: string, s: string) => (color ? code + s + RESET : s);
  return lines
    .map((l) => {
      if (l.type === "add") return c(GREEN, `+ ${l.value}`);
      if (l.type === "remove") return c(RED, `- ${l.value}`);
      return c(GRAY, `  ${l.value}`);
    })
    .join("\n");
}

export function diffStats(a: string, b: string) {
  const lines = diffLines(a, b);
  return {
    added: lines.filter((l) => l.type === "add").length,
    removed: lines.filter((l) => l.type === "remove").length,
    unchanged: lines.filter((l) => l.type === "equal").length,
  };
}

export function header(oldName: string, newName: string, color = true): string {
  const c = (code: string, s: string) => (color ? code + s + RESET : s);
  return `${c(CYAN, `--- ${oldName}`)}\n${c(CYAN, `+++ ${newName}`)}`;
}

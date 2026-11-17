'use strict';

const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');

const REQUIRED_FILES = ['README.md', 'CONTEXT.md', 'AGENTS.md', 'docs/CONFIG.md'];

const CONFIG_HEADINGS = [
  'store path',
  'vault dir',
  'project registry',
  'operator account allowlist',
  'PF base URL and token',
  'Forge URL',
];

// Directories and files the walk never enters or reads.
// task-logs/ is excluded: the logs embed long numeric task ids and are
// generated records that must not be edited, so they would trip the scan.
const SKIP_NAMES = new Set(['node_modules', '.git', 'package-lock.json', 'task-logs']);

// Patterns are assembled from fragments so this file never matches itself.
const AT = String.fromCharCode(64);
const EMAIL_RE = new RegExp(
  '[A-Za-z0-9._%+-]+' + AT + '[A-Za-z0-9-]+(?:\\.[A-Za-z0-9-]+)*\\.[A-Za-z]{2,}'
);
const LONG_DIGITS_RE = new RegExp('\\d{' + '12,}');

function walk(dir, out) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP_NAMES.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full, out);
    } else if (entry.isFile()) {
      out.push(full);
    }
  }
  return out;
}

test('required files exist', () => {
  for (const rel of REQUIRED_FILES) {
    assert.ok(fs.existsSync(path.join(root, rel)), 'missing required file: ' + rel);
  }
});

test('no file contains an email-shaped string', () => {
  for (const file of walk(root, [])) {
    const text = fs.readFileSync(file, 'utf8');
    const m = EMAIL_RE.exec(text);
    assert.ok(!m, 'email-shaped string in ' + path.relative(root, file) + ': ' + (m && m[0]));
  }
});

test('no file contains a run of 12 or more digits', () => {
  for (const file of walk(root, [])) {
    const text = fs.readFileSync(file, 'utf8');
    const m = LONG_DIGITS_RE.exec(text);
    assert.ok(!m, 'long digit run in ' + path.relative(root, file) + ': ' + (m && m[0]));
  }
});

test('docs/CONFIG.md has a heading for each of the six settings', () => {
  const text = fs.readFileSync(path.join(root, 'docs', 'CONFIG.md'), 'utf8');
  for (const name of CONFIG_HEADINGS) {
    const re = new RegExp('^## ' + name + '\\s*$', 'm');
    assert.ok(re.test(text), 'docs/CONFIG.md is missing heading: ## ' + name);
  }
});

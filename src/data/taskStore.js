const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, 'tasks.json');

function readAll() {
  const raw = fs.readFileSync(DB_PATH, 'utf-8');
  return raw.trim() ? JSON.parse(raw) : [];
}

function writeAll(tasks) {
  fs.writeFileSync(DB_PATH, JSON.stringify(tasks, null, 2), 'utf-8');
}

module.exports = { readAll, writeAll };

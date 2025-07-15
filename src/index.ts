// src/index.ts
import { listFiles } from './services/googleDrive.service';

async function main() {
  const files = await listFiles();
  console.log('Files:', files);
}

main();
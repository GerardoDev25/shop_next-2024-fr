import { Prisma } from '@prisma/client';
import { initialData } from './seed';

async function main() {
  console.log(initialData);
  console.log('executed successfully');
}

(() => {
  if (process.env.NODE_ENV === 'production') return;
  main();
})();

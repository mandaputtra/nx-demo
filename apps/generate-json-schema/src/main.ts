// generate json schema and write it to golang
import path from 'path';
import fs from 'fs';
import { ItemSchema } from '@nx-demo/shared/jsonschema';

async function writeJsonSchema() {
  const filename = 'jsonschema.json';
  const GO_CODE_PATH = path.join('apps/api-go', filename);
  const GO_BUILD_PATH = path.join('dist/apps/api-go', filename);

  // for development
  fs.writeFileSync(GO_CODE_PATH, JSON.stringify(ItemSchema));

  // for when building golang
  fs.writeFileSync(GO_BUILD_PATH, JSON.stringify(ItemSchema));
}

writeJsonSchema()
  .then(() => console.info('Success write json schema'))
  .catch((err) => {
    throw err;
  });

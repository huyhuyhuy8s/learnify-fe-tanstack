import { NodeIO } from "@gltf-transform/core";
import { draco } from "@gltf-transform/functions";
import { ALL_EXTENSIONS, KHRDracoMeshCompression } from "@gltf-transform/extensions";
import draco3d from "draco3dgltf";
import { readdirSync, statSync } from "node:fs";
import path from "node:path";

const MODELS_DIR = path.resolve("public/models");
const files = readdirSync(MODELS_DIR).filter((f) => f.endsWith(".glb"));

if (files.length === 0) {
  console.log("No .glb files found in public/models/");
  process.exit(0);
}

const io = new NodeIO()
  .registerExtensions(ALL_EXTENSIONS)
  .registerDependencies({
    "draco3d.decoder": await draco3d.createDecoderModule(),
    "draco3d.encoder": await draco3d.createEncoderModule(),
  });

for (const file of files) {
  const filePath = path.join(MODELS_DIR, file);
  const inBytes = statSync(filePath).size;
  const inSize = (inBytes / 1024 / 1024).toFixed(1);

  console.log(`Compressing ${file} (${inSize} MB)...`);

  const doc = await io.read(filePath);
  await doc.transform(draco({ encodeSpeed: 5, decodeSpeed: 5 }));
  await io.write(filePath, doc);

  const outBytes = statSync(filePath).size;
  const outSize = (outBytes / 1024 / 1024).toFixed(1);
  const reduction = ((1 - outBytes / inBytes) * 100).toFixed(0);
  console.log(`  → ${outSize} MB (${reduction}% reduction)`);
}

console.log("Done.");

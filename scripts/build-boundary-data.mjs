#!/usr/bin/env node

/**
 * Build web-optimized Indigenous reservation/reserve boundary GeoJSON.
 *
 * Source downloads, expected in scripts/.boundary-src/:
 *
 * US Census Bureau, 2025 Cartographic Boundary File (SHP), AIANNH
 * Public domain
 * https://www2.census.gov/geo/tiger/GENZ2025/shp/cb_2025_us_aiannh_500k.zip
 *
 * Natural Resources Canada, Aboriginal Lands of Canada Legislative Boundaries
 * Current English SHP package verified 2026-07-01:
 * AL_TA_CA_2_185_eng, Last-Modified 2026-06-01, Open Government Licence - Canada
 * https://ftp.maps.canada.ca/pub/nrcan_rncan/vector/geobase_al_ta/shp_eng/AL_TA_CA_SHP_eng.zip
 *
 * Final properties are intentionally minimal:
 * name, source_id, source_dataset, source_vintage, country
 */

import { existsSync, mkdirSync, rmSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, "..");
const sourceDir = resolve(__dirname, ".boundary-src");
const outputDir = resolve(rootDir, "public/data");

const mapshaperPackage = "mapshaper@0.7.33";

const sources = {
  us: resolve(sourceDir, "cb_2025_us_aiannh_500k.zip"),
  ca: resolve(sourceDir, "AL_TA_CA_SHP_eng.zip"),
};

const outputs = {
  us: resolve(outputDir, "reservation-boundaries-us-2025.geojson"),
  ca: resolve(outputDir, "reservation-boundaries-ca-2025.geojson"),
};

const tempOutputs = {
  ca: resolve(outputDir, "reservation-boundaries-ca-2025.tmp.geojson"),
};

for (const [label, path] of Object.entries(sources)) {
  if (!existsSync(path)) {
    throw new Error(
      `Missing ${label.toUpperCase()} source ZIP: ${path}\n` +
        "Download the source ZIP listed in this script header before running.",
    );
  }
}

mkdirSync(outputDir, { recursive: true });

for (const path of [...Object.values(outputs), ...Object.values(tempOutputs)]) {
  rmSync(path, { force: true });
}

function runMapshaper(label, args) {
  const command = ["npx", "--yes", mapshaperPackage, ...args];
  console.log(`\n[${label}] ${command.map(quoteArg).join(" ")}`);

  const result = spawnSync(command[0], command.slice(1), {
    cwd: rootDir,
    stdio: "inherit",
  });

  if (result.error) {
    throw result.error;
  }

  if (result.status !== 0) {
    throw new Error(`${label} mapshaper command failed with exit code ${result.status}`);
  }
}

function quoteArg(arg) {
  return /^[A-Za-z0-9_./:@%=-]+$/.test(arg) ? arg : JSON.stringify(arg);
}

runMapshaper("US build", [
  "-i",
  sources.us,
  "encoding=utf8",
  "-proj",
  "wgs84",
  "-simplify",
  "visvalingam",
  "90%",
  "keep-shapes",
  "-each",
  'name=NAME; source_id=AIANNHCE; source_dataset="US Census Bureau Cartographic Boundary File, AIANNH"; source_vintage="2025"; country="US";',
  "-filter-fields",
  "name,source_id,source_dataset,source_vintage,country",
  "-o",
  outputs.us,
  "format=geojson",
  "precision=0.000001",
  "force",
]);

runMapshaper("Canada build", [
  "-i",
  sources.ca,
  "encoding=utf8",
  "-proj",
  "wgs84",
  "-simplify",
  "visvalingam",
  "1%",
  "keep-shapes",
  "-each",
  'name=NAME1; source_id=ALCODE; source_dataset="Natural Resources Canada Aboriginal Lands of Canada Legislative Boundaries"; source_vintage="2026-06-01 / AL_TA_CA_2_185"; country="CA";',
  "-filter-fields",
  "name,source_id,source_dataset,source_vintage,country",
  "-o",
  tempOutputs.ca,
  "format=geojson",
  "precision=0.000001",
  "force",
]);

runMapshaper("Canada cleanup", [
  "-i",
  tempOutputs.ca,
  "-filter",
  "this.area > 0",
  "-o",
  outputs.ca,
  "format=geojson",
  "precision=0.000001",
  "force",
]);

rmSync(tempOutputs.ca, { force: true });

for (const [label, path] of Object.entries(outputs)) {
  runMapshaper(`${label.toUpperCase()} validate`, ["-i", path, "-info"]);
}

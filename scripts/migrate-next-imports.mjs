import fs from "fs";
import path from "path";

const replacements = [
  [/from "next\/link"/g, 'from "@/components/common/AppLink"'],
  [/from 'next\/link'/g, "from '@/components/common/AppLink'"],
  [/from "@\/shims\/next\/link"/g, 'from "@/components/common/AppLink"'],
  [/from '@\/shims\/next\/link'/g, "from '@/components/common/AppLink'"],
  [/from "next\/image"/g, 'from "@/components/common/AppImage"'],
  [/from 'next\/image'/g, "from '@/components/common/AppImage'"],
  [/from "next\/navigation"/g, 'from "@/lib/appRouter"'],
  [/from 'next\/navigation'/g, "from '@/lib/appRouter'"],
  [/from "@\/shims\/next\/navigation"/g, 'from "@/lib/appRouter"'],
  [/from '@\/shims\/next\/navigation'/g, "from '@/lib/appRouter'"],
];

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "shims") continue;
      walk(fullPath);
      continue;
    }

    if (!/\.(tsx?|jsx?)$/.test(entry.name)) continue;

    const original = fs.readFileSync(fullPath, "utf8");
    let updated = original;
    for (const [pattern, replacement] of replacements) {
      updated = updated.replace(pattern, replacement);
    }

    if (updated !== original) {
      fs.writeFileSync(fullPath, updated);
      console.log("updated", fullPath);
    }
  }
}

walk("src");
console.log("migration complete");

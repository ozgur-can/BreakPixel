import esbuildServe from "esbuild-serve";

esbuildServe(
  {
    // esbuild options
    entryPoints: ["src/main.ts"],
    bundle: true,
    outdir: "dist",
    watch: true,
    target: "esnext",
    platform: "node",
    define: {
      global: "window",
    },
  },
  {
    // serve options (optional)
    port: 4000,
    root: ".",
  }
);

# Git & Studio Ignore Rules

The following paths and patterns are ignored and untracked:

```gitignore
node_modules/
dist/
tmp/
builds/
published_backup/
tools/
tools/android-sdk/
persistent_workspace/
*.keystore
*.apk
*.zip
*.aab
*.log
.env
.dev.pid
.dev.env.json
.git/
```

This configuration ensures:
1. `tools/android-sdk` is kept out of workspace tracking (SDK runs in `/opt/android-sdk`).
2. No temporary workspace archives or build artifacts clutter the interface.
3. Clean, zero-jam environment across Google AI Studio and the local build pipeline.

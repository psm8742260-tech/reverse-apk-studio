# Implementation Plan: AI Lite Mode Switch & Token Saver Integration

Integrate the Admin Switch (`LITE_MODE_OVERRIDE`) check into the AI model routing pipeline so that when Lite Mode is active, `gemini-3.5-flash-lite` is enforced in the background to minimize token costs, and when disabled, the user-selected model is used.

## Proposed Changes

### Backend Server (`server.ts`)

- Implement `/api/ai/resolve-model` endpoint:
  - Query `getAdminSetting('LITE_MODE_OVERRIDE')` from Firestore `admin_config/settings`.
  - If active (`true`): enforce `selectedModel = "gemini-3.5-flash-lite"`.
  - If inactive (`false`): fallback to `req.body.userSelectedModel || "gemini-2.5-flash"`.
  - Return `{ success: true, isLiteModeActive, selectedModel }`.
- Ensure fail-safe wrapper (`try-catch`) so any network failure defaults safely to `gemini-3.5-flash-lite` without server crash.

### Verification & Testing Plan

1. **Syntax & Compilation**:
   - Run `npm run lint` (`tsc --noEmit`) to verify 0 errors.
   - Run `compile_applet` to ensure valid build.
2. **Endpoint Validation**:
   - Test `/api/ai/resolve-model` with Lite Mode ON and verify `gemini-3.5-flash-lite` is returned.
3. **Audit Log**:
   - Record changes in `CHANGELOG.md` adhering to Universal Rules 1-51.

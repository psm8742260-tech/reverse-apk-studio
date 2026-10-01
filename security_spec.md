# Security Specification - AI Master Studio

## Data Invariants
1. **Admin Authority**: Only `psm8742260@gmail.com` can modify global configurations (`config/global`, `server_config/*`, `staff/*`).
2. **User Privacy**: Data under `/users/{userId}/**` must be strictly isolated. Users can only read/write their own wallet and projects.
3. **Project Ownership**: Root `projects` collection must ensure that users can only modify projects they own (matched by `ownerId`).
4. **Passcode Integrity**: Passcodes can be created by anyone (after payment), but once `BOUND` to a user, only that user or an admin can view/update them.
5. **Published Apps**: Are publicly readable, but only writable by the server (authenticated as a system user) or the owner.
6. **Repair Logs**: Are append-only for users and readable only by admins.

## The "Dirty Dozen" Payloads (Unauthorized Attempts)

1. **Global Config Hijack**: Authenticated user attempts to overwrite `config/global` with their own API keys.
   - `setDoc(doc(db, 'config', 'global'), { slots: [...] })` -> **DENIED**
2. **Staff List Poisoning**: User attempts to add themselves to the staff list.
   - `setDoc(doc(db, 'staff', 'attacker@mail.com'), { role: 'MANAGER' })` -> **DENIED**
3. **Wallet Balance Injection**: User attempts to give themselves 1,000,000 INR.
   - `updateDoc(doc(db, 'users', 'attacker_uid', 'wallets', 'balance'), { balanceINR: 1000000 })` -> **DENIED**
4. **Other User's Project Access**: User A attempts to read User B's project.
   - `getDoc(doc(db, 'users', 'userB_uid', 'my_apps', 'projectX'))` -> **DENIED**
5. **Project Ownership Takeover**: User attempts to change `ownerId` of a project to themselves.
   - `updateDoc(doc(db, 'projects', 'legit_proj_id'), { ownerId: 'attacker_uid' })` -> **DENIED**
6. **Passcode Status Manipulation**: User attempts to mark an `UNBOUND` passcode as `BOUND` without payment verification.
   - `updateDoc(doc(db, 'passcodes', 'pass_123'), { status: 'BOUND' })` -> **DENIED** (unless it's their own and properly validated)
7. **Published App Vandalism**: User attempts to delete a published app they don't own.
   - `deleteDoc(doc(db, 'published_apps', 'popular-app'))` -> **DENIED**
8. **Repair Log Scouring**: User attempts to read all repair logs to find vulnerabilities.
   - `getDocs(collection(db, 'repair_logs'))` -> **DENIED**
9. **API Failover Tampering**: User attempts to switch AI provider to a cheaper/broken one for the system.
   - `setDoc(doc(db, 'server_config', 'api_failover'), { activeProvider: 'broken' })` -> **DENIED**
10. **Impersonation Attack**: User attempts to write to another user's path by spoofing `userId` in the document but using their own UID in `request.auth.uid`.
    - `setDoc(doc(db, 'users', 'victim_uid', 'wallets', 'balance'), { balanceINR: 0 })` -> **DENIED**
11. **Email Spoofing (Rules bypass)**: Attacker attempts to set their auth email to `psm8742260@gmail.com` (if possible) but without `email_verified: true`.
    - Rules must check `request.auth.token.email_verified == true`.
12. **Null ID Injection**: Attempting to write to a document with a path variable that is extremely long or contains malicious characters.
    - `setDoc(doc(db, 'projects', 'a'.repeat(2000)), { ... })` -> **DENIED**

## Test Runner
A `firestore.rules.test.ts` will be prepared to verify these invariants.

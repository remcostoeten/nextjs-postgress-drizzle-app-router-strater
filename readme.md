### Prepare Database 

Vercel platform >  storage > create postgress db > .env credentials > fill in .env.local here >  profit??

### Prepare GitHub OAuth Client

The OAuth client is required to sign in with GitHub account. You can swap providers in `src/server/auth.ts` if you want to use different identity providers.

1. Go to <https://github.com/settings/apps>.
2. Create a GitHub App.
   - Homepage URL: <http://localhost:3000>
   - Callback URL: <http://localhost:3000/api/auth/callback/github>
   - Account permissions - Email addresses: Read only
3. Save the client ID and client secret for next step.

### Create Local Environment

1. Create a file `.env.local` in the project directory with the following variables.

   ```bash
   # Database connection string for Next.js app
   DB_URL=postgres://postgres:unsafeLocalhostPassword@localhost:5432/postgres
   # Database connection string for database migration
   DB_MIGRATE_URL=postgres://postgres:unsafeLocalhostPassword@localhost:5432/postgres
   # Client ID of GitHub app
   GITHUB_CLIENT_ID="to-be-changed"
   # Client secret of GitHub app
   GITHUB_CLIENT_SECRET="to-be-changed"
   # Absolute base URL of Next.js app
   NEXTAUTH_URL=http://localhost:3000
   # NextAuth.js secret, e.g. generate with "openssl rand -hex 32"
   NEXTAUTH_SECRET="to-be-changed"
   ```

bun/npm/pnpm/yarn/youdoyou

   ```bash
   bun i 
   ```
migrate db 

   ```bash
   bun db:migrate
   ```

   ```bash
bun run  dev
   ```

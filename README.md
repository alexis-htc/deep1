# Hightech Payments CRM — Backend

API server for the Hightech Payments CRM platform. Built with [Hono](https://hono.dev/) and deployed as a [Supabase Edge Function](https://supabase.com/docs/guides/functions) (Deno runtime).

---

## Endpoints

All routes are prefixed with `/make-server-7fd64ac0`.

| Method | Path | Description |
|--------|------|-------------|
| GET | `/health` | Health check |
| GET | `/mpa-applications` | List MPA applications |
| POST | `/mpa-applications` | Create MPA application |
| PUT | `/mpa-applications/:id` | Update MPA application |
| GET | `/proposals` | List proposals |
| POST | `/proposals` | Create proposal |
| PUT | `/proposals/:id` | Update proposal |
| GET | `/wca-applications` | List WCA applications |
| POST | `/wca-applications` | Create WCA application |
| GET | `/residuals` | List available residual months |
| GET | `/residuals/:monthYear` | Get residuals for a month |
| POST | `/residuals/:monthYear` | Upload residuals for a month |
| GET | `/pipeline-deals` | List pipeline deals |
| POST | `/pipeline-deals` | Create pipeline deal |
| PUT | `/pipeline-deals/:id` | Update pipeline deal |
| GET | `/partners` | List partners |
| POST | `/partners` | Create partner |
| PUT | `/partners/:id` | Update partner |
| DELETE | `/partners/:id` | Delete partner |

## Tech Stack

| Tool | Purpose |
|------|---------|
| Hono | Lightweight HTTP framework |
| Supabase | Database (KV store via `kv_store_7fd64ac0` table) |
| Deno | Runtime (Supabase Edge Functions) |

## Environment Variables

| Variable | Description |
|----------|-------------|
| `SUPABASE_URL` | Supabase project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key |

## Project Structure

```
├── supabase/
│   └── functions/
│       └── server/
│           ├── index.tsx       # Hono API routes
│           └── kv_store.tsx    # Supabase KV store helper
├── utils/
│   └── supabase/
│       └── info.tsx            # Supabase project config
└── README.md
```

## Local Development

```bash
# Requires Supabase CLI and Deno
supabase start
supabase functions serve server
```

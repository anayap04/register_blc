# Registro BLC

A bilingual (Spanish / Portuguese) event-registration site for BLC seminars. It has two site variants served by the same app:

- **`/`** — the main international registration form (attendee picks one of several event dates/cities).
- **`/ME/`** — a dedicated registration form for a single fixed event ("Mujeres Empresarias").

## Architecture

- **Frontend**: [Create React App](https://create-react-app.dev/) (`react-scripts`), React 18, `react-hook-form` for form state/validation, `react-router-dom` for the two routes, `react-intl` for ES/PT copy (locale is auto-detected from `navigator.language`).
- **Backend**: plain PHP scripts (no framework) under `src/api-php-react/`, talking to a MySQL database via `mysqli`. Deployed as static PHP files behind Apache (see `.htaccess`).

```
src/
  api-php-react/        PHP backend (see below)
  assets/img/           Static images (logos, banners)
  components/
    Seminar/             Default site: Home, Header, Form
    SeminarME/            "ME" site variant: HomeME, HeaderME, FormME
    form-components/      Shared field/modal components used by both forms
  hooks/                 useIsLargeScreen, useRegistrationForm
  lang/                  es.json / pt.json translation catalogs
  utils/                 constants, formatMsg, registrationApi
```

### PHP backend (`src/api-php-react/`)

| File | Called from | Purpose |
|---|---|---|
| `database.php` | this frontend | Validates a ticket code, inserts a registration row, sends a confirmation email (QR-coded for `evento=3`, plain otherwise). |
| `get_info.php`, `get_info_2.php`, `get_info_3.php` | an external admin tool (not in this repo) | Read registrations for an event, with different canned filters. Kept as three separate endpoints to preserve that consumer's existing URLs; internally they share one query helper (`lib/get_info_query.php`). |
| `login.php`, `update_user.php`, `update_user_multiple.php` | same external admin tool | Admin login and attendance-marking endpoints. |
| `send_mail.php`, `generate_qr.php` | internal | Email + QR-code generation (uses the bundled `phpqrcode` library). |
| `config.php` | all of the above | Loads DB credentials from `.env` / real environment variables. |
| `lib/`, `data/` | all of the above | Shared helpers and the server-side ticket-code allowlists (see below). |

## Environment variables

Nothing in this app should be deployed with hardcoded credentials or URLs — copy the example files and fill in real values:

- **Frontend**: copy `.env.example` to `.env` at the repo root.
  - `REACT_APP_API_URL` — base URL of the PHP backend (CRA only exposes `REACT_APP_*` vars to the browser bundle).
- **Backend**: copy `src/api-php-react/.env.example` to `src/api-php-react/.env` (this file is gitignored — never commit real credentials).
  - `DB_HOST`, `DB_USER`, `DB_PASS`, `DB_NAME`

## Local development

```bash
npm install
npm start          # http://localhost:3000
```

The PHP backend needs a PHP-capable server (e.g. `php -S localhost:8000 -t src/api-php-react`) pointed at a MySQL database with a `registro` table, plus its own `.env` as described above.

## Testing

```bash
npm test                              # React component/hook tests (Jest + Testing Library + jest-axe)
php src/api-php-react/tests/run.php   # PHP unit tests (no composer/PHPUnit required)
```

The Jest suite includes `jest-axe` smoke tests on both site variants to catch automated accessibility regressions (see below).

## Accessibility

This app targets **WCAG 2.1 AA**. Notable things to know:

- Both site variants render their header/form content over a solid, contrast-checked backdrop color rather than relying on an arbitrary background photo, so all foreground text colors have a verified >= 4.5:1 contrast ratio.
- The event-selection radios are grouped in a `<fieldset>`/`<legend>`; form fields use real `<label htmlFor>` associations plus `aria-invalid`/`aria-describedby` on error.
- Form-level error banners use `role="alert"` so screen readers announce validation failures.
- `document.documentElement.lang` is set from the detected locale; `react-modal`'s app element is configured so background content is properly hidden while a modal is open.

## Known limitations / security follow-ups

These were identified during a security/refactor pass but intentionally **not** changed, because fixing them would alter the API contract for the external admin tool described above (which this repo has no visibility into) or requires infrastructure decisions outside this codebase:

- **`login.php` compares passwords in plain text.** Migrating to `password_hash()`/`password_verify()` requires re-hashing every existing stored password (a data migration), not just a code change.
- **`get_info*.php`, `login.php`, and `update_user*.php` have no authentication/authorization check at all** — anyone who can reach these URLs can read attendee PII or mark attendance. Adding a real auth gate (session/token) needs to be coordinated with whatever admin tool currently calls them.
- **Database credentials were previously committed to git history in plain text.** They've been moved to `.env` (gitignored) going forward. If you're picking up this repo, you should still **rotate the database password with your hosting provider** — removing the secret from future commits doesn't undo a past exposure.

## Deployment

Built for Apache hosting: `npm run build` produces static assets, `.htaccess` handles client-side routing fallback. The `homepage` field in `package.json` controls the base path CRA builds asset URLs against.

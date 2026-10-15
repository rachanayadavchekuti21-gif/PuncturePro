# PuncturePro

**A scalable and cost-effective influencer advocacy ecosystem for mechanics and puncture shops in the domestic two-wheeler market.**

PuncturePro is a student concept prototype that demonstrates how local service shops can share promotions and record referrals.

## Features

- Responsive landing page describing the problem and solution
- Sample mechanic shop profile and demo referral code (`RAVI25`)
- Sample promotional offers with share/copy interactions
- Interactive referral dashboard
- Add a referral, mark a visit as verified, and view summary counts
- Stores demo records in the browser's `localStorage`
- No build tools, API keys, or package installation required

## Run locally

1. Download or clone this repository.
2. Open `index.html` in a modern browser.
3. Scroll to **Referral dashboard** to add a fictional customer and test the workflow.

Optional local server:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Deploy with GitHub Pages

1. Push the files to a GitHub repository.
2. Open the repository's **Settings → Pages**.
3. Under build and deployment, choose **Deploy from a branch**.
4. Select the `main` branch and `/ (root)` folder, then save.
5. Wait for GitHub Pages to publish the site. The published URL appears in Settings → Pages.

## Project flow

Shop profile / referral code → promotion shared with customers → referral entered into dashboard → visit marked as verified → dashboard counts update.

## Important limitations

- This is a front-end demonstration only; records are stored in the current browser and are not shared between devices.
- No real QR code generation, authentication, cloud database, automated WhatsApp integration, payment, or reward payout is implemented.
- Do not enter real or sensitive customer information.
- The sample shop, code, and offers are illustrative. Confirm partner approval, privacy requirements, and reward rules before any real pilot.
- This student concept is not affiliated with any tyre manufacturer or service brand.

## Suggested next improvements

1. Add a backend and database (for example, Flask + SQLite/PostgreSQL).
2. Add secure shop-owner login and role-based access.
3. Generate real QR codes for shop profiles.
4. Add audit trails for verified visits and anti-fraud checks.
5. Add analytics exports and consent/privacy notices.
6. Integrate WhatsApp only through approved APIs and customer consent.

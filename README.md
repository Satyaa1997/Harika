# Harika Paradise

Responsive React and Tailwind website with a small Express API for email enquiries.

## Run locally

1. Copy `.env.example` to `.env`. The enquiry inbox is set to `adishak0234@gmail.com`; add the SMTP host, username and password for the sending account.
2. In one terminal, run `npm run server` to start the API on port 5000.
3. In another terminal, run `npm run dev` to start the website on port 5173.

The website sends form submissions to `/api/enquiries`; Vite forwards API requests to the local server. The API emails each enquiry to `ENQUIRY_EMAIL` using the configured SMTP account. No enquiry data is stored in a database. The floating call button dials `0522 4205350`.

## Build the website

Run `npm run build` to create the production website in `dist/`.

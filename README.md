# Core concept

## Core functionality

- Invoice PDF generation
- Contract PDF generation
- DEAL MEMO generation

## Needed for core functionality

- database with data: user, band, company, location, hotel, promoter, event
- Excel/CSV import for data
- 4 Forms to input data: band (with optional company), location (including event?, with optional company), hotel, promoter (with optional company)


## New semi core functionality

- Newsletter lists with sending newsletters
- database collection newsletter (to be precise: 2 collections: emails {array newsletterid, email, name, ?salution} and newsletter => {name, content, newsletterid})
- input form for newsletter (emails, newsletter data)


# Data models

## User | SignIn

```ts
{
  "userid": string,
  "name": string,
  "email": string,
  "password" string,
  "log": {
    "createDate": string | Date,
    "lastLogin": string | Date,
  }
}
```
*might need to be renamed to cpuser (company user)*

ideas:

- array of users and signin via dynamic login route with companyid
- or like atlassian: just a normal signin but a user references a company (optional) and is validated after sign in


## Band

```ts
{
  "bandid": string,
  "name": string,
  "company": {
    "vatNumber": string,
    "address": {
      "streetNumber": string,
      "street": string,
      "addressSuffix": string,
      "zipCode": number,
      "city": string,
      "state": string,
      "country:" string,
      "countryCode": string,
    },
    "contact": {
      "email": string,
      "phone": string,
      "homepage"?: string,
    },
  },
  "members": [
    {
      "name": string,
      "email"?: string,
      "phone"?: string
    }
  ]
}
```

Note: Before thinking about a schema for these collections, ask again if they have a many:many relation (e.g. a event can only have a single promoter and location)

## Location

## Event

## Promoter

## Hotel


# Upcoming Features
- Multi user with company signin: many users can edit stuff simultaneously
- Desktop standalone application using [Tauri](https://github.com/tauri-apps/tauri)
- Mobile apps (Android/iOS) using [Capacitor](https://plazagonzalo.medium.com/how-to-convert-your-next-js-application-to-android-and-ios-in-5-clicks-bd8d5fac690c)?

# References
- [PDF generation](https://pdfme.com/docs/getting-started)
- [Newsletter with Nodemailer](https://nodemailer.com/about/)
- [Deployment](https://reactjsexample.com/how-to-deploy-nextjs-database-app-with-docker-multi-container/)

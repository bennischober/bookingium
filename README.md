# Bookingium - Event booking

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
- Address book (like in Outlook) => can save lopros, companies, "normal" people (=> export/import function; think about more functionality for this one)


# Data models

Note: Might save names (only company/hotel?) as toLowerCase() and also treat input as lower case (will be much easier to use) OR use lower case on query (would make more sense)


## User | SignIn

```ts
{
  "userid": string,
  "name": string,
  "email": string,
  "password" string,
  "log": {
    "created": string | Date,
    "lastLogin": string | Date,
  }
}
```
*might need to be renamed to cpuser (company user)*

Ideas:

- array of users and signin via dynamic login route with companyid
- or like atlassian: just a normal signin but a user references a company (optional) and is validated after sign in

For future (data structure):
- add payment information to user
- add company, phone numbers, address, payment information, etc.

## Deal memo
Note: By far the most important

```ts
{
  "dealid": string,
  "date": string,
  "deal": string,
  "fee": number,
  "ticketPriceVVK": number,
  "ticketPriceAK": number,
  "posters": number,
  "status": string,
  "notes": string,
  "bandid": string,
  "venueid": string,
  "loproid": string,
  "hotelid": string,
  "dm": {
    "userid": string,
    "created": string | Date,
    "edited": string,
  }
}
```


## Band

```ts
{
  "bandid": string,
  "name": string,
  "notes": string,
  "company": {
    "name": string,
    "vatNumber": string,
    "ustNumber": string,
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
      "mobilePhone": string,
      "homepage": string,
    },
  },
  "members": [
    {
      "name": string,
      "email": string,
      "phone": string
    }
  ],
  "dm": {
    "userid": string,
    "created": string | Date,
    "edited": string,
  }
}
```

## Venue
```ts
{
  "venueid": string,
  "venue": string,
  "capacity": number,
  "notes": string,
  "company": {
    "name": string,
    "vatNumber": string,
    "ustNumber": string,
    "address": {
      "street": string,
      "streetNumber": string,
      "addressSuffix": string,
      "zipCode": number,
      "city": string,
      "state": string,
      "country:" string,
      "countryCode": string,
    },
    "contact": {
      "phone": string,
      "mobilePhone": string,
      "email": string,
      "homepage"?: string,
    },
  },
  "dm": {
    "userid": string,
    "created": string | Date,
    "edited": string,
  }
}
```

## Lopro (Local Promoter)
```ts
{
  "loproid": string,
  "name": string,
  "phone": string,
  "mobilePhone": string,
  "email": string,
  "notes": string,
  "company": {
    "name": string,
    "vatNumber": string,
    "ustNumber": string,
    "address": {
        "street": string,
        "streetNumber": string,
        "addressSuffix": string,
        "zipCode": string,
        "city": string,
        "state": string,
        "country": string,
        "countryCode": string,
    },
    "contact": {
        "phone": string,
        "mobilePhone": string,
        "email": string,
        "homepage": string,
    },
},
  "dm": {
    "userid": string,
    "created": string | Date,
    "edited": string,
  }
}
```

## Hotel
```ts
{
  "hotelid": string,
  "name": string,
  "notes": string,
  "address": {
    "street": string,
    "streetNumber": string
    "addressSuffix": string,
    "zipCode": number,
    "city": string,
    "state": string,
    "country:" string,
    "countryCode": string,
  },
  "contact": {
    "phone": string,
    "mobilePhone": string,
    "email": string,
    "homepage": string,
  },
  "dm": {
    "userid": string,
    "created": string | Date,
    "edited": string,
  }
}
```

# Testing

- [NextJS basics for testing](https://nextjs.org/docs/testing#playwright)
- [Basic tests with cypress](https://www.npmjs.com/package/cypress)
- [UI tests with storybook](https://www.npmjs.com/package/@storybook/cli)
- [API tests with hoppscotch](https://hoppscotch.io/de/)
- [Upcoming/advanced tests with playwright](https://www.npmjs.com/package/playwright)

## Test run of deal memo data grid

- Test basic features with cypress
- Test e.g. datagrid with storybook (=> db data is required => use mock data for basic data grid testing)
- Test functionality of e.g. deal-memo api with hoppscotch
- (Advanced: test different browsers with playwright)

Cypress and Storybook tests could be automatically executed in Docker build.


# Upcoming Features

- Multi user with company signin: many users can edit stuff simultaneously
- Desktop standalone application using [Tauri](https://github.com/tauri-apps/tauri)
- Mobile apps (Android/iOS) using [Capacitor](https://plazagonzalo.medium.com/how-to-convert-your-next-js-application-to-android-and-ios-in-5-clicks-bd8d5fac690c)?

# References

- [PDF generation](https://pdfme.com/docs/getting-started) | [react-pdf (currently not working for react 18)](https://github.com/diegomura/react-pdf) | [jsPDF](https://github.com/parallax/jsPDF) | [pdf-lib](https://github.com/Hopding/pdf-lib) | [Relaxed pdf](https://github.com/RelaxedJS/ReLaXed)
- [Newsletter with Nodemailer](https://nodemailer.com/about/)
- [Deployment](https://reactjsexample.com/how-to-deploy-nextjs-database-app-with-docker-multi-container/)
- Maps: [main](https://www.npmjs.com/package/leaflet) with [react components](https://www.npmjs.com/package/react-leaflet) and [search](https://www.npmjs.com/package/leaflet-search) | [Creating routes](https://www.qed42.com/insights/coe/javascript/navigation-leaflet-maps) 
- Calendar: [react-big-calendar](https://www.npmjs.com/package/react-big-calendar), [fullcalendar](https://www.npmjs.com/package/fullcalendar), [tui-calendar](https://www.npmjs.com/package/tui-calendar) 

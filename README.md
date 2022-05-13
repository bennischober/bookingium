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
  "price": string,
  "posters": number,
  "notes": string,
  "references": {
    "bandid": string,
    "venueid": string,
    "loproid": string,
    "hotelid": string,
   },
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
  ],
  "dm": {
    "userid": string,
    "created": string | Date,
    "edited": string,
  }
}
```

Note: Before thinking about a schema for these collections, ask again if they have a many:many relation (e.g. a event can only have a single promoter and location)

## Venue
```ts
{
  "venueid": string,
  "venue": string,
  "capacity": number,
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
      "email": string,
      "phone": string,
      "mobilePhone": string,
      "person": string,
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
  "promoterid": string,
  "name": string,
  "email": string,
  "companyName": string,
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
  "dm": {
    "userid": string,
    "created": string | Date,
    "edited": string,
  }
}
```


# Upcoming Features
- Multi user with company signin: many users can edit stuff simultaneously
- Desktop standalone application using [Tauri](https://github.com/tauri-apps/tauri)
- Mobile apps (Android/iOS) using [Capacitor](https://plazagonzalo.medium.com/how-to-convert-your-next-js-application-to-android-and-ios-in-5-clicks-bd8d5fac690c)?

# References
- [PDF generation](https://pdfme.com/docs/getting-started)
- [Newsletter with Nodemailer](https://nodemailer.com/about/)
- [Deployment](https://reactjsexample.com/how-to-deploy-nextjs-database-app-with-docker-multi-container/)
- Maps: [main](https://www.npmjs.com/package/leaflet) with [react components](https://www.npmjs.com/package/react-leaflet) and [search](https://www.npmjs.com/package/leaflet-search) | [Creating routes](https://www.qed42.com/insights/coe/javascript/navigation-leaflet-maps) 

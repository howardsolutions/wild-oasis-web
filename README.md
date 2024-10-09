# The Wild Oasis Website

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Project Requirements

## Features Categories

### ABOUT

<details> 
    <summary>Open to Read</summary> 
    * Guest should be able to learn all about the Wild Oasis Hotel <br /> 
    * User of the app are potential guests and actual guests
</details>

### CABINS

<details> 
    <summary>Open to Read</summary> 
    * Guest should be able to get information about each Cabin and see booked dates <br /> 
    * Guest should be able to FILTER cabins by their maximum guest capacity
</details>

### RESERVATIONS

<details> 
    <summary>Open to Read</summary> 
    * Guest should be able to RESERVE a cabin for a certain date range <br /> 
    * RESERVATIONs are not paid online. Payments will be made at the property upon arrival. There fore, new reservations should be set to "Unconfirmed" Status (booked, but not yet checkin) <br />
    * Guest should be able to VIEW their past, and future reservations <br /> 
    * Guest should be able to UPDATE AND DELETE reservation <br /> 

</details>


### AUTHENTICATION

<details> 
    <summary>Open to Read</summary> 
    * Guest need to signup, login before they can reserve a cabin and perform any operation <br/>
    * On signup, each guest should get a profile in the DB <br/>

</details>


### PROFILE

<details> 
    <summary>Open to Read</summary> 
    * Guest should be able to set and update basic data about their probile to make check-in at the hotel faster

</details>


## TechStack

- NextJS, React

- UI management: Context API

- DB / API: supabase

- Styling: tailwind css
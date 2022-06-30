This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

### Set up Alchemy
You can skip this step to begin with, but you will need to set this to get the `api/collection` page functional.

Navigate over to the [Alchemy site](https://www.alchemy.com/) and set up a free tier account (takes 5 mins).
Grab the API key in your alchemy dashboard, stick it in the `.env.changeMe` file in the root directory, and rename the file to `.env.local`.
Next.js is already hooked up to read variables out of `.env.local` so there should be nothing more you need to do.

*** DO NOT *** commit your API key to you repository. You want to keep it private. `env.local` is .gitignore'd, so it will never be committed to your repository.
Anytime you `git clone` the repository you will have to fill in this file again.

### Start the server!
First, install the dependencies:

```bash
yarn install
```

Next, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.


## Resources
- [thirdweb example](https://marketplace.thirdweb-example.com/) used as a reference
- [alchemy walkthrough](https://www.youtube.com/watch?v=YehktV6LSqw) and [example repo](https://github.com/alchemyplatform/Build-Your-NFT-Explorer)
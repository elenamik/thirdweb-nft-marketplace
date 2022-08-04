This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started
A detailed walkthrough of this project can be found [https://blog.developerdao.com/](here).

### Step 1: Set up an NFT Marketplace in Thirdweb + point the app to the right place
You can use the config in here by default (Goerli, pointing to a marketplace contract I made on Thirdweb), but if you want to use your own,
you can change the `targetChainId` in `config/targetChain.ts` (checkout the definition of Thirdweb's [ChainId](https://github.com/thirdweb-dev/react/blob/77e30702d7938723486453e7383257028ed18c98/src/constants/chain.ts) to see the supported values),
and paste your contract marketplace contract address in `config/contractAddresses.ts`.

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
- thirdweb sample code provided in their dashboard along with the marketplace contract TODO: insert image
- [alchemy docs](https://docs.alchemy.com/alchemy/sdk/alchemy-sdk-quickstart)
- [alchemy walkthrough](https://www.youtube.com/watch?v=YehktV6LSqw) and [example repo](https://github.com/alchemyplatform/Build-Your-NFT-Explorer)

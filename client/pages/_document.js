import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en-US">
        <Head>
          <meta charset="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

          <meta
            name="description"
            content="Platform for tracking subscriptions and all of your friends with whom you often share your subscriptions. You may also add people with whom you share your subscriptions and never forget who all the individuals with whom you shared your subscriptions are again. So get rid of all your stress related to your subscriptions because we are going to take care of your subcriptions and trck them."
          />
          <meta
            name="keywords"
            content="subs subscription-tracker subscriptionTracker subscription tracker subscribe track subscriptiontrackerapp subscriptionTrack subscriptiontrackapp"
          />

          <link rel="manifest" href="/manifest.json" />
          <link rel="apple-touch-icon" href="/subsIcon.png" />
          <meta name="theme-color" content="#FCDC60" />
        </Head>
        <body>
          <Main />
          <div id="modal" />
          <NextScript />
        </body>
      </Html>
    );
  }
}

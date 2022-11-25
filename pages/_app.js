// 1. import `NextUIProvider` component
import DarkTheme from '../themes/DarkTheme';

import { NextUIProvider } from '@nextui-org/react';

function MyApp({ Component, pageProps }) {
  return (
    // 2. Use at the root of your app
    <NextUIProvider theme={DarkTheme}>

      <Component {...pageProps} />
    </NextUIProvider>
  );
}

export default MyApp;

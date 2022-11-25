// 1. import `NextUIProvider` component
import darkTheme from '../themes/darktheme';

import { NextUIProvider } from '@nextui-org/react';

function MyApp({ Component, pageProps }) {
  return (
    // 2. Use at the root of your app
    <NextUIProvider theme={darkTheme}>

      <Component {...pageProps} />
    </NextUIProvider>
  );
}

export default MyApp;

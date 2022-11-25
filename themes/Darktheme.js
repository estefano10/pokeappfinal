import { createTheme } from "@nextui-org/react"

const DarkTheme = createTheme({
  type: 'dark',
  theme: {
    colors: {}, // override dark theme colors
  }
});

export default DarkTheme
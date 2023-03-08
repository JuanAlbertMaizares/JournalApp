import { ThemeProvider } from "@emotion/react"
import { CssBaseline } from "@mui/material"
import { purpleTheme } from "./purpleTheme"




export const AppTheme = ({children}) => {
  return (
    <ThemeProvider theme={purpleTheme}>
        {/* este compo es el normalize.css de MUI*/}
        <CssBaseline/>
        {children}
    </ThemeProvider>
  )
}
 
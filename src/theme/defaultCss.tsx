import { withStyles } from "@mui/styles";


export const GlobalCss = withStyles(() => ({
    // @global is handled by jss-plugin-global.
    "@global":{
        "*, *::before, *::after": {
            boxSizing: "border-box",
            margin: 0,
            padding: 0,
          }
      
    }
}))(() => null);
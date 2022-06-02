import { createTheme } from "@material-ui/core";
import typography from "./typography";

const theme=createTheme({
    palette:{
        primary:{
            main:"#ffffff",
            dark:"#BDBDBD",
            light:"#ffffff"
        },
        secondary:{
            main:"#4f4f4f",
            light:"#333232"
        }
    },
    typography,
    shadows:["none"]
});

export default theme;
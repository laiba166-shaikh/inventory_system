import {colors, createStyles,makeStyles} from "@material-ui/core";

const useStyles= makeStyles(() =>
    createStyles({
        '@global':{
            html:{
                '-webkit-font-smoothing':'antialiased',
                '-moz-osx-font-smoothing':'grayscale',
                height:'100%',
                width:'100%'
            },
            '*':{
                margin:0,
                padding:0,
                boxSizing:'border-box'
            },
            body:{
                backgroundColor:'#fff',
                height:'100%',
                width:'100%'
            },
            '#root':{
                height:'100%',
                width:'100%'
            },
            a:{
                textDecoration:'none'
            },
            'input:disabled':{
                backgroundColor:colors.common.grey
            }
        }
    })
);

const GlobalStyles=()=>{
    useStyles();
    return null;
};
export default GlobalStyles
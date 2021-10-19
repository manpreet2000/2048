import React from 'react';
import {styled} from '@mui/system';

interface props {}
const Home:React.FC<props> = prop =>{
    const {children}=prop;
    return(
        <HomeContainer >
            <HomeInnerContainer>
            {children}
            </ HomeInnerContainer>
            <Appetit>Made by <Link href="https://github.com/manpreet2000" > Manpreet</Link></Appetit>
        </HomeContainer>
    )
};

export default Home;
const HomeContainer = styled("div")(({theme})=>({
    width: "100vw",
    height:"100vh",
    overflow: "auto",
    background:theme.palette.primary.main,
}));

const HomeInnerContainer = styled("div")(()=>({
    width: "40%",
    padding:"3.5rem",
    margin :"0 auto",
    // eslint-disable-next-line
    ["@media (max-width:780px)"]:{
        width:"60%"
    },
    // eslint-disable-next-line
    ["@media (max-width:425px)"]:{
        width:"100%"
    },
}));

const Link = styled("a")(({theme})=>({
    textDecoration:"none",
    color:theme.palette.text.primary,
    paddingLeft:"5px"
}))
const Appetit = styled("div")(({theme})=>({
    fontSize:"1rem",
    fontFamily:"cursive",
    lineHeight:"3rem",
    display:"flex",
    justifyContent:"center",
    color:theme.palette.text.primary
}))
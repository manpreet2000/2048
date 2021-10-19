import React from "react";
import { styled } from "@mui/system";
import {
  KeyboardArrowUp,
  KeyboardArrowLeft,
  KeyboardArrowDown,
  KeyboardArrowRight
} from "@mui/icons-material";

interface controllerProps {
  swipeUp: (check?:boolean)=>number[][] | void,
  swipeDown : (check?:boolean)=>number[][] | void,
  swipeLeft : (check?:boolean)=>number[][] | void,
  swipeRight : (check?:boolean)=>number[][] | void,
  
};
const Controller: React.FC<controllerProps> = ({swipeUp,swipeDown,swipeLeft,swipeRight}:controllerProps) => {
  return (
    <ControllerDiv>
      <Icondiv>
      <ControllerBtn onClick={()=>{swipeUp()}}><KeyboardArrowUp sx={iconCss}/></ControllerBtn>
    </Icondiv>
    <MidIconDiv>
      <ControllerBtn onClick={()=>{swipeLeft()}} ><KeyboardArrowLeft  sx={iconCss}/></ControllerBtn>
      <ControllerBtn  onClick={()=>{swipeRight()}}><KeyboardArrowRight   sx={iconCss}/></ControllerBtn>

</MidIconDiv>
<Icondiv>
<ControllerBtn onClick={()=>{swipeDown()}}><KeyboardArrowDown  sx={iconCss}/></ControllerBtn>

</Icondiv>
    </ControllerDiv>
  );
};

export default Controller;

const iconCss = {
  cursor:"pointer",
  border: "1px solid"
}
const ControllerDiv = styled("div")(() => ({
  padding:"24px",
  display:"flex",
  flexDirection:"column",
}));
const Icondiv = styled("div")(()=>({
  padding:"0.5rem",
  display:"flex",
  justifyContent:"center",
  alignItens:"center"
}));
const MidIconDiv = styled("div")(()=>({
  padding:"0.5rem",
  display:"flex",
  justifyContent:"space-around",
  alignItens:"center"
}));
const ControllerBtn = styled("div")(() => ({}));

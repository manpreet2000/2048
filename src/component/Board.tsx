import React, { useState, useEffect } from "react";
import { styled } from "@mui/system";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow
} from "@mui/material";
import cloneDeep from "lodash.clonedeep";
import { useEvent } from "../Hooks/event";
import {getColors} from "../util/colors";
import {Controller} from "./";

const Board: React.FC = () => {
  const [boardnumbers, setboardnumbers] = useState([
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ]);
  const [gameOver,setgameOver] = useState(false);

  const addNumber = (newGrid: number[][]) => {
    let added = false;
    let gridFull = false;
    let attempts = 0;
    while (!added) {
      if (gridFull) {
        break;
      }

      let rand1 = Math.floor(Math.random() * 4);
      let rand2 = Math.floor(Math.random() * 4);
      attempts++;
      if (newGrid[rand1][rand2] === 0) {
        newGrid[rand1][rand2] = Math.random() > 0.5 ? 2 : 4;
        added = true;
      }
      if (attempts > 50 && added === false) {
        gridFull = true;
        let gameOverr = checkGameOver();
        if (gameOverr) {
          alert("game over");
      }
    }
  };
  }
  const swipeLeft = (check?:boolean):number[][] | void => {
    let data = cloneDeep(boardnumbers);
    for (let i = 0; i < 4; i++) {
      let rowarr = data[i];
      let l = 0;
      let r = 1;
      while (l < 4) {
        if (r === 4) {
          l += 1;
          r = l + 1;
          continue;
        }
        if (rowarr[l] === 0 && rowarr[r] === 0) {
          r += 1;
        } else if (rowarr[l] === 0 && rowarr[r] !== 0) {
          rowarr[l] = rowarr[r];
          rowarr[r] = 0;
          r += 1;
        } else if (rowarr[l] !== 0 && rowarr[r] === 0) {
          r += 1;
        } else if (rowarr[l] !== 0 && rowarr[r] !== 0) {
          if (rowarr[l] === rowarr[r]) {
            rowarr[l] += rowarr[r];
            rowarr[r] = 0;
            r = l + 1;
            l++;
          } else {
            l++;
            r = l + 1;
          }
        }
      }
    }
    if (JSON.stringify(data) !== JSON.stringify(boardnumbers)) {
      addNumber(data);
    }
    if(check){
        return data;
    }else{
      setboardnumbers(data);
    }    
  };

  const swipeRight =  (check?:boolean):number[][] | void => {
    let data = cloneDeep(boardnumbers);
    for (let i = 0; i < 4; i++) {
      let l = 3;
      let r = 2;
      let rowarr = data[i];
      while (l > -1) {
        if (r === -1) {
          l = l - 1;
          r = l - 1;
          continue;
        }
        if (rowarr[l] === 0 && rowarr[r] === 0) {
          r = r - 1;
        } else if (rowarr[l] !== 0 && rowarr[r] === 0) {
          r = r - 1;
        } else if (rowarr[l] === 0 && rowarr[r] !== 0) {
          rowarr[l] = rowarr[r];
          rowarr[r] = 0;
          r = r - 1;
        } else if (rowarr[l] !== 0 && rowarr[r] !== 0) {
          if (rowarr[l] === rowarr[r]) {
            rowarr[l] += rowarr[r];
            rowarr[r] = 0;
            r = l - 1;
            l--;
          } else {
            l--;
            r = l - 1;
          }
        }
      }
    }
    if (JSON.stringify(data) !== JSON.stringify(boardnumbers)) {
      addNumber(data);
    }
    if(check){
        return data;
    }else{
      setboardnumbers(data);
    }  
  };

  const swipeDown = (check?:boolean):number[][] | void => {
    let b = cloneDeep(boardnumbers);
    let oldData = JSON.parse(JSON.stringify(boardnumbers));
    for (let i = 3; i >= 0; i--) {
      let slow = b.length - 1;
      let fast = slow - 1;
      while (slow > 0) {
        if (fast === -1) {
          fast = slow - 1;
          slow--;
          continue;
        }
        if (b[slow][i] === 0 && b[fast][i] === 0) {
          fast--;
        } else if (b[slow][i] === 0 && b[fast][i] !== 0) {
          b[slow][i] = b[fast][i];
          b[fast][i] = 0;
          fast--;
        } else if (b[slow][i] !== 0 && b[fast][i] === 0) {
          fast--;
        } else if (b[slow][i] !== 0 && b[fast][i] !== 0) {
          if (b[slow][i] === b[fast][i]) {
            b[slow][i] = b[slow][i] + b[fast][i];
            b[fast][i] = 0;
            fast = slow - 1;
            slow--;
          } else {
            slow--;
            fast = slow - 1;
          }
        }
      }
    }
    if (JSON.stringify(b) !== JSON.stringify(oldData)) {
      addNumber(b);
    }
    if(check){
        return b;
    }else{
      setboardnumbers(b);
    }  
  };

  const swipeUp =  (check?:boolean):number[][] | void=> {
    let b = cloneDeep(boardnumbers);
    let oldData = JSON.parse(JSON.stringify(boardnumbers));
    for (let i = 0; i < 4; i++) {
      let slow = 0;
      let fast = 1;
      while (slow < 4) {
        if (fast === 4) {
          fast = slow + 1;
          slow++;
          continue;
        }
        if (b[slow][i] === 0 && b[fast][i] === 0) {
          fast++;
        } else if (b[slow][i] === 0 && b[fast][i] !== 0) {
          b[slow][i] = b[fast][i];
          b[fast][i] = 0;
          fast++;
        } else if (b[slow][i] !== 0 && b[fast][i] === 0) {
          fast++;
        } else if (b[slow][i] !== 0 && b[fast][i] !== 0) {
          if (b[slow][i] === b[fast][i]) {
            b[slow][i] = b[slow][i] + b[fast][i];
            b[fast][i] = 0;
            fast = slow + 1;
            slow++;
          } else {
            slow++;
            fast = slow + 1;
          }
        }
      }
    }
    if (JSON.stringify(oldData) !== JSON.stringify(b)) {
      addNumber(b);
    }
    if(check){
        return b;
    }else{
      setboardnumbers(b);
    }  
  };
  const checkGameOver =():boolean =>{
      let left=swipeLeft(true);
      if(left){
        if (JSON.stringify(boardnumbers) !== JSON.stringify(left)) {
            return false;
        }
      }

      let right=swipeRight(true);
      if(right){
        if (JSON.stringify(boardnumbers) !== JSON.stringify(right)) {
            return false;
        }
      }
      let up=swipeUp(true);
      if(up){
        if (JSON.stringify(boardnumbers) !== JSON.stringify(up)) {
            return false;
        }
      }
      let down=swipeDown(true);
      if(down){
        if (JSON.stringify(boardnumbers) !== JSON.stringify(down)) {
            return false;
        }
      }
      return true;
  }
  const resetGame =()=>{
      setgameOver(false);
      const initvalues = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ];
  
      addNumber(initvalues);
      addNumber(initvalues);
      setboardnumbers(initvalues);
  }
  const handleDown = (event: React.KeyboardEvent) => {
      if(gameOver) return;
    switch (event.key) {
      case "ArrowLeft":
        swipeLeft();
        break;
      case "ArrowRight":
        swipeRight();
        break;
      case "ArrowUp":
        swipeUp();
        break;
      case "ArrowDown":
        swipeDown();
        break;
    }
  };
  useEvent("keydown", handleDown);

  const initialize = () => {
    let newGrid = cloneDeep(boardnumbers);
    addNumber(newGrid);
    addNumber(newGrid);
    setboardnumbers(newGrid);
  };
  useEffect(() => {
    initialize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  return (
      <Container>
          <Title>2048</Title>
          <Reset onClick={resetGame}>Reset</Reset>
      <TableContainerStyled>
        <TableStyled>
          <TableBody>
            {boardnumbers.map(l => (
              <TableRow key={l[0]+Math.random()-Math.random()}>
                {l.map(ll => (
                  <TableCellStyled align="center" number={ll}>
                    <Number number={ll}>{ll}</Number>
                  </TableCellStyled>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </TableStyled>
      </TableContainerStyled>
      <Controller swipeUp={swipeUp} swipeDown={swipeDown} swipeLeft={swipeLeft} swipeRight={swipeRight} />
      </Container>
  );
};

export default Board;
const Container = styled("div")(()=>({}));
const Title = styled("div")(({theme})=>({
    fontSize:"3rem",
    fontFamily:"cursive",
    lineHeight:"5rem",
    display:"flex",
    justifyContent:"center",
    color:theme.palette.text.primary
}));
const Reset = styled("div")(({theme})=>({
    width:"min-content",
    padding:"1rem",
    borderRadius:"15px",
    marginBottom:"20px",
    backgroundColor:theme.palette.primary.light,
    color:theme.palette.text.secondary,
    cursor:"pointer"
}));
const TableContainerStyled = styled(TableContainer)(({ theme }) => ({
  height: "100%",
  borderSpacing: "10px",
  borderCollapse: "separate",
  backgroundColor: theme.palette.primary.dark,
  borderRadius:"16px"
}));
const TableStyled = styled(Table)(() => ({
  height: "100%",
  borderSpacing: "10px",
  borderCollapse: "separate",
  tableLayout: "fixed",
}));

interface numberprop {
    number: number
}

const TableCellStyled = styled(TableCell)(({ number }: numberprop) => ({
  border: "0",
  backgroundColor: getColors(number),
  color:"black",
  width: "auto",
}));
const Number = styled("span")(({number}:numberprop) => ({
  fontSize: "large",
  visibility: number===0 ? "hidden" : "visible"
}));

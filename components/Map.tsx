import * as React from "react";
import { useState, useRef, useEffect } from "react";
import { Stage, Layer, Star, Text, Circle, Line, Wedge } from "react-konva";
import ReactDOM from "react-dom";
import { MapMainControls } from "./helpers/mapMainControls";
import Callback from "./helpers/callback";
import InputArray from "./helpers/inputArray";
import OutputArray from "./helpers/outputArray";
import KonvaLayer from "./helpers/KonvaLayer";
import Explainer from "./helpers/explainer";
// import { Ellipse } from "konva/types/shapes/Ellipse";

enum cls {
  numArr = "numArr",
  num = "num",
  arrBrkt = "arrBrkt",
  callbackFunc = "callbackFunc",
}

const doubleNumber = (num: number) => {
  return num * 2;
};

enum currentTaskE {
  "inactive",
  "input",
  "output",
}

const Map = () => {
  const inputEl = useRef(null);
  const [nums, setNums] = useState([1, 2, 3]);
  const [algoHasStarted, setAlgoHasStarted] = useState(false);
  const [algoHasFinished, setAlgoHasFinished] = useState(false);
  const [algoWillReset, setAlgoWillReset] = useState(false);
  const [stepNumber, setStepNumber] = useState(0);
  const [curIdx, setCurIdx] = useState(-1);
  const [outputArray, setOutputArray] = useState<number[]>([]);
  const [curNumCoords, setCurNumCoords] = useState({ x: 0, y: 0 });
  const [curOutputNumCoords, setCurOutputNumCoords] = useState({ x: 0, y: 0 });
  const [inputCoords, setInputCoords] = useState({ x: 0, y: 0 });
  const [outputCoords, setOutPutCoords] = useState({ x: 0, y: 0 });
  const [currentTask, setCurrentTask] = useState<currentTaskE>(
    currentTaskE.inactive
  );
  const [explainer, setExplainer] = useState(true);
  const [animInput, setAnimInput] = useState(false);
  // state object's job is to keep our disparate state's better organized, easier to remember, good intellisense...
  const stateObj = {
    nums: nums,
    algoHasStarted: algoHasStarted,
    outputArray: outputArray,
    stepNumber: stepNumber,
    curIdx: curIdx,
    curNumCoords: curNumCoords,
    inputCoords: inputCoords,
    outputCoords: outputCoords,
    currentTask: currentTask,
    curOutputNumCoords: curOutputNumCoords,
    algoHasFinished: algoHasFinished,
    algoWillReset: algoWillReset,
    animInput: animInput,
  };

  // same as state object but for set state.
  const setStateObj = {
    setNums: setNums,
    setAlgoHasStarted: setAlgoHasStarted,
    setOutputArray: setOutputArray,
    setStepNumber: setStepNumber,
    setCurIdx: setCurIdx,
    setCurNumCoords: setCurNumCoords,
    setInputCoords: setInputCoords,
    setOutPutCoords: setOutPutCoords,
    setCurrentTask: setCurrentTask,
    setCurOutputNumCoords: setCurOutputNumCoords,
    setAlgoHasFinished: setAlgoHasFinished,
    setAlgoWillReset: setAlgoWillReset,
    setAnimInput: setAnimInput,
    setExplainer: setExplainer,
  };

  useEffect(() => {
    setStateObj.setAlgoWillReset(true);
    setStateObj.setCurIdx(-1);
    setStateObj.setCurrentTask(currentTaskE.inactive);
    setStateObj.setStepNumber(0);
    setStateObj.setOutputArray([]);
  }, [algoHasFinished]);

  const takeStep = (restart: boolean) => {
    setStateObj.setAlgoHasStarted(true);
    setStateObj.setStepNumber((val) => ++val);

    // only 2 mod steps so far but could imagin adding more fine grain control later.
    // for example, 1 step iterate input, 2 step animate passing num to callback, 3 step processing callback
    // 4 step adding to output...

    if (algoWillReset) {
      setStateObj.setAlgoHasFinished(false);
      setAlgoWillReset(false);
    }

    //if the algo is completing
    if (
      stateObj.curIdx === stateObj.nums.length - 1 &&
      stateObj.currentTask === currentTaskE.output
    ) {
      setStateObj.setAlgoHasFinished(true);
    }
    //even steps will pass control to callback funtion to process input ele
    if (stateObj.curIdx >= stateObj.nums.length) {
      setStateObj.setAlgoHasFinished(true);
      return;
    }
    if (stepNumber % 2 === 0) {
      setStateObj.setCurIdx((idx) => ++idx);
      setStateObj.setCurrentTask(currentTaskE.input);
    }
    //odd steps will send control to adding transformed ele to output
    else if (stepNumber % 2 !== 0) {
      if (stateObj.nums[stateObj.curIdx]) {
        let copy = [...stateObj.outputArray];
        copy.push(doubleNumber(stateObj.nums[stateObj.curIdx]));
        setStateObj.setOutputArray(copy);
        setStateObj.setCurrentTask(currentTaskE.output);
      }
    }
  };

  return (
    <div className="allApp">
      <div className="foundation">
        <MapMainControls {...stateObj} {...setStateObj} takeStep={takeStep} />
        <Callback {...stateObj} {...setStateObj} doubleNumber={doubleNumber} />
        <InputArray {...stateObj} {...setStateObj} />
        <OutputArray {...stateObj} {...setStateObj} />
      </div>
      <KonvaLayer {...stateObj} {...setStateObj} />
      <Explainer explainer={explainer} setAnimInput={setAnimInput} />
    </div>
  );
};

export default Map;

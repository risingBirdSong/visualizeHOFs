import * as React from "react";
import { useState, useRef, useEffect } from "react";
import { Stage, Layer, Star, Text, Circle, Line, Wedge } from "react-konva";
import ReactDOM from "react-dom";
import { MapMainControls } from "./mapMainControls";
import DefualtCallback from "./defaultNumCallback";
import NumCallback from "./inputTypes/numbers/numberCallback";
import StringCallback from "./inputTypes/strings/stringCallback";
import InputArray from "./inputArray";
import OutputArray from "./outputArray";
import KonvaLayer from "./KonvaLayer";
import Explainer from "./explainer";
import ChooseInputsCallbacks from "./chooseInputsCallbacks";
import Numbers from "./inputTypes/numbers/numbers";
import Strings from "./inputTypes/strings/strings";
import Emojis from "./inputTypes/emojis";
// import { Ellipse } from "konva/types/shapes/Ellipse";

//number functions
const halveNumber = (num: number): number => {
  return num / 2;
};
const doubleNumber = (num: number) => {
  return num * 2;
};
const tripleNumber = (num: number) => {
  return num * 3;
};

const squareNumber = (num: number): number => {
  return num * num;
};
//string functions
const toUpper = (str: string): string => {
  return str.toLocaleUpperCase();
};
const reverse = (str: string): string => {
  return str.split("").reverse().join("");
};

enum currentTaskE {
  "inactive",
  "input",
  "output",
}

enum inputTypeChoiceE {
  "numbers" = "numbers",
  "strings" = "strings",
  "emojis" = "emojis",
}

enum numberCallbacksE {
  "double" = "double",
  "halve" = "halve",
  "square" = "square",
  "triple" = "triple",
}
enum stringCallbacksE {
  "toUpper" = "toUpper",
  "reverse" = "reverse",
}
enum inputVarTypeE {
  "num" = "num",
  "str" = "str",
  "emoji" = "emoji",
}

enum cls {
  numArr = "numArr",
  num = "num",
  arrBrkt = "arrBrkt",
  callbackFunc = "callbackFunc",
}
const Map = () => {
  //state hooks
  const inputEl = useRef(null);
  const [nums, setNums] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  const [strs, setStrs] = useState([
    "guitar",
    "drum",
    "synth",
    "tuba",
    "flute",
  ]);
  const [algoHasStarted, setAlgoHasStarted] = useState(true);
  const [algoHasFinished, setAlgoHasFinished] = useState(false);
  const [algoWillReset, setAlgoWillReset] = useState(false);
  const [stepNumber, setStepNumber] = useState(0);
  const [curIdx, setCurIdx] = useState(-1);
  const [outputArray, setOutputArray] = useState<(number | string)[]>([]);
  const [curNumCoords, setCurNumCoords] = useState({ x: 0, y: 0 });
  const [curOutputNumCoords, setCurOutputNumCoords] = useState({ x: 0, y: 0 });
  const [inputCoords, setInputCoords] = useState({ x: 0, y: 0 });
  const [outputCoords, setOutPutCoords] = useState({ x: 0, y: 0 });
  const [currentTask, setCurrentTask] = useState<currentTaskE>(
    currentTaskE.inactive
  );
  const [explainer, setExplainer] = useState(true);
  const [animInput, setAnimInput] = useState(false);
  const [animTarget, setAnimTarget] = useState("");
  const [showAllButtons, setshowAllButtons] = useState(false);
  const [fastRefToggler, setfastRefToggler] = useState(false);
  const [showInputsOptions, setShowInputsOptions] = useState(false);
  const [inputTypeChoice, setinputTypeChoice] = useState<inputTypeChoiceE>(
    inputTypeChoiceE.numbers
  );
  //callback hooks
  //https://medium.com/swlh/how-to-store-a-function-with-the-usestate-hook-in-react-8a88dd4eede1
  //learned to store function as hook
  const [
    currentNumFunctionHook,
    setCurrentNumFunctionHook,
  ] = useState(() => (x: number) => doubleNumber(x));

  const [
    currentStrFunctionHook,
    setCurrentStrFunctionHook,
  ] = useState(() => (x: string) => toUpper(x));
  const [currentNumFunctionName, setCurrentNumFunctionName] = useState<
    numberCallbacksE
  >();
  const [currentStrFunctionName, setCurrentStrFunctionName] = useState<
    stringCallbacksE
  >();
  const [curLogicAsString, setCurLogicAsString] = useState("* 2");
  const [curInputType, setCurInputType] = useState("number");
  const [curInputVarName, setCurInputVarName] = useState<inputVarTypeE>(
    inputVarTypeE.num
  );
  const resetting = () => {
    setAlgoWillReset(true);
    setStepNumber(0);
    setCurIdx(-1);
    setOutputArray([]);
    setCurrentTask(currentTaskE.inactive);
  };
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
    showAllButtons: showAllButtons,
    animTarget: animTarget,
    fastRefToggler: fastRefToggler,
    showInputsOptions: showInputsOptions,
    inputTypeChoice: inputTypeChoice,
    strs: strs,
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
    setshowAllButtons: setshowAllButtons,
    setAnimTarget: setAnimTarget,
    setfastRefToggler: setfastRefToggler,
    setShowInputsOptions: setShowInputsOptions,
    setinputTypeChoiceE: setinputTypeChoice,
    setStrs: setStrs,
  };

  // setCurrentFunctionHook
  // setCurFunctionName
  // setCurLogicAsString
  // setCurInputType
  // setCurInputVarName

  const changeToUpper = () => {
    setCurrentStrFunctionHook(() => (x: string) => toUpper(x));
    setCurLogicAsString(".ToUpperCase()");
    setCurInputType("string");
    setCurInputVarName(inputVarTypeE.str);
  };

  const changeToReverse = () => {
    setCurrentStrFunctionHook(() => (x: string) => reverse(x));
    setCurLogicAsString(`.split("").reverse().join("");`);
    setCurInputType("string");
    setCurInputVarName(inputVarTypeE.str);
  };

  const changeToDoubleNumber = () => {
    setCurrentNumFunctionHook(() => (x: number) => doubleNumber(x));
    setCurLogicAsString("* 2");
    setCurInputType("number");
    setCurInputVarName(inputVarTypeE.num);
  };

  const changeToHalve = () => {
    setCurrentNumFunctionHook(() => (x: number) => halveNumber(x));
    setCurLogicAsString("/ 2");
    setCurInputType("number");
    setCurInputVarName(inputVarTypeE.num);
  };

  const changeToSquare = () => {
    setCurrentNumFunctionHook(() => (x: number) => squareNumber(x));
    setCurLogicAsString("* num");
    setCurInputType("number");
    setCurInputVarName(inputVarTypeE.num);
  };

  const changeToTriple = () => {
    setCurrentNumFunctionHook(() => (x: number) => tripleNumber(x));
    setCurLogicAsString("* 3");
    setCurInputType("number");
    setCurInputVarName(inputVarTypeE.num);
  };

  useEffect(() => {
    console.log("input type choice", inputTypeChoice);
    // unexpected toggling
    if (inputTypeChoice === inputTypeChoiceE.numbers) {
      setCurrentNumFunctionHook(() => (x: number) => doubleNumber(x));
      setCurLogicAsString("* 2");
      setCurInputType("number");
      setCurInputVarName(inputVarTypeE.num);
    } else if (inputTypeChoice === inputTypeChoiceE.strings) {
      setCurrentStrFunctionName(stringCallbacksE.toUpper);
      setCurrentStrFunctionHook(() => (x: string) => toUpper(x));
      setCurLogicAsString(".ToUpperCase()");
      setCurInputType("string");
      setCurInputVarName(inputVarTypeE.str);
    }
  }, [inputTypeChoice]);

  useEffect(() => {
    if (currentStrFunctionName === stringCallbacksE.toUpper) {
      changeToUpper();
    } else if (currentStrFunctionName === stringCallbacksE.reverse) {
      changeToReverse();
    }
  }, [currentStrFunctionName]);

  useEffect(() => {
    //update the current callback function here
    if (currentNumFunctionName === numberCallbacksE.double) {
      changeToDoubleNumber();
    } else if (currentNumFunctionName === numberCallbacksE.halve) {
      changeToHalve();
    } else if (currentNumFunctionName === numberCallbacksE.square) {
      changeToSquare();
    } else if (currentNumFunctionName === numberCallbacksE.triple) {
      changeToTriple();
    }
  }, [currentNumFunctionName]);

  useEffect(() => {
    //ah this is if check is useful because we dont want this fire initially
    if (algoHasFinished) {
      setStateObj.setAlgoWillReset(true);
      setStateObj.setCurIdx(-1);
      setStateObj.setCurrentTask(currentTaskE.inactive);
      setStateObj.setStepNumber(0);
      setStateObj.setOutputArray([]);
    }
  }, [algoHasFinished]);

  useEffect(() => {
    if (!showInputsOptions) {
      // what will committing this out break?
      // setinputTypeChoice(inputTypeChoiceE.numbers);
    }
  }, [showInputsOptions]);

  useEffect(() => {
    console.log("strs", strs);
  }, [strs]);

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
      stateObj.inputTypeChoice === inputTypeChoiceE.numbers &&
      stateObj.curIdx === stateObj.nums.length - 1 &&
      stateObj.currentTask === currentTaskE.output
    ) {
      setStateObj.setAlgoHasFinished(true);
    } else if (
      stateObj.inputTypeChoice === inputTypeChoiceE.strings &&
      stateObj.curIdx === stateObj.strs.length - 1 &&
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
      if (stateObj.inputTypeChoice === inputTypeChoiceE.numbers) {
        if (stateObj.nums[stateObj.curIdx]) {
          let copy = [...stateObj.outputArray];
          //changed from hard coded function to currentFunction
          let transformed = currentNumFunctionHook(
            stateObj.nums[stateObj.curIdx]
          );
          copy.push(transformed);
          setStateObj.setOutputArray(copy);
          setStateObj.setCurrentTask(currentTaskE.output);
        }
      } else if (stateObj.inputTypeChoice === inputTypeChoiceE.strings) {
        if (stateObj.strs[stateObj.curIdx]) {
          let copy = [...stateObj.outputArray];
          //changed from hard coded function to currentFunction
          let transformed = currentStrFunctionHook(
            stateObj.strs[stateObj.curIdx]
          );
          copy.push(transformed);
          setStateObj.setOutputArray(copy);
          setStateObj.setCurrentTask(currentTaskE.output);
        }
      }
    }
  };

  return (
    <div className="allApp">
      <div className="foundation">
        <MapMainControls {...stateObj} {...setStateObj} takeStep={takeStep} />
        {showInputsOptions ? (
          <ChooseInputsCallbacks
            resetting={resetting}
            setinputTypeChoice={setinputTypeChoice}
          />
        ) : (
          ""
        )}
        {stateObj.inputTypeChoice === inputTypeChoiceE.numbers &&
        showInputsOptions ? (
          <Numbers
            setType={setinputTypeChoice}
            setNums={setStateObj.setNums}
            resetting={resetting}
            boolSwitch={showInputsOptions}
            updateNumberCallBacks={setCurrentNumFunctionName}
          />
        ) : stateObj.inputTypeChoice === inputTypeChoiceE.strings &&
          showInputsOptions ? (
          <Strings
            updateStringCallBacks={setCurrentStrFunctionName}
            resetting={resetting}
            setStrings={setStateObj.setStrs}
            setType={setinputTypeChoice}
          />
        ) : stateObj.inputTypeChoice === inputTypeChoiceE.emojis &&
          showInputsOptions ? (
          <Emojis />
        ) : (
          ""
        )}
        <Explainer explainer={explainer} {...stateObj} {...setStateObj} />
        <InputArray {...stateObj} {...setStateObj} />
        {/* <DefualtCallback
          {...stateObj}
          {...setStateObj}
          doubleNumber={doubleNumber}
        /> */}
        {inputTypeChoice === inputTypeChoiceE.strings ? (
          <StringCallback
            {...stateObj}
            {...setStateObj}
            FunctionName={currentStrFunctionName}
            actualCallback={currentStrFunctionHook}
            callbackLogic={curLogicAsString}
            inputType={curInputType}
            inputVarName={curInputVarName}
          />
        ) : (
          <NumCallback
            {...stateObj}
            {...setStateObj}
            FunctionName={currentNumFunctionName}
            actualCallback={currentNumFunctionHook}
            callbackLogic={curLogicAsString}
            inputType={curInputType}
            inputVarName={curInputVarName}
          />
        )}

        <OutputArray {...stateObj} {...setStateObj} />
      </div>
      <KonvaLayer {...stateObj} {...setStateObj} />
    </div>
  );
};

export default Map;

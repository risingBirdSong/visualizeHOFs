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
const cheerUp = (str: string): string => {
  //@ts-ignore
  return emojiObj[str];
};

enum currentTaskE {
  "inactive",
  "input",
  "output",
}

enum inputTypeChoiceE {
  "numbers" = "numbers",
  "strings" = "strings",
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
  "emojiBeHappy" = "emojiBeHappy",
}
enum inputVarTypeE {
  "num" = "num",
  "str" = "str",
}

enum cls {
  numArr = "numArr",
  num = "num",
  arrBrkt = "arrBrkt",
  callbackFunc = "callbackFunc",
}

let emojiObj = {
  "😔": "😌",
  "🙁": "🙂",
  "😣": "😆",
  "😫": "😆",
  "😭": "😂",
  "😡": "😊",
  "👿": "😇",
};

const Map = () => {
  //state hooks
  const inputEl = useRef(null);
  const [nums, setNums] = useState([2, 4, 6, 8]);
  const [strs, setStrs] = useState<string[]>([
    "guitar",
    "drum",
    "synth",
    "tuba",
    "flute",
  ]);
  // const [emojis, setEmojis] = useState<any[]>([&#129409;, &#129409;])
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
  >(numberCallbacksE.double);
  const [currentStrFunctionName, setCurrentStrFunctionName] = useState<
    stringCallbacksE
  >();
  const [curLogicAsString, setCurLogicAsString] = useState("* 2");
  const [curInputType, setCurInputType] = useState("number");
  const [curInputVarName, setCurInputVarName] = useState<inputVarTypeE>(
    inputVarTypeE.num
  );

  //custom logic
  //needed?
  const [showTextArea, setShowTextArea] = useState(false);
  const [customArray, setCustomArray] = useState<number[]>([11, 22, 33]);
  const [customFunctionName, setcustomFunctionName] = useState<any>("addOne");
  const [customFunction, setCustomFunction] = useState<any>("return x + 1;");
  const [customFunctionBody, setcustomFunctionBody] = useState<any>("+ 1");
  const [customFuncInputType, setcustomFuncInputType] = useState<any>("number");
  const [customFuncInputVarName, setcustomFuncInputVarName] = useState<any>(
    "x"
  );
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
    customArray: customArray,
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
    setCustomArray: setCustomArray,
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
  const changeToEmoji = () => {
    setCurrentStrFunctionHook(() => (x: string) => cheerUp(x));
    setCurLogicAsString(`.cheerUp()`);
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

  const resetting = () => {
    setAlgoWillReset(true);
    setStepNumber(0);
    setCurIdx(-1);
    setOutputArray([]);
    setCurrentTask(currentTaskE.inactive);
  };

  useEffect(() => {
    console.log("input type choice", inputTypeChoice);
    // unexpected toggling
    if (inputTypeChoice === inputTypeChoiceE.numbers) {
      setCurrentNumFunctionHook(() => (x: number) => doubleNumber(x));
      setCurLogicAsString("* 2");
      setCurInputType("number");
      setCurInputVarName(inputVarTypeE.num);
    } else if (
      inputTypeChoice === inputTypeChoiceE.strings &&
      currentStrFunctionName !== stringCallbacksE.emojiBeHappy
    ) {
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
    } else if (currentStrFunctionName === stringCallbacksE.emojiBeHappy) {
      changeToEmoji();
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

          //here here
          // console.log("funct", Function(customFunction));
          // console.log("4", Function(customFunction)(4));
          // console.log("7", Function(customFunction)(7));
          console.log("currentNumFunctionHook", currentNumFunctionHook);

          let transformed = currentNumFunctionHook(
            stateObj.nums[stateObj.curIdx]
          );
          console.log("transformed", transformed);

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
        <KonvaLayer {...stateObj} {...setStateObj} />

        <MapMainControls {...stateObj} {...setStateObj} takeStep={takeStep} />
        {showInputsOptions ? (
          <ChooseInputsCallbacks
            setShowTextArea={setShowTextArea}
            setStrings={setStrs}
            resetting={resetting}
            setinputTypeChoice={setinputTypeChoice}
            setCurrentStrFunctionName={setCurrentStrFunctionName}
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
            //@ts-ignore
            updateNumberCallBacks={setCurrentNumFunctionName}
          />
        ) : stateObj.inputTypeChoice === inputTypeChoiceE.strings &&
          showInputsOptions &&
          currentStrFunctionName !== stringCallbacksE.emojiBeHappy ? (
          <Strings
            updateStringCallBacks={setCurrentStrFunctionName}
            resetting={resetting}
            setStrings={setStateObj.setStrs}
            setType={setinputTypeChoice}
          />
        ) : (
          ""
        )}
        {showTextArea && showInputsOptions ? (
          // https://stackoverflow.com/questions/36073656/element-with-higher-z-index-value-not-overlaying-another
          <div>
            <div>
              <label>
                {" "}
                all the prefilled values are examples, and will work if you
                click submit
              </label>
              <hr />
              <label>
                array {"->"} write as comma separated numbers, like 11,22,33
                (currently number array only)
              </label>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setNums(customArray);
                }}
              >
                <input
                  onChange={(e) => {
                    console.log("e", e.target.value);
                    let strArray = e.target.value.split(",");
                    let toNums = strArray.map((num) => Number(num));
                    setCustomArray(toNums);
                  }}
                  //@ts-ignore TODO
                  value={customArray}
                ></input>
                <input type="submit" value="Submit" />
              </form>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setCurrentNumFunctionName(customFunctionName);

                  try {
                    let b = () => (x: any) =>
                      Function(customFuncInputVarName, customFunction)(x);
                    setCurrentNumFunctionHook(b);
                  } catch {
                    alert("didnt work");
                  }
                  setCurLogicAsString(customFunctionBody);
                  setCurInputType("number");
                  setCurInputVarName(customFuncInputVarName);
                }}
              >
                {/* here here */}
                <label>function name : (please use camel case)</label>
                <input
                  onChange={(e) => {
                    setcustomFunctionName(e.target.value);
                  }}
                  value={customFunctionName}
                ></input>
                <label>
                  function input variable name (limited to one at the moment)
                </label>
                <input
                  onChange={(e) => {
                    setcustomFuncInputVarName(e.target.value);
                  }}
                  value={customFuncInputVarName}
                ></input>
                {/* <label>function variable input type</label>
                <input
                  onChange={(e) => {
                    setcustomFuncInputType(e.target.value);
                  }}
                  value={customFuncInputType}
                ></input> */}
                <label>function body </label>
                <input
                  onChange={(e) => {
                    setCustomFunction(e.target.value);
                  }}
                  value={customFunction}
                ></input>
                <label>
                  function logic body as string (the function body except for
                  return and variable name... non functional but its what shows
                  up in the visualization... a little confusing, play around
                  with it)
                </label>
                <input
                  onChange={(e) => {
                    setcustomFunctionBody(e.target.value);
                  }}
                  value={customFunctionBody}
                ></input>
                <input type="submit" value="Submit" />
              </form>
            </div>
          </div>
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
    </div>
  );
};

export default Map;

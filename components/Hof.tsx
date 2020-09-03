import * as React from "react";
import { useState, useRef, useEffect } from "react";
import { Stage, Layer, Star, Text, Circle, Line, Wedge } from "react-konva";
import ReactDOM from "react-dom";
import { MapMainControls } from "./MainControls";
import DefualtCallback from "./defaultNumCallback";
import GenericCallback from "./inputTypes/generics/genericCallback";
import StringCallback from "./inputTypes/strings/stringCallback";
import InputArray from "./inputArray";
import OutputArray from "./outputArray";
import KonvaLayer from "./KonvaLayer";
import Explainer from "./explainer";
import ChooseInputsCallbacks from "./chooseInputsCallbacks";
import Numbers from "./inputTypes/generics/numbers";
import Strings from "./inputTypes/generics/strings";
// import { Ellipse } from "konva/types/shapes/Ellipse";

//number functions map
const halveNum = (num: number | string): number => {
  return Number(num) / 2;
};
const doubleNum = (num: number | string) => {
  return Number(num) * 2;
};
const tripleNum = (num: number | string) => {
  return Number(num) * 3;
};

const squareNum = (num: number | string): number => {
  return Number(num) * Number(num);
};

//string functions
const toUpper = (str: number | string): string => {
  return String(str).toLocaleUpperCase();
};
const reverse = (str: number | string): string => {
  return String(str).split("").reverse().join("");
};
const cheerUp = (str: number | string): string => {
  //@ts-ignore
  return emojiObj[str];
};

//filter functions

const isEven = (num: number): boolean => {
  return num % 2 === 0 ? true : false;
};

const isPrime = (num: number): boolean => {
  for (let i = 2; num > i; i++) {
    if (num % i == 0) {
      return false;
    }
  }
  return num > 1;
};

const lessThan10 = (num: number): boolean => {
  return num < 10;
};

//filter strings
const fourLetterWord = (str: string) => {
  return str.length === 4 ? true : false;
};

const wordcontainsT = (str: string) => {
  return RegExp(/t/).test(str);
};

export type hofType = "MAP" | "FILTER" | "REDUCE";

enum currentTaskE {
  "inactive",
  "input",
  "output",
}

enum inputTypeChoiceE {
  "numbers" = "numbers",
  "strings" = "strings",
}

enum CallbacksE {
  "double" = "double",
  "halve" = "halve",
  "square" = "square",
  "triple" = "triple",
  "toUpper" = "toUpper",
  "reverse" = "reverse",
  "emojiBeHappy" = "emojiBeHappy",
}
// enum stringCallbacksE {
//   "toUpper" = "toUpper",
//   "reverse" = "reverse",
//   "emojiBeHappy" = "emojiBeHappy",
// }
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

export let emojiArr = [
  "😔",
  "🙁",
  "😣",
  "😫",
  "😭",
  "😡",
  "👿",
  "😌",
  "🙂",
  "😆",
  "😆",
  "😂",
  "😊",
  "😇",
];

let emojiObj = {
  "😔": "😌",
  "🙁": "🙂",
  "😣": "😆",
  "😫": "😆",
  "😭": "😂",
  "😡": "😊",
  "👿": "😇",
};

export interface HofOption {
  hofType: "MAP" | "FILTER" | "REDUCE";
}
interface coordsI {
  x: number;
  y: number;
}

const HOF = (props: HofOption) => {
  //state hooks

  const inputEl = useRef(null);
  const [mainArray, setMainArray] = useState<(number | string)[]>([
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
  ]);

  const [algoHasStarted, setAlgoHasStarted] = useState(true);
  const [algoHasFinished, setAlgoHasFinished] = useState(false);
  const [algoWillReset, setAlgoWillReset] = useState(false);
  const [stepNumber, setStepNumber] = useState(0);
  const [curIdx, setCurIdx] = useState(-1);
  const [outputArray, setOutputArray] = useState<(number | string)[]>([]);
  const [curNumCoords, setCurNumCoords] = useState({ x: 0, y: 0 });
  const [curOutputNumCoords, setCurOutputNumCoords] = useState({
    x: 0,
    y: 0,
  });
  const [inputCoords, setInputCoords] = useState({ x: 0, y: 0 });
  const [outputCoords, setOutPutCoords] = useState({ x: 0, y: 0 });
  const [currentTask, setCurrentTask] = useState<currentTaskE>(
    currentTaskE.inactive
  );
  const [explainer, setExplainer] = useState(true);
  const [animInput, setAnimInput] = useState(false);
  const [animTarget, setAnimTarget] = useState("");
  const [fastRefToggler, setfastRefToggler] = useState(false);
  const [showInputsOptions, setShowInputsOptions] = useState(false);
  const [inputTypeChoice, setinputTypeChoice] = useState<inputTypeChoiceE>(
    inputTypeChoiceE.numbers
  );
  //filtering
  const [curTrashCoords, setCurTrashCoords] = useState({ x: 0, y: 0 });
  const [filterStatus, setfilterStatus] = useState(false);

  const [numFilterCallBack, setnumFilterCallBack] = useState([
    isEven,
    isPrime,
    lessThan10,
  ]);

  const [numMapCallBackContainer, setNumMapCallBackContainer] = useState([
    halveNum,
    doubleNum,
    tripleNum,
    squareNum,
  ]);

  const [strMapCallBackContainer, setstrMapCallBackContainer] = useState([
    toUpper,
    reverse,
  ]);
  const [strFilterCallBackContainer, setstrFilterCallBackContainer] = useState([
    fourLetterWord,
    wordcontainsT,
  ]);

  const addNumCallBackToContainer = (
    func: (num: number | string) => number
  ): void => {
    let copyNumContainer = [...numMapCallBackContainer];
    copyNumContainer.push(func);
    setNumMapCallBackContainer(copyNumContainer);
  };
  //callback hooks
  //https://medium.com/swlh/how-to-store-a-function-with-the-usestate-hook-in-react-8a88dd4eede1
  //learned to store function as hook
  //map types
  type numMapCallBack = (x: number) => number;
  type strMapCallBack = (x: string) => string;
  //filter types
  type numFilterCallBack = (x: number) => boolean;
  type strFilterCallBack = (x: string) => boolean;

  const [currentFunctionHook, setCurrentFunctionHook] = useState<
    numMapCallBack | strMapCallBack | numFilterCallBack | strFilterCallBack
  >(() => (x: number | string) => doubleNum(x));

  const [
    currentStrFunctionHook,
    setCurrentStrFunctionHook,
  ] = useState(() => (x: string) => toUpper(x));
  const [currentFunctionName, setCurrentFunctionName] = useState<string>(
    doubleNum.name
  );
  // const [currentStrFunctionName, setCurrentStrFunctionName] = useState<
  //   stringCallbacksE
  // >();
  const [curLogicAsString, setCurLogicAsString] = useState("* 2");
  const [curInputType, setCurInputType] = useState("number");
  const [curInputVarName, setCurInputVarName] = useState<inputVarTypeE>(
    inputVarTypeE.num
  );

  //custom logic
  //needed?
  const [showTextArea, setShowTextArea] = useState(false);
  const [customArray, setCustomArray] = useState<string[]>(["1", "2", "3"]);
  const [customFunctionName, setcustomFunctionName] = useState<any>("addOne");
  const [customFunction, setCustomFunction] = useState<any>("return num + 1;");
  const [customFunctionBody, setcustomFunctionBody] = useState<any>("+ 1");
  const [customFuncInputType, setcustomFuncInputType] = useState<any>("number");
  const [customFuncInputVarName, setcustomFuncInputVarName] = useState<any>(
    "num"
  );
  // state object's job is to keep our disparate state's better organized, easier to remember, good intellisense...
  const stateObj = {
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
    animTarget: animTarget,
    fastRefToggler: fastRefToggler,
    showInputsOptions: showInputsOptions,
    inputTypeChoice: inputTypeChoice,
    // strs: strs,
    mainArray: mainArray,
    customArray: customArray,
  };

  // same as state object but for set state.
  const setStateObj = {
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
    setAnimTarget: setAnimTarget,
    setfastRefToggler: setfastRefToggler,
    setShowInputsOptions: setShowInputsOptions,
    setinputTypeChoiceE: setinputTypeChoice,
    // setStrs: setStrs,
    setMainArray: setMainArray,
    setCustomArray: setCustomArray,
  };

  // setCurrentFunctionHook
  // setCurFunctionName
  // setCurLogicAsString
  // setCurInputType
  // setCurInputVarName

  //change to map

  const changeToUpper = () => {
    setCurrentFunctionHook(() => (x: string) => toUpper(x));
    setCurLogicAsString(".ToUpperCase()");
    setCurInputType("string");
    setCurInputVarName(inputVarTypeE.str);
  };

  const changeToReverse = () => {
    setCurrentFunctionHook(() => (x: string) => reverse(x));
    setCurLogicAsString(`.split("").reverse().join("");`);
    setCurInputType("string");
    setCurInputVarName(inputVarTypeE.str);
  };
  const changeToEmoji = () => {
    setCurrentFunctionHook(() => (x: string) => cheerUp(x));
    setCurLogicAsString(`.cheerUp()`);
    setCurInputType("string");
    setCurInputVarName(inputVarTypeE.str);
  };

  const changeToDoubleNumber = () => {
    setCurrentFunctionHook(() => (x: number | string) => doubleNum(x));
    setCurLogicAsString("* 2");
    setCurInputType("number");
    setCurInputVarName(inputVarTypeE.num);
  };

  const changeToHalve = () => {
    // better way to type this?
    setCurrentFunctionHook(() => (x: number | string) => halveNum(x));
    setCurLogicAsString("/ 2");
    setCurInputType("number");
    setCurInputVarName(inputVarTypeE.num);
  };

  const changeToSquare = () => {
    setCurrentFunctionHook(() => (x: number | string) => squareNum(x));
    setCurLogicAsString("* num");
    setCurInputType("number");
    setCurInputVarName(inputVarTypeE.num);
  };

  const changeToTriple = () => {
    setCurrentFunctionHook(() => (x: number | string) => tripleNum(x));
    setCurLogicAsString("* 3");
    setCurInputType("number");
    setCurInputVarName(inputVarTypeE.num);
  };

  // change to filter

  const changeToIsEven = () => {
    setCurrentFunctionHook(() => (x: number) => isEven(x));
    setCurLogicAsString("% 2 === 0");
    setCurInputType("number");
    setCurInputVarName(inputVarTypeE.num);
  };
  const changeToIsPrime = () => {
    setCurrentFunctionHook(() => (x: number) => isPrime(x));
    setCurLogicAsString(`.isPrime()`);
    setCurInputType("number");
    setCurInputVarName(inputVarTypeE.num);
  };
  const changeToLessThan10 = () => {
    setCurrentFunctionHook(() => (x: number) => lessThan10(x));
    setCurLogicAsString("< 10");
    setCurInputType("number");
    setCurInputVarName(inputVarTypeE.num);
  };
  const changeToFourLetterWord = () => {
    setCurrentFunctionHook(() => (x: string) => fourLetterWord(x));
    setCurLogicAsString("str.length === 4");
    setCurInputType("string");
    setCurInputVarName(inputVarTypeE.str);
  };
  const changeToWordcontainsT = () => {
    setCurrentFunctionHook(() => (x: string) => wordcontainsT(x));
    setCurLogicAsString("RegExp(/t/).test(str)");
    setCurInputType("string");
    setCurInputVarName(inputVarTypeE.str);
  };

  const starting = () => {
    setStepNumber(0);
    setCurIdx(-1);
    setOutputArray([]);
    setCurrentTask(currentTaskE.inactive);
  };

  const resetting = () => {
    setAlgoWillReset(true);
    setStepNumber(0);
    setCurIdx(-1);
    setOutputArray([]);
    setCurrentTask(currentTaskE.inactive);
  };

  useEffect(() => {
    starting();
  }, [props.hofType]);

  useEffect(() => {
    // console.log("coords", curOutputNumCoords);
  }, [curOutputNumCoords]);

  useEffect(() => {
    if (props.hofType === "MAP") {
      setCurrentFunctionName(doubleNum.name);
    } else if (props.hofType === "FILTER") {
      setCurrentFunctionName("isEven");
    }
  }, [props.hofType]);

  useEffect(() => {
    // unexpected toggling
    if (inputTypeChoice === inputTypeChoiceE.numbers) {
      setCurrentFunctionHook(() => (x: number | string) => doubleNum(x));
      setCurLogicAsString("* 2");
      setCurInputType("number");
      setCurInputVarName(inputVarTypeE.num);
    } else if (
      inputTypeChoice === inputTypeChoiceE.strings &&
      currentFunctionName !== CallbacksE.emojiBeHappy
    ) {
      setCurrentFunctionName(CallbacksE.toUpper);
      setCurrentStrFunctionHook(() => (x: string) => toUpper(x));
      setCurLogicAsString(".ToUpperCase()");
      setCurInputType("string");
      setCurInputVarName(inputVarTypeE.str);
    }
  }, [inputTypeChoice]);

  useEffect(() => {
    // console.log("mainArray", mainArray);
  }, [mainArray]);

  //strings
  useEffect(() => {
    if (currentFunctionName === CallbacksE.toUpper) {
      changeToUpper();
    } else if (currentFunctionName === CallbacksE.emojiBeHappy) {
      changeToEmoji();
    } else if (currentFunctionName === CallbacksE.reverse) {
      changeToReverse();
    } else if (currentFunctionName === fourLetterWord.name) {
      changeToFourLetterWord();
    } else if (currentFunctionName === wordcontainsT.name) {
      changeToWordcontainsT();
    }
  }, [currentFunctionName]);

  //numbers
  useEffect(() => {
    //update the current callback function here
    //map
    if (currentFunctionName === doubleNum.name) {
      changeToDoubleNumber();
    } else if (currentFunctionName === halveNum.name) {
      changeToHalve();
    } else if (currentFunctionName === squareNum.name) {
      changeToSquare();
    } else if (currentFunctionName === tripleNum.name) {
      changeToTriple();
    }
    // filter
    else if (currentFunctionName === isEven.name) {
      changeToIsEven();
    } else if (currentFunctionName === isPrime.name) {
      changeToIsPrime();
    } else if (currentFunctionName === lessThan10.name) {
      changeToLessThan10();
    }
  }, [currentFunctionName]);

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

  // useEffect(() => {
  //   console.log("strs", strs);
  // }, [strs]);

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
      stateObj.curIdx === stateObj.mainArray.length - 1 &&
      stateObj.currentTask === currentTaskE.output
    ) {
      setStateObj.setAlgoHasFinished(true);
    } else if (
      stateObj.inputTypeChoice === inputTypeChoiceE.strings &&
      // stateObj.curIdx === stateObj.strs.length - 1 &&
      stateObj.curIdx === stateObj.mainArray.length - 1 &&
      stateObj.currentTask === currentTaskE.output
    ) {
      setStateObj.setAlgoHasFinished(true);
    }
    //even steps will pass control to callback funtion to process input ele
    if (stateObj.curIdx >= stateObj.mainArray.length) {
      setStateObj.setAlgoHasFinished(true);
      return;
    }
    if (stepNumber % 2 === 0) {
      setStateObj.setCurIdx((idx) => ++idx);
      setStateObj.setCurrentTask(currentTaskE.input);
    }
    //odd steps will send control to adding transformed ele to output
    else if (stepNumber % 2 !== 0) {
      // a little silly, but still figuring this out TODO change later
      if (
        stateObj.inputTypeChoice === inputTypeChoiceE.numbers ||
        stateObj.inputTypeChoice === inputTypeChoiceE.strings
      ) {
        if (stateObj.mainArray[stateObj.curIdx]) {
          let copy = [...stateObj.outputArray];
          let transformed = currentFunctionHook(
            //@ts-ignore
            stateObj.mainArray[stateObj.curIdx]
          );
          // console.log("transformed", transformed);
          //filtering
          if (transformed === true) {
            setfilterStatus(true);
            copy.push(stateObj.mainArray[stateObj.curIdx]);
          } else if (transformed === false) {
            console.log(
              "going to the trash",
              stateObj.mainArray[stateObj.curIdx],
              "coords",
              curTrashCoords
            );
            setfilterStatus(false);
          } else {
            copy.push(transformed);
          }
          setStateObj.setOutputArray(copy);
          setStateObj.setCurrentTask(currentTaskE.output);
        }
        // } else if (stateObj.inputTypeChoice === inputTypeChoiceE.strings) {
        //   if (stateObj.mainArray[stateObj.curIdx]) {
        //     let copy = [...stateObj.outputArray];
        //     //changed from hard coded function to currentFunction
        //     let transformed = currentStrFunctionHook(
        //       stateObj.mainArray[stateObj.curIdx]
        //     );
        //     copy.push(transformed);
        //     setStateObj.setOutputArray(copy);
        //     setStateObj.setCurrentTask(currentTaskE.output);
        //   }
        // }
      }
    }
  };

  return (
    <div className="allApp">
      <div className="foundation">
        <KonvaLayer
          typeHof={props.hofType}
          filterStatus={filterStatus}
          trashCoords={curTrashCoords}
          {...stateObj}
          {...setStateObj}
        />

        <MapMainControls
          hofType={props.hofType}
          {...stateObj}
          {...setStateObj}
          takeStep={takeStep}
        />
        {showInputsOptions ? (
          <ChooseInputsCallbacks
            hofType={props.hofType}
            setMainArray={setMainArray}
            setShowWriteCustomFunc={setShowTextArea}
            resetting={resetting}
            setinputTypeChoice={setinputTypeChoice}
            setCurrentFunctionName={setCurrentFunctionName}
          />
        ) : (
          ""
        )}
        {inputTypeChoice === inputTypeChoiceE.numbers && showInputsOptions ? (
          <Numbers
            hof={props.hofType}
            filterNumCallBackContainer={numFilterCallBack}
            mapNumCallBackContainer={numMapCallBackContainer}
            inputType={inputTypeChoice}
            setType={setinputTypeChoice}
            setMainArray={setStateObj.setMainArray}
            resetting={resetting}
            boolSwitch={showInputsOptions}
            updateCallBacks={setCurrentFunctionName}
          />
        ) : inputTypeChoice === inputTypeChoiceE.strings &&
          showInputsOptions ? (
          <Strings
            strMapCallBackContainer={strMapCallBackContainer}
            strFilterCallBackContainer={strFilterCallBackContainer}
            typeHof={props.hofType}
            setType={setinputTypeChoice}
            setMainArray={setStateObj.setMainArray}
            resetting={resetting}
            updateCallBacks={setCurrentFunctionName}
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
              <div
                style={{
                  border: "1px solid black",
                  borderRadius: "8px",
                  padding: "8px",
                  margin: "8px",
                }}
              >
                {/* TODO break this out */}
                <form>
                  <div>
                    <label>
                      array {"->"} write as comma separated numbers, like 1,2,3
                    </label>
                    <input
                      onChange={(e) => {
                        let strArray = e.target.value.split(",");
                        setCustomArray(strArray);
                      }}
                      value={customArray}
                    ></input>
                  </div>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      if (
                        customArray.every((val) => {
                          let candidate = Number(val);
                          if (
                            typeof candidate === "number" &&
                            !isNaN(candidate)
                          ) {
                            return true;
                          } else return false;
                        })
                      ) {
                        let toNums = customArray
                          .filter((str) => {
                            let tryNum = Number(str);
                            if (isNaN(tryNum)) {
                              return false;
                            } else return true;
                          })
                          .map((x) => Number(x));
                        setMainArray(toNums);
                        setCustomArray(["1", "2", "3"]);
                      } else {
                        // let str = ""
                        setMainArray(customArray);
                        setCustomArray(["1", "2", "3"]);
                      }
                    }}
                    className="waves-effect waves-light amber btn"
                  >
                    submit array
                  </button>
                </form>
              </div>
              <div
                style={{
                  border: "1px solid black",
                  borderRadius: "8px",
                  padding: "8px",
                  margin: "8px",
                }}
              >
                <form>
                  <label>function name : (please use camel case)</label>
                  <input
                    onChange={(e) => {
                      setcustomFunctionName(e.target.value);
                    }}
                    value={customFunctionName}
                  ></input>
                  {/* <p>testing ...</p>
            
                  <p>... testing</p> */}
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
                    return and variable name... non functional but its what
                    shows up in the visualization... a little confusing, play
                    around with it)
                  </label>
                  <input
                    onChange={(e) => {
                      setcustomFunctionBody(e.target.value);
                    }}
                    value={customFunctionBody}
                  ></input>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentFunctionName(customFunctionName);
                      try {
                        let b = () => (x: any) =>
                          Function(customFuncInputVarName, customFunction)(x);
                        setCurrentFunctionHook(b);
                      } catch {
                        alert("didnt work");
                      }
                      setCurLogicAsString(customFunctionBody);
                      setCurInputType("number");
                      setCurInputVarName(customFuncInputVarName);
                    }}
                    className="waves-effect waves-light amber btn"
                  >
                    submit function
                  </button>
                </form>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
        <Explainer
          hof={props.hofType}
          explainer={explainer}
          {...stateObj}
          {...setStateObj}
        />
        <InputArray {...stateObj} {...setStateObj} />
        {/* <DefualtCallback
          {...stateObj}
          {...setStateObj}
          doubleNumber={doubleNumber}
        /> */}

        <GenericCallback
          typeHof={props.hofType}
          {...stateObj}
          {...setStateObj}
          FunctionName={currentFunctionName}
          actualCallback={currentFunctionHook}
          callbackLogic={curLogicAsString}
          inputType={curInputType}
          inputVarName={curInputVarName}
        />

        <OutputArray typeHof={props.hofType} {...stateObj} {...setStateObj} />
        {props.hofType === "FILTER" ? (
          <h5
            className={`${
              animTarget === "trashCanAnimate" ? "trashCanAnimate" : ""
            }`}
          >
            trash can
            <span
              ref={(ele) => {
                let trashX = ele?.getBoundingClientRect().x;
                let trashY = ele?.getBoundingClientRect().y;
                // console.log("hof type", props.hofType);
                // console.log("trash x", trashX, "trash y", trashY);

                if (trashX && trashY) {
                  if (curTrashCoords.x !== trashX) {
                    setCurTrashCoords({ x: trashX, y: trashY });
                  }
                }
              }}
            >
              🗑️
            </span>
          </h5>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default HOF;

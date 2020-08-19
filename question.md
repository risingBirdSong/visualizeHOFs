mapping through a list of numbers, only one number is the current target, and if it is then well highlight it with CSS and well set its X and Y coordinates to state.

Are you aware of a way to get the X and Y coordinates of an item without using refs? Refs are doing the job and are very useful here, however i'm running into some buggy behavior as well and would like to know about alternatives and am only finding refs with googling.  

{stateObj.outputArray.map((num, idx) => {
  return (
    <li className={"col s1"}>
      {idx === stateObj.curIdx ? (
        <p
          className={`${cls.num} amber lighten-1 z-depth-5`}
          ref={(ele) => {
            let x = ele?.getBoundingClientRect().x;
            let y = ele?.getBoundingClientRect().y;
            if (x && y && x !== curOutputNumCoords.x) {
              setStateObj.setCurOutputNumCoords({ x, y });
            }
          }}
        >
          {num}
        </p>
      ) : (
        <p className={`${cls.num} amber lighten-4 z-depth-3`}>
          {num}
        </p>
      )}
    </li>
  );
})}
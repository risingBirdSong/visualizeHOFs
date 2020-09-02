# Todos

## first basic step -> working with number arrays

- [x] create a basic function that we'll use to transform our input number array

* [x] animate the process of the transform function being applied to each number individually

# design / layout

- [ ] consider using react router to make the links take the user to different components.

* [x] align numbers with array brackets vertically

- [ ] make mobile friendly?

- [ ] add a list of further reading to already high quality explanations of how HOF works and the advantages. no need to reinvent the wheel here.

# Wish List

- [ ] make several different arrays with various types of content available to chosen by user

* [ ] make several transform functions the user can select to run against their chosen array

- [ ] allow the user to write their make their own array with custom contents

- [ ] allow the user to write their own custom function the run with a HOF

- [ ] can the lines be animated?

# Clean up

- [ ] remove anim boolean as its not necessary using anim string

# Lessons

great to find a solution to the broken line animation problem with the fast toggler to ensure refs stay fresh. Works even better than i though, notice the difference between inputArray and outPut array. input array explicilty toggles the same content depending on fastToggler state whereas I didnt change anything about outputArray and it still worked. Not sure exactly why but it looks like react is noticing all the fast state changes and the refs are being automatically updated.

# filtering variables

## number filtering

basic functions - isEven, isPrime, lessThan10
useState - [numFilterCallBack, setnumFilterCallBack]
type = numFilterCallBack

# next task

implement filter

--proper logic
--proper pointers

Hi, I'm making a visualizer for the .map Higher Order Function

I'm using refs to get the x and y coordinates for each end of the lines being rendered. The refs are updated each time the step button is pressed to iterate the input array.

This works fine but does has a bug where if the DOM element moves, the line remains stuck in place and doesn't move fluidly with the element.

To see this, press step, then click one of the buttons on the bottom that will wiggle the corresponding section.

I think can solve this with adding the CSS animation onto the Line so that it moves fluidly...

But this bug made me wonder about ways to update the X and Y coordinate Refs whenever the underlying DOM element changes. Do you have an idea on this?

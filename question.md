Hi, I'm making a visualizer for the .map Higher Order Function

I'm using refs to get the x and y coordinates for each end of the lines being rendered. The refs are updated each time the step button is pressed to iterate the input array.

This works fine but does has a bug where if the DOM element moves, the line remains stuck in place and doesn't move fluidly with the element.

To see this, press step, then click one of the buttons on the bottom that will wiggle the corresponding section.
move fluidly with the wiggling section?

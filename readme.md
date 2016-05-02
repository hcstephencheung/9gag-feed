## Summary

A 9gag image carousel! "9😃"

## Coding Approaches 👾
- Built using ES 6 modules via a transpiler I found online (link below in Resources section)
	- Chose this over Babel because it's a simpler setup and I don't need to write any grunt tasks
- CSS follows a rough version of the BEM model
- Implemented my own tools:
	- my own jQuery wrapper, explained more below
	- created an EventBus for image fetching
- Large imgs are stored using data attributes to prevent images from downloading
- Event delegation was applied anywhere I could

## Known issues 💩
- CSS is not vendor prefixed: will need to either compile through compass or through another vendor prefix preprocessor
- if using my own personal jQuery wrapper for .append(), currently it only supports appending Nodes of 1 child

## Could-have / Should-have
- [ ] Currently only 1 set of images will be pulled on load. However, the JS is setup so that ajax-ing other sets will be very easy to do (modular code + own jQuery library)
- [ ] the actual UI is pretty ugly...sorry I focused too much on the JS side


## Extra Notes 💅
1. Created own "jQuery" library for the following methods:
	- append() : for newly created elements and for existing elements
	- addClass()
	- removeClass()
	- hasClass()
   Mainly for the purpose of ease-of-use. I knew I needed .append() so 
   that's why I wrote the wrapper.
2. As such, variable names prefixed by $ are of type SelectorLibrary
3. Variable names prefixed by $$ are of type Element
4. I've left TODO comments in the JS code, those are things I want to revisit when given more time.
5. The CSS sucks, I know. I didn't really have time to fix the CSS styles since I focused mainly on the JS side of things. I also didn't receive any mocks, so it just works as a bare minimum.

## Resources 👀
- Images are pulled from: https://github.com/k3min/InfiniGAG#post-token
- ES 6 transpiler: https://github.com/esnext/es6-module-transpiler

## Remarks: 🍰
I have to say I actually really enjoyed this exercise. My current work is very agency styled so my hands are often tied by client code or a pre-existing codebase. It was very refreshing to code for fun and architect the project as well. Regardless of outcome, thank you for this opportunity!! I learned a lot using ES6 modules. Certainly my next personal project I'll be playing around with ReactJS.

It was actually a blast doing this! Until next time! 🍺

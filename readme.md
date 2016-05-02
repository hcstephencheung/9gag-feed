README NOTES:
- read TODOs


1. Created own "jQuery" library for the following methods:
	- append() : for newly created elements and for existing elements
	- addClass()
	- removeClass()
	- hasClass()
   Mainly for the purpose of ease-of-use. I knew I needed .append() so 
   that's why I wrote the wrapper
2. As such, variable names prefixed by $ are of type SelectorLibrary
3. Variable names prefixed by $$ are of type Element


getImages()
events vs callbacks
- contemplated on callbacks
	pros: 
		- data will be private to imageFetcher
		- it'll be cleaner, the renderer doesn't need to know anything
		- performance-friendly?
	cons:
		- JS style seems like events will handle better
		- callbacks only have 1 subscriber, where as eventing can publish and have multiple subscribers

*eventing it is!*

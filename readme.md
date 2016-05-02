README NOTES:
- read TODOs


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

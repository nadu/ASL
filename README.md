ASL JS Library (v0.2)
---------------------

The ASL JS library is built to enable an ASL translation of words on your web page. Users of your web page can double click on any word to see the American Sign Language representation of the word. Check out a working example here - 
This is [a working example] (http://www.naduism.com/hacks/ASL/ "Example") built using the ASL JS library 

This library has a JavaScript file and a CSS file. To use, 

1) Add the JavaScript `(asl.js)` file anywhere before the end of the body tag and make a call to 
	`ASL.setup(options, callback);`

	// ASL.setup() takes 2 optional parameters
	// 1st parameter is options - JavaScript object 
	// its can have properties 
	// displayTime in seconds (default is infinity)
	// that is the number of seconds that the ASL widget remains on screen after double clicking a word
	// scrolling - true/false - to set scrolling on the ASL widget or not (default - false)
	// var options = {displayTime:10, scrolling:true}
	// 2nd parameter is function pointer   
	// to the method that you wish to call when the ASL widget is shown

2) Include the CSS styles from `asl.css` in your stylesheet. The position of the widget can be changed using the styles. The default position of the widget is the top right corner of the page. Modify the CSS to change the size and position of the widget. 

3) Try it out by double clicking any word on your web page and spread the love. 


HOW IT WORKS 
-------------
When any word on the page is double clicked, it gets autoselected. The library retrieves the word that was double clicked and loads the ASL widget with the sign language representation pulled from the library maintained at [CATS](http://cats.gatech.edu)



THANKS TO 
-----------
[CATS](http://cats.gatech.edu) especially Harley Hamilton at Georgia Institute of Technology 
The code getting the selected word in a page was used from [mark.kolich.com](http://mark.kolich.com)



# Giphy-Search-and-Display
A bootcamp homework assignment using the Giphy API and AJAX.

### **Assignment**: 
Make a webpage that will invite the user to enter a search term whereupon a new button for that search term will be dynamically added to the page.  Clicking any of the buttons will make an Ajax call using the API for Giphy (https://giphy.com/https://giphy.com/).  This will return 10 gifs that will be displayed below the stack of buttons.  Initially, the gifs will be displayed as still images but clicking the gifs will toggle animation on and off.  Clicking a different button will clear these images and display ten new gif for that button's search term.

### **Notes**: 
I chose not to build an array of search terms and recreate all of the buttons whenever a new button is added.  I think this might be necessary in order to bind the click events to the buttons.  I went the route of using delegated event handlers for each dynamically added button and for the click events that control animation of the gifs.  

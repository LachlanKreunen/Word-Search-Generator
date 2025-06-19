C WORDSEARCH README FILE (01/29/2025):

The word search project takes a size (max of 20) followed by words as the parameters. Once the parameters are met the grid of the word search is set to a character and the words are inserted. The words are inserted by an insert word method that inserts them randomly. A random coordinate inside the box is taken and tried for ability to place a word, right, down, diagonal up and diagonal down. Then if it doesnt work the rest of the points are tested methodically to be able to test all possible locations starting from a random point. Then, the grid is filled with extra random letters and printed out with the list of words that are hidden.

REVISED (06/17/2025):

Changed the console output to output two grids, one with the puzzle and one with an identical-sized grid with the correct coordinates marked to be able to check for game-ending conditions.

WEB APP WORDSEARCH README FILE (06/18/2025):

The web‑app edition of the word‑search game lets users build and solve a wordsearch in the browser with a React front end connected to a Node.js/Express API.

You are met with an intro screen then,  a generator screen where a player selects a grid size, supplies single words then when generate is pressed the front end POSTs { gridSize, wordsList } to /run-wordsearch where the Express route invokes the original C solver as an exe file, receives the puzzle grid and a matching coordinate mask, and returns both to the client. The Game screen draws the puzzle as a clickable table, tracks cell toggles in React state, highlights selections, and has the win condition only when the toggled pattern exactly matches the solution table.

Invalid input such as blank words, spaces, or out of range sizes triggers an error popup.

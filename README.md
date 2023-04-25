# Move to left README

## MyExtension

This is a VSCode extension that provides a left sidebar with dynamically updated content based on the selected text in the editor.

## Features

- Adds a "Move to Left Sidebar" command to the VSCode command palette.
- When executed, the command sends the currently selected text in the editor to a webview in the left sidebar.
- The webview displays the selected text as its content.
- The content of the webview can be updated dynamically by executing the "Move to Left Sidebar" command multiple times with different selected text in the editor.


## Running the Extension
Make sure you have Node.js and Git installed
1. Open VS Code
2. On terminal hit git clone https://github.com/Abhishekfm/move-text-vs-code-extension
3. cd move-text-vs-code-extension
4. Rename move-text-vs-code-extension folder to demo-software
5. npm install (or) yarn install
6. open extension.js file in VS Code and then Press f5 key to run
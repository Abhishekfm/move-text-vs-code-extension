// Import the VS Code module
const vscode = require('vscode');

// Function that gets called when the extension is activated
function activate(context) {
  // Create a webview panel
  const panel = vscode.window.createWebviewPanel(
    'left-sidebar-view',
    'Left Holder',
    // vscode.ViewColumn.One,
    vscode.ViewColumn.Two,
    {
      enableScripts: true,
      retainContextWhenHidden: true
    }
  );

  // Register a webview view provider
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider('left-sidebar', {
      // This function is called when the webview is first created
      resolveWebviewView(webviewView, context) {
        console.log('Resolving webview view');
        console.log(context);

        // Get the initial contents of the webview
        let msg = getWebviewContent();
        webviewView.webview.onDidReceiveMessage(message => {
          if (message.command === 'updateContent') {
              webviewView.webview.html = message.content;
          }
        });

        // Set the initial contents of the webview
        webviewView.webview.html = msg;
      }
    })
  );

  // Register a command that moves the selected code to the left sidebar
  let click = 0;
  let moveToLeftSidebarCommand = vscode.commands.registerCommand('myExtension.moveToLeftSidebar', () => {
    // Get the currently selected code
    const editor = vscode.window.activeTextEditor;
    const selectedText = editor.selection;
    const text = editor.document.getText(selectedText);
    click += 1;

    // Show the left sidebar panel
    vscode.commands.executeCommand('workbench.view.extension.left-sidebar-view');

    // Update the contents of the webview
    panel.webview.html = getWebviewContent();
    if(click >= 1){
      panel.webview.postMessage({ command: 'refactor', additionalData: text });
    }
  });

  // Register the command with the extension's context
  context.subscriptions.push(moveToLeftSidebarCommand);

  // Function that returns the HTML content of the webview
  function getWebviewContent() {
    return `
    <html>
      <head>
        <style>
          /* Add your CSS styles here */
          #sidebar-content{
            background-color: #fff;
            color:#000;
            font-weight:600;
            border-radius:10px;
            padding:5px;
          }
        </style>
      </head>
      <body>
        <div id="sidebar-content">
          <!-- Add your UI elements here -->
          First Show
        </div>
        <script>
          // Receive messages from the extension
          const vscode = acquireVsCodeApi();
          const place = document.getElementById('sidebar-content');
          window.addEventListener('message', event => {
            const message = event.data; // The JSON data our extension sent
            switch (message.command) {
                case 'refactor':
                    place.textContent = message.additionalData;
                    break;
            }
          });
        </script>
      </body>
    </html>
  `;
  }
}

// Function that gets called when the extension is deactivated
function deactivate() {
  // Clean up resources when the extension is deactivated
}

// Export the activate and deactivate functions
module.exports = {
  activate,
  deactivate
};

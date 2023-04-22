const vscode = require('vscode');

function activate(context) {
  // Register the command
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
  
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider('left-sidebar', {
      resolveWebviewView(webviewView, context) {
        console.log('Resolving webview view');
        console.log(context);
        // Handle messages sent from the webview
        let msg = getWebviewContent();
        // webviewView.webview.onDidReceiveMessage(async (message) => {
        //   if (message.command === 'updateContent') {
        //     webviewView.webview.html = message.content;
        //     msg = message.content;
        //   }
        // });
  
        // Set the initial contents of the webview
        webviewView.webview.html = msg;
  
        // Send a message to the webview view
        
      }
    })
  );
  
  // Load the HTML content into the webview
  
  let click = 0;
  // let webviewView = undefined;
  let moveToLeftSidebarCommand = vscode.commands.registerCommand('myExtension.moveToLeftSidebar', () => {
    // Get the currently selected code
    const editor = vscode.window.activeTextEditor;
    const selectedText = editor.selection;
    const text = editor.document.getText(selectedText);
    click += 1;
    // panel.reveal();
    vscode.commands.executeCommand('workbench.view.extension.left-sidebar-view');
    panel.webview.html = getWebviewContent();
    panel.webview.postMessage({ command: 'refactor', additionalData: text });
    // panel.webview.html = newHtml;
    
    // Define the webview view provider

    if (!editor) {
      vscode.window.showErrorMessage('No active text editor found.');
      return;
    }
    const selection = editor.selection;
    const code = editor.document.getText(selection);

    // Send a message to the webview to update the left sidebar
    // panel.webview.postMessage({ type: 'webview', payload: { code } });
  });
  function getWebviewContent() {
    return `
    <html>
      <head>
        <style>
          /* Add your CSS styles here */
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

  // Register the command with the extension's context
  context.subscriptions.push(moveToLeftSidebarCommand);

  // Create a webview panel
  
}

function deactivate() {
  // Clean up resources when the extension is deactivated
}

module.exports = {
  activate,
  deactivate
};

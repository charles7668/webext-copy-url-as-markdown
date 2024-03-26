const CopyAsMarkdownText = "copy-as-markdown";
const CopyAsMarkdownSelection = "copy-as-markdown-selection";

// create right click menu
browser.menus.create({
  id: CopyAsMarkdownText,
  title: CopyAsMarkdownText,
  contexts: ["all"],
  icons: {
    24: "icons/copy-24.png"
  }
});

// create context menu for selection
browser.menus.create({
  id: CopyAsMarkdownSelection,
  title: "Copy selection as Markdown",
  contexts: ["selection"],
  icons: {
    24: "icons/copy-24.png"
  }
});

// add clickc event listener
browser.menus.onClicked.addListener(handleMenuClick);

// handle right click menu click
function handleMenuClick(info, tab) {
  switch (info.menuItemId) {
    case CopyAsMarkdownText:
      copyUrlAsMarkdown(tab);
      break;
    case CopyAsMarkdownSelection:
      copyAsMarkdownSelection(tab, info);
      break;
  }
}

// copy url as markdown format
function copyUrlAsMarkdown(tab) {
  navigator.clipboard.writeText(`[${tab.title}](${tab.url})`);
}

// copy selection as markdown format
function copyAsMarkdownSelection(tab, info) {
  browser.tabs
    .executeScript(tab.id, {
      code: `
    ConvertHtmlToMarkdown();  
    `
    })
    .then((result) => {
      navigator.clipboard.writeText(result);
    });
}

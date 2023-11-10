const CopyAsMarkdownText = "copy-as-markdown";

// create right click menu
browser.menus.create({
  id: CopyAsMarkdownText,
  title: CopyAsMarkdownText,
  contexts: ["all"],
  icons: {
    24: "icons/copy-24.png"
  }
});

// add clickc event listener
browser.menus.onClicked.addListener(handleMenuClick);

// handle right click menu click
function handleMenuClick(info, tab) {
  // check if menu item id is not CopyAsMarkdownText then return immediately
  if (info.menuItemId !== CopyAsMarkdownText) return;

  // copy markdown format text to clipboard
  navigator.clipboard.writeText(`[${tab.title}](${tab.url})`);
}

function ConvertHtmlToMarkdown() {
  getSelectedTextHtml = () => {
    const selection = window.getSelection();
    let htmlText = "";
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const container = document.createElement("div");
      container.appendChild(range.cloneContents());
      htmlText = container.innerHTML;
    }
    let turndownService = new TurndownService();
    // add <sup> tag conversion rule
    turndownService.addRule("superscript", {
      filter: "sup",
      replacement: function (content) {
        return "<sup>" + content + "</sup>";
      }
    });

    // add <sup> tag conversion rule
    turndownService.addRule("subscript", {
      filter: "sub",
      replacement: function (content) {
        return "<sub>" + content + "</sub>";
      }
    });

    // convert pre formatted text to code block
    turndownService.addRule("prescript", {
      filter: "pre",
      replacement: function (content, node, options) {
        return "```" + "\n" + node.innerText + "\n" + "```";
      }
    });

    // convert <code> tag
    turndownService.addRule("customCode", {
      filter: "code",
      replacement: function (content, node, options) {
        let hasSiblings = node.childNodes.length > 1;
        if (hasSiblings) {
          return "<code>" + content + "</code>";
        } else {
          return "`" + content + "`";
        }
      }
    });

    let markdown = turndownService.turndown(htmlText);
    return markdown;
  };
  return getSelectedTextHtml();
}

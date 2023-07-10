figma.showUI(__html__, { width: 400, height: 600 });

figma.ui.onmessage = msg => {
  if (msg.type === 'add-svg') {
    figma.createNodeFromSvg(msg.svgString)
      .then(node => {
        let viewportCenter = figma.viewport.center;
        node.x = viewportCenter.x;
        node.y = viewportCenter.y;

        // Reset the internal x and y coordinates of all top-level children
        for (let child of node.children) {
          child.x = 0;
          child.y = 0;
        }

        figma.currentPage.appendChild(node);
        figma.currentPage.selection = [node];
        figma.viewport.scrollAndZoomIntoView([node]);
      })
      .catch(err => console.error(err));
  }
};

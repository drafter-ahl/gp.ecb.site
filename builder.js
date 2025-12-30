function addItem(category, name) {
  let slotId;

  switch (category) {
    case 'Top':
      slotId = 'canvas-top';
      break;
    case 'Bottom':
      slotId = 'canvas-bottom';
      break;
    case 'Shoes':
      slotId = 'canvas-shoes';
      break;
    case 'Accessory':
      slotId = 'canvas-accessory';
      break;
  }

  const slot = document.getElementById(slotId);
  slot.textContent = name;

  // Placeholder for affiliate click logic
  // window.open("https://affiliate-link-here.com", "_blank");
}

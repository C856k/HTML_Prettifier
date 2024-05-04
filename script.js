"use strict"

function printElement(node, indent = 0) {
    // Definerer en hjælpefunktion til at skabe indrykning
    const createIndent = (size) => ' '.repeat(size);
  
    // Tjekker om noden er et element
    if (node.nodeType === Node.ELEMENT_NODE) {
      // Starter med at udskrive start-tagget med attributter
      const attributes = Array.from(node.attributes)
        .map(attr => `${attr.name}="${attr.value}"`)
        .join(' ');
      const startTag = `<${node.tagName.toLowerCase()}${attributes ? ' ' + attributes : ''}>`;
  
      // Tjekker for child-noder
      const hasChildren = node.children.length > 0;
  
      // Udskriver start-tagget
      console.log(createIndent(indent) + startTag);
  
      // Hvis noden har children, kalder funktionen rekursivt for hver child
      if (hasChildren) {
        Array.from(node.children).forEach(child => printElement(child, indent + 2));
      }
  
      // Udskriver slut-tagget hvis noden ikke er self-closing
      if (!isSelfClosing(node.tagName)) {
        const endTag = `</${node.tagName.toLowerCase()}>`;
        console.log(createIndent(indent) + endTag);
      }
    } else if (node.nodeType === Node.TEXT_NODE && node.nodeValue.trim() !== '') {
      // Udskriver tekstnoder uden ekstra indrykning eller linjeskift
      console.log(createIndent(indent) + node.nodeValue.trim());
    }
  }
  
  // Hjælpefunktion til at tjekke for self-closing tags
  function isSelfClosing(tagName) {
    const selfClosingTags = ['br', 'meta', 'link', 'hr', 'input', 'img'];
    return selfClosingTags.includes(tagName.toLowerCase());
  }
  
  // Starter udskrivningen fra root-noden
  printElement(document.documentElement.parentNode);
  
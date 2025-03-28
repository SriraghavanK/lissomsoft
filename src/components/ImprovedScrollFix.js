/**
 * Improved scrolling utility for fixing navigation scroll issues.
 * 
 * Copy and replace the scrollToElement function in your Header.js file.
 * This version accurately measures the header height, adjusts the scroll position,
 * and adds a brief highlight effect to make the target section more visible.
 */

// Function to handle smooth scrolling to an element
const scrollToElement = (hash) => {
    // Remove the leading # if present
    const cleanId = hash.replace(/^#/, '')
    console.log(`Attempting to scroll to: ${cleanId}`)
    
    // First, try to find the element directly
    let element = document.getElementById(cleanId)
    
    // If not found, try some common variations and mappings
    if (!element) {
      console.log(`Element with ID "${cleanId}" not found, trying alternative selectors`)
      
      // Define a mapping of navigation terms to actual section IDs
      const idMappings = {
        'benefits': 'benefits',
        'benefit': 'benefits',
        'features': 'mysmartgrc-features',
        'feature': 'mysmartgrc-features',
        'overview': 'mysmartgrc-overview',
        'methodology': 'approach-methodology',
        'implementation': 'approach-implementation',
        'vendor': 'services-vendor',
        'it': 'services-it',
        'risk-assessment': 'services-risk-assessment',
        'compliance': 'services-compliance',
        'training': 'services-training',
        'contact': 'contact'
      }
      
      // Check if we have a direct mapping
      if (idMappings[cleanId.toLowerCase()]) {
        element = document.getElementById(idMappings[cleanId.toLowerCase()])
        console.log(`Trying mapped ID: ${idMappings[cleanId.toLowerCase()]}`)
      }
      
      // If still not found, try partial matching
      if (!element) {
        // Try to find a section ID that contains our hash
        for (const [key, value] of Object.entries(idMappings)) {
          if (cleanId.toLowerCase().includes(key)) {
            element = document.getElementById(value)
            console.log(`Trying partial match: ${value} for ${cleanId}`)
            if (element) break
          }
        }
      }
      
      // Try data-section attribute as a fallback
      if (!element) {
        element = document.querySelector(`[data-section="${cleanId}"]`)
        if (element) {
          console.log(`Found element with data-section attribute: ${cleanId}`)
        }
      }
      
      // Last resort - log all available IDs to help debugging
      if (!element) {
        console.log('Available section IDs:')
        document.querySelectorAll('[id]').forEach(el => {
          console.log(`- ${el.id}`)
        })
      }
    }
    
    if (element) {
      console.log(`Found element with id: ${element.id}, scrolling with delay`)
      
      // Set any active tabs based on the hash
      if (window.setActiveTabFromHash) {
        window.setActiveTabFromHash(cleanId)
      }
      
      // Add a small delay before scrolling to ensure the page has rendered
      setTimeout(() => {
        // Get accurate header height
        const header = document.querySelector('.navbar') || 
                    document.querySelector('header') || 
                    document.querySelector('nav');
        
        // Default header height with fallback
        let headerHeight = header ? header.offsetHeight + 20 : 150;
        console.log(`Using header height: ${headerHeight}px`);
        
        // Get the element position more accurately
        const elementRect = element.getBoundingClientRect();
        const elementPosition = elementRect.top + window.pageYOffset;
        const offsetPosition = elementPosition - headerHeight;
  
        console.log(`Scrolling to position: ${offsetPosition}px (element at ${elementPosition}px, header offset ${headerHeight}px)`);
        
        // Use smooth scrolling with a promise
        try {
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
          
          // Add highlighting effect to make the section visible
          element.classList.add('highlight-section');
          setTimeout(() => {
            element.classList.remove('highlight-section');
          }, 1500);
        } catch (error) {
          console.error("Smooth scrolling failed, using fallback:", error);
          // Fallback for older browsers
          window.scrollTo(0, offsetPosition);
        }
      }, 100);
      
      return true;
    } else {
      console.error(`Section with ID "${cleanId}" not found after all attempts`);
      return false;
    }
  }
  
  // Instructions:
  // 1. Replace your existing scrollToElement function in Header.js with this improved version
  // 2. Make sure you have the highlight-section class defined in your CSS (should be there already)
  // 3. This function more accurately measures the header height and adjusts the scroll position
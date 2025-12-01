/**
 * Search through looping
 * Filename: search.js
 *
 * Author: Michael Ly
 * Date: 11/30/2025
 */


// the purpose of this script is for searching & filtering, but also clearing of the filters when needed
function filterStores() {
    // Get the current filter values using jQuery
    const nameFilter = $('#nameFilter').val().toLowerCase();
    const shippingFilter = $('#shippingFilter').val();
    
    // Loop through each store item using jQuery
    $('.storeitem').each(function() {
        const $storeItem = $(this); // Current store item as jQuery object
        
        // Find the store name and shipping info elements using jQuery
        const $dt = $storeItem.find('dt');
        const $dd = $storeItem.find('dd');
        
        // Get the text content and class name using jQuery
        const storeName = $dt.text().toLowerCase();
        const shippingType = $dd.attr('class');
        
        // Initialize a marker that starts as true 
        let showStore = true;
        
        // Filters and disables showStore if the store name doesn't match
        if (nameFilter && !storeName.includes(nameFilter)) {
            showStore = false;
        }
        
        // Filters by the shipping dropdown and hides the store if it doesn't match like flat-rate or free-shipping 
        if (shippingFilter !== 'all' && shippingType !== shippingFilter) {
            showStore = false;
        }
        
        // Makes hidding the stores that shouldn't be shown easier.
        if (showStore) {
            $storeItem.fadeIn(300); // jQuery fade animation
        } else {
            $storeItem.fadeOut(300); // jQuery fade animation
        }
    });
}

/**
 * Clears all active filters
 */
function clearFilters() {
    // Reset the filter values using jQuery
    $('#nameFilter').val('').trigger('change'); // trigger change for jQuery Mobile
    $('#shippingFilter').val('all').selectmenu('refresh'); // refresh jQuery Mobile
    
    // fades in fitlered stores
    $('.storeitem').fadeIn(300);
}

// jQuery Mobile
$(document).on('pagecreate', function() {
    // Initialize jQuery Mobile widgets
    $('#nameFilter').textinput();
    $('#shippingFilter').selectmenu();
        
    // For name filter - input event handler, as in search
    $('#nameFilter').on('input', function() {
        filterStores();
    });
    
    // For shipping filter - change of shipping type, as change event handler is used
    $('#shippingFilter').on('change', function() {
        filterStores();
    });
    
    // Add click handlers for buttons(clear filter and apply filter)
    $('#applyFilters').on('click', function() {
        filterStores();
    });
    
    $('#clearFilters').on('click', function() {
        clearFilters();
    });
});

// Standard jQuery ready as fallback
$(document).ready(function() {
    // Add event listeners using jQuery
    $('#nameFilter').on('input', filterStores);
    $('#shippingFilter').on('change', filterStores);
    $('#applyFilters').on('click', filterStores);
    $('#clearFilters').on('click', clearFilters);
});
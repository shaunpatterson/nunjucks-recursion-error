/**
 * Formats a price with the appropriate number of decimal places
 * @param {number} price  - The price to format
 * @param {number} decimals  - The number of decimal places to display (10 vs 10.0 vs 10.00)
 * @returns {string} floatPrice - The formatted price string
 */
export function priceFormatFilter(price, decimals=2) {
    // TODO: Confirm appropriate business logic if no price exists
    if (price) {
        return parseFloat(Math.round(price * 100) / 100).toFixed(decimals);
    } else {
        return '';
    }
}

export default priceFormatFilter;

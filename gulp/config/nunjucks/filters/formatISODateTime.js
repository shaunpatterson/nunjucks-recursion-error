import moment from 'moment';
import without from 'lodash';

/**
 * Format a ISO datetime string as a date with the appropriate formatter string
 * @param {string} iso_datetime: The timestamp to format
 * @param {string} format_string: The string to configure the desired format
 * @returns {string} The formatted date string
 */
export function formatISODateTime(iso_datetime, format_string = null) {
    const defaultFormatString = 'DD-MMM-YYYY';
    let out = '';

    try {
        let datetimeOptions;

        if (typeof this.ctx.core !== 'undefined') {
            datetimeOptions = this.ctx.core.featureConfigs.datetimeOptions;
        }
        else {
            datetimeOptions = this.ctx.state.core.featureConfigs.datetimeOptions;
        }

        const formatString = format_string || datetimeOptions.dateFormatString || defaultFormatString;

        const utc = moment(iso_datetime).utc();

        if (/\bMMMM\b/.test(formatString)) {

            let cleanedFormatArray = formatString.split(/[-]/);
            out = without(cleanedFormatArray, 'MMMM')
                .map(utc.format.bind(utc))
                .join(datetimeOptions.months[utc.month()]);
        }
        else if (/\bMMM\b/.test(formatString)) {
            out = formatString
                .split('MMM')
                .map(utc.format.bind(utc))
                .join(datetimeOptions.monthsShort[utc.month()]);
        } else {
            out = utc.format(format_string);
        }
    } catch (e) {
        console.log('~~~ format_iso_datetime: ', e, this);
    }

    return out;
}

export default formatISODateTime;

import moment from 'moment';

export function formatUnixTimestampFilter(unix_timestamp, format_string = null) {
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
        const timestamp = parseInt(unix_timestamp, 10);
        const utc = moment.unix(timestamp).utc();
        if (/MMM/.test(formatString)) {
            out = formatString
                .split('MMM')
                .map(utc.format.bind(utc))
                .join(datetimeOptions.monthsShort[utc.month()]);
        } else {
            out = utc.format(format_string);
        }
    } catch (e) {
        console.log('~~~ format_unix_timestamp: ', e, this);
    }

    return out;
}

export default formatUnixTimestampFilter;

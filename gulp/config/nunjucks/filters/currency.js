export function wholeNumberThousands(num) {
    const whole = new String(num);
    const indices = [];
    const result = [];

    for (let tempIndex = whole.length; tempIndex > -1; tempIndex += -3) {
        indices.push(tempIndex)
    }

    indices.reverse();

    for (let tempIndex = 0; tempIndex < indices.length; tempIndex++) {
        if (tempIndex === 0 && indices[tempIndex] > 0) {
            result.push(whole.slice(0, indices[tempIndex]));
        } else if (indices[tempIndex] === 0) {
            continue;
        } else {
            result.push(whole.slice(indices[tempIndex] - 3, indices[tempIndex]))
        }
    }

    return result;
}

export function splitNumberIntoWholeAndFractionSegments(num) {
    const numAsString = new String(new Number(num));

    const result = numAsString.split('.', 2);

    if (result.length < 2) {
        result[1] = '0';
    }

    return result;
}

export function formattedFraction(fraction, decimalPlaces) {
    const fractionAsNumber = new Number(fraction);
    let result = new String(fractionAsNumber);

    while (result.length < decimalPlaces) {
        result += '0';
    }

    return result;
}

export function currencyFilter(price, coreModel, currencyFormattingInfoOverride) {
    let currencyFormattingInfo;

    if (!price) {
        return "";
    }

    if (!coreModel) {
        throw new Error("coreModel argument required for currency filter");
    }

    if (!currencyFormattingInfoOverride) {
        currencyFormattingInfo = coreModel.currencyFormattingInfo;
    } else {
        currencyFormattingInfo = currencyFormattingInfoOverride;
    }

    if (!currencyFormattingInfo) {
        throw new Error("Cannot find currencyFormattingInfo in core model");
    }

    const prefix = currencyFormattingInfo.currencyPrefix || '';
    const suffix = currencyFormattingInfo.currencySuffix || '';
    const decimalPlaces = currencyFormattingInfo.decimals || 0;
    const decimalSymbol = currencyFormattingInfo.decimalSymbol || '';
    const thousandthSymbol = currencyFormattingInfo.thousandthSymbol || '';

    const fragments = splitNumberIntoWholeAndFractionSegments(price);

    const wholeNumber = fragments[0];
    const fraction = fragments[1];
    const wholeNumberWithThousandthSymbols = wholeNumberThousands(wholeNumber).join(thousandthSymbol);
    const formattedFrac = formattedFraction(fraction, decimalPlaces);

    return (prefix + wholeNumberWithThousandthSymbols + decimalSymbol + formattedFrac + suffix).trim();
}

export default currencyFilter;

import createNumberMask from 'text-mask-addons/dist/createNumberMask';

const mascaraNumAtm = createNumberMask({
    allowDecimal: false,
    decimalLimit: 2,
    includeThousandsSeparator: false,
    integerLimit: 4,
    allowLeadingZeroes: true
});
export const MASCARA_DINERO = {mask: mascaraNumAtm, guide: true};

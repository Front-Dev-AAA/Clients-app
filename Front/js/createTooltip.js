// принимает тип конттакта и значение
export const contactTooltip = (type, value) => {
    // создаем элементы
    const tooltip = document.createElement('div');
    const tooltipType = document.createElement('span');
    const tooltipValue = document.createElement('a');
    // классы
    tooltip.classList.add('contact-tooltip', 'site-tooltip');
    tooltipType.classList.add('contact-tooltip__type');
    tooltipValue.classList.add('contact-tooltip__value');



    tooltipType.textContent = type + ': ';

    if (type === 'Телефон') {
        tooltipType.textContent = '';
    } 

    tooltipValue.textContent = value;

    tooltip.append(tooltipType, tooltipValue);

    return {
        tooltip,
        tooltipType,
        tooltipValue
    }
};
export const sortTable = () => {
    const table = document.querySelector('table');
    const headers = table.querySelectorAll('th');
    const tbody = table.querySelector('tbody');


    // преобразуем в массив. map()  - возвращает массив + выполненная функция для него. В данном случае пустая строка.
    const directions = Array.from(headers).map(() => '');


    // функция принимает тип и содержание
    const transform = (type, content) => {
        switch (type) {
            case 'id':
                // получаем только цифры
                return parseFloat(content);
            case 'create':
            case 'update':
                return content.split('.').reverse().join('-');
            case 'text':
            default:
                return content;
        }
    }
    // функция сортировки по индексу
    const sortColumn = (index) => {
        const type = headers[index].getAttribute('data-type');
        const rows = tbody.querySelectorAll('tr');
        const direction = directions[index] || 'sortUp';
        const multiply = direction === 'sortUp' ? 1 : -1;
        const newRows = Array.from(rows);

        newRows.sort((row1, row2) => {
            const cellA = row1.querySelectorAll('td')[index].textContent;
            const cellB = row2.querySelectorAll('td')[index].textContent;

            const a = transform(type, cellA);
            const b = transform(type, cellB);

            switch (true) {
                case a > b:
                    return 1 * multiply;
                case a < b:
                    return -1 * multiply;
                default:
                    break;
                case a === b:
                    return 0;
            }
        });



        [].forEach.call(rows, (row) => {
            tbody.removeChild(row);
        });

        directions[index] = direction === 'sortUp' ? 'sortDown' : 'sortUp';

        newRows.forEach(newRow => {
            tbody.appendChild(newRow);
        });
    }


    // обработчик клика сортировки колонок
    [].forEach.call(headers, (header, index) => {
        header.addEventListener('click', () => {
            sortColumn(index);
        });
    });
}
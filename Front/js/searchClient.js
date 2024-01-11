import {
    findClient
} from "./clientsApi.js";
import {
    createClientItem
} from "./createClientItem.js";





export const searchClients = (clients) => {

    const findList = document.querySelector('.find-list')
    const input = document.querySelector('.header__input');

    clients.forEach(client => {
        const findItem = document.createElement('li');
        const findLink = document.createElement('a');

        findItem.classList.add('find-list__item');
        findLink.classList.add('find-list__link');

        findLink.textContent = `${client.name} ${client.surname} ${client.lastName}`;
        findLink.href = '#';

        findItem.append(findLink);
        findList.append(findItem);
    });

    //   функция перерисовки таблицы 

    const rewriteTable = async (str) => {

        const response = await findClient(str);
        const tbody = document.querySelector('.clients__tbody');
        tbody.innerHTML = '';
        for (const client of response) {
            tbody.append(createClientItem(client));
        }


    }


    let timerId = null

    input.addEventListener('input', async () => {

        clearTimeout(timerId)
        timerId = setTimeout(() => {
            // тут делаем запрос
            const value = input.value.trim();
            const foundItems = document.querySelectorAll('.find-list__link');

            // переменные для задержки поиска на 300 мс
            // const TIMEOUT_300MS = 3000;
            // let timeout = null;

            if (value !== '') {

                // делаем задержку поиска на 300 мс (перерисровки)
                const renderSearch = () => {
                    rewriteTable(value);
                };
                // clearTimeout(timeout);
                // timeout = setTimeout(renderSearch, TIMEOUT_300MS);
                renderSearch();

                foundItems.forEach(link => {
                    if (link.innerText.search(value) == -1) {
                        link.classList.add('hide');
                        link.innerHTML = link.innerText;
                    } else {
                        link.classList.remove('hide');
                        findList.classList.remove('hide');
                        const str = link.innerText;
                        link.innerHTML = insertMark(str, link.innerText.search(value), value.length);
                    }
                });

            } else {

                foundItems.forEach(link => {
                    const tbody = document.querySelector('.clients__tbody');
                    tbody.innerHTML = '';
                    clients.forEach(client => tbody.append(createClientItem(client)));
                    link.classList.remove('hide');
                    findList.classList.add('hide');
                    link.innerHTML = link.innerText;
                });


            }
        }, 300)





    });

    const insertMark = (str, pos, len) => str
        .slice(0, pos) + '<mark>' + str
        .slice(pos, pos + len) + '</mark>' + str
        .slice(pos + len);



}



// const input = document.querySelector('input')
// let timerId = null
// input.addEventListener('input', (evt) => {
//   clearTimeout(timerId)
//   timerId = setTimeout(() => {
//     // тут делаем запрос
//     console.log(evt.target.value)
//   }, 300)
// })
const sendReq = require('./sendReq');

module.exports = class HelpDesk {
  constructor() {
    const refresh = new CustomEvent('datarefresh');
    this.container = document.createElement('div');
    this.container.id = 'container';
    document.body.appendChild(this.container);

    this.addBtn = document.createElement('button');
    this.addBtn.className = 'add-ticket';
    this.addBtn.innerText = 'Добавить тикет ➕';
    this.container.insertAdjacentElement('afterbegin', this.addBtn);
    this.addBtn.addEventListener('click', (evt) => {
      evt.preventDefault();
      const editWindow = document.createElement('div');
      editWindow.className = 'modal';
      editWindow.innerHTML = `<div class="modal-content">
          <form class="edit-form">
          <label for = "name">Краткое описание</label>
          <input name ="name" value = "" placeholder="Введите название" required>
          <label for = "description">Подробное описание</label>
          <input name ="description" value = "" placeholder="Введите подробное описание" required>
          <button class = "close-modal">Отмена</button>
          <button class = "save">Добавить тикет</button>
          <form>
          </div>`;

      document.body.insertAdjacentElement('beforeend', editWindow);
      const editForm = document.querySelector('.edit-form');
      editForm.addEventListener('submit', ((evt) => {
        evt.preventDefault();
        const formData = new FormData(evt.target);
        sendReq(document.body, 'POST', { method: 'createTicket' }, () => {
          editWindow.remove();
          document.body.dispatchEvent(refresh);
        }, formData);
      }));
      editForm.querySelector('.close-modal').addEventListener('click', (evt) => {
        evt.preventDefault();
        editWindow.remove();
      });
    });

    document.body.addEventListener('datarefresh', () => {
      document.querySelectorAll('.ticket').forEach((elem) => elem.remove());

      sendReq(document.body, 'GET', { method: 'allTickets' }, (tickets) => {
        tickets.forEach((ticket) => {
          const tic = document.createElement('div');
          tic.className = 'ticket';
          tic.id = ticket.id;
          tic.innerHTML = `<span class = "ticket-name">${ticket.name}</span>`;
          this.container.insertAdjacentElement('beforeend', tic);
          tic.querySelector('.ticket-name').addEventListener('click', (e) => {
            e.preventDefault();
            const desc = document.querySelector('.ticket-description');

            if (desc && desc.closest('.ticket') === tic) desc.remove();
            else if ((desc && desc.closest('.ticket') !== tic) || !desc) {
              if ((desc && desc.closest('.ticket') !== tic)) desc.remove();
              sendReq(tic, 'GET', { method: 'ticketById' }, (data) => {
                const descriptionTkt = document.createElement('span');
                descriptionTkt.className = 'ticket-description';
                descriptionTkt.innerText = data.description;
                tic.insertAdjacentElement('beforeend', descriptionTkt);
                descriptionTkt.addEventListener('click', (evt) => {
                  evt.preventDefault();
                  descriptionTkt.remove();
                });
              });
            }
          });

          const finishedTicket = document.createElement('form');
          finishedTicket.className = 'ticket-finished-form';
          const isFinished = document.createElement('input');
          isFinished.type = 'checkbox';
          isFinished.className = 'is-finished';
          isFinished.name = 'status';
          isFinished.checked = ticket.status ? 'checked' : '';
          finishedTicket.appendChild(isFinished);
          tic.insertAdjacentElement('afterbegin', finishedTicket);
          isFinished.addEventListener('change', (evt) => {
            evt.preventDefault();

            const data = new FormData();
            if (ev.target.checked) data.append('status', true);
            else data.append('status', false);
            sendReq(tic, 'POST', { method: 'changeStatus' }, () => {
              document.body.dispatchEvent(refresh);
            }, data);
          });

          const ticketInfo = document.createElement('div');
          ticketInfo.className = 'ticket-info';
          tic.insertAdjacentElement('beforeend', ticketInfo);

          const createdTkt = document.createElement('span');
          createdTkt.className = 'ticket-created';
          createdTkt.innerText = `${ticket.created}`;
          ticketInfo.insertAdjacentElement('beforeend', createdTkt);

          const delTkt = document.createElement('span');
          delTkt.innerText = '🗑';
          delTkt.className = 'ticket-delete';
          ticketInfo.insertAdjacentElement('beforeend', delTkt);
          delTkt.addEventListener('click', (evt) => {
            evt.preventDefault();
            const editWindow = document.createElement('div');
            editWindow.className = 'modal';
            editWindow.innerHTML = `<div class="modal-content">
              <span class = "warning"> Это действие необратимо. Вы уверены, что хотите удалить тикет? </span>
              <button class = "close-modal">Отмена</button>
              <button id="delete-ticket">Удалить</button>
              </div>`;

            document.body.appendChild(editWindow);
            document.querySelector('#delete-ticket').addEventListener('click', (delEv) => {
              delEv.preventDefault();
              sendReq(tic, 'POST', { method: 'deleteTicket' }, () => {
                editWindow.remove();
                document.body.dispatchEvent(refresh);
              });
            });
            document.querySelector('.close-modal').addEventListener('click', (closeEv) => {
              closeEv.preventDefault();
              editWindow.remove();
            });
          });

          const editTkt = document.createElement('span');
          editTkt.className = 'ticket-edit';
          editTkt.innerText = '✎';
          ticketInfo.insertAdjacentElement('beforeend', editTkt);
          editTkt.addEventListener('click', (editEv) => {
            editEv.preventDefault();
            sendReq(tic, 'GET', { method: 'ticketById' }, (data) => {
              const editWindow = document.createElement('div');
              editWindow.className = 'modal';
              editWindow.innerHTML = `<div class="modal-content">
                <form class="edit-form">
                <label for = "name">Краткое описание</label>
                <input name ="name" value = "${data.name}" required>
                <label for = "description">Подробное описание</label>
                <input name ="description" value = "${data.description}" required>
                <button class = "close-modal">Отмена</button>
                <button class = "save">Сохранить</button>
                <form>
                </div>`;

              document.body.appendChild(editWindow);
              const editForm = document.querySelector('.edit-form');
              editForm.addEventListener('submit', ((evt) => {
                evt.preventDefault();
                const formData = new FormData(ev.target);
                sendReq(tic, 'POST', { method: 'updateTicket' }, () => {
                  editWindow.remove();
                  document.body.dispatchEvent(refresh);
                }, formData);
              }));
            });
          });
        });
      });
    });

    document.body.dispatchEvent(refresh);
  }
};
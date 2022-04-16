(()=>{var e={552:(e,t,n)=>{const c=n(369);e.exports=class{constructor(){const e=new CustomEvent("datarefresh");this.container=document.createElement("div"),this.container.id="container",document.body.appendChild(this.container),this.addBtn=document.createElement("button"),this.addBtn.className="add-ticket",this.addBtn.innerText="Добавить тикет ➕",this.container.insertAdjacentElement("afterbegin",this.addBtn),this.addBtn.addEventListener("click",(t=>{t.preventDefault();const n=document.createElement("div");n.className="modal",n.innerHTML='<div class="modal-content">\n          <form class="edit-form">\n          <label for = "name">Краткое описание</label>\n          <input name ="name" value = "" placeholder="Введите название" required>\n          <label for = "description">Подробное описание</label>\n          <input name ="description" value = "" placeholder="Введите подробное описание" required>\n          <button class = "close-modal">Отмена</button>\n          <button class = "save">Добавить тикет</button>\n          <form>\n          </div>',document.body.insertAdjacentElement("beforeend",n);const a=document.querySelector(".edit-form");a.addEventListener("submit",(t=>{t.preventDefault();const a=new FormData(t.target);c(document.body,"POST",{method:"createTicket"},(()=>{n.remove(),document.body.dispatchEvent(e)}),a)})),a.querySelector(".close-modal").addEventListener("click",(e=>{e.preventDefault(),n.remove()}))})),document.body.addEventListener("datarefresh",(()=>{document.querySelectorAll(".ticket").forEach((e=>e.remove())),c(document.body,"GET",{method:"allTickets"},(t=>{t.forEach((t=>{const n=document.createElement("div");n.className="ticket",n.id=t.id,n.innerHTML=`<span class = "ticket-name">${t.name}</span>`,this.container.insertAdjacentElement("beforeend",n),n.querySelector(".ticket-name").addEventListener("click",(e=>{e.preventDefault();const t=document.querySelector(".ticket-description");t&&t.closest(".ticket")===n?t.remove():(t&&t.closest(".ticket")!==n||!t)&&(t&&t.closest(".ticket")!==n&&t.remove(),c(n,"GET",{method:"ticketById"},(e=>{const t=document.createElement("span");t.className="ticket-description",t.innerText=e.description,n.insertAdjacentElement("beforeend",t),t.addEventListener("click",(e=>{e.preventDefault(),t.remove()}))})))}));const a=document.createElement("form");a.className="ticket-finished-form";const d=document.createElement("input");d.type="checkbox",d.className="is-finished",d.name="status",d.checked=t.status?"checked":"",a.appendChild(d),n.insertAdjacentElement("afterbegin",a),d.addEventListener("change",(t=>{t.preventDefault();const a=new FormData;ev.target.checked?a.append("status",!0):a.append("status",!1),c(n,"POST",{method:"changeStatus"},(()=>{document.body.dispatchEvent(e)}),a)}));const o=document.createElement("div");o.className="ticket-info",n.insertAdjacentElement("beforeend",o);const s=document.createElement("span");s.className="ticket-created",s.innerText=`${t.created}`,o.insertAdjacentElement("beforeend",s);const r=document.createElement("span");r.innerText="🗑",r.className="ticket-delete",o.insertAdjacentElement("beforeend",r),r.addEventListener("click",(t=>{t.preventDefault();const a=document.createElement("div");a.className="modal",a.innerHTML='<div class="modal-content">\n              <span class = "warning"> Это действие необратимо. Вы уверены, что хотите удалить тикет? </span>\n              <button class = "close-modal">Отмена</button>\n              <button id="delete-ticket">Удалить</button>\n              </div>',document.body.appendChild(a),document.querySelector("#delete-ticket").addEventListener("click",(t=>{t.preventDefault(),c(n,"POST",{method:"deleteTicket"},(()=>{a.remove(),document.body.dispatchEvent(e)}))})),document.querySelector(".close-modal").addEventListener("click",(e=>{e.preventDefault(),a.remove()}))}));const i=document.createElement("span");i.className="ticket-edit",i.innerText="✎",o.insertAdjacentElement("beforeend",i),i.addEventListener("click",(t=>{t.preventDefault(),c(n,"GET",{method:"ticketById"},(t=>{const a=document.createElement("div");a.className="modal",a.innerHTML=`<div class="modal-content">\n                <form class="edit-form">\n                <label for = "name">Краткое описание</label>\n                <input name ="name" value = "${t.name}" required>\n                <label for = "description">Подробное описание</label>\n                <input name ="description" value = "${t.description}" required>\n                <button class = "close-modal">Отмена</button>\n                <button class = "save">Сохранить</button>\n                <form>\n                </div>`,document.body.appendChild(a);document.querySelector(".edit-form").addEventListener("submit",(t=>{t.preventDefault();const d=new FormData(ev.target);c(n,"POST",{method:"updateTicket"},(()=>{a.remove(),document.body.dispatchEvent(e)}),d)}))}))}))}))}))})),document.body.dispatchEvent(e)}}},369:e=>{e.exports=function(e,t,n,c,a=new FormData){const d=new URLSearchParams;d.set("method",n.method),"ticket"===e.className&&d.set("id",e.id),a.set("id",e.id),a.set("method",n.method);const o=new XMLHttpRequest;o.addEventListener("load",(()=>{if(o.status>=200&&o.status<300)try{const e=JSON.parse(o.responseText);c&&c.call(this,e.data)}catch(e){throw new Error(e)}})),o.open(t,`//https://http-server-ahj.herokuapp.com/?${d}`,!0),o.send(a)}}},t={};function n(c){var a=t[c];if(void 0!==a)return a.exports;var d=t[c]={exports:{}};return e[c](d,d.exports,n),d.exports}(()=>{"use strict";new(n(552))})()})();
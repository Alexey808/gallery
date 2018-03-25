(function(){

   var galleryBox = document.getElementById('galleryBox');
   var galleryForm = document.getElementById('galleryForm');
   var galleryPresent = document.getElementById('galleryPresent');

   /* --- Ввод элементов --- */

   let formBtnInsert = galleryForm.querySelector('.form__btn-insert');
   let formBtnClose = galleryForm.querySelector('.form__btn-close');

   formBtnInsert.addEventListener("click", insert);
   formBtnClose.addEventListener("click", closeForm);

   function insert() {
      let u = document.gallery.elements.text.value; //получение значений с формы
      let c = document.gallery.elements.comment.value; //получение значений с формы
      let newimg = new CreateImage(u, c); //создаём объект
      let item = galleryBox.querySelectorAll('.gallery__item');
      let lastItem = item[item.length - 1];

      lastItem.firstChild.style.backgroundImage = `url(${u})`;
      lastItem.classList.remove('gallery__form-plus'); 

      lastItem.removeEventListener("click", addImage);
      lastItem.addEventListener("click", showImg);

      lastItem.style.animationName = 'pulse';
      lastItem.style.animationDuration = '1.5s';

      lastItem.url = `${newimg.url}`; //сохраняем за каждым элементом url
      lastItem.comment = `${newimg.comment}`;
      lastItem.insertAdjacentHTML('beforeEnd', 
         `<p class="gallery__item-comment">${lastItem.comment}</p>`);

      return closeForm();
   }

   //конструктор для item
   function CreateImage(u, c) {
      let img = {
         url: u,
         comment: c
      }
      return img;
   }

   //начальный event для item
   function addImage() {
      galleryForm.style.opacity='1'; 
      galleryForm.style.zIndex='1';
   }

   //event для крестика
   function closeForm() {
      galleryForm.style.opacity='0'; 
      galleryForm.style.zIndex='-1';
      return createLastElem();
   }

   /* --- Показ элементов --- */

   var _this;

   function showImg() {
      let presentPicture = galleryPresent.querySelector('.present__picture');
       
      //работа с изображением
      presentPicture.insertAdjacentHTML('afterBegin', `<img class='gallery__picture' src=${this.url}>`);
       
      //работа с контейнером для изображения
      galleryPresent.style.opacity='1';   
      galleryPresent.style.zIndex='2';    
      galleryPresent.addEventListener("click", closeClick);

      //работа с коментариями
      let textarea = galleryPresent.querySelector('.present__txt');
      textarea.value = `${this.comment}`;

      //работа с кнопкой к коментарию
      _this = this;
      let button = galleryPresent.querySelector('.present__btn');
      button.addEventListener("click", editComment, false);

      //работа с контейнером для коментария
      let img = galleryPresent.getElementsByTagName('img');
      let presentContainer = galleryPresent.querySelector('.present__container');
      let extremeValue = document.body.clientWidth/100*80; //80% от ширина окна

      if (!!img[0].offsetWidth && extremeValue > img[0].offsetWidth) {
         presentContainer.style.width = `${img[0].offsetWidth}px`;
      } else {
         presentContainer.style.width = '80%';
      } 
   }

   //event для кнопки редактирования
   function closeClick(event) {
      let presentContainer = galleryPresent.querySelector('.present__container');
      !event ? event = window.event : 0;
      let isClickInside = presentContainer.contains(event.target);
      !isClickInside ? closePresent() : 0;
   }

   //Редактирование комментарьев в показе
   function editComment(t) {
      let textarea = galleryPresent.querySelector('.present__txt');

      _this.comment = textarea.value;
      _this.lastChild.innerHTML = textarea.value;

      galleryPresent.style.opacity='0';   
      galleryPresent.style.zIndex='-1';
      return closePresent(); 
   }

   //Закрыть показ
   function closePresent() {
      let presentPicture = galleryPresent.querySelector('.present__picture');
      let textarea = galleryPresent.querySelector('.present__txt');

      //прячем показ изображения
      galleryPresent.style.opacity='0';   
      galleryPresent.style.zIndex='-1';

      //чистим элемент для показа
      let rmChild = presentPicture.childNodes[0];
      rmChild ? presentPicture.removeChild(rmChild) : 0;
      textarea.value = '';
   }


   /* --- Старт --- */
   function createLastElem() {
       
      let item = document.createElement('div');
      item.classList.add('gallery__item');
      item.classList.add('gallery__form-plus');

      let itemPicture = document.createElement('div');
      itemPicture.classList.add('gallery__item-picture');

      item.addEventListener("click", addImage);   

      galleryBox.appendChild(item);
      item.appendChild(itemPicture);
   }

   window.onload = function() {
      createLastElem();
   };

})();
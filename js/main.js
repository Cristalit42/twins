

document.addEventListener("DOMContentLoaded", function () {
  const toggleList = document.querySelector('.catalog__list-link');
  const catalogList = document.querySelector('.catalog__list');

  // Флаг для отслеживания состояния видимости списка
  let isVisible = false;

  // Показать список при наведении на элемент
  toggleList.addEventListener('mouseenter', function () {
    if (window.innerWidth >= 768) { // Проверяем ширину экрана
      catalogList.classList.add('catalog__list--visible'); // Добавить класс для отображения списка
      isVisible = true; // Обновляем состояние видимости
    }
  });

  // Скрыть список при уходе мыши с элемента или списка
  const hideList = () => {
    isVisible = false; // Обновляем состояние
    catalogList.classList.remove('catalog__list--visible'); // Удаляем класс для скрытия списка
  };

  toggleList.addEventListener('mouseleave', function () {
    setTimeout(() => {
      if (!catalogList.matches(':hover')) { // Проверяем, что курсор не на списке
        hideList(); // Скрыть список, если курсор не на списке
      }
    }, 200); // Задержка перед скрытием
  });

  catalogList.addEventListener('mouseenter', function () {
    catalogList.classList.add('catalog__list--visible'); // Оставить список открытым, если курсор на нем
    isVisible = true; // Обновляем состояние
  });

  catalogList.addEventListener('mouseleave', hideList); // Скрыть список при уходе мыши

  // Показать или скрыть список при клике на элемент
  toggleList.addEventListener('click', function (e) {
    e.preventDefault(); // Отменяем действие по умолчанию ссылки
    if (window.innerWidth < 768) { // Проверяем ширину экрана
      isVisible = !isVisible; // Меняем состояние видимости
      catalogList.classList.toggle('catalog__list--visible', isVisible); // Устанавливаем класс в зависимости от состояния
    }
  });

  const items = document.querySelectorAll('.catalog__item-link');
  items.forEach(item => {
    item.addEventListener('click', function (e) {
      e.preventDefault(); // Отменяем действие по умолчанию ссылки
      toggleList.textContent = this.textContent; // Устанавливаем текст ссылки
      hideList(); // Скрыть список после выбора
    });
  });
});


// gallery swiper start

document.addEventListener("DOMContentLoaded", function () {
  const marquees = document.querySelectorAll('.marquee');

  // Клонируем содержимое для каждого элемента с классом marquee
  marquees.forEach(marquee => {
    const clone = marquee.innerHTML;
    marquee.innerHTML += clone; // Дублируем слайды для каждого элемента
  });

  // Событие для остановки анимации при зажатии ЛКМ или касании на мобильных
  marquees.forEach(marquee => {
    // Остановка при нажатии мыши
    marquee.addEventListener('mousedown', function () {
      marquee.style.animationPlayState = 'paused';
    });

    // Остановка при касании экрана на мобильных
    marquee.addEventListener('touchstart', function () {
      marquee.style.animationPlayState = 'paused';
    });
  });

  // Событие для возобновления анимации при отпускании ЛКМ или завершении касания
  marquees.forEach(marquee => {
    // Возобновление при отпускании мыши
    marquee.addEventListener('mouseup', function () {
      marquee.style.animationPlayState = 'running';
    });

    // Возобновление при завершении касания на мобильных
    marquee.addEventListener('touchend', function () {
      marquee.style.animationPlayState = 'running';
    });
  });
});


// gallery swiper end

//card swiper start
const swiper = new Swiper('.products__img-swiper', {
  // Опции Swiper
  slidesPerView: 1,           // Количество видимых слайдов
  spaceBetween: 10,           // Расстояние между слайдами
  loop: true,                 // Циклическая прокрутка

  // Пагинация
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },

  // Автопрокрутка (опционально)
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },

  // // Отключение прокрутки свайпами
  // allowTouchMove: false,
});


//card swiper end

//Yandex map start
ymaps.ready(init);
function init() {
  var myMap = new ymaps.Map("map", {
    center: [55.029688, 82.918633], // Координаты места
    zoom: 17
  });

  // Создаем красную метку
  var myPlacemark = new ymaps.Placemark([55.029688, 82.918633], {
    hintContent: 'Улица Ленина, 1',
    balloonContent: 'Новосибирск, ул. Ленина, 1'
  }, {
    preset: 'islands#redDotIcon' // Задаем красную иконку
  });

  // Добавляем метку на карту
  myMap.geoObjects.add(myPlacemark);
}
//Yandex map end
// burger menu start

let burgerOpen = document.querySelectorAll('.header__burger-link'),
  burgerClose = document.querySelectorAll('.burger__x'),
  burgerMenu = document.querySelector('.overlay--burger'),
  burgerContent = document.querySelector('.burger');

burgerOpen.forEach(btns =>
  btns.addEventListener('click', function (e) {
    e.preventDefault();
    burgerMenu.classList.remove('overlay--hidden');
  })
);

burgerClose.forEach(btns => {
  btns.addEventListener('click', function (e) {
    e.preventDefault();
    burgerMenu.classList.add('overlay--hidden');
  });
});

document.addEventListener('click', function (e) {
  if (!burgerMenu.classList.contains('overlay--hidden') &&
    !burgerContent.contains(e.target) &&
    !e.target.closest('.header__burger-link')) {
    burgerMenu.classList.add('overlay--hidden');
  }
});

// 

document.addEventListener("DOMContentLoaded", function () {
  function initScripts() {
    const windowWidth = window.innerWidth;

    if (windowWidth > 768) {
      // Код для экранов > 768px
      const additionalLinks = document.querySelectorAll('.burger__nav-link--additional');
      const normalLinks = document.querySelectorAll('.burger__nav-link:not(.burger__nav-link--additional)');
      const subMenu = document.getElementById('burger-sub'); // Получаем подменю

      let isSubMenuVisible = false;

      function showSubMenu(menuId) {
        subMenu.style.display = 'block';

        const navItems = subMenu.querySelectorAll('.burger__nav');
        navItems.forEach(nav => {
          nav.style.display = 'none';
        });

        const activeMenu = subMenu.querySelector(`#${menuId}-b`); // Изменено на menuId-b
        if (activeMenu) {
          activeMenu.style.display = 'block';
        }
        isSubMenuVisible = true;
      }

      function hideSubMenu() {
        subMenu.style.display = 'none';
        isSubMenuVisible = false;
      }

      additionalLinks.forEach(link => {
        link.addEventListener('mouseover', function () {
          const menuId = this.parentElement.getAttribute('data-menu');
          showSubMenu(menuId);
        });

        link.addEventListener('mouseleave', function () {
          if (!isSubMenuVisible) {
            hideSubMenu();
          }
        });
      });

      normalLinks.forEach(link => {
        link.addEventListener('mouseover', function () {
          if (!subMenu.matches(':hover')) {
            hideSubMenu();
          }
        });
      });

      subMenu.addEventListener('mouseenter', function () {
        isSubMenuVisible = true;
      });

      subMenu.addEventListener('mouseleave', function () {
        hideSubMenu();
      });
    } else {
      // Код для экранов <= 768px
      const additionalLinks = document.querySelectorAll('.burger__nav-link--additional');

      function openSubMenu(subMenu) {
        subMenu.style.maxHeight = subMenu.scrollHeight + 'px';
      }

      function closeSubMenu(subMenu) {
        subMenu.style.maxHeight = '0px';
      }

      function toggleAccordion(menuId, link) {
        const currentSubMenu = document.querySelector(`#${menuId}-a`); // Изменено на menuId-a

        document.querySelectorAll('.burger__sub-menu').forEach(menu => {
          if (menu !== currentSubMenu) {
            closeSubMenu(menu);
            menu.previousElementSibling.classList.remove('active');
          }
        });

        if (currentSubMenu.style.maxHeight && currentSubMenu.style.maxHeight !== '0px') {
          closeSubMenu(currentSubMenu);
          link.classList.remove('active');
        } else {
          openSubMenu(currentSubMenu);
          link.classList.add('active');
        }
      }

      additionalLinks.forEach(link => {
        link.addEventListener('click', function (e) {
          e.preventDefault();
          const menuId = this.parentElement.getAttribute('data-menu');
          toggleAccordion(menuId, this);
        });
      });

      window.addEventListener('resize', function () {
        if (window.innerWidth > 768) {
          document.querySelectorAll('.burger__sub-menu').forEach(menu => {
            menu.style.maxHeight = '0px';
          });
          additionalLinks.forEach(link => {
            link.classList.remove('active');
          });
        }
      });
    }
  }

  // Инициализация скриптов при загрузке страницы
  initScripts();

  // Обновление скриптов при изменении размера экрана
  window.addEventListener('resize', function () {
    initScripts();
  });
});

// burger menu end

//sticky header start

window.onscroll = function () {
  stickyHeader();
};

// Функция, которая проверяет и обрабатывает прокрутку
function stickyHeader() {
  // Получаем все элементы header__top
  let headers = document.querySelectorAll('.header__top'),
    burger = document.querySelector('.burger'),
    burgerAdditional = document.querySelector('.burger--additional');

  headers.forEach(header => {
    let sticky = header.offsetTop;

    // Проверяем положение прокрутки
    if (window.pageYOffset > sticky) {
      header.classList.add('--sticky');
      burger.classList.add('--active');
      burgerAdditional.classList.add('--active');

      // Если есть класс --hollow, удаляем его
      if (header.classList.contains('header__top--hollow')) {
        header.classList.remove('header__top--hollow');
        header.setAttribute('data-hollow-removed', 'true'); // Запоминаем, что класс был удален
      }
    } else {
      header.classList.remove('--sticky');
      burger.classList.remove('--active');
      burgerAdditional.classList.remove('--active');

      // Возвращаем класс --hollow, если он был ранее удален
      if (header.getAttribute('data-hollow-removed') === 'true') {
        header.classList.add('header__top--hollow');
      }
    }
  });
}




// 
//sticky header end
//sales & secret pop-up start

// Функция для удаления класса overlay--hidden
function removeOverlayClass() {
  const overlay = document.querySelector('.overlay--sale');
  if (overlay) {
    overlay.classList.remove('overlay--hidden'); // Убираем класс
  }
}

// Устанавливаем таймер на 10 секунд
// setTimeout(removeOverlayClass, 10000); // 10000 миллисекунд = 10 секунд не забудь включить

let salePopUpCLose = document.querySelectorAll('.sale__btn-x'),
  salePopUp = document.querySelectorAll('.sale__pop'),
  saleMenu = document.querySelector('.overlay--sale'),
  secretBtn = document.querySelectorAll('.secret__overlay-open'),
  secretMenu = document.querySelector('.overlay--secret'),
  saleForm = document.querySelectorAll('.sale__form');

salePopUpCLose.forEach(btns =>
  btns.addEventListener('click', function (e) {
    e.preventDefault();
    saleMenu.classList.add('overlay--hidden');
    secretMenu.classList.add('overlay--hidden');
  })
)

secretBtn.forEach(btns =>
  btns.addEventListener('click', function (e) {
    e.preventDefault();
    secretMenu.classList.remove('overlay--hidden')
  })
)
// Закрытие оверлея при успешной отправке формы
saleForm.forEach(forms => {
  forms.addEventListener('submit', function (e) {
    e.preventDefault();

    setTimeout(() => {
      alert('Форма успешно отправлена!'); // Сообщение об успешной отправке
      saleMenu.classList.add('overlay--hidden'); // Закрытие оверлея
      secretMenu.classList.add('overlay--hidden'); // Закрытие оверлея
    }, 1000);
  })

  // Имитация успешной отправки формы (можно вставить реальный AJAX-запрос)

});
//sales & secret pop-up end

// basket pop-up start
let closeBasketBtn = document.querySelectorAll('.basket__btn-close');
let basketOverlay = document.querySelector('.overlay--basket');

// Проверка на наличие кнопки для открытия корзины
const headerBasketLink = document.querySelector('.header__basket-link');
if (headerBasketLink) {
  headerBasketLink.addEventListener('click', function (e) {
    e.preventDefault();
    if (basketOverlay) {
      basketOverlay.classList.remove('overlay--hidden');
    }
  });
}

// Закрытие корзины по нажатию на кнопку "закрыть"
if (closeBasketBtn) {
  closeBasketBtn.forEach(btns =>{
    btns.addEventListener('click', function (e) {
      e.preventDefault();
      if (basketOverlay) {
        basketOverlay.classList.add('overlay--hidden');
      }
    });
  })
}

// Закрытие корзины по клику на оверлей
if (basketOverlay) {
  basketOverlay.addEventListener('click', function (e) {
    if (e.target === basketOverlay) { // Проверяем, что клик был именно по оверлею
      basketOverlay.classList.add('overlay--hidden');
    }
  });
}

document.addEventListener('DOMContentLoaded', function () {
  // Обработка кнопок "больше"
  const moreButtons = document.querySelectorAll('.basket__item-btn--more');
  const overlay = document.querySelector('.basket__inner-overlay');
  const paymentOverlay = document.querySelector('.payment__inner-overlay');
  const innerWrapper = document.querySelector('.basket__inner-wrapper');
  const paymentInnerWrapper = document.querySelector('.payment__inner-wrapper');

  // Проверка наличия кнопок "больше"
  if (moreButtons.length > 0) {
    moreButtons.forEach(button => {
      button.addEventListener('click', function () {
        if (overlay) {
          overlay.classList.remove('basket__inner-overlay--hidden');
        }
        if (paymentOverlay) {
          paymentOverlay.classList.remove('basket__inner-overlay--hidden');
        }
      });
    });
  }

  // Закрытие оверлея при клике вне его содержимого
  if (overlay) {
    overlay.addEventListener('click', function (event) {
      if (!innerWrapper.contains(event.target)) {
        overlay.classList.add('basket__inner-overlay--hidden');
        if (paymentOverlay) {
          paymentOverlay.classList.add('basket__inner-overlay--hidden');
        }
      }
    });
  }

  if (paymentOverlay) {
    paymentOverlay.addEventListener('click', function (event) {
      if (!paymentInnerWrapper.contains(event.target)) {
        paymentOverlay.classList.add('basket__inner-overlay--hidden');
      }
    });
  }

  // Обработка кнопок увеличения и уменьшения количества
  const quantityBtnContainers = document.querySelectorAll('.basket__quantity-btns');
  if (quantityBtnContainers.length > 0) {
    quantityBtnContainers.forEach(container => {
      const minusButton = container.querySelector('.basket__quantity-btn--minus');
      const plusButton = container.querySelector('.basket__quantity-btn--plus');
      const quantityDisplay = container.querySelector('.basket__quantity-num');

      if (minusButton) {
        minusButton.addEventListener('click', function (event) {
          event.preventDefault();
          let currentQuantity = parseInt(quantityDisplay.textContent);
          if (currentQuantity > 1) {
            quantityDisplay.textContent = currentQuantity - 1;
          }
        });
      }

      if (plusButton) {
        plusButton.addEventListener('click', function (event) {
          event.preventDefault();
          let currentQuantity = parseInt(quantityDisplay.textContent);
          quantityDisplay.textContent = currentQuantity + 1;
        });
      }
    });
  }

  // Обновление состояния корзины
  const basketFull = document.querySelector('.basket--full');
  const basketEmpty = document.querySelector('.basket--empty');

  function updateBasketState() {
    const basketItems = document.querySelectorAll('.basket__content-item'); // Динамически получаем элементы
    if (basketFull && basketEmpty) {
      // Если в корзине нет элементов
      if (basketItems.length === 0) {
        basketFull.style.display = 'none';
        basketEmpty.style.display = 'block';
      } else {
        basketFull.style.display = 'block';
        basketEmpty.style.display = 'none';
      }
    }
  }

  // Обработка удаления всех товаров по нажатию на кнопку "корзина"
  const trashButton = document.querySelector('.basket__trash-btn');
  if (trashButton) {
    trashButton.addEventListener('click', function (event) {
      event.preventDefault();

      // Удаление всех элементов корзины
      const basketItems = document.querySelectorAll('.basket__content-item');
      basketItems.forEach(item => {
        item.remove(); // Полностью удаляем элемент из DOM
      });

      // Обнуление или удаление итоговой суммы
      const totalNum = document.querySelectorAll('.basket__total-num');
      if (totalNum) {
        totalNum.forEach(nums => {
          nums.textContent = '0'; // Обнуляем сумму
        });
      }

      // Обновляем состояние корзины
      updateBasketState(); 
    });
  }

// // Обработка удаления текущего элемента
// const removeButtons = document.querySelectorAll('.basket__item-btn--remove');
// if (removeButtons.length > 0) {
//   removeButtons.forEach(button => {
//     button.addEventListener('click', function (event) {
//       event.preventDefault();
//       const item = event.target.closest('.basket__content-item'); // Находим ближайший элемент корзины
//       const hasMoreButton = item.querySelector('.basket__item-btn--more'); // Проверяем наличие кнопки "больше"
//       if (item && !hasMoreButton) { // Убираем проверку на отображение
//         item.remove(); // Удаляем элемент
//         updateBasketState(); // Обновляем состояние корзины
//       }
//     });
//   });
// }


  // Вызываем функцию при загрузке страницы
  updateBasketState();
});

// Код для копирования ссылки
const copyLinkButton = document.querySelector('.basket__copy-link');
if (copyLinkButton) {
  copyLinkButton.addEventListener('click', function (e) {
    e.preventDefault();
    const currentUrl = window.location.href;

    // Создаем временный элемент для копирования текста
    const tempInput = document.createElement('input');
    tempInput.value = currentUrl;
    document.body.appendChild(tempInput);

    // Выделяем текст и копируем его в буфер обмена
    tempInput.select();
    document.execCommand('copy');

    // Удаляем временный элемент
    document.body.removeChild(tempInput);

    // Меняем стили у элемента с классом .basket__copy-link--text
    const copyTextElement = document.querySelector('.basket__copy-link--text');
    if (copyTextElement) {
      copyTextElement.style.opacity = '1';
      copyTextElement.style.visibility = 'visible';

      // Возвращаем обратно через 5 секунд
      setTimeout(function () {
        copyTextElement.style.opacity = '0';
        copyTextElement.style.visibility = 'hidden';
      }, 5000); // 5000 миллисекунд = 5 секунд
    }
  });
};


// basket pop-up end




//card page text start

document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll('.card__descr-btn');
  const contents = document.querySelectorAll('.card__descr-info');

  // По умолчанию делаем первый текст активным
  contents[0].style.opacity = 1;
  contents[0].style.maxHeight = '15000px';

  buttons.forEach((button, index) => {
    button.addEventListener('click', function (e) {
      e.preventDefault();

      // Удаляем активный класс с кнопок
      buttons.forEach(btn => btn.classList.remove('card__descr-btn--active'));
      // Добавляем активный класс текущей кнопке
      this.classList.add('card__descr-btn--active');

      // Прячем все тексты
      contents.forEach(content => {
        content.style.opacity = 0;
        content.style.maxHeight = '0px';
        setTimeout(() => {
          content.classList.add('card__descr-info--hidden');
        }, 300); // Время анимации скрытия
      });

      // Плавно показываем выбранный текст
      const activeContent = contents[index];
      activeContent.classList.remove('card__descr-info--hidden');
      setTimeout(() => {
        activeContent.style.opacity = 1;
        activeContent.style.maxHeight = '15000px'; // Максимальная высота для контента
      }, 10); // Минимальная задержка перед включением анимации показа
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const volumeButtons = document.querySelectorAll('.card__volume-btn');

  volumeButtons.forEach(button => {
    button.addEventListener('click', function (e) {
      e.preventDefault();

      // Удаляем активный класс со всех кнопок
      volumeButtons.forEach(btn => btn.classList.remove('card__volume-btn--active'));

      // Добавляем активный класс текущей кнопке
      this.classList.add('card__volume-btn--active');
    });
  });
});

//card page text end



//cookie start

function hiddenCookie() {
  let cookie = document.querySelector('.cookie');
  let cookieCloseBtn = document.querySelectorAll('.cookie__content-btn');
  let overlayCookie = document.querySelector('.overlay__cookie');
  if (cookie) {
    cookie.classList.remove('cookie--hidden'); // Убираем класс
    overlayCookie.classList.remove('overlay--hidden'); // Убираем класс
  }
  cookieCloseBtn.forEach(btns =>
    btns.addEventListener('click', function (e) {
      e.preventDefault();
      cookie.classList.add('cookie--hidden')
      overlayCookie.classList.add('overlay--hidden')
    })
  )
}

// Устанавливаем таймер на 15 секунд ...не забудудь включить
// setTimeout(hiddenCookie, 15000); 

//cookie end
//main page animation start
document.addEventListener('DOMContentLoaded', function () {
  document.addEventListener('scroll', function () {
    // Рассчитываем смещение при прокрутке
    var offset = window.scrollY * 0.3;

    // Получаем изображения внутри 'header__img-wrapper'
    var imgFirst = document.querySelector('.header__img--first');
    var imgSecond = document.querySelector('.header__img--second');
    var imgThird = document.querySelector('.header__img--third');

    // Обновляем позицию 'top' для первого изображения
    if (imgFirst) {
      imgFirst.style.top = `${-offset}px`; // У первого изображения top
    }

    // Обновляем позицию 'bottom' для второго и третьего изображения
    if (imgSecond) {
      imgSecond.style.bottom = `${offset}px`; // Для второго используем bottom
    }

    if (imgThird) {
      imgThird.style.bottom = `${offset}px`; // Для третьего тоже bottom
    }
  });
});
//main page animation end
//cursor animation start

document.addEventListener('DOMContentLoaded', function () {
  // Получаем элемент для кастомного курсора
  const customCursor = document.getElementById('customCursor');

  // Скрываем кастомный курсор сразу при загрузке страницы
  customCursor.style.display = 'none';

  // Слушаем события движения мыши
  document.addEventListener('mousemove', function (e) {
    // Обновляем позицию кастомного курсора
    customCursor.style.left = `${e.pageX - 80}px`; // Центрируем круг
    customCursor.style.top = `${e.pageY - 80}px`; // Центрируем круг
  });

  // Слушаем события наведения на элементы с классом .stock__item-link
  document.querySelectorAll('.stock__item-link, .news__img-link, .offers__item-link').forEach(function (link) {
    link.addEventListener('mouseenter', function () {
      // Показываем кастомный курсор при наведении
      customCursor.style.display = 'flex'; // Показываем как flex для центрирования текста
    });

    link.addEventListener('mouseleave', function () {
      // Скрываем кастомный курсор, когда курсор уходит
      customCursor.style.display = 'none';
    });
  });
});


//cursor animation end
//certificate start

document.addEventListener('DOMContentLoaded', function () {
  // Получаем все кнопки
  const btnsService = document.querySelectorAll('.certificate__btn-1');
  const btnsAmount = document.querySelectorAll('.certificate__btn-2');

  // Получаем оба контейнера с контентом сертификатов
  const firstCertificate = document.getElementById('certificate-first');
  const secondCertificate = document.getElementById('certificate-second');

  // Функция для скрытия всех сертификатов
  function hideAllCertificates() {
    firstCertificate.classList.add('certificate__content--hidden');
    secondCertificate.classList.add('certificate__content--hidden');
  }

  // Обработчики кликов на кнопки сертификатов на услугу
  btnsService.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault(); // Отмена перехода по ссылке
      hideAllCertificates(); // Скрываем оба сертификата
      firstCertificate.classList.remove('certificate__content--hidden');
    });
  });

  // Обработчики кликов на кнопки сертификатов на сумму
  btnsAmount.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault(); // Отмена перехода по ссылке
      hideAllCertificates(); // Скрываем оба сертификата
      secondCertificate.classList.remove('certificate__content--hidden'); // Показываем второй сертификат
    });
  });
});


//certificate end
//service lists start

document.addEventListener('DOMContentLoaded', function () {
  const headingLinks = document.querySelectorAll('.service__heading-link');
  const listWrappers = document.querySelectorAll('.service__lists');
  const fullContainers = document.querySelectorAll('.service__container-full');
  const emptyContainer = document.querySelector('.service__container-empty');
  const stockItems = document.querySelectorAll('.stock__row-item');
  const swipers = document.querySelectorAll('.service__content-swiper');
  const carousel = document.querySelector('.service__carousel');
  const closePopupButtons = document.querySelectorAll('.service__close-popup');
  const popup = document.querySelector('.service__popup');
  const closeButton = document.querySelector('.service__content--close');

  // Сохраняем оригинальный HTML для каждого элемента бегущей строки
  stockItems.forEach(item => {
    item.dataset.originalContent = item.innerHTML;
  });

  // Функция для обновления текста в бегущей строке
  function updateStockText(buttonText) {
    stockItems.forEach(item => {
      item.innerHTML = item.dataset.originalContent;
      item.innerHTML = item.innerHTML.replace(/спецпредложения/g, ` ${buttonText}`);
    });
  }

  // Функция для переключения свайперов
  function updateSwiper(category) {
    swipers.forEach(swiper => {
      swiper.style.display = 'none';
      if (swiper.getAttribute('data-category') === category) {
        swiper.style.display = 'block';
      }
    });
  }

  // Функция для открытия попапа
  function openPopup(contentKey) {
    const fullContainer = popup.querySelector(`#${contentKey}`);
    if (fullContainer) {
      popup.style.display = 'block';
      fullContainer.style.display = 'flex';
      emptyContainer.style.display = 'none';

      if (window.innerWidth < 768) {
        window.scrollTo({
          top: 500,
          behavior: 'smooth'
        });
      }
    }
  }

  // Функция для закрытия попапа
  function closePopup() {
    popup.style.display = 'none';
    fullContainers.forEach(container => {
      container.style.display = 'none';
    });
    emptyContainer.style.display = 'block';

    // Для экрана меньше 768px после закрытия попапа отображаем карусель и кнопку закрытия
    if (window.innerWidth < 768) {
      carousel.style.display = 'block';
      closeButton.style.display = 'block';
    }
  }

  // Обработка кликов по хедингам
  headingLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();

      headingLinks.forEach(link => link.classList.remove('service__heding-link--active'));
      this.classList.add('service__heding-link--active');

      const category = this.getAttribute('data-category');
      const buttonText = this.textContent.trim();

      listWrappers.forEach(wrapper => {
        wrapper.style.display = wrapper.getAttribute('data-category') === category ? 'block' : 'none';
      });

      updateStockText(buttonText);
      updateSwiper(category);

      fullContainers.forEach(container => container.style.display = 'none');
      emptyContainer.style.display = 'block';

      // Если ширина экрана меньше 768px, скрываем заголовки и отображаем карусель и кнопку закрытия
      if (window.innerWidth < 768) {
        document.querySelector('.service__heading').style.display = 'none';
        closeButton.style.display = 'block';
        carousel.style.display = 'block';
      }
    });
  });

  // Обработка кликов по элементам списка
  listWrappers.forEach(wrapper => {
    const links = wrapper.querySelectorAll('.service__list-link');

    links.forEach(link => {
      link.addEventListener('click', function (e) {
        e.preventDefault();

        links.forEach(link => link.classList.remove('service__list-link--active'));
        this.classList.add('service__list-link--active');

        const contentKey = this.getAttribute('data-content');
        const contentPopupKey = this.getAttribute('data-content-popup');

        if (window.innerWidth < 768 && contentPopupKey) {
          openPopup(contentPopupKey);
        } else {
          fullContainers.forEach(container => container.style.display = 'none');
          const fullContainer = document.getElementById(contentKey);
          if (fullContainer) {
            fullContainer.style.display = 'flex';
            emptyContainer.style.display = 'none';
          }
        }

        // Скрываем кнопку закрытия на экранах меньше 768px
        if (window.innerWidth < 768) {
          closeButton.style.display = 'none';
        }
      });
    });
  });

  // Обработка кликов по кнопкам закрытия попапа
  closePopupButtons.forEach(button => {
    button.addEventListener('click', function (e) {
      e.preventDefault();
      closePopup();
    });
  });

  // Обработка клика по кнопке закрытия контента
  closeButton.addEventListener('click', function () {
    if (window.innerWidth < 768) {
      document.querySelector('.service__heading').style.display = 'block';
      listWrappers.forEach(wrapper => wrapper.style.display = 'none');
      carousel.style.display = 'block';
      closeButton.style.display = 'none';
    }
  });
});


//service lists end

//accordeon start

document.addEventListener('DOMContentLoaded', function () {
  const accContents = document.querySelectorAll('.program__acc-content');
  const accLinks = document.querySelectorAll('.program__heading-link');
  const accIcons = document.querySelectorAll('.program__acc-icon'); // Получаем все иконки

  accContents.forEach(content => {
    content.style.maxHeight = 0;
    content.style.overflow = 'hidden';
    content.style.transition = 'max-height 0.5s ease-out';
  });

  accLinks.forEach((link, index) => {
    link.addEventListener('click', function (event) {
      event.preventDefault();

      const content = accContents[index];
      const icon = accIcons[index]; // Получаем соответствующую иконку

      if (content.style.maxHeight && content.style.maxHeight !== '0px') {
        content.style.maxHeight = 0;
        icon.classList.remove('rotate'); // Убираем класс для поворота иконки
      } else {
        // Скрываем все остальные блоки и возвращаем иконки в исходное положение
        accContents.forEach((c, i) => {
          c.style.maxHeight = 0;
          accIcons[i].classList.remove('rotate'); // Возвращаем иконки в исходное состояние
        });

        content.style.maxHeight = content.scrollHeight + 'px';
        icon.classList.add('rotate'); // Поворачиваем иконку
      }
    });
  });
});


//accordeon end
//basket add btn start
document.addEventListener('DOMContentLoaded', function () {
  let basketBtn = document.querySelectorAll('.basket-button--add'),
    addElement = document.querySelector('.add');

  basketBtn.forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.preventDefault();

      // Сначала перемещаем на 0
      addElement.style.transform = 'translateX(0)';

      // Через 5 секунд задаем значение 330px
      setTimeout(function () {
        addElement.style.transform = 'translateX(330px)';
      }, 5000); // 5000 миллисекунд = 5 секунд
    });
  });
});
//basket add btn end

//card page swiper start

const cardSwiper = new Swiper('.card__heading-swiper', {
  // Опции Swiper
  slidesPerView: 1,           // Количество видимых слайдов
  spaceBetween: 10,           // Расстояние между слайдами
  loop: true,                 // Циклическая прокрутка

  // Пагинация
  pagination: {
    el: '.card__swiper-pagination',
    clickable: true,
  },

  // Автопрокрутка (опционально)
  // autoplay: {
  //   delay: 3000,
  //   disableOnInteraction: false,
  // },

});

//card page swiper end

//form validation end

// Получаем форму и кнопку отправки
const form = document.querySelector('.payment__form');
const submitButton = document.querySelector('.basket__total-btn--submit');
const overlay = document.querySelector('.overlay--issued');
const closeButton = document.querySelector('.issued__close-btn');
const issuedBlock = document.querySelector('.issued');

// Проверяем, существуют ли необходимые элементы
if (form && submitButton && overlay && closeButton && issuedBlock) {
  // Регулярные выражения для валидации
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\+?\d{10,15}$/;

  // Обрабатываем клик на кнопку отправки
  submitButton.addEventListener('click', (event) => {
    event.preventDefault(); // Отменяем стандартное поведение

    let allValid = true; // Переменная для отслеживания валидности всех инпутов

    document.querySelectorAll('.payment__form-input').forEach(input => {
      const label = input.closest('.payment__form-label');
      const placeholder = label.querySelector('.payment__form-placeholder');

      if (input.value.trim() === '') {
        input.classList.add('error');
        label.classList.add('error');
        placeholder.classList.add('error');
        input.placeholder = '';
        label.querySelector('.payment__form-error').style.color = '#ff0000';
        allValid = false;
      } else if (input.type === 'email' && !emailRegex.test(input.value)) {
        input.classList.add('error');
        label.classList.add('error');
        placeholder.classList.add('error');
        input.placeholder = '';
        label.querySelector('.payment__form-error').style.color = '#ff0000';
        allValid = false;
      } else if (input.type === 'tel' && !phoneRegex.test(input.value)) {
        input.classList.add('error');
        label.classList.add('error');
        placeholder.classList.add('error');
        input.placeholder = '';
        label.querySelector('.payment__form-error').style.color = '#ff0000';
        allValid = false;
      } else {
        clearError(input); // Удаляем ошибку, если поле заполнено
      }
    });

    // Если все поля валидны, показываем модальное окно
    if (allValid) {
      console.log('Форма успешно отправлена');
      overlay.classList.remove('overlay--hidden'); // Убираем класс скрытия
    }
  });

  // Функция для очистки ошибок
  function clearError(input) {
    const label = input.closest('.payment__form-label');
    const placeholder = label.querySelector('.payment__form-placeholder');

    input.classList.remove('error');
    label.classList.remove('error');
    placeholder.classList.remove('error');
    input.placeholder = input.getAttribute('data-placeholder');
  }

  // Привязка обработчиков фокуса и потери фокуса для инпутов
  document.querySelectorAll('.payment__form-input').forEach(input => {
    input.addEventListener('focus', () => {
      input.classList.add('filled');
    });

    input.addEventListener('blur', () => {
      if (input.value.trim() === '') {
        input.classList.remove('filled');
      }
    });
  });

  // Обработка закрытия модального окна при клике на кнопку закрытия
  closeButton.addEventListener('click', (event) => {
    event.preventDefault(); // Отменяем стандартное поведение ссылки
    overlay.classList.add('overlay--hidden'); // Добавляем класс скрытия
  });

  // Обработка клика вне блока "issued" для закрытия модального окна
  document.addEventListener('click', (event) => {
    if (!issuedBlock.contains(event.target) && !submitButton.contains(event.target)) {
      overlay.classList.add('overlay--hidden'); // Добавляем класс скрытия
    }
  });

  // Предотвращение закрытия при клике внутри блока "issued"
  issuedBlock.addEventListener('click', (event) => {
    event.stopPropagation(); // Останавливаем всплытие события
  });
}


//form validation end

// Получаем элементы
const overlayService = document.querySelector('.overlay--service');
const closeButtonService = document.querySelector('.issued__close-btn');
const issuedBlockService = document.querySelector('.issued');

// Проверяем, существуют ли необходимые элементы
if (overlayService && closeButtonService && issuedBlockService) {

  // Обработка клика на кнопку закрытия
  closeButtonService.addEventListener('click', (event) => {
    event.preventDefault(); // Отменяем стандартное поведение ссылки
    overlayService.classList.add('overlay--hidden'); // Добавляем класс скрытия
  });

  // Обработка клика вне блока "issued" для закрытия модального окна
  document.addEventListener('click', (event) => {
    if (!issuedBlockService.contains(event.target)) {
      overlayService.classList.add('overlay--hidden'); // Добавляем класс скрытия
    }
  });

  // Предотвращение закрытия при клике внутри блока "issued"
  issuedBlockService.addEventListener('click', (event) => {
    event.stopPropagation(); // Останавливаем всплытие события
  });
} else {
  console.warn('Не все необходимые элементы найдены на странице.'); // Выводим предупреждение в консоль
}



//filters start
// Функция для удаления класса overlay--hidden
function removeOverlayClass() {
  const overlay = document.querySelector('.overlay--sale');
  if (overlay) {
    overlay.classList.remove('overlay--hidden'); // Убираем класс
  }
}

// Переменные для попапов и оверлеев
let filterBtn = document.querySelectorAll('.catalog__filter-btn');
let filterOverlay = document.querySelector('.overlay--filters');
let closeFilterBtn = document.querySelectorAll('.filters__close-btn');

// Проверяем наличие необходимых элементов
if (filterOverlay && filterBtn.length > 0 && closeFilterBtn.length > 0) {

  // Закрытие попапов
  salePopUpCLose.forEach(btns =>
    btns.addEventListener('click', function (e) {
      e.preventDefault();
      saleMenu.classList.add('overlay--hidden');
      secretMenu.classList.add('overlay--hidden');
    })
  );

  // Открытие оверлея фильтров
  filterBtn.forEach(btns =>
    btns.addEventListener('click', function (e) {
      e.preventDefault();
      filterOverlay.classList.remove('overlay--hidden');
    })
  );

  // Закрытие оверлея фильтров
  closeFilterBtn.forEach(btns =>
    btns.addEventListener('click', function (e) {
      e.preventDefault();
      filterOverlay.classList.add('overlay--hidden');
    })
  );

  // Закрытие оверлея при клике на сам оверлей
  filterOverlay.addEventListener('click', function (e) {
    if (e.target === filterOverlay) { // Проверка, что клик был на самом оверлее
      filterOverlay.classList.add('overlay--hidden');
    }
  });

  document.addEventListener('DOMContentLoaded', function () {
    const accContents = document.querySelectorAll('.filters__acc-content');
    const accLinks = document.querySelectorAll('.filters__acc-link');
    const accIcons = document.querySelectorAll('.filters__acc-icon');

    if (accContents.length > 0 && accLinks.length > 0) {
      accContents.forEach(content => {
        content.style.maxHeight = 0;
        content.style.overflow = 'hidden';
        content.style.transition = 'max-height 0.5s ease-out';
      });

      accLinks.forEach((link, index) => {
        link.addEventListener('click', function (event) {
          event.preventDefault();

          const content = accContents[index];
          const icon = accIcons[index];

          // Закрытие всех аккордеонов
          accContents.forEach((c, i) => {
            if (c !== content) {
              c.style.maxHeight = 0;
              if (accIcons[i]) accIcons[i].classList.remove('rotate');
              accLinks[i].classList.remove('active'); // Убираем класс активного состояния для ссылки
            }
          });

          // Переключение текущего аккордеона
          if (content.style.maxHeight && content.style.maxHeight !== '0px') {
            content.style.maxHeight = 0;
            if (icon) icon.classList.remove('rotate');
            link.classList.remove('active'); // Убираем класс активного состояния
          } else {
            content.style.maxHeight = content.scrollHeight + 'px';
            if (icon) icon.classList.add('rotate');
            link.classList.add('active'); // Добавляем класс активного состояния
          }
        });
      });
    }
  });
}


//filters end




//mixitup start
var mixer = mixitup('.news__content--page');

document.addEventListener("DOMContentLoaded", function () {
  const filterButtons = document.querySelectorAll('.blog__item-link'); // Все кнопки фильтров
  const closeButton = document.querySelector('.blog__item-link--close'); // Кнопка "закрыть фильтр"

  // Функция для проверки активных фильтров
  function checkActiveFilters() {
    let isAnyFilterActive = Array.from(filterButtons).some(button => {
      return !button.classList.contains('blog__item-link--close') && button.classList.contains('active');
    });

    // Если активен хотя бы один фильтр, добавляем класс "visible" к кнопке "Закрыть фильтр"
    if (isAnyFilterActive) {
      closeButton.classList.add('visible');
    } else {
      closeButton.classList.remove('visible');
    }
  }

  // Обработчик для кнопок фильтров
  filterButtons.forEach(button => {
    button.addEventListener('click', function () {
      if (this.dataset.filter === "all") {
        // Если нажата кнопка "Все" (закрыть фильтр), деактивируем все фильтры
        filterButtons.forEach(btn => btn.classList.remove('active'));
      } else {
        // Активируем/деактивируем текущий фильтр
        this.classList.toggle('active');
      }
      // Проверка состояния фильтров
      checkActiveFilters();
    });
  });

  // Проверка при загрузке страницы
  checkActiveFilters();
});

//mixitup end


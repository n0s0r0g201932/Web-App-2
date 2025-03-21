// Функция для открытия/закрытия блока личного кабинета
function toggleUserMenu() {
    const userMenu = document.getElementById('userMenu');
    userMenu.classList.toggle('active');
}

// Функция для закрытия меню
function closeUserMenu() {
    const userMenu = document.getElementById('userMenu');
    userMenu.classList.remove('active');
}

// Закрытие блока при клике вне его области
document.addEventListener('click', function(event) {
    const userMenu = document.getElementById('userMenu');
    const userIcon = document.querySelector('.user-icon');

    if (!userMenu.contains(event.target) && !userIcon.contains(event.target)) {
        userMenu.classList.remove('active');
    }
});

// Получение данных пользователя из Telegram WebApp
function initUserData() {
    if (window.Telegram && window.Telegram.WebApp) {
        const user = Telegram.WebApp.initDataUnsafe.user;
        if (user) {
            const usernameElement = document.getElementById('username');
            if (usernameElement) {
                // Отображаем имя пользователя или логин, если имя отсутствует
                usernameElement.textContent = user.first_name || user.username || 'Пользователь';
            }
        } else {
            console.warn('Данные пользователя недоступны.');
        }
    } else {
        console.warn('Telegram WebApp API не загружен.');
    }
}
function openPost(url) {
    if (window.Telegram && window.Telegram.WebApp) {
        Telegram.WebApp.openLink(url); // Открываем ссылку через Telegram WebApp
    } else {
        window.open(url, '_blank'); // Если WebApp не доступен, открываем в новой вкладке
    }
}
// Инициализация данных пользователя при загрузке страницы
document.addEventListener('DOMContentLoaded', initUserData);
// Функции для работы с личным кабинетом
function toggleUserMenu() {
    const userMenu = document.getElementById('userMenu');
    userMenu.classList.toggle('active');
}

function closeUserMenu() {
    const userMenu = document.getElementById('userMenu');
    userMenu.classList.remove('active');
}

// Функция для открытия поста
function openPost(url) {
    if (window.Telegram && Telegram.WebApp) {
        Telegram.WebApp.openTelegramLink(url);
    } else {
        window.open(url, '_blank');
    }
}

// Функция для форматирования даты в формате dd.mm.yyyy
function formatDate(dateString) {
    if (!dateString) return '--.--.----';
    
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '--.--.----';
    
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
}

// Функции для новых кнопок
function manageSubscription() {
    alert('Функция управления подпиской будет реализована позже');
}

function openSupport() {
    alert('Функция поддержки будет реализована позже');
}

function openRules() {
    alert('Функция просмотра правил будет реализована позже');
}

// Обработка чекбокса для email
function setupEmailCheckbox() {
    const checkbox = document.getElementById('receipt-checkbox');
    const emailContainer = document.querySelector('.email-input-container');
    
    if (checkbox && emailContainer) {
        checkbox.addEventListener('change', function() {
            if(this.checked) {
                emailContainer.style.display = 'block';
            } else {
                emailContainer.style.display = 'none';
            }
        });
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Получаем данные пользователя из localStorage или инициализируем пустые
    const userData = JSON.parse(localStorage.getItem('userData')) || {
        subscriptionDate: null,
        registrationDate: null
    };
    
    // Устанавливаем даты
    document.getElementById('subscription-date').textContent = 
        userData.subscriptionDate ? formatDate(userData.subscriptionDate) : '--.--.----';
    document.getElementById('registration-date').textContent = 
        userData.registrationDate ? formatDate(userData.registrationDate) : '--.--.----';
    
    // Получение данных пользователя из Telegram WebApp
    if (window.Telegram && Telegram.WebApp) {
        const user = Telegram.WebApp.initDataUnsafe.user;
        if (user) {
            const userName = user.first_name || 'Пользователь';
            document.getElementById('userName').textContent = userName;
            
            const avatarElement = document.getElementById('userAvatar');
            if (user.photo_url) {
                avatarElement.style.backgroundImage = `url(${user.photo_url})`;
            } else {
                const initials = userName.charAt(0).toUpperCase();
                avatarElement.style.display = 'flex';
                avatarElement.style.justifyContent = 'center';
                avatarElement.style.alignItems = 'center';
                avatarElement.style.fontSize = '2em';
                avatarElement.style.color = '#FF570A';
                avatarElement.style.fontWeight = 'bold';
                avatarElement.textContent = initials;
            }
            
            if (!userData.registrationDate) {
                userData.registrationDate = new Date().toISOString();
                localStorage.setItem('userData', JSON.stringify(userData));
                document.getElementById('registration-date').textContent = formatDate(userData.registrationDate);
            }
        }
    }
    
    // Настройка чекбокса для email
    setupEmailCheckbox();
});

// Функция для обновления даты подписки
function updateSubscriptionDate(endDate) {
    const userData = JSON.parse(localStorage.getItem('userData')) || {};
    userData.subscriptionDate = endDate;
    localStorage.setItem('userData', JSON.stringify(userData));
    document.getElementById('subscription-date').textContent = formatDate(endDate);
}
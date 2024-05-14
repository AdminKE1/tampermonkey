// ==UserScript==
// @name         Auto-Fill Field
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Auto-fill a specific field on a webpage with a given text
// @author       Your Name
// @match        http*://power.dat.com/postings/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var linkElement = document.getElementById('user-salutation');
    var textContent = linkElement.textContent;
    var words = textContent.split(' ');
    var secondWord = words.length > 1 ? words[1] : null;
    var expectedText = "When calling our main line (303-532-5955) please ask " + secondWord;  // Текст, который должен стоять в начале
    var inProgress = false;  // Флаг, чтобы избежать рекурсивных изменений

    function ensureText() {
        var textarea = document.querySelector('.comment1');
        if (textarea) {
            var currentText = textarea.value.trim();  // Получаем текущее содержимое

            if (!currentText.startsWith(expectedText) && !inProgress) {  // Проверяем, не начинается ли уже с нужного текста
                inProgress = true;  // Устанавливаем флаг, чтобы избежать повторного срабатывания
                textarea.value = expectedText;  // Добавляем нужный текст
                inProgress = false;  // Сбрасываем флаг
            }
        }
    }

    function startObserver() {
        var targetNode = document.body;
        var observer = new MutationObserver(function(mutationsList, observer) {
            if (!inProgress) {  // Проверяем флаг перед вызовом ensureText
                ensureText();
            }
        });

        var config = { childList: true, subtree: true, attributes: true };
        observer.observe(targetNode, config);
    }

    startObserver();  // Запускаем наблюдателя при инициализации скрипта
})();

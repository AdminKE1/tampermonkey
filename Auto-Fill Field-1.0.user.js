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
    var expectedText = "When calling our main line (303-532-5955) please ask " + secondWord;  
    var inProgress = false;  

    function triggerInputChange(element) {
        var event = new Event('input', {
            bubbles: true,
            cancelable: true,
        });
        element.dispatchEvent(event);
    }

    function ensureText() {
        var textarea = document.querySelector('.comment1');
        if (textarea) {
            var currentText = textarea.value.trim();

            if (!currentText.startsWith(expectedText) && !inProgress) {
                inProgress = true;
                textarea.value = expectedText + ' ' + currentText;
                triggerInputChange(textarea); 
                inProgress = false;
            }
        }
    }

    function startObserver() {
        var targetNode = document.body;
        var observer = new MutationObserver(function(mutationsList, observer) {
            if (!inProgress) { 
                ensureText();
            }
        });

        var config = { childList: true, subtree: true, attributes: true };
        observer.observe(targetNode, config);
    }

    startObserver();
})();

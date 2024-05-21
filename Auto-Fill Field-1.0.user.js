// ==UserScript==
// @name         Auto-Fill Field
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Auto-fill a specific field on a webpage with a given text
// @author       AdminKE
// @match        http*://power.dat.com/postings/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var linkElement = document.getElementById('user-salutation');
    var textContent = linkElement.textContent;
    var words = textContent.split(' ');
    var secondWord = words.length > 1 ? words[1] : null;
    var expectedText = "When calling our main line (303-532-5955) please ask " + secondWord;  // Text that should appear at the beginning
    var inProgress = false;  // Flag to avoid recursive changes

    function ensureText() {
        var textarea = document.querySelector('.comment1');
        if (textarea) {
            var currentText = textarea.value.trim();  // Retrieving current content

            if (!currentText.startsWith(expectedText) && !inProgress) {  // Checking to see if it already starts with the expecte
                inProgress = true;  // Set the flag to avoid triggering again
                textarea.value = expectedText;  // Adding the expected text
                inProgress = false;  // Reset the flag
            }
        }
    }

    function startObserver() {
        var targetNode = document.body;
        var observer = new MutationObserver(function(mutationsList, observer) {
            if (!inProgress) {  // Checking the flag before calling ensureText
                ensureText();
            }
        });

        var config = { childList: true, subtree: true, attributes: true };
        observer.observe(targetNode, config);
    }

    startObserver();  // Launching an observer when the script is initialized
})();

// ==UserScript==
// @name         AniV
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://old.reddit.com/r/anime/
// @match        https://old.reddit.com/user/AutoLovepon
// @match        https://youpoll.me/*
// @match        https://ssl.reddit.com/api/v1/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=reddit.com
// @grant        GM_addStyle
// @grant        GM_openInTab
// @grant window.close
// @require      https://code.jquery.com/jquery-3.3.1.min.js
// ==/UserScript==

(function() {
    if(window.location=="https://old.reddit.com/r/anime/"||window.location=="https://old.reddit.com/user/AutoLovepon"){
        $(document).on('click', '#siteTable div[data-author="AutoLovepon"] div[data-event-action]', function() {
            var dataEventAction = $(this).data('event-action');

            // Traverse upwards to find the relevant expando button
            var $expandoButton = $(this).closest('.midcol').siblings('.entry').find('.expando-button');

            // Click on the expando button and wait for a second
            if ($expandoButton.hasClass('collapsed')) {
            $expandoButton.click();
            }
            setTimeout(function() {
                if ($expandoButton.hasClass('expanded')) {
                // Find the link inside the expanded content and open it in a new tab
                var $expando = $expandoButton.parent().siblings('.expando');
                var $link = $expando.find('form div div h1 a');
                var newTab = GM_openInTab($link.attr('href')+'?'+dataEventAction, '_blank', 'noopener,noreferrer', { active: false });
                $expandoButton.click();
                }
            }, 1000);
        });
    }
    if(window.location.hostname=="youpoll.me"){
        if (window.location.pathname.endsWith('r')||window.location.pathname.endsWith("user-voted")) {
        window.close();
        }
        if (!$('.alert.alert-info.status-update').length) {
            var $radio;
            if(window.location.search=="?downvote"){
                $radio = $('.instructions').siblings('.radio').last();
            }
            else if(window.location.search=="?upvote"){
                $radio = $('.instructions').siblings('.radio').first();
            }
            $radio.find('label').click();
            setTimeout(function() {
                $('.voting-btn').click();
            }, 500);
        }

    }
    if(window.location.hostname=='ssl.reddit.com'){
          $('.fancybutton.newbutton.allow').click();}

})();
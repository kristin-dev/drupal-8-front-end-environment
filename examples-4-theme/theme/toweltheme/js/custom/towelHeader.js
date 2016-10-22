/**
 * Header behaviors.
 */
(function(Drupal, $) {
  'use strict';
  Drupal.behaviors.towelHeader = {
    attach: function(context) {
      var $burger = $('.burger', context);
      var $duplicateHeader;
      var $menu = $('.menu--main__list', context);
      var $menu_wrapper = $('.menu--main', context);
      var $header = $('#header', context);
      var isPinned = false;

      /**
       * Duplicates the header to use as a placeholder when the header is pinned.
       */
      var duplicateHeader = function() {
        $duplicateHeader = $header.clone().hide().attr('id', 'header-duplicate').addClass('header-duplicate').insertAfter($header);
      };

      /**
       * Pins the sticky header.
       */
      var pin = function() {
        $header.addClass('header-pinned');
        $duplicateHeader.show();
        isPinned = true;
      };

      /**
       * Unpins the header.
       */
      var unpin = function() {
        $header.removeClass('header-pinned');
        $duplicateHeader.hide();
        isPinned = false;
      };

      /**
       * Handles window scroll events.
       */
      var scroll = function() {
        var lastScrollTop = 0;
        $(window).on('scroll', function(e) {
          var top = $(window).scrollTop();
          // If this is a down scroll:
          if (top > lastScrollTop) {
            if (isPinned === true) {
              unpin();
            }
          }
          // Else this is an up scroll.
          else {
            if (isPinned === false) {
              if (top > 20) {
                pin();
              }
            }
            else {
              if (top < 20) {
                unpin();
              }
            }
          }
          lastScrollTop = top;
        });
      };

      /**
       * Handles clicks on the burger menu button.
       */
      $burger.click(function() {
        $burger.toggleClass('open');
        $menu.toggleClass('burger-open');
      });

      /**
       * Handles clicks on the menu wrapper.
       */
      $menu_wrapper.click(function(e) {
        // Stops propagation of click to prevent the window click handler from
        // being triggered.
        e.stopPropagation();
      });

      /**
       * Handles clicks on the window.
       *
       * Closes the mobile menu.
       */
      $(window).click(function() {
        $burger.removeClass('open');
        $menu.removeClass('burger-open');
      });

      /**
       * Triggers functions that should only be fired once.
       */
      $('body', context).once().each(function() {
        duplicateHeader();
        scroll();
      });

    }
  };
})(Drupal, jQuery);

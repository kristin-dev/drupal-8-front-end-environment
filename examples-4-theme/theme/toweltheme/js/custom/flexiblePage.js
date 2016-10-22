/**
 * Code for the Flexible Content content type.
 */
(function($) {
  'use strict';
  Drupal.behaviors.hook42d8_flexible_page_layout = {
    window_loaded: false,
    resizeAreas: function() {
      var imageAbsolute = false;
      enquire.register('screen and (max-width:767px)', {
        match: function() {
          // Move background color from parent area into background layer if exists
          // This applies for Areas and Items
          $('.content-area[class*="bgcolor-"] .background-wrapper.mobile-bg-image-behavior-background .background-image').each(function(index, domObject) {
            var $area_bg = $(domObject);
            var $area_bg_wrapper = $area_bg.parent();
            var $area = $area_bg_wrapper.parent();
            var areaClasses = $area.attr('class').split(' ');
            for (var classIndex in areaClasses) {
              if (classIndex > 0) {
                var className = areaClasses[classIndex];
                if (className.search('bgcolor-') > -1) {
                  $area.removeClass(className);
                  $area_bg_wrapper.addClass(className);
                }
              }
            }
          });
          // Resize items within an area and then the area itself
          $('.content-area > .background-wrapper > .background-image').each(function(index, domObject) {
            var $area_bg = $(domObject);
            Drupal.behaviors.hook42d8_flexible_page_layout.resizeItemBg($area_bg, imageAbsolute);
          });
          // All backgrounds that arent default get resized
          $('.content-area > .background-wrapper[class*="mobile-bg-"] > .background-image').each(function(index, domObject) {
            var $area_bg = $(domObject);
            imageAbsolute = true;
            Drupal.behaviors.hook42d8_flexible_page_layout.resizeItemBg($area_bg, imageAbsolute);
          });
        }
      }).register('screen and (min-width:768px)', {
        match: function() {
          // Move Background Color property from area to the wrapper
          $('.content-area[class*="bgcolor-"] .background-image').each(function(index, domObject) {
            var $area_bg = $(domObject);
            var $area_bg_wrapper = $area_bg.parent();
            var $area = $area_bg_wrapper.parent();
            var areaClasses = $area.attr('class').split(' ');
            for (var classIndex in areaClasses) {
              if (classIndex > 0) {
                var className = areaClasses[classIndex];
                if (className.search('bgcolor-') > -1) {
                  $area.removeClass(className);
                  $area_bg_wrapper.addClass(className);
                }
              }
            }
          });
          // All backgrounds get resized
          $('.content-area > .background-wrapper > .background-image').each(function(index, domObject) {
            var $area_bg = $(domObject);
            imageAbsolute = true;
            Drupal.behaviors.hook42d8_flexible_page_layout.resizeItemBg($area_bg, imageAbsolute);
          });
          var options = {
            byRow: true,
            property: 'height',
            target: null,
            remove: false
          };
          $('.content-item').matchHeight(options);
        },
        unmatch: function() {
          // Moving background color class back to the area in preparation for the matching process in the mobile size
          $('.background-wrapper[class*="bgcolor-"]').each(function(index, domObject) {
            var $bg_wrapper = $(domObject);
            var $area = $bg_wrapper.parent();
            var wrapperClasses = $bg_wrapper.attr('class').split(' ');
            for (var classIndex in wrapperClasses) {
              if (classIndex > 0) {
                var className = wrapperClasses[classIndex];
                if (className.search('bgcolor-') > -1) {
                  $bg_wrapper.removeClass(className);
                  $area.addClass(className);
                }
              }
            }
          });
        }
      });
    },
    resizeItemBg: function($area_bg, imageAbsolute) {
      var img_height;
      var $items = $area_bg.closest('.content-area').find('.content-item .background-image');
      $items.each(function(index, domObject) {
        var $item_bg = $(domObject);
        var $item_wrapper = $item_bg.parent();
        var $item = $item_wrapper.parent();
        var $item_padding = $item.find('.item-padding');
        $item_padding.height(0);
        $item.height('auto');
        $item_wrapper.height('auto');
        if (imageAbsolute === true) {
          var item_height = $item.height();
          var $image = $item_bg.find('img');
          if (Drupal.behaviors.hook42d8_flexible_page_layout.window_loaded === true) {
            img_height = $image.height();
          }
          if (item_height > img_height) {
            $item_wrapper.height(item_height);
            $item_padding.remove();
          }
          else {
            var height_diff = img_height - item_height;
            $item.height(img_height);
            if ($item_padding.length === 0) {
              $item.append("<div class='item-padding'></div>");
              $item_padding = $item.find('.item-padding');
            }
            $item_padding.height(height_diff);
          }
        }
      });
      Drupal.behaviors.hook42d8_flexible_page_layout.resizeAreaBg($area_bg, imageAbsolute);
    },
    resizeAreaBg: function($area_bg, imageAbsolute) {
      var img_height;
      var $area_wrapper = $area_bg.parent();
      var $area = $area_wrapper.parent();
      $area.height('auto');
      $area_wrapper.height('auto');
      if (imageAbsolute === true) {
        var area_height = $area.height();
        var $image = $area_bg.find('img');
        if (Drupal.behaviors.hook42d8_flexible_page_layout.window_loaded === true || typeof img_src_width === 'undefined' || typeof img_src_height === 'undefined') {
          img_height = $image.height();
        }
        if (area_height > img_height) {
          $area_wrapper.height(area_height);
        }
        else {
          $area.height(img_height);
        }
      }
    },
    attach: function() {
      $('.content-area .background-image[class*="mobile-bg-"]').each(function(index, domObject) {
        var $area_bg = $(domObject);
        var $area_bg_wrapper = $area_bg.parent();
        var areaBgClasses = $area_bg.attr('class').split(' ');
        for (var classIndex in areaBgClasses) {
          if (classIndex > 0) {
            var className = areaBgClasses[classIndex];
            if (className.search('mobile-bg-') > -1) {
              $area_bg.removeClass(className);
              $area_bg_wrapper.addClass(className);
            }
          }
        }
      });

      Drupal.behaviors.hook42d8_flexible_page_layout.window_loaded = false;
      Drupal.behaviors.hook42d8_flexible_page_layout.resizeAreas();

      $(window).load(function() {
        Drupal.behaviors.hook42d8_flexible_page_layout.window_loaded = true;
        Drupal.behaviors.hook42d8_flexible_page_layout.resizeAreas();
      });

      /**
       * Resize page areas after changing window size.
       */
      var rtime;
      var timeout = false;
      var delta = 20;
      $(window).resize(function() {
        rtime = new Date();
        if (timeout === false) {
          timeout = true;
          setTimeout(resizeend, delta);
        }
      });

      /**
       * Triggered when a resize has been effected and no longer in action.
       */
      function resizeend() {
        if (new Date() - rtime < delta) {
          setTimeout(resizeend, delta);
        }
        else {
          timeout = false;
          Drupal.behaviors.hook42d8_flexible_page_layout.resizeAreas();
        }
      }
    }
  };
})(jQuery);

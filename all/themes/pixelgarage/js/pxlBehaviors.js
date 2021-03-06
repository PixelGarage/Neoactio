/**
 * This file contains all Drupal behaviours of the Apia theme.
 *
 * Created by ralph on 05.01.14.
 */

(function ($) {

  /**
   * This behavior adds shadow to header on scroll.
   *
  Drupal.behaviors.addHeaderShadow = {
    attach: function (context) {
      $(window).on("scroll", function () {
        if ($(window).scrollTop() > 10) {
          $("header.navbar .container").css("box-shadow", "0 4px 3px -4px gray");
        }
        else {
          $("header.navbar .container").css("box-shadow", "none");
        }
      });
    }
  };
*/


  /**
   * Anchor menus: Scrolls smoothly to anchor due to menu click.
   */
  Drupal.behaviors.smoothScrolltoAnchors = {
    attach: function (context, settings) {
      $(function () {
        $('.menu li.leaf a').click(function () {
          var anchorPos = this.href.indexOf('#');
          // no anchor available, perform click
          if (anchorPos == -1) return true;

          // menu item references anchor, get anchor target
          var target = $(this.href.slice(pos));
          if (target.length) {
            $('html, body').stop().animate({
              scrollTop: target.offset().top
            }, 1000, 'swing');
            return false;
          }
          // no target available, perform click
          return true;
        });
      });
    }
  };

  /**
   *
   * @type {{attach: Drupal.behaviors.randomPeItemWidth.attach}}
  Drupal.behaviors.randomPeItemWidth = {
    attach: function (context, settings) {
      var $view = $('.view.view-werk').add('.view.view-projekt-images');
      if ($view.length <= 0) return;

      var $rows = $view.find('.pe-item'),
        randomClass = function () {
          var classes = ['pe-item-width-25', 'pe-item-width-66', 'pe-item-width-50', 'pe-item-width-100'],
            rand = Math.random() * 100;

          if (rand >= 0 && rand < 25) {
            return classes[0];
          }
          else if (rand >= 25 && rand < 50) {
            return classes[1];
          }
          else if (rand >= 50 && rand < 75) {
            return classes[2];
          }
          else if (rand >= 75 && rand <= 100) {
            return classes[3];
          }
        };

      //
      // add random class to all items
      var doAgain = false;
      $rows.each(function(index) {
        if (index == 0) {
          $(this).addClass('pe-item-width-55');
        }
        else if (index == 1) {
          $(this).addClass('pe-item-width-50');
          doAgain = true;
        }
        else {
          // add same random class again
          if (doAgain) {
            $(this).addClass('pe-item-width-50');
            doAgain = false;
            return;
          }

          // add random class
          var rndmClass = randomClass();

          doAgain = (rndmClass == 'pe-item-width-50');
          $(this).addClass(rndmClass);
        }
      });
    }
  };
   */
  Drupal.behaviors.openProjectFullMode = {
    attach: function(context, settings) {
      var $nodeProjekt = $('.node-projekt.view-mode-teaser');

      $nodeProjekt.once('click', function() {
        $(this).on('click', function() {
          var page_y = $(document).scrollTop();

          window.location = $(this).find('a:first-child').attr('href') + '?page_y=' + page_y;
          return false;
        });
      });

      $(window).off('load');
      $(window).on('load', function(ev) {
        var location = window.location.href;

        if ( location.indexOf('page_y') != -1 ) {
          var match = location.split('?')[1].split("&")[0].split("=");
          $('html, body').scrollTop( match[1] );
        }
      });
    }
  };

  Drupal.behaviors.toggleProjectDescription = {
    attach: function(context, settings) {
      var $nodeProjekt = $('.node-projekt.view-mode-full'),
          $nodePage = $('.node-page.view-mode-full'),
          $main_container = $('body .main-container'),
          $infoToggle = $nodeProjekt.find('.toggle-descr'),
          $projektModal = $main_container.find('.projekt-modal'),
          $aboutToggle = $nodePage.find('.toggle-descr'),
          $pageModal = $main_container.find('.page-modal'),
          $backdrop = $main_container.find('.modal-backdrop');

      $infoToggle.once('toggle', function() {
        $infoToggle.on('click', function() {
          if ($projektModal.hasClass('modal-visible')) {
            $projektModal.removeClass('modal-visible');
            $('body').removeClass('modal-visible');
          }
          else {
            $projektModal.addClass('modal-visible');
            $('body').addClass('modal-visible');
          }
        });

        $backdrop.on('click', function() {
          $projektModal.removeClass('modal-visible');
          $('body').removeClass('modal-visible');
        });
      });

      $aboutToggle.once('toggle', function() {
        $aboutToggle.on('click', function() {
          if ($pageModal.hasClass('modal-visible')) {
            $pageModal.removeClass('modal-visible');
            $('body').removeClass('modal-visible');
          }
          else {
            $pageModal.addClass('modal-visible');
            $('body').addClass('modal-visible');
          }
        });

        $backdrop.on('click', function() {
          $pageModal.removeClass('modal-visible');
          $('body').removeClass('modal-visible');
        });
      });

    }
  };

  Drupal.behaviors.carouselNumberUpdate = {
    attach: function(context, settings) {
      var $view = $('.view-projekt-images'),
        $carousel = $view.find('.carousel'),
        $activeImageNumber = $view.find('.carousel-image-pos');

      $carousel.once('slide-event', function() {
        $carousel.on('slid.bs.carousel', function(ev) {
          var $activeImage = $carousel.find('.item.active'),
              imgNumber = $activeImage.attr('data-image-number');

          $activeImageNumber.html(imgNumber);
        });
      });
    }
  };

  Drupal.behaviors.carouselImageHeight = {
    attach: function() {
      var $view = $('.view-projekt-images'),
        $carousel = $view.find('.carousel'),
        $items = $carousel.find('.carousel-inner .item'),
        $window = $(window);

      $window.off('resize');
      $window.on('resize', function() {
        var vh = $window.height(),
          size = 20;

        if ($window.width() > 1024) {
          size = 40;
        }
        else if ($window.width() > 768) {
          size = 30;
        }

        $items.height(vh - 6 * size);
      });

      // initialize items
      $window.resize();
    }
  };

  /**
   * Allows full size clickable items.
   Drupal.behaviors.fullSizeClickableItems = {
    attach: function () {
      var $clickableItems = $('.node-link-item.node-teaser .field-group-div')
        .add('.node-team-member.node-teaser .field-group-div');

      $clickableItems.once('click', function () {
        $(this).on('click', function () {
          window.location = $(this).find("a:first").attr("href");
          return false;
        });
      });
    }
  };
   */

  /**
   * Swaps images from black/white to colored on mouse hover.
   Drupal.behaviors.hoverImageSwap = {
    attach: function () {
      $('.node-project.node-teaser .field-name-field-images a img').hover(
        function () {
          // mouse enter
          src = $(this).attr('src');
          $(this).attr('src', src.replace('teaser_bw', 'teaser_normal'));
        },
        function () {
          // mouse leave
          src = $(this).attr('src');
          $(this).attr('src', src.replace('teaser_normal', 'teaser_bw'));
        }
      );
    }
  }
   */

  /**
   * Open file links in its own tab. The file field doesn't implement this behaviour right away.
   Drupal.behaviors.openDocumentsInTab = {
    attach: function () {
      $(".field-name-field-documents").find(".field-item a").attr('target', '_blank');
    }
  }
   */

})(jQuery);

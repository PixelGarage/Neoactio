/**
 * This file contains all Drupal behaviours of the Apia theme.
 *
 * Created by ralph on 05.01.14.
 */

(function ($) {

  /**
   * This behavior adds shadow to header on scroll.
   *
   */
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

  Drupal.behaviors.randomPeItemWidth = {
    attach: function (context, settings) {
      var $view = $('.view.view-werk');
      if ($view.length <= 0) return;

      var $rows = $view.find('.views-row'),
        randomClass = function () {
          var classes = ['pe-item-width-66', 'pe-item-width-50', 'pe-item-width-100'],
            rand = Math.random() * 100;

          if (rand >= 0 && rand < 33) {
            return classes[0];
          }
          else if (rand >= 33 && rand < 66) {
            return classes[1];
          }
          else if (rand >= 66 && rand <= 100) {
            return classes[2];
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

  Drupal.behaviors.toggleProjectDescription = {
    attach: function(context, settings) {
      var $nodeProjekt = $('.node-projekt.view-mode-full'),
          $infoToggle = $nodeProjekt.find('.icon-info'),
          $projektModal = $nodeProjekt.find('.projekt-modal');

      $infoToggle.once('toggle', function() {
        $infoToggle.on('click', function() {
          if ($projektModal.hasClass('modal-visible')) {
            $projektModal.removeClass('modal-visible');
          }
          else {
            $projektModal.addClass('modal-visible');
          }
        });
      });
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

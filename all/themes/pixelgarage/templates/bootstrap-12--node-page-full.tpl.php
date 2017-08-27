<?php
/**
 * @file
 * Bootstrap 12 template for Display Suite.
 */
?>


<<?php print $layout_wrapper; print $layout_attributes; ?> class="<?php print $classes; ?>">
  <?php if (isset($title_suffix['contextual_links'])): ?>
    <?php print render($title_suffix['contextual_links']); ?>
  <?php endif; ?>
  <div class="row">
    <<?php print $central_wrapper; ?> class="col-sm-12 <?php print $central_classes; ?>">
      <div class="projekt-header">
        <span class="toggle-descr"><img class="icon-info" src="<?php print $info_icon_path; ?>"/></span>
        <a class="close-projekt" href="<?php print $previous_page_path; ?>"><img class="icon-close" src="<?php print $close_icon_path; ?>"/></a>
      </div>
      <div class="projekt-central">
        <?php print $central; ?>
      </div>
    </<?php print $central_wrapper; ?>>
  </div>
</<?php print $layout_wrapper ?>>

<div class="page-modal">
  <div class="page-body"><?php print render($content['body']); ?></div>
</div>
<div class="modal-backdrop"></div>

<!-- Needed to activate display suite support on forms -->
<?php if (!empty($drupal_render_children)): ?>
  <?php print $drupal_render_children ?>
<?php endif; ?>

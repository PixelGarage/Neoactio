<?php
/**
 * @file
 * Bootstrap 12 template for Display Suite.
 */
?>

<<?php print $layout_wrapper;
print $layout_attributes; ?> class="<?php print $classes; ?>">
<?php if (isset($title_suffix['contextual_links'])): ?>
  <?php print render($title_suffix['contextual_links']); ?>
<?php endif; ?>
<div class="row">
  <<?php print $central_wrapper; ?> class="col-sm-12 <?php print $central_classes; ?>">
  <div class="projekt-header">
    <span class="toggle-descr"><img class="icon-info" src="<?php print $info_icon_path; ?>"/></span>
    <span class="close-projekt"><img class="icon-close" src="<?php print $close_icon_path; ?>"/></span>
  </div>
  <div class="projekt-modal">
    <div class="projekt-title"><?php print render($content['title']); ?></div>
    <div class="projekt-slogan"><?php print $slogan; ?></div>
    <div class="projekt-year"><?php print $year; ?></div>
    <div class="projekt-body"><?php print render($content['body']); ?></div>
  </div>
</<?php print $central_wrapper; ?>>
</div>
</<?php print $layout_wrapper ?>>


<!-- Needed to activate display suite support on forms -->
<?php if (!empty($drupal_render_children)): ?>
  <?php print $drupal_render_children ?>
<?php endif; ?>

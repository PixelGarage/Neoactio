<?php
/**
 * @file
 * Bootstrap 12 template for Display Suite.
 */
?>

<<?php print $layout_wrapper; print $layout_attributes; ?> class="<?php print $classes; ?>">
  <a href="<?php print $node_url; ?>"></a>
  <?php if (isset($title_suffix['contextual_links'])): ?>
    <?php print render($title_suffix['contextual_links']); ?>
  <?php endif; ?>
  <div class="row">
    <<?php print $central_wrapper; ?> class="col-sm-12 <?php print $central_classes; ?>">
      <div class="projekt-media">
          <img src="<?php print $media_path; ?>"/>
      </div>
      <div class="projekt-hover">
          <div class="projekt-title"><?php print render($content['title']); ?></div>
          <div class="projekt-slogan"><?php print $slogan; ?></div>
      </div>
    </<?php print $central_wrapper; ?>>
  </div>
</<?php print $layout_wrapper ?>>


<!-- Needed to activate display suite support on forms -->
<?php if (!empty($drupal_render_children)): ?>
  <?php print $drupal_render_children ?>
<?php endif; ?>

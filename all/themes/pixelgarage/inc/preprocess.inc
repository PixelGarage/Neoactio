<?php
/**
 * Created by PhpStorm.
 * User: ralph
 * Date: 06.02.15
 * Time: 17:23
 */

/**
 * Preprocess variables for the html template.
 */
function pixelgarage_preprocess_html(&$vars) {
  // make sure jQuery UI and effects is loaded for anonymous users
  drupal_add_library('system', 'ui');
  //drupal_add_library('system', 'effects');

}

/**
 * Override or insert variables for the page templates.
 */
function pixelgarage_preprocess_page(&$vars) {
  // hide titles on login forms
  pg_login_preprocess_page($vars);

  //$vars['logo'] = str_replace(array('.jpg', '.png'), '.svg', $vars['logo']);
}


function pixelgarage_ds_pre_render_alter(&$layout_render_array, $context, &$vars) {
  // check node type
  if ($context['entity_type'] == 'node' && $context['bundle'] == 'projekt') {
    $view_mode = $context['view_mode'];
    _preprocess_node_projekt($vars, $view_mode);
  }
}

function _preprocess_node_projekt(&$vars, $view_mode) {
  //
  // create image paths
  $img_path = drupal_get_path('theme', 'pixelgarage') . '/images/';

  if ($view_mode == 'full') {
    $vars['info_icon_path'] = file_create_url($img_path . 'popup_close.svg');
    $vars['close_icon_path'] = file_create_url($img_path . 'popup_close.svg');
    $vars['previous_page_path'] = file_create_url('/');
  }
  else if ($view_mode == 'teaser') {
    $media = null;
    $media_path = false;
    if (!empty($vars['field_images']) && $media = $vars['field_images'][0]) {
      $media_path = file_create_url($media['uri']);
    }
    $vars['media_path'] = $media_path;
  }

  $vars['slogan'] = !empty($vars['content']['field_text']) ? render($vars['content']['field_text']) : '';
  $vars['year'] = !empty($vars['content']['field_jahr']) ? render($vars['content']['field_jahr']) : '';
}

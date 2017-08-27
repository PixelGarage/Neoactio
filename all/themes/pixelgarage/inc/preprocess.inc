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
  $vars['home_path'] = file_create_url('/node/74');

  $vars['is_project_page'] = false;
  if (isset($vars['node']) && $node = $vars['node'] && $vars['node']->type == 'projekt') {
    $vars['is_project_page'] = true;

    // get random projects and define urls
    $random_projects = _get_random_projects();
    $random_text = _get_random_text();
    $vars['prev_project_url'] = l($random_text[0], 'node/' . $random_projects[0], array('attributes' => array('rel' => array('prev'), 'class' => array('prev-project'))));
    $vars['next_project_url'] = l($random_text[1], 'node/' . $random_projects[1], array('attributes' => array('rel' => array('next'), 'class' => array('next-project'))));
  }
}

function _get_random_projects() {
  $random_projects = array();

  //
  // get two projekt nodes randomly
  $query = new EntityFieldQuery();
  $query->entityCondition('entity_type', 'node')
    ->entityCondition('bundle', 'projekt');
  $result = $query->execute();
  if (isset($result['node'])) {
    $nids = array_keys($result['node']);
    $count =  count($nids) - 1;

    $rand1 = mt_rand(0, $count);
    $rand2 = mt_rand(0, $count);
    $random_projects[0] = $nids[$rand1];
    $random_projects[1] = $nids[$rand2];
  }
  return $random_projects;
}

function _get_random_text() {
  $texts = array(t('yeahhh'), t('Whats next?'), t('Nicht klicken'), t('Was los?'));
  $count = count($texts) - 1;
  $rand1 = mt_rand(0, $count);
  $rand2 = mt_rand(0, $count);

  return array($texts[$rand1], $texts[$rand2]);
}


/* =============================================================================
 *      Projekt and Page nodes
 * ========================================================================== */

function pixelgarage_ds_pre_render_alter(&$layout_render_array, $context, &$vars) {
  // check node type
  if ($context['entity_type'] == 'node' && ($context['bundle'] == 'projekt' || $context['bundle'] == 'page')) {
    $view_mode = $context['view_mode'];
    _preprocess_node_projekt($vars, $view_mode);
  }
}

function _preprocess_node_projekt(&$vars, $view_mode) {
  //
  // create image paths
  $img_path = drupal_get_path('theme', 'pixelgarage') . '/images/';

  if ($view_mode == 'full') {
    $vars['info_icon_path'] = file_create_url($img_path . 'descr-icon.png');
    $vars['close_icon_path'] = file_create_url($img_path . 'close-icon.png');
    $vars['previous_page_path'] = file_create_url('/');
  }
  else if ($view_mode == 'teaser') {
    $media = null;
    $media_path = false;
    if (!empty($vars['field_images']) && $media = $vars['field_images'][0]) {
      $image_uri = create_projekt_image($media['uri']);
      $media_path = file_create_url($image_uri);
    }
    $vars['media_path'] = $media_path;
  }

  $vars['slogan'] = !empty($vars['content']['field_text']) ? render($vars['content']['field_text']) : '';
  $vars['year'] = !empty($vars['content']['field_jahr']) ? render($vars['content']['field_jahr']) : '';
}


/**
 * Helper function to create a desaturated image for the hover effect.
 */
function create_projekt_image($image_uri) {
  $style_name = 'projekt-image';
  $dest = image_style_path($style_name, $image_uri);
  if (!file_exists($dest)) {
    $style = image_style_load($style_name);
    if (isset($style['effects'])) {
      $success = image_style_create_derivative($style, $image_uri, $dest);
      return $success ? $dest : $image_uri;
    }
  }

  return $dest;
}


/* =============================================================================
 *      Carousel adaptation
 * ========================================================================== */

function pixelgarage_preprocess_views_bootstrap_carousel_plugin_style(&$vars) {
  //
  // add videos to carousel
  $view = $vars['view'];
  $videos = $view->result[0]->field_field_video;
  foreach ($videos as $index => $video) {
    $video_row = render($video['rendered']['0']);
    $vars['rows'][] = $video_row;
  }

  // set row count
  $vars['image_count'] = count($vars['rows']);
}


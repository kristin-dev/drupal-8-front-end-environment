<?php
/**
 * Implements hook_form_system_theme_settings_alter()
 */
function toweltheme_form_system_theme_settings_alter(&$form, &$form_state) {
  $theme = \Drupal::theme()->getActiveTheme()->getName();
  $toggle_welcome = theme_get_setting('toweltheme_toggle_welcome', $theme);
  if (is_null($toggle_welcome)) {
    $toggle_welcome = TRUE;
  }

  $form['welcome'] = array(
    '#type' => 'details',
    '#attributes' => array('class' => array('welcome', 'toweltheme-help')),
    '#title' => t('Welcome to Towel'),
    '#weight' => -1,
    '#open' => $toggle_welcome,
    '#tree' => FALSE,
  );

  $logo = base_path() . drupal_get_path('theme', 'toweltheme') . '/logo.png';

  $form['welcome']['toweltheme'] = array(
    '#prefix' => '<div class="toweltheme-welcome">',
    '#markup' => '<img src="' . $logo . '" />',
    '#suffix' => '</div>',
  );

  $form['welcome']['toweltheme']['#markup'] .= t('<p><strong>Towel is based on Hitchhiker</strong> - <a href="https://www.drupal.org/sandbox/legaudinier/2704379" target="_blank">https://www.drupal.org/sandbox/legaudinier/2704379</a>');
  $form['welcome']['toweltheme']['#markup'] .= t('<p>The following modules are recommended:</p>');
  $form['welcome']['toweltheme']['#markup'] .= t('<ul>');
  $form['welcome']['toweltheme']['#markup'] .= t('<li><strong>Towel Tools</strong> - Included in the Towel theme. Embeds the KSS automated styleguide into the theme at <a href="/admin/appearance/design/toweltheme">admin/appearance/design/toweltheme</a>.</li>');
  $form['welcome']['toweltheme']['#markup'] .= t('</ul>');

  $form['toweltheme_toggle_welcome'] = array(
    '#type' => 'checkbox',
    '#title' => t('Show this welcome section by default'),
    '#description' => t(''),
    '#default_value' => $toggle_welcome,
    '#group' => 'welcome',
  );
}

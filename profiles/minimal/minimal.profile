<?php
/**
 * @file
 * Enables modules and site configuration for a minimal site installation.
 */

/**
 * Implements hook_form_FORM_ID_alter() for install_configure_form().
 *
 * Allows the profile to alter the site configuration form.
 */
function minimal_form_install_configure_form_alter(&$form, $form_state) {
  // Pre-populate the site name with the server name.
  $form['site_information']['site_name']['#default_value'] = $_SERVER['SERVER_NAME'];
}

function minimal_install_tasks(&$install_state) {

  return array(
    'minimal_content_setup' => array(
      'display_name' => st('Content setup'),
      'type' => 'batch',
    ),
  );


  return $tasks;
}

function minimal_content_setup() {
  $operations = array();

  for ($int = 1; $int < 30; $int++) {
    $operations[] = array('_xxxx');
  }

  $batch = array(
    'operations' => $operations,
    'title' => st('Installing @drupal', array('@drupal' => drupal_install_profile_distribution_name())),
    'error_message' => st('The installation has encountered an error.'),
  );

  return $batch;

}

function _xxxx($context) {
  $x = 1;
  for ($int = 1; $int < 30000; $int++) {
    $x++;
  }
}

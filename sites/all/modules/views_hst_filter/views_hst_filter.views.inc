<?php

/**
 * @file
 * Provide views handler for module
 */

/**
 * Implements hook_views_data_alter().
 */
function views_hst_filter_views_data_alter(&$data) {
  $data['taxonomy_index']['views_hst_filter'] = array(
    'group' => t('Content'),
    'title' => t('Has a taxonomy term (with the hierarchy)'),
    'help' => t('Display content if it has the selected taxonomy terms, or children of the selected terms. Filter consist of the dynamic related fields of selection (one field for each level of vocabulary) which are worked through Ajax.'),
    'filter' => array(
      'handler' => 'views_hst_filter_handler_filter',
      'hierarchy table' => 'taxonomy_term_hierarchy',
      'numeric' => TRUE,
      'skip base' => 'taxonomy_term_data',
      'allow empty' => TRUE,
    ),
  );
}

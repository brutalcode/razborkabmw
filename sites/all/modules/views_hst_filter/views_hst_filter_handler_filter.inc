<?php

/**
 * @file
 * Definition of views_hst_filter_handler_filter.
 */

/**
 * Filter to handle taxonomy terms with hierarchical select.
 */
class views_hst_filter_handler_filter extends views_handler_filter {
  /**
   * Provide some extra help to get the operator/value easier to use.
   */
  function init(&$view, &$options) {
    parent::init($view, $options);
    $this->operator = 'IN';
    $this->value = array('All');

    if (!empty($this->definition['vid'])) {
      $this->options['vid'] = $this->definition['vid'];
    }
  }

  /**
   * Display the filter on the administrative summary.
   */
  function admin_summary() {
    $vocabulary = taxonomy_vocabulary_load($this->options['vid']);
    if ($vocabulary) {
      return t('vocabulary is') . ' ' . $vocabulary->name;
    }
    else {
      return '';
    }
  }

  /**
   * Options definition.
   */
  function option_definition() {
    $options = parent::option_definition();
    $options['exposed'] = array('default' => TRUE);

    $options['vid'] = array('default' => 1);

    $options['inline_wrapper'] = array('default' => TRUE);
    $options['max_depth'] = array('default' => 0);
    $options['nodes_counter'] = array('default' => FALSE);
    $options['hide_empty_terms'] = array('default' => FALSE);

    return $options;
  }

  /**
   * We are have not need in the parent class options,
   * therefore we are invoke "grandfather's" options_form.
   */
  function options_form(&$form, &$form_state) {

    views_handler::options_form($form, $form_state);

    // Add the subform from value_form().
    $this->show_value_form($form, $form_state);

    $form['label'] = array(
      '#type' => 'textfield',
      '#default_value' => $this->options['expose']['label'],
      '#title' => t('Label'),
      '#size' => 40,
    );

    // Vocabulary for use the filter.
    $vocabularies = taxonomy_get_vocabularies();
    $options = array();
    foreach ($vocabularies as $voc) {
      $options[$voc->vid] = check_plain($voc->name);
    }

    // We only do this when the form is displayed.
    if (empty($this->options['vid'])) {
      $first_vocabulary = reset($vocabularies);
      $this->options['vid'] = $first_vocabulary->vid;
    }

    if (empty($this->definition['vid'])) {
      $form['vid'] = array(
        '#type' => 'radios',
        '#title' => t('Vocabulary'),
        '#options' => $options,
        '#description' => t('Select which vocabulary to show terms for in the regular options.'),
        '#default_value' => $this->options['vid'],
      );
    }

    $form['#attributes']['class'][] = 'clearfix';
  }

  /**
   * We have 'extra options' now.
   */
  function has_extra_options() {
    return TRUE;
  }

  /**
   * Provide a form for extra setting options.
   */
  function extra_options_form(&$form, &$form_state) {
    $vocabulary = taxonomy_vocabulary_load($this->options['vid']);
    $form['max_depth'] = array(
      '#type' => 'select',
      '#title' => t('Limit depth for') . ' ' . $vocabulary->name,
      '#options' => $this->get_vocabulary_levels(),
      '#default_value' => $this->options['max_depth'],
      '#description' => t('The max depth of level of taxonomy term available for selection of user. If 0 will no limit.'),
    );

    $form['nodes_counter'] = array(
      '#type' => 'checkbox',
      '#title' => t('Add nodes counter to each term'),
      '#description' => t("If checked to each item in select box will be added counter of related nodes. A bit of slower than without it."),
      '#default_value' => $this->options['nodes_counter'],
    );

    $form['hide_empty_terms'] = array(
      '#type' => 'checkbox',
      '#title' => t('Hide empty terms'),
      '#description' => t("If checked the terms without related nodes will not added to select box. A bit of slower than without it."),
      '#default_value' => $this->options['hide_empty_terms'],
    );

    $form['inline_wrapper'] = array(
      '#type' => 'checkbox',
      '#title' => t('Inline wrapper'),
      '#description' => t("If checked to each select box will be added class 'container-inline'."),
      '#default_value' => $this->options['inline_wrapper'],
    );
  }

  /**
   * We are have not need to check for expose and group.
   */
  function expose_validate($form, &$form_state) {

  }

  /**
   * Save the label for filter.
   */
  function expose_submit($form, &$form_state) {
    $this->options['expose']['label'] = $form_state['input']['options']['label'];
  }

  /**
   * We are have not need in the exposed info.
   */
  function exposed_info() {
    return;
  }

  /**
   * Render our chunk of the exposed filter form when selecting.
   */
  function exposed_form(&$form, &$form_state) {
    $widget_id = $this->build_widget_id();

    // Wrapper for all fields from a vocabulary.
    $attributes = array('id' => $widget_id);
    if ($this->options['inline_wrapper']) {
      $attributes['class'] = array('views-hst-filter container-inline');
    }
    else {
      $attributes['class'] = array('views-hst-filter');
    }
    $form[$widget_id] = array(
      '#type' => 'container',
      '#attributes' => $attributes,
    );
    // Проверяем, не применялся ли фильтр. Если да - восстанавливаем значения
    // в полях выбора.
    $tids = $this->get_current_tids($form_state);

    $default_first_tid = 'All';
    if (!empty($tids)) {
      $default_first_tid = ('All' != $tids[0]) ? '0' . $tids[0] : $tids[0];
    }

    // Первый селект.
    $form[$widget_id]['select-' . $widget_id] = array(
      '#type' => 'select',
      '#options' => views_hst_filter_build_options_list($this->options['vid'], 0, $this->options['nodes_counter'], $this->options['hide_empty_terms']),
      '#default_value' => $default_first_tid,
      '#attributes' => array(
        'autocomplete' => 'off',
      ),
    );

    $storage = $widget_id . '-tid';
    $default_values = 'All';
    if (!empty($tids)) {
      $default_values = implode(',', $tids);
    }
    // Хранилище значений всех селектов
    // (или одного, если его значение отличается от 'All').
    $form[$widget_id][$storage] = array(
      '#type' => 'hidden',
      '#default_value' => $default_values,
      '#attributes' => array(
        'id' => 'tid-' . $widget_id,
      ),
    );

    // Учитываем существующие селекты после применения фильтра
    // и обновления страницы (в этот момент в хранилище у нас хранится вся
    // выбранная ветвь родитель-потомок).
    if (!empty($tids) && count($tids) > 1) {
      $count = count($tids);
      for ($i = 1; $i < $count; $i++) {
        $index = $widget_id . '-' . $i;
        $form[$widget_id][$index] = array(
          '#type' => 'select',
          '#options' => views_hst_filter_build_options_list($this->options['vid'], $tids[$i - 1], $this->options['nodes_counter'], $this->options['hide_empty_terms']),
          '#default_value' => ('All' != $tids[$i]) ? '0' . $tids[$i] : $tids[$i],
          '#attributes' => array(
            'class' => array('filter-select'),
          ),
        );
      }
    }

    $module_path = drupal_get_path('module', 'views_hst_filter');
    drupal_add_js($module_path . '/js/views_hst_filter.min.js');
    drupal_add_css($module_path . '/css/views_hst_filter.css');

    // Некоторые нужные скрипту настройки и опции, которые скрипт отправит
    // на сервер - они нужны будут для запроса.
    $settings = array(
      'views_hst_filter' => array(
        $widget_id => array(
          'vid' => $this->options['vid'],
          'nodeCounter' => $this->options['nodes_counter'],
          'hideEmpty' => $this->options['hide_empty_terms'],
        ),
      ),
    );

    drupal_add_js($settings, 'setting');

    $filters = array_keys($form['#info']);
    $num = 0;
    foreach ($filters as $filter) {
      if (FALSE !== strpos($filter, $this->field)) {
        $num++;
      }
    }
    $filter_id = $this->field;
    if ($num > 0) {
      $filter_id .= '_' . $num;
    }
    $form['#info']['filter-' . $filter_id] = array(
      'operator' => '',
      'value' => $widget_id,
      'label' => check_plain($this->options['expose']['label']),
    );
  }

  /**
   * Use 'validate' instead 'submit for case first form load
   * the query can process value 'All'.
   * Otherwise the query will be without DISTINCT
   * and it will be have double records.
   */
  function exposed_validate(&$form, &$form_state) {
    // If the vocabulary don't exist (may be in preview mode).
    if (FALSE == taxonomy_vocabulary_load($this->options['vid'])) {
      return;
    }

    $tids = $this->get_current_tids($form_state);
    if (empty($tids)) {
      return;
    }
    if ('All' == $tids[0]) {
      $this->value = array('All');
      return;
    }
    else {
      $last_index = count($tids) - 1;
      if ('All' == $tids[$last_index]) {
        $this->value = $this->get_term_child($tids[$last_index - 1]);
      }
      else {
        $this->value = array($tids[$last_index]);
      }
    }
  }

  /**
   * Add this filter to the query.
   */
  function query() {
    // First select has a special value 'All' (don't need in condition).
    // That avoid double records we are adding DISTINCT to query.
    if (1 == count($this->value) && !$this->is_valid_tid($this->value[0])) {
      $this->query->set_distinct(TRUE);
    }
    else {
      $this->query->set_distinct(TRUE);

      $nids = db_select('taxonomy_index', 'ti')->fields('ti', array('nid'))
              ->condition('ti.tid', $this->value, 'IN')->execute()->fetchCol();
      $this->query->add_where($this->options['group'], "node.nid", $nids, 'IN');
    }
  }

  /**
   * Check that argument is valid tid.
   *
   * @param int $tid
   *   Checked variable.
   *
   * @return boolean
   *   Whether $tid is a valid term.
   */
  function is_valid_tid($tid) {
    return (!is_null($tid) && 'All' != $tid);
  }

  /**
   * Get all children tids for the term which specified in argument.
   *
   * @param int $tid
   *   The term's tid.
   *
   * @return array
   *   The list of children tids.
   */
  function get_term_child($tid) {
    $tids = array();
    if (isset($tid)) {
      // Get all children.
      $child_tids = taxonomy_get_tree($this->options['vid'], $tid);

      if (0 < count($child_tids)) {
        // Make the list of tid's.
        foreach ($child_tids as $term) {
          $tids[] = $term->tid;
        }
      }
      // Term himself.
      $tids[] = $tid;
    }

    return $tids;
  }

  /**
   * Get a list values from 0 to max depth in vocabulary.
   *
   * @return
   *   The list values from 0 to max depth in vocabulary.
   */
  function get_vocabulary_levels() {
    $tree = taxonomy_get_tree($this->options['vid']);
    $max_depth = 0;
    foreach ($tree as $term) {
      if ($max_depth < $term->depth) {
        $max_depth = $term->depth;
      }
    }

    return range(0, $max_depth);
  }

  /**
   * Build unique id for widget.
   *
   * @return string
   *   Unique string for current widget.
   */
  function build_widget_id() {
    $widget_id = $this->view->name . '_' .
        $this->view->current_display . '_' .
        'hst_filter_' .
        $this->options['vid'];
    return str_replace('_', '-', $widget_id);
  }

  function get_current_tids($form_state) {
    $widget_id = $this->build_widget_id();
    $storage = $widget_id . '-tid';
    if (isset($form_state['input'][$storage])) {
      $str_tids = $form_state['input'][$storage];
      return array_filter(explode(',', $str_tids));
    }
    else {
      return array();
    }
  }
}

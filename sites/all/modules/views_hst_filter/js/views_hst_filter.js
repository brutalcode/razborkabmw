(function($) {
  // Класс обработки селектов в одном фильтре (их может быть несколько).
  //
  // Мы учитываем родительские div'ы select'ов (при создании новых и
  // првязке к существующим )только потому,
  // что в момент создания формы на серверной стороны мы должны
  // инициализировать уже существующий набор селектов (после обновления
  // страницы при применении фильтра). На стороне сервера в форму добавляются
  // поля типа 'select', а они имеют обертки из div'ов.
  var filterWidget = function(widgetId, settings) {
    var $widget = $('#' + widgetId);
    var $valueInput = $('#tid-' + widgetId);
    var thisWidget = this;

    /**
     *  Добавляем новый селект и вешаем на него обработчик.
     *  Если $currentSelect null - только вешаем обработчик.
     *
     *  @param $currentSelect
     *    селект для добавления обработчки на изменение. Может быть null,
     *    в этом случае на форму добавляется новый селект по данным data.
     *  @param data
     *    массив значений для добавляемого селекта. Учитывается только если
     *    $currentSelect == null (то есть на форму добавляетя новый селект).
     *  @return
     *    новый селект если $currentSelect == null, в противном случае - $currentSelect.
     */
    this.addSelect = function($currentSelect, data) {
      // Уже существующий селект.
      var $newSelect = $currentSelect;

      // Добавляемый.
      if (null == $currentSelect) {
        var newSelect = '<div class="form-item form-type-select"><select class="form-select" autocomplete="off">';
        $.each(data, function(id, name) {
          newSelect += '<option value="' + id + '">' + name + '</option>';
        });
        newSelect += '</select></div>';
        $newSelect = $(newSelect).appendTo($widget);
        // Принудительно заставляем пользователя выбрать.
        // Особенно это важно при первом запросе страницы, когда
        // браузер может оставить какие-то значения в поле.
        $newSelect.find('select').once().val('All');
      }

      $('select', $newSelect).change(function(event) {
        thisWidget.getSelectedValues();
        thisWidget.ajaxQuery($(this));
      });

      return $newSelect;
    };

    /**
     *  Запрос дочерних для выбранного в $select терминов с сервера
     *  и обработка результата.
     *
     *  @param $select
     *    селект, в котором выбран родительский термин.
     */
    this.ajaxQuery = function($select) {
      // Может быть либо tid термина, либо специальное значение 'All';
      // К tid'у мы ранее добавили строку '0', поэтому сейчас возвращаем
      // его в нормальное, числовое, представление. 'All' даст строку в любом
      // случае, потому результат будет пустым массивом и следующий селект
      // на форму не добавится.
      var tid = parseInt($select.val(), 10);

      $.ajax({
        url: Drupal.settings.basePath + 'ajax/views_hst_filter',
        type: 'post',
        async: false,
        data: {
          vid: settings.vid,
          tid: tid,
          nodeCounter: settings.nodeCounter,
          hideEmpty: settings.hideEmpty
        },
        beforeSend: function(jqXHR, settings) {
          $select.vhfAddAjaxIndicator();
        },
        complete: function(jqXHR, textStatus) {
          $select.vhfRemoveAjaxInidcator();
        },
        success: function(data, textStatus) {
          // Убираем следующие селекты
          $select.parent().nextAll('div').remove();
          // и добавляем новый только если его есть чем заполнить.
          if (!$.isEmptyObject(data)) {
            thisWidget.addSelect(null, data);
            Drupal.attachBehaviors();
          }
          thisWidget.getSelectedValues();
        }
      });
    };

    // Собираем всю цепочку. Это нужно для инициализации селектов после
    // обновления страницы.
    this.getSelectedValues = function() {
      var strValues = '';
      $widget.find('select').map(function(index, select) {
        // Может быть либо tid термина, либо специальное значение 'All';
        // К tid'у мы ранее добавили строку '0', поэтому сейчас возвращаем
        // его в нормальное, числовое, представление.
        var val = $(select).val();
        strValues += ('All' === val) ? val : parseInt(val, 10);
        strValues += ',';
      });
      $valueInput.val(strValues);
    };

    // Вешаем событие изменения на существующие селекты.
    $widget.find('select').each(function(index, select) {
      thisWidget.addSelect($(select).parent(), null);
    });

    thisWidget.getSelectedValues();
  };
  // Добавление индикатора к элементу.
  $.fn.vhfAddAjaxIndicator = function() {
    $('<div class="ajax-loading"></div>')
    .insertBefore(this)
    .css({
      top: this.position().top,
      left: this.position().left - 20
    });
    return this;
  };
  // Удаление индикатора (для симметричности с добавлением).
  $.fn.vhfRemoveAjaxInidcator = function() {
    this.prevAll('.ajax-loading').remove();
    return this;
  };
  Drupal.behaviors.viewsHstFilter = {
    attach: function(context, settings) {
      // Наших фильтров на форме может быть несколько - для каждого свой
      // обработчик.
      $.each(settings.views_hst_filter, function(widgetId, widgetSettings) {
        new filterWidget(widgetId, widgetSettings);
      });
    }
  };
})(jQuery);

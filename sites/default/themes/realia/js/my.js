/*------------------------------------------------------------------------
# OrenMode
# ------------------------------------------------------------------------
# HTML5 by MegaDrupal
# Websites:  http://www.megadrupal.com -  Email: info@megadrupal.com
--------------------------------------------------------------------------*/
jQuery(document).ready(function ($) {
    "use strict";
    
    /*$("#edit_field_marks_tid_chzn a span").html("Марка");
    $("#edit_field_model_tid_chzn a span").html("Модель");
    $("#edit_field_model_audi_tid_chzn a span").html("Модель");
    $("#edit_field_model_mercedes_benz_tid_chzn a span").html("Модель");
    $("#edit_field_model_opel_tid_chzn a span").html("Модель");
    $("#edit_field_model_volkswagen_tid_chzn a span").html("Модель");
    $("#edit_field_pocolenie_tid_chzn a span").html("Поколение");
    $("#edit_field_category_tid_chzn a span").html("Категория");
    $("#edit_field_detal_tid_chzn a span").html("Деталь");*/
    
    /*Перевод*/

    $(".page-list-row-filter h1.page-header").html("Детали");
    $(".chzn-results li:first-child").html("Любое");
    $(".region-navigation #block-multiblock-4 button").html("");
    $(".not-found h1").html("Страница не найдена");
    $(".not-found p").html("Пожалуйста воспользуйтесь поиском или <a href='/'>вернитесь на главную</a>");

    /*Вставка ссылок в футер*/

    $("#footer-top #block-block-2 .block-title").html("<a href='about-us'>О нас</a>");
    $("#footer-top #block-block-3 .block-title").html("<a href='contacts'>Контакты</a>");
    
    /*Подмена названий*/

    if ($(".views-widget-filter-views_hst_filter .form-item:first-child a span").html()=="Любое") {
        $(".views-widget-filter-views_hst_filter .form-item:first-child a span").html("Марка");
    }
    if ($(".views-widget-filter-views_hst_filter_1 .form-item:first-child a span").html()=="Любое") {
        $(".views-widget-filter-views_hst_filter_1 .form-item:first-child a span").html("Категория");
    }

    /*Создаем работоспособный фильтр категорий деталей на странице выдачи*/

    $('.region-sidebar-second .views-widget-filter-views_hst_filter_1').remove();
    $('.region-sidebar-second .views-exposed-widgets').prepend( $('#edit-apartments-listing-row-filtered-hst-filter-10-wrapper') );

/*
    if ($('.ico-speed').html() == '<span class="label">Пробег:</span> 1 km') {
       $('.ico-speed').html('<span class="label">Пробег:</span> Не указан') 
    }*/

    var displayProbeg = $('.ico-speed');
    for (var i = 0; i < displayProbeg.length; i++) {

        if (displayProbeg[i].innerHTML ==  '<span class="label">Пробег:</span> 1 km'){
            displayProbeg[i].innerHTML = '<span class="label">Пробег:</span> Не указан';
        }
        /*if (displayProbeg[i].innerHTML ==  '<span class="label">Пробег:</span> 0 km'){
            displayProbeg[i].innerHTML = '<span class="label">Пробег:</span> Деталь новая';
        }*/
    }
    var displayProbegNode = $('.field-name-field-probeg .field-item');
    for (var i = 0; i < displayProbegNode.length; i++) {

        if (displayProbegNode[i].innerHTML ==  '1 km'){
            displayProbegNode[i].innerHTML = 'Не указан';
        }
        /*if (displayProbeg[i].innerHTML ==  '<span class="label">Пробег:</span> 0 km'){
            displayProbeg[i].innerHTML = '<span class="label">Пробег:</span> Деталь новая';
        }*/
    }



    /*var valueProbeg = $('.ico-speed').html();
    console.log(valueProbeg == '<span class="label">Пробег:</span> 1 km');*/
    /*if ($("#edit_field_model_tid_chzn a span").html()=="Любое") {
        $("#edit_field_model_tid_chzn a span").html("Модель");
    }
    if ($("#edit_field_model_audi_tid_chzn a span").html()=="Любое") {
        $("#edit_field_model_audi_tid_chzn a span").html("Модель");
    }
    if ($("#edit_field_model_mercedes_benz_tid_chzn a span").html()=="Любое") {
        $("#edit_field_model_mercedes_benz_tid_chzn a span").html("Модель");
    }
    if ($("#edit_field_model_opel_tid_chzn a span").html()=="Любое") {
        $("#edit_field_model_opel_tid_chzn a span").html("Модель");
    }
    if ($("#edit_field_model_volkswagen_tid_chzn a span").html()=="Любое") {
        $("#edit_field_model_volkswagen_tid_chzn a span").html("Модель");
    }
    if ($("#edit_field_pocolenie_tid_chzn a span").html()=="Любое") {
        $("#edit_field_pocolenie_tid_chzn a span").html("Поколение");
    }
    if ($("#edit_field_category_tid_chzn a span").html()=="Любое") {
        $("#edit_field_category_tid_chzn a span").html("Категория");
    }
    if ($("#edit_field_detal_tid_chzn a span").html()=="Любое") {
        $("#edit_field_detal_tid_chzn a span").html("Деталь");
    }*/

    /*$('.front #edit_field_marks_tid_chzn .active-result').click(function () {
    	$(".front #block-multiblock-3").css("margin-left", "-400px");
    });*/

    /*Объединение кнопок поиска фильтра*/

    $(".block-multiblock-4 #edit-submit-apartments").click(function () {
        $(".region-sidebar-second .form-submit").click();
        return false;
    });

    /*Работа с фильторм в навигации (последовательынй выбор)*/
    

    /*for (var i = 0, k = 0; i < fieldmodel.length; i++) {
        if (fieldmodel[i].style.display=="none") k++;
        if (k == fieldmodel.length) {
            $("#edit-field-model-tid-wrapper").addClass("block-important chzn-disabled");
            $("#edit-field-pocolenie-tid-wrapper").addClass("block-important chzn-disabled");
        }
    }

    for (var i = 0, k = 0; i < fieldpocol.length; i++) {
        if (fieldpocol[i].style.display=="none") k++;
        if (k == fieldpocol.length) {
            $("#edit-field-pocolenie-tid-wrapper").addClass("block-important chzn-disabled");
        }
    }*/

    /*var htmlPocolenieField = '<div id="pseudopocol" class="views-exposed-widget views-widget-filter-field_pseudomodel_tid dependent-options" style="display:none"><label for="edit-field-pseudomodel-tid">Модель</label><div class="views-widget"><div class="form-item form-type-select form-item-field-pseudomodel-tid"><select id="edit-field-pseudomodel-tid" name="field_pseudomodel_tid" class="form-select chzn-done" style="display: none;"><option value="All" selected="selected">Любое</option><option value="59">1er</option><option value="95">4er</option><option value="83">3er</option><option value="84">5er</option><option value="85">6er</option><option value="86">7er</option></select><div id="edit_field_pseudomodel_tid_chzn" class="chzn-container chzn-container-single chzn-container-single-nosearch" style="width: 234px;" title=""><a href="javascript:void(0)" class="chzn-single" tabindex="-1"><span>Поколение</span><div><b></b></div></a><div class="chzn-drop" style="left: -9000px; width: 114px; top: 29px;"><div class="chzn-search"><input type="text" autocomplete="off" style="width: 79px;"></div><ul class="chzn-results"><li id="edit_field_pseudomodel_tid_chzn_o_0" class="active-result result-selected" style="">Любое</li></ul></div></div></div></div></div>';
    $('.region-navigation #block-multiblock-4 .views-exposed-widgets #edit-field-category-tid-wrapper').after(htmlPocolenieField);
    $('#block-multiblock-3 .views-exposed-widgets #edit-field-category-tid-wrapper').before(htmlPocolenieField);

    var htmlModelField = '<div id="pseudomodel" class="views-exposed-widget views-widget-filter-field_pseudomodel_tid dependent-options" style="display:none"><label for="edit-field-pseudomodel-tid">Модель</label><div class="views-widget"><div class="form-item form-type-select form-item-field-pseudomodel-tid"><select id="edit-field-pseudomodel-tid" name="field_pseudomodel_tid" class="form-select chzn-done" style="display: none;"><option value="All" selected="selected">Любое</option><option value="59">1er</option><option value="95">4er</option><option value="83">3er</option><option value="84">5er</option><option value="85">6er</option><option value="86">7er</option></select><div id="edit_field_pseudomodel_tid_chzn" class="chzn-container chzn-container-single chzn-container-single-nosearch" style="width: 234px;" title=""><a href="javascript:void(0)" class="chzn-single" tabindex="-1"><span>Модель</span><div><b></b></div></a><div class="chzn-drop" style="left: -9000px; width: 114px; top: 29px;"><div class="chzn-search"><input type="text" autocomplete="off" style="width: 79px;"></div><ul class="chzn-results"><li id="edit_field_pseudomodel_tid_chzn_o_0" class="active-result result-selected" style="">Любое</li></ul></div></div></div></div></div>';
    $('.region-navigation #block-multiblock-4 .views-exposed-widgets #edit-field-category-tid-wrapper').after(htmlModelField);
    $('#block-multiblock-3 .views-exposed-widgets #edit-field-category-tid-wrapper').before(htmlModelField);
    
    function filterFieldDisabled() {

        var fieldmodel = $("[id^='block-multiblock'] div[id^='edit-field-model']");
        var fieldpocol = $("[id^='block-multiblock'] div[id^='edit-field-pocolenie']");

        
        
        $("#pseudomodel").removeClass("block-important chzn-disabled");
        $("#pseudopocol").removeClass("block-important chzn-disabled");
        $("[id^='edit-field-pocolenie']").css('position','static');

        for (var i = 0, k = 0; i < fieldmodel.length; i++) {
            if (fieldmodel[i].style.display=="none") k++;
            if (k == fieldmodel.length) {
                $("#pseudomodel").addClass("block-important chzn-disabled");
                $("#pseudopocol").addClass("block-important chzn-disabled");
                $("[id^='edit-field-pocolenie']").css('position','absolute');
                $("[id^='edit-field-pocolenie']").css('left','-1000px');
                $('div[id^="edit-field-model"] select option:first-child').attr('selected','selected');
                $('div[id^="edit-field-model"] a span').html('Любое');
                $('div[id^="edit-field-model"] .chzn-results li').removeClass('result-selected');
                $('div[id^="edit-field-model"] .chzn-results li').removeClass('highlighted');
                $('div[id^="edit-field-model"] .chzn-results li:first-child').addClass('result-selected');

            }
        }

        for (var i = 0, k = 0; i < fieldpocol.length; i++) {
            if (fieldpocol[i].style.display=="none") k++;
            console.log(k);
            if (k == fieldpocol.length) {
                $("#pseudopocol").addClass("block-important chzn-disabled");
            }
        }
    }
    filterFieldDisabled();*/

    /*Выравнивание фиьлтра по центру на главной странице*/

    /*$('#edit-field-marks-tid-wrapper').click(filterFieldDisabled);
    $('div[id^="edit-field-model"]').click(filterFieldDisabled);*/

    
    /*if ($("#edit-field-marks-tid-wrapper .chzn-results li:first-child").hasClass("result-selected")) {
        $("#edit-field-model-tid-wrapper").addClass("block-important chzn-disabled");
        $("#edit-field-pocolenie-tid-wrapper").addClass("block-important chzn-disabled");
    }

    var fieldmodel = $(".regio[id^="edit-field-model"]");
    var dispmodel;
    for (var i = 0, k = 0; i < fieldmodel.length; i++) {
        if (!(fieldmodel[i].style.display=="none")) dispmodel = fieldmodel[i];
    }
    console.log(dispmodel.id);

    $("#edit-field-marks-tid-wrapper .chzn-results li").click(function () {
        if ($("#edit-field-marks-tid-wrapper .chzn-results li:first-child").hasClass("result-selected")) {
            $("#edit-field-model-tid-wrapper").addClass("block-important chzn-disabled");
            $("#edit-field-pocolenie-tid-wrapper").addClass("block-important chzn-disabled");
        } else {
            $("#edit-field-model-tid-wrapper").removeClass("block-important chzn-disabled");
        };
    });*/
    
    /*var filterFields = $('.region-navigation .views-hst-filter div.form-item');

    console.log(filterFields.length);*/

    /*-------------------------------------------------------------------------------------------*/
    /*Работающий фильтр на ajax*/
    /*-------------------------------------------------------------------------------------------*/

    var htmlPocolField = '<div id="pseudopocol" class="views-exposed-widget views-widget-filter-field_pseudomodel_tid dependent-options" style="display:none"><label for="edit-field-pseudomodel-tid">Модель</label><div class="views-widget"><div class="form-item form-type-select form-item-field-pseudomodel-tid"><select id="edit-field-pseudomodel-tid" name="field_pseudomodel_tid" class="form-select chzn-done" style="display: none;"><option value="All" selected="selected">Любое</option><option value="59">1er</option><option value="95">4er</option><option value="83">3er</option><option value="84">5er</option><option value="85">6er</option><option value="86">7er</option></select><div id="edit_field_pseudomodel_tid_chzn" class="chzn-container chzn-container-single chzn-container-single-nosearch" style="width: 234px;" title=""><a href="javascript:void(0)" class="chzn-single" tabindex="-1"><span>Поколение</span><div><b></b></div></a><div class="chzn-drop" style="left: -9000px; width: 114px; top: 29px;"><div class="chzn-search"><input type="text" autocomplete="off" style="width: 79px;"></div><ul class="chzn-results"><li id="edit_field_pseudomodel_tid_chzn_o_0" class="active-result result-selected" style="">Любое</li></ul></div></div></div></div></div>';
    $('[id^="block-multiblock"] .views-widget-filter-views_hst_filter').after(htmlPocolField);
    
    var htmlModField = '<div id="pseudomodel" class="views-exposed-widget views-widget-filter-field_pseudomodel_tid dependent-options" style="display:none"><label for="edit-field-pseudomodel-tid">Модель</label><div class="views-widget"><div class="form-item form-type-select form-item-field-pseudomodel-tid"><select id="edit-field-pseudomodel-tid" name="field_pseudomodel_tid" class="form-select chzn-done" style="display: none;"><option value="All" selected="selected">Любое</option><option value="59">1er</option><option value="95">4er</option><option value="83">3er</option><option value="84">5er</option><option value="85">6er</option><option value="86">7er</option></select><div id="edit_field_pseudomodel_tid_chzn" class="chzn-container chzn-container-single chzn-container-single-nosearch" style="width: 234px;" title=""><a href="javascript:void(0)" class="chzn-single" tabindex="-1"><span>Модель</span><div><b></b></div></a><div class="chzn-drop" style="left: -9000px; width: 114px; top: 29px;"><div class="chzn-search"><input type="text" autocomplete="off" style="width: 79px;"></div><ul class="chzn-results"><li id="edit_field_pseudomodel_tid_chzn_o_0" class="active-result result-selected" style="">Любое</li></ul></div></div></div></div></div>';
    $('[id^="block-multiblock"] .views-widget-filter-views_hst_filter').after(htmlModField);

    var htmlCatField = '<div id="pseudocat" class="views-exposed-widget views-widget-filter-field_pseudomodel_tid dependent-options" style="display:none"><div class="views-widget"><div class="form-item form-type-select form-item-field-pseudomodel-tid"><div id="edit_field_pseudomodel_tid_chzn" class="chzn-container chzn-container-single chzn-container-single-nosearch" style="width: 234px;" title=""><a href="javascript:void(0)" class="chzn-single" tabindex="-1"><span>Деталь</span><div><b></b></div></a><div class="chzn-drop" style="left: -9000px; width: 114px; top: 29px;"><div class="chzn-search"><input type="text" autocomplete="off" style="width: 79px;"></div><ul class="chzn-results"><li id="edit_field_pseudomodel_tid_chzn_o_0" class="active-result result-selected" style="">Любое</li></ul></div></div></div></div></div>';
    $('.views-widget-filter-views_hst_filter_1').after(htmlCatField);
    
    function filterPseudoFields () {

        var filterFields = $('[id^="block-multiblock"] #apartments-listing-row-filtered-hst-filter-13.views-hst-filter div.form-item');

        $("#pseudomodel").removeClass("block-important");
        $("#pseudopocol").removeClass("block-important");

        if (filterFields.length == 1) {
            $("#pseudomodel").addClass("block-important chzn-disabled");
            $("#pseudopocol").addClass("block-important chzn-disabled");
        }

        if (filterFields.length == 2) {
            $("#pseudopocol").addClass("block-important chzn-disabled");
        }
    }
    function filterPseudoCatFields () {

        var filterFields = $('#apartments-listing-row-filtered-hst-filter-10.views-hst-filter div.form-item');
        console.log(filterFields.length);

        $("#pseudocat").removeClass("block-important");

        if (filterFields.length == 1) {
            $("#pseudocat").addClass("block-important");
            $("#pseudocat .chzn-container").addClass("chzn-disabled");
        }
    }
    filterPseudoFields();
    filterPseudoCatFields();

    $('#apartments-listing-row-filtered-hst-filter-13.views-hst-filter').click(filterPseudoFields);
    $('#apartments-listing-row-filtered-hst-filter-10.views-hst-filter').click(filterPseudoCatFields);
// ---------------------------------------------------------------------------------------------------------------------------
    var filterwidth = $(".front #block-multiblock-3").width();
    $(".front #block-multiblock-3").css("margin-left", -(filterwidth/2+20)+"px");

    $('.front .views-exposed-widgets').click(function () {
         var filterwidth = $(".front #block-multiblock-3").width();
        $(".front #block-multiblock-3").css("margin-left", -(filterwidth/2+20)+"px");
    })

    /*Создаем affix еффект блоку*/

    console.log($('#block-views-agent-block').offset().top);
    console.log($(window).width());

    /*$('#block-views-agent-block').affix({
        offset: {
          top: function () {
                    if ($(window).width() <= '979') {
                        var oldTop = $('#block-views-agent-block').offset().top;
                        var top = 120 + oldTop;
                        console.log(top);
                        return (this.top = top);
                    } else {
                        return ( this.top = $('#block-views-agent-block').offset().top + 20);
                    }
                }
        , bottom: function () {
            return (this.bottom = $('#footer-wrapper').outerHeight(true))
          }
        }
      })*/

    function myAffix() {
        $('#block-views-agent-block').affix({
            offset: {
              top: function () {
                        if ($(window).width() <= '979') {
                            var oldTop = $('#block-views-agent-block .view-agent .views-row-2 .views-field-title').offset().top;
                            var top = oldTop - 50;
                            console.log('top');
                            return (this.top = top);
                        } else {
                            return ( this.top = $('#block-views-agent-block').offset().top+20);
                        }
                    }
            , bottom: function () {
                return (this.bottom = $('#footer-wrapper').outerHeight(true))
              }
            }
        })
    }
    myAffix();
    /*
    $(window).load(myAffix);*/
    function newAffixOffset (){
        var resizeOffsetTop = $('#block-views-apartments-block-1').offset().top + $('#block-views-apartments-block-1').height(); 
        var resizeOffsetBottom = $('#footer-wrapper').outerHeight(true);
        var top; 
        if ($(window).width() <= '979') {
            $('#block-views-agent-block').data('bs.affix').options.offset.top = resizeOffsetTop;
        } else {
            $('#block-views-agent-block').data('bs.affix').options.offset.top = resizeOffsetTop;
        }
        console.log(resizeOffsetBottom)
        $('#block-views-agent-block').data('bs.affix').options.offset.bottom = resizeOffsetBottom;
    }

    $(window).resize(newAffixOffset);

});


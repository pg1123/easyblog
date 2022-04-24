layui.config({
    base: cxtheme.themedir+'/js/extend/' 
  }).extend({
      owl : 'owl.carousel',
      stickySidebar : 'stickySidebar',
    //stickySidebar: 'stickySidebar'
    //,Comments: 'Comments'
    //,flowold: 'flowold'
    //,qrcode: 'qrcode'
});

layui.use(['element','jquery','util'], function(){
    var $       = layui.jquery,
        util    = layui.util,
        jQuery  = $,
        element = layui.element;
  
    //执行
    util.fixbar({
        bar1: false,
        css: {bottom: 55},
        bgcolor:'#282b35',
    });

    if( $('.owl-carousel').length > 0 ){
        layui.use(['owl'],function(){
            $('.owl-carousel').owlCarousel({
                items: 1,
                margin: 10,
                //animateOut: 'fadeOut',
                loop:true,
                autoplay:true,
                autoplayTimeout:3000,
                autoplayHoverPause:true,
                autoHeight: true
            });
        });
    }

    //stickySidebar
    if( $('#float-sidebar').length > 0 && ! $('#float-sidebar').is(':hidden') ){
        layui.use(['stickySidebar'], function(){
            $('#float-sidebar').theiaStickySidebar();
        });
    }

    $('.cxajax-action-js').click(function(){
        var _this = $(this);
        if( _this.hasClass('.cxajax-loading') ) return false;
        _this.addClass('cxajax-loading');
        if( _this.hasClass('cxajax-on') ){
            alert('您已经对该文章标记了喜欢！');
            return false;
        }

        $.get(
            cxtheme.ajaxurl,
            _this.data(),
            function(res){
                if( res.start == 'ok' ){
                    _this.children('span').text('已喜欢');
                    _this.addClass('cxajax-on');
                }else{
                    alert(res.msg);
                }   
                _this.removeClass('cxajax-loading');             
            },
        'json');
    });

    $('.multi-xsmenu-js').click(function(){
        var _this  = $(this),
            _menu  = $('.multi-xs-menu-data');
        _menu.show(0,function(){
            _menu.children('.layui-nav').addClass('multi-transform-show');
        });

        $('.menu-data-bg').click( function(){
            _menu.children('.layui-nav').removeClass('multi-transform-show');
            _menu.hide();
        });
    });

    $('.multi-xssearch-js').click(function(){
        var _this   = $(this),
            _search = $('.multi-xs-search-data');
        _search.show();
    });
    $('.popsearch-close').click(function(){
        var _search = $('.multi-xs-search-data');
        _search.hide();
    });
});
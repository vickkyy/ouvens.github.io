;
(function() {
    function getParam(par) {
        var search = document.location.href;
        var get = search.indexOf(par + "=");
        if (get == -1) {
            return false;
        }
        var params = search.slice(par.length + get + 1);
        var nextPar = params.indexOf("&");
        if (nextPar != -1) {
            params = params.slice(0, nextPar);
        }
        return decodeURIComponent(params) || "";
    }

    /**
     * 获取文章分类
     * @type {[type]}
     */
    var keywords = getParam('cate') && getParam('cate').toLowerCase();

    var $category = $('.post-content');
    if (keywords) {
        $category.find('.category').hide();
        $category.find('.category[data-cate=' + keywords + ']').show();
        $('.post-header .post-title').text(keywords);
    } else {
        $category.find('.category').show();
        $('.post-header .post-title').text('所有文章');
    }

    /**
     * 获取标签分类
     * @type {[type]}
     */
    var tagKeywords = getParam('tag') && getParam('tag').toLowerCase();
    var $tag = $('.post-content');
    if (tagKeywords) {
        $tag.find('.tag').hide();
        $tag.find('.tag[data-tag=' + tagKeywords + ']').show();
        $('.post-header .post-title').text(tagKeywords);
    } else {
        $tag.find('.tag').show();
        $('.post-header .post-title').text('所有标签');
    }

    function loadJS(urlMap, fn) {
        setTimeout(function() {
            for (var key in urlMap) {
                var script = document.createElement('script');
                script.src = urlMap[key];
                script.setAttribute('data', key);
                script.onload = function() {
                    fn();
                };
                document.body.appendChild(script);
            }
        }, 400);
    }
    loadJS({
        'highlight': 'http://cdnjs.cloudflare.com/ajax/libs/highlight.js/8.5/highlight.min.js',
        'lightbox': 'http://cdnjs.cloudflare.com/ajax/libs/lightbox2/2.7.1/js/lightbox.min.js'
    }, function() {

        if (!window.hljs) {
            return;
        }

        window.hljs && hljs.initHighlightingOnLoad();

        var menuToggle = $('#js-mobile-menu').unbind();
        $('#js-navigation-menu').removeClass("show");
        menuToggle.on('click', function(e) {
            e.preventDefault();
            $('#js-navigation-menu').slideToggle(function() {
                if ($('#js-navigation-menu').is(':hidden')) {
                    $('#js-navigation-menu').removeAttr('style');
                }
            });
        });
    });
})();
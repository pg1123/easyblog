/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you import will output into a single css file (app.css in this case)
//import './styles/app.scss';
import './static/app.scss';

// start the Stimulus application
import './bootstrap';

// require jQuery normally
const $ = require('jquery');


require('./static/image/light_noise_diagonal.png');


// import 'bootstrap';
// import 'lightbox2';

//index
//import './static/js/jquery.js';
import './static/js/jquery-migrate.min.js';
// import './static/js/jquery.min.js';
import './static/js/bootstrap.min.js';
import './static/js/jquery.lazyload.js';
import './static/js/jquery.magnific-popup.js';
import './static/js/9iphp.js';
import './static/js/fixed-top.js';

//article
import './static/js/single.js';
import './static/js/wp-embed.min.js';


const routes = require('../public/js/fos_js_routes.json');
import Routing from '../vendor/friendsofsymfony/jsrouting-bundle/Resources/public/js/router.min.js';

Routing.setRoutingData(routes);

$(document).ready(function(){
    $('button.js-reply-comment-btn').on('click', function (element) {
        let postId = $(this).data('post-id');
        let parentId = $(this).data('parent-id');
        if ($(this).nextAll('p.max-level-info').length === 1){
            return;
        }
        if($(this).nextAll('div.reply-comment-card').length === 0){
            $.ajax({
                url: Routing.generate('reply_comment', {post_id: postId, comment_id: parentId}),
                type: 'POST'
            }).done(function (response){
                $(element.target).after(response)
            }).fail(function (jqXHR){

            })
        }
    })

    // $('button.js-add-file-row-btn').on('click', function (element) {
    //     //查询input-wrapper DOM
    //     var fileInputWrapper = $(element.target).closest('fieldset.form-group').find('div.input-row-wrapper');
    //     //获取当前input行计数
    //     var inputCount = fileInputWrapper.children().length;
    //     //获取input prototype并进行序号修改
    //     var inputCode = fileInputWrapper.data('prototype');
    //     inputCode = inputCode.replace(/__name__/g, inputCount);
    //
    //     fileInputWrapper.append(inputCode);
    // })

    window.fixFileInputName = function (element) {
        let fileName = $(element).val().split('\\').pop();
        $(element).next('.custom-file-label').html(fileName);
    }

    window.addFileUpload = function (element) {
        //查询input-wrapper DOM
        var fileInputWrapper = $(element).closest('fieldset.form-group').find('div.input-row-wrapper');
        //获取当前input行计数
        var inputCount = fileInputWrapper.children().length;
        //获取input prototype并进行序号修改
        var inputCode = fileInputWrapper.data('prototype');
        inputCode = inputCode.replace(/__name__/g, inputCount);

        fileInputWrapper.append(inputCode);
    }
})
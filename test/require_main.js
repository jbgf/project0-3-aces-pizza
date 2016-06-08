/**
 * Created by Administrator on 2016/2/5.
 */
requirejs.config({
    paths: {
        'returnButton'  : 'returnButton'


    },
    shim: {
        returnButton: {
            deps: [

                '../javascript/my_js'

            ]
        }
    }
});
requirejs(['returnButton'],function(returnButton){

})
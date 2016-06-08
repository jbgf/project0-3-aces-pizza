/**
 * Created by Administrator on 2016/2/5.
 */
define(function(){

    $(function(){
        var returnButton= function(){

            $('.idTabs a').click(function(){
                    var stateObj = {
                        test : 'fuck'

                    };


                history.pushState(stateObj, "page 2", "fuck.html");
                alert('test')
            })



        }
        return {returnButton:returnButton()}
    })

})



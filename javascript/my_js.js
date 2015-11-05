//图片滚动栏列表，图片数num；图片索引picEq,图片定时器picTimer；获得聚焦的分页点的索引eqli
var num=5;
var picEq;
var picTimer;
var eqli=0;
var lastIndex;
var hoverEqli=-1;


//xml加载函数，引用ajaxReq；
function showMenu(type) {

    ajaxReq.send("GET", "../src/menu.xml", handleRequest(type));
}

// ajaxReq回调函数；
function handleRequest(type) {
    if (ajaxReq.getReadyState() == 4 && ajaxReq.getStatus() == 200) {              //第一次无反应；readystate==0；
        var xmlData = ajaxReq.getResponseXML();
        var bigType = ajaxReq.getResponseXML().getElementsByTagName(type)[0];

        // var smallType=xmlData.childNodes;
        var x = "";
        var small = "";
        var name="";
        var price="";
        var des="";
        var smallType=bigType.children;

        for (var i = 0; i <smallType.length; i++) {
            small="<p id='smallType'>"+bigType.getElementsByTagName(smallType[i].nodeName)[0].getAttribute("id") + "</p>";
            x+=small;
            var food=bigType.getElementsByTagName(smallType[i].nodeName)[0].getElementsByTagName("food");                            //!!**@@

            for(var j=0;j<food.length;j++){
               name="<p id='name'>"+food[j].getElementsByTagName("name")[0].firstChild.nodeValue+"</p>";
                x+=name;
                var  priceNodes=food[j].getElementsByTagName("price");
                for(var k=0;k<priceNodes.length;k++){
                    price="<p>"+priceNodes[k].childNodes[0].nodeValue+""+(priceNodes[k].hasAttributes()?priceNodes[k].getAttribute("size"):"")+"</p>"
                    x+=price;

                }
                if(food[j].getElementsByTagName("description").length!==0){                   //不存在不可用nodevalue！==0表示，没有des标签时出错
                   des="<p>"+food[j].getElementsByTagName("description")[0].firstChild.nodeValue+"</p>";
                    x+=des;
               }
                x+="<br/>"

            }
            x+="<br/>"

        }
        document.getElementById("menu").innerHTML = "<p>" + x + "</p>"


    }
}

$(document).ready(function(){

/*fun resetZindex函数，点击导航分页点
1、点击时获取图片的索引；2、停止定时器；3、将点击的图片设置为onShow；
4、根据所在的图层判断做出动作；3则不变；非3则淡入，其他.onRest淡出；移动图层；5、重新启动定时器
6、聚焦分页点 */
    function resetZindex(){
        var imgString;
        var zIndexCurrent;
        var circle;

        $("ul#nav-top>li").hover(
            function(){
                hoverEqli=$(this).index();
                if(hoverEqli!==eqli){

                circle=document.getElementById("circle"+hoverEqli);
                circle.setAttribute("r",1);                              //将svg元素半径设为1；
                circle.setAttribute("class","myCircleUp");

                }


            },
            function(){
                if(hoverEqli!==eqli){
                document.getElementById("circle"+hoverEqli).setAttribute("class","myCircleDown");
                }
                hoverEqli=-1;
            });


        $("ul#nav-top>li").click(function () {
                if(eqli!==hoverEqli){
                document.getElementById("circle"+eqli).setAttribute("class","myCircleDown");  //点击时，上一个svg元素设为myCircleDown类，应用css动画；
                }
                eqli=$(this).index();
                if(eqli!==hoverEqli) {
                tranLi(eqli);
                }

                var eqOnShow=relation(eqli);          //v eqOnShow点击的分页点对应的图片索引eq；
                zIndexCurrent=location(eqOnShow);                  //v 点击对应的图片当前的图层；
                imgString="#img-top"+eqOnShow;                   //v 图片的id；
                clearInterval(picTimer);


            $(imgString).attr("class","onShow");            //jquery选择器放入变量imgString；
            while(zIndexCurrent!==3){

                    $(imgString).fadeIn("slow");
                    $("ul img.onRest").fadeOut('slow')

                moveInd();
                zIndexCurrent= location(eqOnShow);
            }
               $(imgString).attr("class","onRest");
        timer(fade,5000);

        }
        )



    }

//fun 确定分页点eq和图片eq的数学关系；
    function relation(ind){
        if(ind!==4){
            picEq=3-ind;
        }else{
        picEq=4;
        }
        return picEq;

    }

/*fun 初始化图片滚动栏；
1\给列表5张图分别设置图层0-4；2\导航分页点，第一点设为liOn；
 */
    function zReset(){
        for(var i=0;i<num;i++){
            $("div#pic-top ul li").eq(i).css("z-index",i)
        }
        }

//fun 获取li图片所处的位置，设其为loc；
    function location(pic){
        var loc=$("div#pic-top ul li").eq(pic).css("z-index");
        return parseInt(loc);
    }

//fun1  移动z-index函数；顶层图片（即z-index为4）设为0层；其他+1层；
    function moveInd(){
        for(var i=0;i<num;i++){
            if(location(i)!==4){
                var z=location(i);                                                   //location返回的”z-index“是字符串，要转为num；
                $("div#pic-top ul li").eq(i).css("z-index",z+1)
            }else{
                $("div#pic-top ul li").eq(i).css("z-index",0);
            }
        }
    }

/*fun  //遍历发现location函数返回zindex为3层时fadeout； 移动调整图层；再遍历查找zindex为2的图层设置为可见inline；
聚焦分页点；*/

    function fade(){
        for(var i=0;i<num;i++) {
            if (location(i) == 3) {
                $("li:eq("+i+") img").fadeOut("slow");

               eqli=4-i;  //注意fadeout后到了对应li后面一格；
               tranLi(eqli)
            }
        }
        moveInd();
        for(var j=0;j<num;j++){
            if (location(j)==2){
                $("li:eq("+j+") img").show();               //or css("display","inline")
            }
        }


    }

//改变分页点的函数
    function tranLi(index){

        var circle=document.getElementById("circle"+index);

        var r=circle.getAttribute("r");

        circle.setAttribute("r",1);                              //将svg元素半径设为1；
        circle.setAttribute("class","myCircleUp");             //设置相应svg元素为.myCircleUp类；
        //将对应的li元素设为liOn类，应用相应的css动画；      $("ul#nav-top li").removeClass("liOn").eq(index).addClass("liOn");

        lastDot(index);

    }

//对上一个分页点的处理函数；
    function lastDot(index){
        if(index==0){                                              //将前一个svg元素设为myCircleDown类，应用css动画；
            lastIndex=4;
        }else{
            lastIndex=index-1;
        }
        if(lastIndex!==hoverEqli){
        document.getElementById("circle"+lastIndex).setAttribute("class","myCircleDown");
        }
    }

//fun 定时器循环函数；
    function timer(event,t){
     picTimer= setInterval(event,t)
    }


//调用函数部分——————————————————————————————————————————————————————————
       zReset();
       timer(fade,5000);
       resetZindex();




//调用函数——————————————————————————————————————————————————————————————————

//fun test 图层变化测试函数；
    function test(){
        var string="";
        var x=""
        for(var j=0;j<num;j++){
            string+="<P>"+j+":"+location(j)+"</p>"
        }
        document.getElementById("test").innerHTML=string;

    }
})










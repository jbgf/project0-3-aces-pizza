//ͼƬ�������б�ͼƬ��num��ͼƬ����picEq,ͼƬ��ʱ��picTimer����þ۽��ķ�ҳ�������eqli
var num=5;
var picEq;
var picTimer;
var eqli=0;
var lastIndex;
var hoverEqli=-1;


//xml���غ���������ajaxReq��
function showMenu(type) {

    ajaxReq.send("GET", "../src/menu.xml", handleRequest(type));
}

// ajaxReq�ص�������
function handleRequest(type) {
    if (ajaxReq.getReadyState() == 4 && ajaxReq.getStatus() == 200) {              //��һ���޷�Ӧ��readystate==0��
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
                if(food[j].getElementsByTagName("description").length!==0){                   //�����ڲ�����nodevalue��==0��ʾ��û��des��ǩʱ����
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

/*fun resetZindex���������������ҳ��
1�����ʱ��ȡͼƬ��������2��ֹͣ��ʱ����3���������ͼƬ����ΪonShow��
4���������ڵ�ͼ���ж�����������3�򲻱䣻��3���룬����.onRest�������ƶ�ͼ�㣻5������������ʱ��
6���۽���ҳ�� */
    function resetZindex(){
        var imgString;
        var zIndexCurrent;
        var circle;

        $("ul#nav-top>li").hover(
            function(){
                hoverEqli=$(this).index();
                if(hoverEqli!==eqli){

                circle=document.getElementById("circle"+hoverEqli);
                circle.setAttribute("r",1);                              //��svgԪ�ذ뾶��Ϊ1��
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
                document.getElementById("circle"+eqli).setAttribute("class","myCircleDown");  //���ʱ����һ��svgԪ����ΪmyCircleDown�࣬Ӧ��css������
                }
                eqli=$(this).index();
                if(eqli!==hoverEqli) {
                tranLi(eqli);
                }

                var eqOnShow=relation(eqli);          //v eqOnShow����ķ�ҳ���Ӧ��ͼƬ����eq��
                zIndexCurrent=location(eqOnShow);                  //v �����Ӧ��ͼƬ��ǰ��ͼ�㣻
                imgString="#img-top"+eqOnShow;                   //v ͼƬ��id��
                clearInterval(picTimer);


            $(imgString).attr("class","onShow");            //jqueryѡ�����������imgString��
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

//fun ȷ����ҳ��eq��ͼƬeq����ѧ��ϵ��
    function relation(ind){
        if(ind!==4){
            picEq=3-ind;
        }else{
        picEq=4;
        }
        return picEq;

    }

/*fun ��ʼ��ͼƬ��������
1\���б�5��ͼ�ֱ�����ͼ��0-4��2\������ҳ�㣬��һ����ΪliOn��
 */
    function zReset(){
        for(var i=0;i<num;i++){
            $("div#pic-top ul li").eq(i).css("z-index",i)
        }
        }

//fun ��ȡliͼƬ������λ�ã�����Ϊloc��
    function location(pic){
        var loc=$("div#pic-top ul li").eq(pic).css("z-index");
        return parseInt(loc);
    }

//fun1  �ƶ�z-index����������ͼƬ����z-indexΪ4����Ϊ0�㣻����+1�㣻
    function moveInd(){
        for(var i=0;i<num;i++){
            if(location(i)!==4){
                var z=location(i);                                                   //location���صġ�z-index�����ַ�����ҪתΪnum��
                $("div#pic-top ul li").eq(i).css("z-index",z+1)
            }else{
                $("div#pic-top ul li").eq(i).css("z-index",0);
            }
        }
    }

/*fun  //��������location��������zindexΪ3��ʱfadeout�� �ƶ�����ͼ�㣻�ٱ�������zindexΪ2��ͼ������Ϊ�ɼ�inline��
�۽���ҳ�㣻*/

    function fade(){
        for(var i=0;i<num;i++) {
            if (location(i) == 3) {
                $("li:eq("+i+") img").fadeOut("slow");

               eqli=4-i;  //ע��fadeout���˶�Ӧli����һ��
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

//�ı��ҳ��ĺ���
    function tranLi(index){

        var circle=document.getElementById("circle"+index);

        var r=circle.getAttribute("r");

        circle.setAttribute("r",1);                              //��svgԪ�ذ뾶��Ϊ1��
        circle.setAttribute("class","myCircleUp");             //������ӦsvgԪ��Ϊ.myCircleUp�ࣻ
        //����Ӧ��liԪ����ΪliOn�࣬Ӧ����Ӧ��css������      $("ul#nav-top li").removeClass("liOn").eq(index).addClass("liOn");

        lastDot(index);

    }

//����һ����ҳ��Ĵ�������
    function lastDot(index){
        if(index==0){                                              //��ǰһ��svgԪ����ΪmyCircleDown�࣬Ӧ��css������
            lastIndex=4;
        }else{
            lastIndex=index-1;
        }
        if(lastIndex!==hoverEqli){
        document.getElementById("circle"+lastIndex).setAttribute("class","myCircleDown");
        }
    }

//fun ��ʱ��ѭ��������
    function timer(event,t){
     picTimer= setInterval(event,t)
    }


//���ú������֡�������������������������������������������������������������������������������������������������������������������
       zReset();
       timer(fade,5000);
       resetZindex();




//���ú���������������������������������������������������������������������������������������������������������������������������������������

//fun test ͼ��仯���Ժ�����
    function test(){
        var string="";
        var x=""
        for(var j=0;j<num;j++){
            string+="<P>"+j+":"+location(j)+"</p>"
        }
        document.getElementById("test").innerHTML=string;

    }
})










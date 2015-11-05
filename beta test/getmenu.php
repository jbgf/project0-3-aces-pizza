<?php

$q=$_GET["q"];
$dom=simplexml_load_file("../src/menu.xml");
$food=$dom->xpath("$q/node()/food");    //'".$q."' ,node()而不是*，否则只选第一个节点？

foreach ($food as $f)
{
    print"<table>";
        print"<a href=# class='carbtn' >"; //Javascript中void是一个操作符，该操作符指定要计算一个表达式但是不返回值。
        echo ($f->name);   //菜名
        print"</a>";

    print"<tr>";
    $price=$f->price;
        for($i=0;$i<count($price);$i++)
        {
            print"<td>";
            echo $price[$i];  //价格
            $size=$price[$i]->attributes();
            if($size)  //尺寸
            {
                echo "/".$size;
            }
            echo"</td>","<br/>";
        }

    print"</tr>";
    print"</table>";
    if($f->description)
    {
     echo"Description:"."<br/>".($f->description)."<br/>"; //描述
    }
    echo"<br/>";

}

?>

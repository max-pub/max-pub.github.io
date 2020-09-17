<? header("Content-Type: text/html; charset=utf-8"); ?>
<? error_reporting(E_ERROR | E_PARSE); ?> 

<meta content='width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no' name='viewport' />
<!-- <link href='https://fonts.googleapis.com/css?family=Josefin+Sans:100' rel='stylesheet' type='text/css'> -->
<link href='https://fonts.googleapis.com/css?family=Quicksand:300' rel='stylesheet' type='text/css'>

<style>
html{
	font-family: 'Quicksand', sans-serif; 
	/*font-family: 'Josefin Sans', sans-serif; */
	/* letter-spacing: -1px; */
	font-weight:300;
	font-size: 20px;
}
/* body{padding-left:30%; padding-right: 30%;} */
h1{font-weight: 300;}
main{width: 500px; max-width: 90%; margin: 0 auto; }
blockquote{margin: 0; margin-bottom: 2rem;}
p{
	/*font-size:30px; margin-bottom:10px;*/
	margin: 0;
	/* white-space: pre; */
}
i{
	display: block;
	margin-top:5px;
	color: gray; 
	font-style: normal; 
	/*float: right;*/
}
</style>


<main>
<h1>Quotes</h1>

<?
//* {font-family:'Helvetica Neue', Arial, Helvetica, sans-serif;}
$raw = file_get_contents('quotes.txt');
$tmp = explode('-----',$raw);
$split = explode("\n\n\n",$tmp[0]);
shuffle($split);

foreach($split as $item){
//	if(substr(trim($item),0,5)=='-----') break;
	if(!trim($item)) continue;
	list($quote,$source) = explode("\n- ",$item);
    list($author,$work) = explode(" - ",$source);
    $quote = str_replace("\n","<br/>",$quote);
    echo "<blockquote><p>$quote</p><i>$author</i></blockquote>";
}
?>
</main>
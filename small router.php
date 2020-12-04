//example

//http://127.0.0.1/robo//page?p=login

<?php
/* ackit - 2020 */
require_once('router.php');

use ackit\ackit_router;

//another class in future, just demo
function stupid(){
  echo "stupid <br/>";
}


$route = new ackit_router($_SERVER['REQUEST_URI']);
$route->setroute('login','stupid');
$route->startrouter();
?>



<?php
/* router by ackit - 2020 */
namespace ackit;

class ackit_router {

    private $params;
    private $url;
    private $pos;
    private $ackit_callback = [];

    public function __construct($uri) {
      $this->pos = stripos($this->url = stristr(htmlentities($uri),"/page?p="),"=");
      $this->url = substr($this->url,$this->pos + 1);
      $this->params = explode('/',$this->url);
    }

    public function setroute($path,$callback){
      $this->ackit_callback[$path] = $callback;
    }

    public function startrouter(){
      if(array_key_exists($this->params[0],$this->ackit_callback) === FALSE){
        die("stop being stupid");
      }
      call_user_func_array($this->ackit_callback[$this->params[0]],$this->params);
    }

}

?>









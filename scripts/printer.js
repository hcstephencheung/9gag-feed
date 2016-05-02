var printer = function(string) {
    var $output = document.getElementById('printer');

    if (!$output) {
        console.log('printer div does not exist');
    }


    $output.innerHTML = string.toString();
};

export { printer }
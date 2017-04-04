function setTimer(year, month, day, hours, minutes, seconds) {
    var end = new Date(year, month, day, hours + 1, minutes, seconds, 0);
    console.log(end);
    console.log(new Date())
    var _second = 1000;
    var _minute = _second * 60;
    var _hour = _minute * 60;
    var _day = _hour * 24;
    var timer;

    function showRemaining() {
        var now = new Date();
        var distance = end - now;
        if (distance < 0) {

            clearInterval(timer);
            document.getElementById('countdown').innerHTML = 'EXPIRED!';

            return;
        }
        var hours = Math.floor((distance % _day) / _hour);
        var minutes = Math.floor((distance % _hour) / _minute);
        var seconds = Math.floor((distance % _minute) / _second);

        document.getElementById('countdown').value = hours + 'hrs ';
        document.getElementById('countdown').value += minutes + 'mins ';
        document.getElementById('countdown').value += seconds + 'secs';
    }

    timer = setInterval(showRemaining, 1000);
}
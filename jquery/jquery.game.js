_event()

var atuoTime, atuo, cliN = 0, sucressNum = 0, comTime = 0

function _event() {

    $('#start').click(function () {

        $('#screen1').removeClass('show').remove()

        $('#screen2').addClass('show')

    });

    $('#startTest').click(function () {

        $('#screen2').removeClass('show').remove()

        $('#screen3').addClass('show')

        _putIcon(false);

    })

    $('#startCheck').click(function () {

        $('#screen4').removeClass('show').remove();

        $('#screen5').addClass('show');

        $('#screen5 ul[data-role="process"] >li:eq(0)').addClass('big')
        _putIcon(true);

    });

    $('ul[data-role=putIcon]').on('dblclick', function () {
        clearInterval(atuo)

    });

    $('#screen5 ul[data-role="process"] >li:eq(' + cliN + ')').addClass('big')


}

function ulClick(e) {

    $('ul[data-role=putIcon] li').removeAttr('onclick')

    setTimeout(function () {

        $('ul[data-role=putIcon] li').attr('onclick', 'ulClick(event)')

    }, 1000)

    clearInterval(atuo)

    var state = $(e.target).parent('ul').attr('data-state')

    var num = $(e.target).attr('data-num'),

        curNum = $('img[data-role=textIcon]').attr('data-num')

    $('ul[data-role=putIcon] li').removeClass('active')

    $(e.target).addClass('active');

    if (num != curNum) {

        $(e.target).addClass('error');

        if (state == 'check') {

            var $time = $('#time').text()

            _suspend($time)

        }

    }

    else {

        cliN = cliN + 1

        if (state == 'test') {

            if (cliN == 2) {

                setTimeout(function () {

                    $('#screen3').removeClass('show').remove()

                    $('#screen4').addClass('show')

                }, 1000)

                cliN = (cliN == 2) ? 0 : cliN

                return
            }

            _imgSrc(cliN)

            setTimeout(function () {

                _putIcon(false);

            }, 1000)


        }

        else if (state == 'check') {

            sucressNum = sucressNum + 1

            var curTime = 30 - $('#time').text()

            comTime = comTime + curTime


            clearInterval(atuoTime)

            clearInterval(atuo)

            if (cliN == 12) {


                _complete(sucressNum, comTime)

                return
            } else {


                _imgSrc(cliN)

                _putIcon(true);


            }


        }
        $('ul[data-role="process"] >li').removeClass('big')

        $('ul[data-role="process"] >li:eq(' + cliN + ')').addClass('big')

    }

}


// 测试完成
function _complete(num, time) {

    $('#screenStop').remove()

    $('#screen5').removeClass('show').remove();

    $('#screen6').addClass('show');

    _suspend(0)

    time = time < 12 ? 12 : time

    $('#uesTime').text(time)

    $('#successNum').text(num)

    var score = (num * 1000) / time

    $('#score').text(parseInt(score))

    var obj = {}
    obj.time = time
    obj.score = score
    obj.num = num
    console.log('测试完成', obj)

}

//15秒暂停
function _suspend(time) {

    var t15 = time - 15,

        $time = time

    if (t15 < 0) return

    var timeFn = function () {

        $time = $time - 1

        if ($time == t15) {

            clearInterval(atuoTime)

            clearInterval(atuo)

            $('#screenStop').addClass('show')

            return
        }

    }

    setTimeout(function () {

        atuo = setInterval(timeFn, 1000)

    }, 1000)

    $('#continue').click(function () {

        clearInterval(atuoTime)

        var $time = $('#time').text()

        _time($time)

        $('#screenStop').removeClass('show')

    })

}

//30秒倒计时
function _time(i) {

    var timeFn = function () {

        i = i - 1

        if (i == 0 && cliN != 12) {

            clearInterval(atuoTime)
            clearInterval(atuo)

            var index = $('ul[data-role="process"] li.big').index() + 1

            _putIcon(true)

            _imgSrc(index)

            $('#screen5 ul[data-role="process"] >li:eq(' + (index - 1) + ')').removeClass('big')

            $('#screen5 ul[data-role="process"] >li:eq(' + index + ')').addClass('big')

            cliN = cliN + 1

            comTime = comTime + 30

        }

        if (cliN == 12) {

            clearInterval(atuoTime)

            clearInterval(atuo)

            _complete(sucressNum, comTime)

        }


        $('#time').text(i)

    }

    timeFn
    atuoTime = setInterval(timeFn, 1000);


}

// 进度条img
function _imgSrc(n) {

    var src = '';

    for (var i = 0; i < n; i++) {

        src = $('ul[data-role="process"] >li:eq(' + i + ')').children('img').attr('src', 'img/guanqia' + (i + 1) + 's.png')

    }
}

//设置界面
function _textIcon(arr) {

    var num = arr[Math.floor(Math.random() * arr.length)];


    $('img[data-role=textIcon]').attr({'src': 'img/btn' + num + '.png', 'data-num': num})

}

function _putIcon(check) {

    var ArrList = [11, 12, 13, 14, 21, 22, 23, 24, 31, 32, 33, 34, 41, 42, 43, 44];


    var num = getArrayItems(ArrList, 12);

    $('ul[data-role=putIcon]').empty();

    for (var i = 0; i < num.length; i++) {

        $('ul[data-role=putIcon]').append('<li data-num="' + num[i] + '" class="btn' + num[i] + '">')

    }
    $('#screen3 ul[data-role=putIcon] li').attr('onclick', 'ulClick(event)')

    setTimeout(function () {

        $('#screen5 ul[data-role=putIcon] li').attr('onclick', 'ulClick(event)')

    }, 1000)

    _textIcon(num)

    if (check) {

        _suspend(30)

        _time(31);

    }

}

function getArrayItems(arr, num) {

    var array = [];

    for (var index in arr) {

        array.push(arr[index]);
    }

    var return_array = [];

    for (var i = 0; i < num; i++) {

        if (array.length > 0) {

            var arrIndex = Math.floor(Math.random() * array.length);

            return_array[i] = array[arrIndex];

            array.splice(arrIndex, 1);

        } else {
            break;
        }
    }
    return return_array;
}



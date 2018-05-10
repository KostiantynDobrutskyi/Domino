(function ($) {
    randomSquare();
    heightSquare(".dominoe-part * ", 1);


    //---------------------------------Domino size--------------------------
    function heightSquare(figure, point) {
        var width = 12,
            newWidth = width * point;
        $(figure).css({
            'height': newWidth + 'px',
            'width': newWidth + 'px'
        });
    }

    function sizeDominoe(dominoe, point) {

        var height = 180,
            newHeight = height * point,
            width = newHeight / 2;
        $(dominoe).css({
            'height': newHeight + 'px',
            'width': width + 'px'
        });

    }

    $(".size").change(function () {
        var point = $(".size").val();
        sizeDominoe(".dominoe", point);
        heightSquare(".dominoe-part *", point);
    });

    //------------------------------------Domino random square-----------------------------

    function randomInteger(min, max) {
        var rand = min - 0.5 + Math.random() * (max - min + 1);
        rand = Math.round(rand);
        return rand;
    }

    function randomSquare() {
        switchNumber(randomInteger(0,6), ".domino-top");
        switchNumber(randomInteger(0,6), ".domino-bottom")
    }

    function switchNumber(number, elem) {
        switch (number) {
            case 0 :
                $(elem).append("<div class='dominoe-part'></div> " +
                    "<div class='dominoe-part'></div> " +
                    "<div class='dominoe-part'></div>");
                break;

            case 1:
                $(elem).append("<div class='dominoe-part'></div> " +
                    "<div class='dominoe-part'><div class='dominoe-middle'></div></div> " +
                    "<div class='dominoe-part'></div>");
                break;

            case 2:
                $(elem).append("<div class='dominoe-part'><div class='dominoe-right'></div></div> " +
                    "<div class='dominoe-part'></div> " +
                    "<div class='dominoe-part'><div class='dominoe-left'></div></div>");
                break;

            case 3:
                $(elem).append("<div class='dominoe-part'><div class='dominoe-right'></div></div> " +
                    "<div class='dominoe-part'><div class='dominoe-middle'></div></div> " +
                    "<div class='dominoe-part'><div class='dominoe-left'></div></div>");
                break;

            case 4:
                $(elem).append("<div class='dominoe-part'> <div class='dominoe-right'></div> <div class='dominoe-left'></div> </div> " +
                    "<div class='dominoe-part'></div> " +
                    "<div class='dominoe-part'><div class='dominoe-left'></div> <div class='dominoe-right'></div></div>");
                break;

            case 5:
                $(elem).append("<div class='dominoe-part'> <div class='dominoe-right'></div> <div class='dominoe-left'></div> </div> " +
                    "<div class='dominoe-part'><div class='dominoe-middle'></div></div> " +
                    "<div class='dominoe-part'><div class='dominoe-left'></div> <div class='dominoe-right'></div></div>");
                break;

            case 6:
                $(elem).append("<div class='dominoe-part'> <div class='dominoe-right'></div> <div class='dominoe-left'></div> </div> " +
                    "<div class='dominoe-part'><div class='dominoe-left'></div> <div class='dominoe-right'></div></div> " +
                    "<div class='dominoe-part'><div class='dominoe-left'></div> <div class='dominoe-right'></div></div>");
                break;


        }
    }

    switchNumber();


    //----------------------------------------- Rotate Dominoe---------------------------

    function rotateDominoSpeed(point) {
        if (point > 0) {
            $(".dominoe").css({
                'animation-duration': 11 - point + 's'
            })
        } else {
            $(".dominoe").css({
                'animation-duration': 0 + 's'
            })
        }
    }

    function rotateWay(way) {
        var point = $(".rotate").val(1);
        rotateDominoSpeed(1);
        if (way === "left")
            $(".dominoe").css({
                'animation-name': 'rotateDominoLeft'
            });
        else if (way === "right") {
            $(".dominoe").css({
                'animation-name': 'rotateDominoRight'
            });
        }
    }

    function reset() {
        $(".dominoe-half").empty();
        randomSquare();
        $(".rotate").val(0);
        rotateDominoSpeed(0);

        $(".size").val(1);
        sizeDominoe(".dominoe", 1);
        heightSquare(".dominoe-part *", 1);

        $(".rotateRight").removeClass("activeBtn");
        $(".rotateLeft").removeClass("activeBtn");

    }

    $(".rotateRight").click(function () {
        rotateWay("right");
        $(".rotateRight").addClass("activeBtn");
        $(".rotateLeft").removeClass("activeBtn");
    });

    $(".rotateLeft").click(function () {
        rotateWay("left");
        $(".rotateLeft").addClass("activeBtn");
        $(".rotateRight").removeClass("activeBtn");
    });

    $(".reset").click(function () {
        reset();
    });

    $(".rotate").change(function () {
        var point = $(".rotate").val();
        rotateDominoSpeed(point);
        console.log(point)
    });


})(jQuery);
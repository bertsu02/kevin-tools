import twox from "../img/2x.png"
import onefivex from "../img/1.5x.png"
import onex from "../img/1x.png"
import zerofivex from "../img/0.5x.png"
$(document).ready(function () {
    const boxItems = [
        { id: 1, name: "two", img: twox },
        { id: 2, name: "onefive", img: onefivex },
        { id: 3, name: "onefive", img: onefivex },
        { id: 4, name: "one", img: onex },
        { id: 5, name: "one", img: onex },
        { id: 6, name: "one", img: onex },
        { id: 7, name: "zerofive", img: zerofivex },
        { id: 8, name: "zerofive", img: zerofivex },
        { id: 9, name: "zerofive", img: zerofivex },
        { id: 10, name: "zerofive", img: zerofivex },
        { id: 11, name: "two", img: twox },
        { id: 12, name: "onefive", img: onefivex },
        { id: 13, name: "onefive", img: onefivex},
        { id: 14, name: "one", img: onex },
        { id: 15, name: "one", img: onex },
        { id: 16, name: "one", img: onex },
        { id: 17, name: "zerofive", img: zerofivex },
        { id: 18, name: "zerofive", img: zerofivex },
        { id: 19, name: "zerofive", img: zerofivex },
        { id: 20, name: "zerofive", img: zerofivex }
    ];

    function shuffleAndDisplayCards() {
        boxItems.sort(function () { return 0.5 - Math.random(); });

        $(".parent").empty();
        $.each(boxItems, function (i, v) {
            $(".parent").append(
                '<div class="child" data-id="' + v.id + '" data-name="' + v.name + '">' +
                    '<img src="' + v.img + '" style="width:100%; height:100%;">' +
                    '<span class="card-number">' + (i + 1) + '</span>' +
                '</div>'
            );
        });

        $(".parent").find(".child img").hide();
    }

    shuffleAndDisplayCards();

    let num = 0;
    let moveNum = 0;
    let pairNum = 0;
    let guessCount = 0;

    const holdArray = [];
    const matched = [];
    const moves = [];
    const pair = [];

    $(document).on('click', '.parent .child', function () {
        num++;
        guessCount++;
        $(this).find("img").show();
        $(this).find(".card-number").hide();
        holdArray.push($(this).attr("data-id"));

        if (num == 2) {
            if ($(".parent").find("div[data-id='" + holdArray[0] + "']").attr("data-name") === $(".parent").find("div[data-id='" + holdArray[1] + "']").attr("data-name")) {
                $(".parent").find("div[data-id='" + holdArray[0] + "']").addClass("card-correct");
                $(".parent").find("div[data-id='" + holdArray[1] + "']").addClass("card-correct");

                matched.push(holdArray[0]);
                holdArray.splice(0, holdArray.length);
                num = 0;
                moves.push(moveNum++);
                pair.push(pairNum++);
            } else {
                $(".parent")
                    .find("div[data-id='" + holdArray[0] + "'] img")
                    .delay(5000)
                    .fadeOut("slow");
                $(".parent")
                    .find("div[data-id='" + holdArray[1] + "'] img")
                    .delay(5000)
                    .fadeOut("slow");
                holdArray.splice(0, holdArray.length);
                num = 0;
                moves.push(moveNum++);
            }

            $(".moves .moveCount").text(moves.length);
            $(".pairs .pairCount").text(pair.length);
            if (pair.length >= 10) {
                alert("You Win");
            }

            $.each(matched, function (i) {
                $(".parent").find("div[data-id='" + matched[i] + "']").show();
            });
        }


        if (guessCount >= 2) {
            guessCount = 0;
            setTimeout(function () {
                shuffleAndDisplayCards();
            }, 3000); 
        }
    });
});

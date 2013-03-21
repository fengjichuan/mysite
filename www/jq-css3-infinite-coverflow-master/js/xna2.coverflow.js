var InfiniteCoverFlow = function (){



    var page = 1;

    var tag = "pizza";

    var buffer_size = 40; //request this amount of photos each time

    var api_key = "ae20d19cfcd6684a9ebd349f9857ada3"



    var translate = 50    //configure the distance bettwen each cover
    var rotate = 60; // configure the angle difference bettwen each cover

    var number = 21;

    var mid = Math.floor(number/2);


    var time_factor =  $(".hero-unit").width() / 320;

    console.log(mid);

    var empty_data = {
        "photos": {
            "photo": []
        }
    };

    //three data structures to store jsons.
    var active = {
        "photos": {
            "photo": []
        }
    };
    var buffer_next = {
        "photos": {
            "photo": []
        }
    };
    var buffer_prev = {
        "photos": {
            "photo": []
        }
    };







    this.init = function() {

        $.getJSON(buildUrl(1, buffer_size, tag), function (data) {

            if (data.stat == "ok") {
                ready(data);
            }

        });


    }

    var ready = function (data) {
        //runs after first batch of data is loaded
        buffer_next = data;

        for (var i = 0; i < number; i++) {
            active.photos.photo.push(buffer_next.photos.photo.shift());
        }



        for (var i = 0; i < active.photos.photo.length; i++) {


            var new_item = '<figure><img src="' + buildImage(active.photos.photo[i]) + '"/></figure>';
            $("#coverflow").append(new_item);
        }

        renderCover();
        $("#nextBtn").click(function () {
            if (buffer_next.photos.photo.length > 0) {

                removeItemFromLeft();
                addItemFromRight();
                renderCover();
            }


        })
        $("#prevBtn").click(function () {
            if (buffer_prev.photos.photo.length > 0) {

                removeItemFromRight();
                addItemFromLeft();
                renderCover();
            } else {
                $("#debug").html("END OF LEFT SIDE");
            }
        })

        $(("figure")).live('click', function () {
            var item_id = $(this).attr('id').split('_')[1];
            updateFrom(item_id);

        })
    }

    var updateFrom = function (index) {
        var position = index - mid;

        if (position > 0) {

            for (var i = 0; i < position; i++) {

                addItemFromRight();
                removeItemFromLeft();
                renderCover();
            }
        }
        if (position < 0) {

            for (var i = 0; i < Math.abs(position); i++) {

                addItemFromLeft();
                removeItemFromRight();
                renderCover();
            }
        }
    }

    var renderCover = function () {
        console.log(page);
        $("#debug").html("PAGE " + page);
        $("figure").each(function (i) {
            $(this).attr('id', 'fig_' + i);

            if (i == mid) {
                $(this).css('webkitTransform', 'translateX(0px) rotateY(0deg) translateZ(200px)');
            } else {

                var x = (i - mid) * translate;
                var y = i - mid;
                if (y < 0) {
                    x = x - translate;
                    y = rotate;
                } else if (y > 0) {
                    x = x + translate;
                    y = -1*rotate;
                }
                $(this).css('webkitTransform', 'translateX(' + x + 'px) rotateY(' + y + 'deg)');
            }
        });
    }

    var  addItemFromRight = function() {

        if (buffer_next.photos.photo.length < 5) {

            loadMoreData();
        }
        //pop new item from list
        var new_item = buffer_next.photos.photo.shift();
        active.photos.photo.push(new_item);

        //load new items from buffer
        var new_items = '<figure><img src="' + buildImage(new_item) + '"/></figure>';

        $("#coverflow").append(new_items);
    }

    var  addItemFromLeft = function() {

        if (buffer_prev.photos.photo.length < 5) {

            loadMoreData2();
        }
        var new_item = buffer_prev.photos.photo.pop();

        active.photos.photo.unshift(new_item);
        var new_items = '<figure><img src="' + buildImage(new_item) + '"/></figure>';
        $("#coverflow").prepend(new_items);

    }

    var loadMoreData = function () {
        page++;
        $.getJSON(buildUrl(page, buffer_size, tag), function (data) {

            if (data.stat == "ok") {
                buffer_next = data;
            }

        });
        //buffer_next = fake_data;
    }

    var loadMoreData2 = function () {

        if (page > 1) {
            page--;
            $.getJSON(buildUrl(page, buffer_size, tag), function (data) {

                if (data.stat == "ok") {
                    buffer_prev = data;
                }

            });
        }

    }

    var removeItemFromLeft = function () {
        var item_to_remove = $("figure:first");
        var removed_item = active.photos.photo.shift();
        buffer_prev.photos.photo.push(removed_item);
        if (buffer_prev.photos.photo.length > buffer_size) {
            buffer_prev.photos.photo.shift();
        }

        item_to_remove.remove();
    }

    var removeItemFromRight = function () {
        var item_to_remove = $("figure:last");
        var removed_item = active.photos.photo.pop();
        buffer_next.photos.photo.unshift(removed_item);
        if (buffer_next.photos.photo.length > buffer_size) {
            buffer_next.photos.photo.pop();
        }
        item_to_remove.remove();
    }



    var  buildUrl= function(page, per_page, tag) {
        //console.log("http://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=e492833ea7a9311bc55c6a0a87e49450&tags=" + tag + "&per_page=" + per_page + "&page=" + page + "&format=json&jsoncallback=?");
        return "http://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=" + api_key + "&tags=" + tag + "&per_page=" + per_page + "&page=" + page + "&format=json&jsoncallback=?";

    }

    var  buildImage = function(item) {
        return "http://farm" + item.farm + ".staticflickr.com/" + item.server + "/" + item.id + "_" + item.secret + "_m.jpg";
    }


}

$(document).ready(function () {

    var icf = new InfiniteCoverFlow();
    icf.init();


});

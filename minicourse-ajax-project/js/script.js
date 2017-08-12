
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    var streetStr = $('#street').val();
    var cityStr = $('#city').val();
    var address = streetStr + ' , ' + cityStr;

    $greeting.text('So, you want to live at ' + address + '?');

    var streetviewUrl = 'http://maps.googleapis.com/maps/api/streetview?size=600x400&location=' + address + '';
    $body.append('<img class="bgimg" src="' + streetviewUrl + '">');

    var nytimesUrl = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + cityStr + '$sort=newest&api-key'
    $.getJSON(streetviewUrl, function (data){
        var items = [];
        $.each(data, function(key, val) {
            items.push("<li id='nytimes-articles'" + key + "'>" + val + "</li>");
        });
        $("<ul/>", {
            "class": "article-list",
            html: items.join("")
        }).appendTo("body");
        console.log(data);
    });

    return false;
};

$('#form-container').submit(loadData);

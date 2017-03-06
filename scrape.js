var phantom = require('phantom');
var fs = require('fs');

var sitepage = null;
var phInstance = null;

phantom.create()
    .then(instance => {
        phInstance = instance;
        return instance.createPage();
    })
    .then(page => {
        //use page
        page.open('http://kingfm.com').then(function() {
            setTimeout(function() {
                page.evaluate(function() {
                    var song = document.querySelector('.song a').innerHTML;
                    var artist = document.querySelector('.artist').innerHTML;
                    artist = artist.slice(17);
                    var songArtist = artist + " " + song;
                    return songArtist
                }).then(function(html) {
                    console.log(html);
                    fs.appendFile('kingfm.txt', html + '\n', function(err) {
                        if (err) {
                            return console.log(err);
                        }
                        console.log("The file was saved!");
                        process.exit(1);
                    });
                });
            }, 5000);
        });
    })
    .catch(error => {
        console.log(error);
        phInstance.exit();
    });

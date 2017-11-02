'use strict';

/**
 * @ngdoc function
 * @name appWebApp.controller:AlbumCtrl
 * @description
 * # AboutCtrl
 * Controller of the appWebApp
 */
angular.module('appWebApp')
  .controller('AlbumCtrl', function ($scope,$http,$window) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    var ref = new Firebase( "https://musicstore-352ac.firebaseio.com");
    

     var vm = this;
     
     vm.start = start;
     vm.buy = buy;

     var num = document.getElementById('num');
     var album = document.getElementById('Album');
     var artist = document.getElementById('Artist');
     var price = document.getElementById('price');
     // Get a database reference to our posts
     
     // Attach an asynchronous callback to read the data at our posts reference
     var count = 1;

     function start(){
         ref.on('value',snap => num.innerText = "1");
         ref.child("Albums/Al"+count+"/Artist").on("child_added", function(snapshot) {
             var groupkey = snapshot.key();
             console.log(groupkey);
             ref.child("Artist/"+groupkey+"/name").once('value',function(snapshot){ //join
                 console.log(snapshot.val());
                 ref.on('value',snap => artist.innerText = snapshot.val()); 
             });
             
         });
         ref.child("Albums/Al1/price").once('value',function(snapshot){
          console.log(snapshot.val());
          ref.on('value',snap => price.innerText = snapshot.val()); 
        });
        ref.child("Albums/Al1/name").once('value',function(snapshot){
          console.log(snapshot.val());
          ref.on('value',snap => album.innerText = snapshot.val()); 
        });
       
          
     }

     function buy(){
         var num = 0;
         ref.child("Albums/Al1/sold").once('value',function(snapshot){
             num = snapshot.val();
             console.log(snapshot.val());
             //ref.on('value',snap => listen.innerText = snapshot.val()); 
             console.log(num+1);
         });

         // Write the new post's data simultaneously in the posts list and the user's post list.
         var updates = {};
         updates['Albums/Al1/sold'] = num+1;
         firebase.database().ref().update(updates);

     }
  });

         

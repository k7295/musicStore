'use strict';

/**
 * @ngdoc function
 * @name appWebApp.controller:SongCtrl
 * @description
 * # MainCtrl
 * Controller of the appWebApp
 */



angular.module('appWebApp')
    .controller('SongCtrl', function ($scope,$http,$window) {
        this.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];

         /**The callback function receives a DataSnapshot, which is a snapshot of the data. 
         A snapshot is a picture of the data at a particular database reference at a single point in time. 
         Calling val() on a snapshot returns the JavaScript object representation of the data. 
         If no data exists at the reference's location, the snapshots value will be null.**/
         var ref = new Firebase( "https://musicstore-352ac.firebaseio.com");
       

        var vm = this;
        
        vm.start = start;
        vm.listen = listen;

        var num = document.getElementById('#');
        var song = document.getElementById('Song');
        var album = document.getElementById('Album');
        var artist = document.getElementById('Artist');
        var time = document.getElementById('time');
        var listen = document.getElementById('listen');
        // Get a database reference to our posts
        
        // Attach an asynchronous callback to read the data at our posts reference
        var count = 1;

        function start(){
            ref.on('value',snap => num.innerText = "1");
            ref.child("Songs/S"+count+"/Album").on("child_added", function(snapshot) {
                var groupkey = snapshot.key();
                console.log(groupkey);
                ref.child("Albums/"+groupkey+"/name").once('value',function(snapshot){ //join
                    console.log(snapshot.val());
                    ref.on('value',snap => album.innerText = snapshot.val()); 
                });
                
            });
            ref.child("Songs/S"+count+"/Artist").on("child_added", function(snapshot) {
                var groupkey = snapshot.key();
                console.log(groupkey);
                ref.child("Artist/"+groupkey+"/name").once('value',function(snapshot){ //join
                    console.log(snapshot.val());
                    ref.on('value',snap => artist.innerText = snapshot.val()); 
                });
                
            });

            ref.child("Songs/S1/name").once('value',function(snapshot){
                console.log(snapshot.val());
                ref.on('value',snap => song.innerText = snapshot.val()); 
            });
            ref.child("Songs/S1/time").once('value',function(snapshot){
                console.log(snapshot.val());
                ref.on('value',snap => time.innerText = snapshot.val()); 
            });
            ref.child("Songs/S1/timeListened").once('value',function(snapshot){
                console.log(snapshot.val());
                ref.on('value',snap => listen.innerText = snapshot.val()); 
            });
             
        }

        function listen(){
            var timeL = 0;
            ref.child("Songs/S1/timeListened").once('value',function(snapshot){
                timeL = snapshot.val();
                console.log(snapshot.val());
                //ref.on('value',snap => listen.innerText = snapshot.val()); 
                console.log(listen+1);
            });

            // Write the new post's data simultaneously in the posts list and the user's post list.
            var updates = {};
            updates['Songs/S1/timeListened'] = timeL+1;
            firebase.database().ref().update(updates);
            ref.on('value',snap => listen.innerText = timeL+1); 

        }
        
/*

        var vm = this;
        
        vm.songs = [];
        vm.idAlbums = [];
        vm.albums = [];
        
        vm.start = start;

        var list_nameS = [];
        var list_nameA = [];
        
        var list_idAlbum = [];
        var list_idSong = [];
        var list_nameS = [];
        var list_time = [];
        var list_timeListened = [];
        var prueba = document.getElementById('prueba1');
        var prueba1 = document.getElementById('prueba2');
        
        var dbRef_Song = firebase.database().ref("Songs/");
        var dbRef_Album = firebase.database().ref("Albums/");
        
        
        /**dbRef.on('value',snap => prueba.innerText = snap.val()); 
        
        function start() {
            dbRef_Song.on("child_added", function(data) {
                //vm.songs.push(data.val());
                console.log(data.val());
                list_nameS.push(data.val().name);
                list_idAlbum.push(data.val().idAlbum);
                list_idSong.push(data.val().idSong);
                list_time.push(data.val().time);
                list_timeListened.push(data.val().timeListened);
                 
             })
              vm.songs= list_nameS;
              vm.idAlbum = list_idAlbum;
              console.log(vm.idAlbum);
              
            //vm.songs = list_s;
            
            dbRef_Song.on('value',data => prueba.innerText = vm.songs[3]);
            //......................................................................
            dbRef_Album.on("child_added", function(data) {
                //vm.songs.push(data.val());
                console.log(data.val());
                list_nameA.push(data.val().name);
                 
             })
              vm.albums= list_nameA;
              console.log(vm.albums);
              
            dbRef_Album.on('value',data => prueba1.innerText = vm.albums[vm.idAlbum[3]-1]);

        }

        */
    });

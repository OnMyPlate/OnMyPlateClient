"use strict";var app=angular.module("OnMyPlate",["ngRoute"]);app.constant("ServerUrl","http://localhost:3000/").constant("HerokuUrl","http://onmyplate.herokuapp.com/").constant("AmazonS3","https://ompimages.s3.amazonaws.com/"),app.run(["$rootScope","$location","$http","$window","authFactory",function(a,b,c,d,e){a.$on("$routeChangeStart",function(){e.isAuthenticated()?c.defaults.headers.common.Authorization="Token token="+d.sessionStorage.getItem("OnMyPlate.user"):b.path("/"===b.path()?"/":"/register"===b.path()?"/register":"/about"===b.path()?"/about":"/login")})}]),app.config(["$routeProvider",function(a){a.when("/",{templateUrl:"templates/home.html"}).when("/about",{templateUrl:"templates/about.html"}).when("/profile/:id",{templateUrl:"templates/profile.html"}).when("/foods/:id",{templateUrl:"templates/food.html"}).when("/profile/:id/add",{templateUrl:"templates/add.html"}).when("/profile/:id/favorites",{templateUrl:"templates/favorites.html"}).when("/login",{templateUrl:"templates/login.html"}).when("/register",{templateUrl:"templates/register.html"}).when("/profile/:id/account",{templateUrl:"templates/account.html"}).otherwise({redirectTo:"/"})}]),app.controller("NavbarCtrl",["$scope","$location","authFactory","dataFactory","$q","userFactory",function(a,b,c,d,e,f){d.fetchUsers().then(function(b){a.currentUser=f.defineCurrentUser(b.data.users)}),a.logout=function(){c.logout().success(function(){b.path("/login")})},a.isLoggedIn=function(){return c.isAuthenticated()},a.toggleNavbar=function(){$("#collapse").stop(!0,!0).slideToggle(300)},a.changeHamburger=function(){$("#hamburger .line:eq(0)").toggleClass("line1"),$("#hamburger .line:eq(1)").toggleClass("line2"),$("#hamburger .line:eq(2)").toggleClass("line3")}}]),app.controller("SidebarCtrl",["$scope","$location","dataFactory","userFactory","$q",function(a,b,c,d){c.fetchUsers().then(function(b){a.currentUser=d.defineCurrentUser(b.data.users)}),a.isActive=function(a){return!!b.path().match(a)}}]),app.controller("UserCtrl",["$http","$scope","HerokuUrl","$location","$window","dataFactory","$route",function(a,b,c,d,e,f){b.doesPasswordsMatch=!0,b.nonExist=!0,b.isActed=!1,b.registerUser=function(e){b.isActed=!0,$("#loader").css("width","100%");var g={user:e},h={username:e.username,email:e.email};e.password===e.password_confirmation?f.fetchUsers().then(function(i){var j=i.data.users.filter(function(a){return a.email===e.email})[0];j?(b.isActed=!1,f.storeData({exist:!0,email:e.email}),d.path("/login")):a.post(c+"email/confirm",h).success(function(e){e.sent&&a.post(c+"users.json",g).success(function(){b.isActed=!1,f.storeData({registered:!0}),d.path("/login")}).error(function(){b.isActed=!1,d.path("/register")})})}):(b.isActed=!1,b.user={},b.doesPasswordsMatch=!1,$("#password-error").slideDown(200),$("#password-error").delay(3e3).slideUp(200),d.path("/register"))}}]),app.controller("LoginCtrl",["$scope","$location","authFactory","dataFactory","$window","$http",function(a,b,c,d,e,f){a.isLoginSuccessful=!0,a.isConfirmed=!0,a.doesExist=!0,a.registered=!1,a.isActed=!1,d.params.exist&&(a.existingUserEmail=d.params.email,a.doesExist=!1,$("#existing-error").slideDown(200),$("#existing-error").delay(3e3).slideUp(200)),d.params.registered&&(a.registered=!0,$("#registered").slideDown(200),$("#registered").delay(3e3).slideUp(200)),a.login=function(g){a.isActed=!0,$("#loader").css("width","100%"),d.fetchUsers().then(function(h){var i=h.data.users.filter(function(a){return a.email===g.email})[0];i?d.getConfirm(g).then(function(d){d.data.confirmed?c.login(g).success(function(c){a.isActed=!1,e.sessionStorage.setItem("OnMyPlate.user",c.token),f.defaults.headers.common.Authorization="Token token="+e.sessionStorage.getItem("OnMyPlate.user"),b.path("/")}).error(function(){a.isActed=!1,a.params={},a.isLoginSuccessful=!1,$("#login-error").slideDown(200),$("#login-error").delay(3e3).slideUp(200)}):d.data.admin?c.login(g).success(function(c){a.isActed=!1,e.sessionStorage.setItem("OnMyPlate.user",c.token),f.defaults.headers.common.Authorization="Token token="+e.sessionStorage.getItem("OnMyPlate.user"),b.path("/")}).error(function(){a.isActed=!1,a.params={},a.isLoginSuccessful=!1,$("#login-error").slideDown(200),$("#login-error").delay(3e3).slideUp(200)}):(a.isActed=!1,b.path("/login"),a.isConfirmed=!1,$("#confirmation-error").slideDown(200),$("#confirmation-error").delay(3e3).slideUp(200))}):(a.isActed=!1,a.params={},a.isLoginSuccessful=!1,$("#login-error").slideDown(200),$("#login-error").delay(3e3).slideUp(200))})}}]),app.controller("AddCtrl",["$scope","$http","HerokuUrl","$location","$q","imageFactory","dataFactory","foodFactory","userFactory",function(a,b,c,d,e,f,g,h,i){a.ratingVals=[1,2,3,4,5];g.fetchFoods().then(function(b){a.foods=b.data.foods}),function(){var b=h.params;b.name&&(a.food=b,a.post=b.posts[0])}(),a.upsertReview=function(a,b,c){j(c,a,b)};var j=function(f,h,j){var l={food:f};f.id?b.put(c+"foods/"+f.id+".json",l).success(function(b){console.log("food updated!"),e.all(k(h,j,b)).then(function(){g.fetchUsers().then(function(b){a.currentUser=i.defineCurrentUser(b.data.users),d.path("/profile/"+a.currentUser.id)})})}):b.post(c+"foods",l).success(function(b){console.log("food created!"),e.all(k(h,j,b)).then(function(){g.fetchUsers().then(function(b){a.currentUser=i.defineCurrentUser(b.data.users),d.path("/profile/"+a.currentUser.id)})})})},k=function(d,g,h){var i={post:{rating:d.rating,review:d.review,food_id:h.id}};d.id?b.put(c+"foods/"+h.id+"/posts/"+d.id,i).success(function(){console.log("post updated!"),e.all(f.signKey(g,i))}):b.post(c+"foods/"+h.id+"/posts",i).success(function(b){console.log("post created!"),a.addedPostId=b.id,e.all(f.signKey(g,i))})}}]),app.controller("ProfileCtrl",["$http","HerokuUrl","$scope","userFactory","$q","$window","dataFactory","$location","foodFactory",function(a,b,c,d,e,f,g,h,i){g.fetchFoods().then(function(a){c.foods=a.data.foods,g.fetchUsers().then(function(a){c.currentUser=d.defineCurrentUser(a.data.users)})}),c.getRating=function(a){for(var b=[],c=0;c<a.rating;c++)b.push(c);return b},c.goToEdit=function(a){i.storeFood(a),h.path("/profile/food.user_id/add")},c.removeFood=function(d){a.delete(b+"foods/"+d.id).success(function(){console.log("food is deleted!"),$("#"+d.id).fadeOut(300,function(){c.foods.splice(c.foods.indexOf(d),1)})})}}]),app.controller("FoodCtrl",["$location","$scope","dataFactory","foodFactory","userFactory","$q","$http","HerokuUrl","imageFactory","authFactory",function(a,b,c,d,e,f,g,h,i,j){b.ratingVals=[1,2,3,4,5],c.fetchFoods().then(function(c){var e=c.data.foods,f=a.path();b.currentFood=d.findCurrentFood(e,f),b.posts=b.currentFood.posts,d.calcFoodRating(b.posts),b.avgFoodRating=d.ratingsArr}),c.fetchUsers().then(function(a){b.currentUser=e.defineCurrentUser(a.data.users),k(b.posts,b.currentUser)});var k=function(a,b){a.forEach(function(a){var c=b.likes.filter(function(a){return a.user_id===b.id}).filter(function(b){return a.id===b.post_id});a.liked=c.length>0?"196baacd.glyphicons-13-heart.png":"4e59b096.glyphicons-20-heart-empty.png"})};b.getRating=function(a){for(var b=[],c=0;c<a.rating;c++)b.push(c);return b},b.slideToggleForm=function(){$("form").slideToggle(400)},b.hideForm=function(){$("form").hide(400)},b.postNewPost=function(a,c,d){var e={post:{rating:a.rating,review:a.review,food_id:d.id}};g.post(h+"foods/"+d.id+"/posts",e).success(function(a){b.posts.push(a),f.all(i.signKey(c,e)).then(function(){console.log("post created!")})})},b.removePost=function(c,d){1===d.posts.length?g.delete(h+"/foods/"+d.id+".json").success(function(){g.delete(h+"/foods/"+d.id+"/posts/"+c.id),a.path("/")}):g.delete(h+"/foods/"+d.id+"/posts/"+c.id).success(function(){$("#"+c.id).fadeOut(300,function(){b.posts.splice(b.posts.indexOf(c),1)}),console.log("post is deleted!")})},b.likePost=function(a){var c={like:{post_id:a.id}},d=b.currentUser.likes.filter(function(a){return a.user_id===b.currentUser.id}).filter(function(b){return a.id===b.post_id});if(0===d.length||"4e59b096.glyphicons-20-heart-empty.png"===a.liked&&d.length>0)g.post(h+"likes.json",c).success(function(a){console.log("you like the post bitch!!!"),b.currentUser.likes.push(a),b.posts.filter(function(b){return b.id===a.post_id})[0].likes+=1,b.posts.filter(function(b){return a.post_id===b.id})[0].liked="196baacd.glyphicons-13-heart.png"});else if("196baacd.glyphicons-13-heart.png"===a.liked){var e=b.currentUser.likes.filter(function(b){return b.post_id===a.id})[0].id,f=b.currentUser.likes.filter(function(b){return b.post_id===a.id})[0];g.delete(h+"likes/"+e+".json").success(function(){console.log("unliked the post bitch!!!"),b.currentUser.likes.splice(b.currentUser.likes.length-1,1),b.posts.filter(function(a){return a.id===f.post_id})[0].likes-=1,b.posts.filter(function(a){return a.id===f.post_id})[0].liked="4e59b096.glyphicons-20-heart-empty.png"})}},b.isLoggedIn=function(){return j.isAuthenticated()}}]),app.controller("HomeCtrl",["dataFactory","$scope","foodFactory","$http","HerokuUrl","authFactory","$q","userFactory",function(a,b,c,d,e,f,g,h){a.fetchUsers().then(function(c){b.currentUser=h.defineCurrentUser(c.data.users),g.all([a.fetchFoods(),a.fetchBookmarks()]).then(function(a){b.bookmarks=a[1].data.bookmarks,b.foods=a[0].data.foods})}),b.search={name:"",city:"",state:""},b.filter="name",b.placeholder="Name",b.selectSearch=function(a){b.filter=a,b.placeholder=a.charAt(0).toUpperCase()+a.slice(1)},b.getAvgRating=function(a){var b=a.posts;return c.calcFoodRating(b),c.ratingsArr},b.bookmarkFood=function(a,c,f){var g={bookmark:{bookmarked:!0,user_id:c.id,food_id:a.id}},h=f.filter(function(a){return a.user_id===c.id}).filter(function(b){return b.food_id===a.id});void 0!==h[0]?d.delete(e+"bookmarks/"+h[0].id+".json").success(function(){console.log("food unbookmarked!"),b.bookmarks.splice(b.bookmarks.indexOf(h),1)}):d.post(e+"bookmarks.json",g).success(function(a){console.log("food bookmarked!"),b.bookmarks.push(a)})},b.isBookmarked=function(a,b,c){var d=c.filter(function(a){return a.user_id===b.id}).filter(function(b){return b.food_id===a.id}).filter(function(a){return a.bookmarked===!0});return void 0!==d[0]?d[0].bookmarked:!1},b.isLoggedIn=function(){return f.isAuthenticated()}}]),app.controller("FavoriteCtrl",["dataFactory","$scope","$http","HerokuUrl","foodFactory","$q","userFactory",function(a,b,c,d,e,f,g){a.fetchUsers().then(function(c){b.currentUser=g.defineCurrentUser(c.data.users),f.all([a.fetchFoods(),a.fetchBookmarks()]).then(function(a){b.bookmarks=a[1].data.bookmarks,b.foods=a[0].data.foods})}),b.unBookmarkFood=function(a,e,f){var g=f.filter(function(a){return a.user_id===e.id}).filter(function(b){return b.food_id===a.id});c.delete(d+"bookmarks/"+g[0].id+".json").success(function(){console.log("food unbookmarked!"),b.bookmarks.splice(b.bookmarks.indexOf(g),1)})},b.isBookmarked=function(a,b,c){var d=c.filter(function(a){return a.user_id===b.id}).filter(function(b){return b.food_id===a.id}).filter(function(a){return a.bookmarked===!0});return void 0!==d[0]?d[0].bookmarked:!1},b.getAvgRating=function(a){var b=a.posts;return e.calcFoodRating(b),e.ratingsArr}}]),app.controller("AboutCtrl",["$http","$scope",function(){{var a=d3.select("#about").append("svg").attr("width",50).attr("height",50).style("border","1px solid rgba(0, 0, 0, 0.28)").style("border-radius","50%");a.append("circle").attr("cx",25).attr("cy",25).attr("r",25).style("fill","#E1E9E9")}}]),app.controller("AccountCtrl",["dataFactory","userFactory","$scope","$http","HerokuUrl","$location","$window",function(a,b,c,d,e,f,g){a.fetchUsers().then(function(a){c.currentUser=b.defineCurrentUser(a.data.users)}),c.deleteAccount=function(a){d.delete(e+"users/"+a.id+".json").success(function(){console.log("user account deleted"),g.sessionStorage.removeItem("OnMyPlate.user"),f.path("/register")})}}]),app.factory("authFactory",["$http","$window","HerokuUrl","$location",function(a,b,c,d){var e=function(b){return a.post(c+"login",b).success(function(){}).error(function(){d.path("/login")})},f=function(){return a.get(c+"logout").success(function(){b.sessionStorage.removeItem("OnMyPlate.user")})},g=function(){return!!b.sessionStorage.getItem("OnMyPlate.user")},h=function(b){return a.post(c+"admin",b)};return{login:e,logout:f,isAuthenticated:g,isAdmin:h}}]),app.factory("userFactory",["$window",function(a){var b=function(a){var b=c();return a.filter(function(a){return a.token===b})[0]},c=function(){return a.sessionStorage.getItem("OnMyPlate.user")};return{defineCurrentUser:b}}]),app.factory("imageFactory",["$http","HerokuUrl","$q","$location","AmazonS3",function(a,b,c,d,e){var f,g=function(d,g){a.get(b+"amazon/sign_key").success(function(a){f=a;var b={food_image:{image_url:e+f.key}};c.all(h(d,f)).then(function(){i(b,g)})})},h=function(b,c){var d=new FormData;d.append("key",c.key),d.append("AWSAccessKeyId",c.access_key),d.append("policy",c.policy),d.append("acl","public-read"),d.append("signature",c.signature),d.append("Content-Type","image/jpeg"),d.append("file",b),a.post(e,d,{transformRequest:angular.identity,headers:{"Content-Type":void 0,Authorization:""}}).success(function(){console.log("eureka!")}).error(function(){console.log("fuck you")})},i=function(c,d){return d.post.food_image?a.put(b+"food_images/"+d.post.food_image.id,c):a.post(b+"food_images",c)};return{signKey:g}}]),app.factory("dataFactory",["$http","HerokuUrl",function(a,b){var c={},d=function(){return a.get(b+"foods.json").success(function(a){return a.foods})},e=function(){return a.get(b+"users.json").success(function(a){return a.users})},f=function(){return a.get(b+"food_images.json").success(function(a){return a.food_images})},g=function(){return a.get(b+"bookmarks.json").success(function(a){return a.bookmarks})},h=function(c){return a.post(b+"get_confirm",c).success(function(a){return a})},i=function(a){angular.copy(a,c)};return{fetchFoods:d,fetchUsers:e,fetchImages:f,fetchBookmarks:g,getConfirm:h,storeData:i,params:c}}]),app.factory("foodFactory",["$location",function(){var a={},b=[],c=function(a){return parseInt(a.match(/\d+$/)[0])},d=function(a,b){var d=c(b);return a.filter(function(a){return a.id===d})[0]},e=function(a,b){for(var c=0;c<a.length;c++)if(a[c].name===b.name)return a[c]},f=function(b){angular.copy(b,a)},g=function(a){for(var c=[],d=0,e=0;e<a.length;e++)d+=a[e].rating;for(var f=parseInt(d/a.length),e=0;f>e;e++)c.push(e);angular.copy(c,b)};return{findCurrentFood:d,searchDuplicate:e,storeFood:f,params:a,calcFoodRating:g,ratingsArr:b}}]),app.directive("fileread",function(){return{scope:{fileread:"="},link:function(a,b){b.bind("change",function(b){a.$apply(function(){a.fileread=b.target.files[0]})})}}}),app.directive("typeahead",["$http","$timeout",function(){return{restrict:"EA",scope:{type:"@",model:"=",prompt:"@",name:"@",items:"=",property:"@",value:"@"},templateUrl:"templates/typeahead.html",link:function(a){a.currentIndex=0,a.selected=!0,a.select=function(b){a.model=b,a.selected=!0,a.currentIndex=0},a.isCurrent=function(b){return a.currentIndex===b},a.checkKeys=function(b){40===b.keyCode?(b.preventDefault(),a.currentIndex+1!==a.items.length&&(a.currentIndex+=1)):38===b.keyCode&&(b.preventDefault(),0!==a.currentIndex&&(a.currentIndex-=1))}}}}]),app.filter("ellipsis",[function(){return function(a){return a.slice(0,150)+"..."}}]);
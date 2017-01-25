//set up Jquery
$(document).ready(function(){
	var following =[];
	//twitch.tv api url
	var url='https://wind-bow.gomix.me/twitch-api/streams/freecodecamp';
	//get the free code camp status and info
	$.getJSON(url, function(data1) {
  		if(data1.stream===null){
  			$("#fccStatus").html("Free Code Camp is Offline!");
  		}
  		else{
  			$("#fccStatus").html("Free Code Camp is Online!");
  		}
	});

	var followerUrl="https://wind-bow.gomix.me/twitch-api/users/freecodecamp/follows/channels";

	$.getJSON(followerUrl, function(data2){
		for(var i=0; i<data2.follows.length;i++){
			var displayName = data2.follows[i].channel.display_name;
			following.push(displayName);
		}
		following.push('comster404');
		following.push('brunofin');
		following.push('ESL_SC2');

		for(var x=0; x<following.length;x++){
			var url2='https://wind-bow.gomix.me/twitch-api/users/'+following[x];

			$.getJSON(url2).done(function(data3){
				var logo;
				var status;
				var name;
				if(data3.error){
					logo='https://s3-us-west-2.amazonaws.com/fcc.twitchtvjsonapp/img_noLogo.png';
					name = data3.message;
					status= data3.error;
					$("#followerInfo").prepend("<div class='row'>"+"<img src='"+logo+"'>"+"<p>"+name+"</p><p>"+status+"</p>");
				}

			});
		}
		for(var i=0; i<following.length;i++){
			var onlineUrl = 'https://wind-bow.gomix.me/twitch-api/streams/'+following[i];
			$.getJSON(onlineUrl,function(data4){
				if(data4.stream !== null){
					logo= data4.stream.channel.logo;
					if(logo===null){
							logo='https://s3-us-west-2.amazonaws.com/fcc.twitchtvjsonapp/img_noLogo.png';
						}
					name = data4.stream.channel.display_name;
					status= data4.stream.channel.status;
					$("#followerInfo").prepend("<div class='row'>"+"<img src='"+logo+"'>"+"<p>"+name+"</p><p>"+status+"</p>");
				}
			});
			
		}
		for(var i=0; i<following.length;i++){
			var offlineUrl = 'https://wind-bow.gomix.me/twitch-api/streams/'+following[i];
			var userUrl ='https://wind-bow.gomix.me/twitch-api/users/'+following[i];
			
			$.getJSON(offlineUrl,function(data5){
				console.log(following[i]);
				if(data5.stream === null){
					

					$.getJSON(userUrl,function(data6){
						console.log(userUrl);
						logo= data6.logo;
						if(logo===null){
							logo='https://s3-us-west-2.amazonaws.com/fcc.twitchtvjsonapp/img_noLogo.png';
							}
						name = data6.display_name;
						status= "Offline";
						$("#followerInfo").prepend("<div class='row'>"+"<img src='"+logo+"'>"+"<p>"+name+"</p><p>"+status+"</p>");
						});
					
				}
			});
			
		}


	});
});
$(document).ready(function(){

	var trivia = [{ 
			question: "Who lives in a trash can on Sesame Street?",
			lists: ["Cookie Monster", "Oscar", "Maria", "Elmo"],
			answer: 1,
		}, {
			question: "In Snow White what does the Prince do to wake her up?",
			lists: ["he shook her", "he touched her on the nose", "he yelled at her", "he kissed her"],
			answer: 3,
		}, {
			question: "On Sesame Street what character is big and yellow?",
			lists: ["Big Bird", "Snuffy", "Telly", "Kermit"],
			answer: 0,
		}, {
			question: "What animals purrs and is known for chasing mice?",
			lists: ["a seal", "a cat", "a mule", "a kangaroo"],
			answer: 1,
		}, {
			question: "The famous phrase 'What's Up, Doc?' belongs to which cartoon character?",
			lists: ["Taz", "Tweety", "Bugs Bunny", "Duffy Duck"],
			answer: 2,
		}, {
			question: "What is the capital city of the Land of Oz called in 'The Wizard of Oz' movie?",
			lists: ["Emerald City", "Gillikins", "Munchkins", "Winkies"],
			answer: 0,
		}, {
			question: "How many of Snow White's seven dwarfs have names beginning with S?",
			lists: ["Grumpy", "Dopey & Doc", "Sleepy & Sneezy", "Bashful & Happy"],
			answer: 2,
		}, {
			question: "Which two primary colours make orange when they are mixed together?",
			lists: ["blue & orange", "red & yellow", "blue & yellow", "red & green"],
			answer: 1,
		}, {
			question: "What colour does Marge Simpson dye her hair?",
			lists: ["red", "orange", "yellow", "blue"],
			answer: 3,
		}, {
			question: "Which Disney film does the ‘Cheshire Cat’ appear in?",
			lists: ["Alice in Wonderland", "Cinderella", "Pinocchio", "The Aristocats"],
			answer: 0
		}];

		var questionnumber;
		var rightanswer;
		var wronganswer;
		var nothinganswer;
		var seconds;
		var time;
		var answers;
		var optionselect;

		$("#begingame").on("click", function(){
			$("#begingame").hide();
			startGame();
		});

		function startGame(){
			$("#final").empty();
			$("#rightanswer").empty();
			$("#wronganswer").empty();
			$("#nothinganswer").empty();
			questionnumber = 0;
			rightanswer = 0;
			wronganswer = 0;
			nothinganswer = 0;
			nextQuestions();
		};

		function nextQuestions(){
			$("#showmessage").empty();
			$("#correctmessage").empty();

			$("#questionnumber").html("Question # " + (questionnumber+1) + "/" + trivia.length);
			$(".question").html("<h2>" + trivia[questionnumber].question + "</h2>");

			for(var j = 0; j < 4; j++){
				var select = $("<div>");
				select.text(trivia[questionnumber].lists[j]);
				select.attr({"data-index" : j});
				select.addClass("choices");
				$(".answer").append(select);
			}

			leftTime();

			$(".choices").on("click", function(){
				optionselect = $(this).data("index");
				clearInterval(time);
				answerName();
			})
		};

		function leftTime(){
			seconds = 20;
			$("#countdown").html("<h2>Time Remaining:" + seconds + "</h2>");
			answers = true;
			time = setInterval(count, 1000);
		};

		function count(){
			seconds--;
			$("#countdown").html("<h2>Time Remaining:" + seconds + "</h2>");
			if(seconds < 1){
				clearInterval(time);
				answers = false;
				answerName();
			}
		};

		var message = {
			right: "It is correct!",
			wrong: "It is wrong!",
			leftTime: "Try to best!",
			endgame: "Finished, Check your answers!"
		}

		function answerName(){
			$("#questionnumber").empty();
			$(".choices").empty();
			$(".question").empty();

			var rightanswermatch = trivia[questionnumber].lists[trivia[questionnumber].answer];
			var rightmatch = trivia[questionnumber].answer;

			if ((optionselect == rightmatch) && (answers == true)){
				rightanswer++;
				$("#showmessage").html(message.right);
			} else if ((optionselect != rightmatch) && (answers == true)){
				wronganswer++;
				$("#showmessage").html(message.wrong);
				$("#correctmessage").html("The correct answer was: " + rightanswermatch);
			} else {
				nothinganswer++;
				$("#showmessage").html(message.leftTime);
				$("#correctmessage").html("The correct answer was: " + rightanswermatch);
			}

			if (questionnumber == (trivia.length-1)){
				setTimeout(score, 2000)
			} else {
				questionnumber++;
				setTimeout(nextQuestions, 2000);
			}
		};

		function score(){
			$("#begingame").show();
			$("#countdown").empty();
			$("#showmessage").empty();
			$("#correctmessage").empty();

			$("#final").html(message.endgame);
			$("#rightanswer").html("Right Answers: " + rightanswer);
			$("#wronganswer").html("Wrong Answers: " + wronganswer);
			$("#nothinganswer").html("Nothing Answer: " + nothinganswer);
		};
});

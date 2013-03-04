nrj("http://www.duckduckgo.com/forvo/jquery.min.js", true);
nrj("http://www.duckduckgo.com/forvo/mediaelement-and-player.min.js", true);
nrj("http://www.duckduckgo.com/forvo/dictionary.js", true);

function ddg_spice_dictionary_audio(sounds) {
	if(sounds.length > 0) {
		var dict = document.getElementById("audio-dictionary");
		var play = document.getElementById("play-dictionary");
		dict.setAttribute("src", sounds[0].fileUrl.replace(/^http/, "https"));
		dict.addEventListener("click", function() {
			play.play();
		});
	}
}

function ddg_spice_dictionary_pronunciation(pronounce) {
	if(pronounce.length > 0 && pronounce[0].raw && pronounce[0].rawType === "ahd-legacy") {
		var pronunciation = document.getElementById("pronunciation");
		pronunciation.innerHTML = pronounce[0].raw;
	}
}

function ddg_spice_dictionary(words) {
	if(words.length > 0) {
		var items = [[]];
		items[0] = {
			h: get_header(words),
			a: get_definitions(words),
			u: "http://wordnik.com/words/" + get_word(words),
			s: "Wordnik",
			force_big_header: true,
			force_no_fold: true
		};
		nra(items, 1, 1);
		nrj("/js/spice/dictionary_pronunciation/" + get_word(words));
		nrj("/js/spice/dictionary_audio/" + get_word(words));
	}

	function get_header(words) {
		return "Definitions";
	}

	function get_definitions(words) {
		var list_of_definitions = "";
		for(var i = 0;i < words.length; i += 1) {
			list_of_definitions += "<div>" + shorten_part_of_speech(words[i]) + " " + 
								   get_definition(words[i]) + "</div>";  
		}

		return "<b>" + get_word(words) + "</b> <span id='pronunciation'></span> <audio preload id='play-dictionary'><source type='audio/mp3' id='audio-dictionary'></source></audio>" + list_of_definitions;
	}

	function shorten_part_of_speech(word) {
		var part_of_speech = {
			"interjection": "interj.",
			"noun": "n.",
			"verb-intransitive": "v.",
			"verb-transitive": "v.",
			"adjective": "adj.",
			"adverb": "adv.",
			"verb": "v."
		};
		var result;
		if(part_of_speech[word.partOfSpeech]) {
			result = part_of_speech[word.partOfSpeech];
		} else {
			result = word.partOfSpeech;
		}
		return "<i>" + result + "</i>";
	}

	function get_definition(word) {
		return word.text;
	}

	function get_word(words) {
		return words[0].word;
	}
}
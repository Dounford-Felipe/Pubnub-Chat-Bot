const PubNub = require('pubnub');

commandList = ['ping', 'wiki', 'discord', 'notification', 'desktopnotification', 'notifications', 'desktopnotifications', 'command', 'commands', 'commandlist', 'commandslist', 'script', 'idleagain', 'automation','help','auto','app','apk','desktop','windows','android','compare','comparetool','chart','graph','stats','play','game','hangman']

let pubnub;

//Hang Man
const wordList = ['Ancient Bars','Ancient Ore','Ancient Oxygen Tank','Angel','Apple','Artifact Potion','Baby Skeleton','Bait Finder Potion','Bananas','Bone Amulet','Bone Ring','Bonemeal Bin','Bronze Bars','Bronze Star Potion','Cactus','Carnivorous Plant','Castle Knight','Castle Mage','Cave Carrot','Charcoal Foundry','Cheese','Chest','Chicken','Coconuts','Coin Potion','Community Center','Compost Potion','Copper Ore','Crushers','Crystal Leaf','Curious Ghost','Dad Goblin','Daily Chest','Daily Missions','Dark Mage','Desert Lizard','Diamond','Dotted Green Leaf','Dragon','Elephant','Energy','Enriched Geode Potion','Enriched Pirates Potion','Enriched Seed Finder Potion','Ent Logs','Excavators','Explorer Speed Potion','Exploring Speed Ring','Factory','Fertilize Soil Potion','Fire Gloves','Fire Hawk','Fire Mage','Fire Skeleton Cemetery','Fire Spell','Fish Bones','Fishing Rod','Fishing Speed Potion','Freeze Potion','Frozen Bones','Frozen Ent','Fruit Tree Potion','Furnace Speed Potion','Gargoyle','Gem Finder','Gem Goblin','Gem Ring','Geodes','Ghost','Ghost Pack','Ghost Scan Potion','Giant Drill','Goblin Cousin','Gold Apple','Gold Bars','Gold Leaf','Gold Logs','Gold Ore','Gold Refinery','Golem','Gorilla','Green Leaf','Green Treasure Chest','HP Emblem','HP Potion','Haunted Logs','Haunted Painting','Honey','Ice Gloves','Ice Hawk','Ice Skeleton Cemetery','Ignore Defense Potion','Infection Cure Potion','Infinite Combat Potion','Invisibility Amulet','Invisibility Ring','Iron Bars','Iron Dagger','Iron Ore','Jungle Shield','Kindle','Lava Kindle','Lava Logs','Lava Octopus','Lava Plant','Lava Snake','Lava Snake Armor','Lava Snakeskin Cape','Lightbulb','Lime Leaf','Lizard','Lizard Armor','Lizardskin Cape','Lobster','Looting Ring','Looting Ring Wizard','Machete','Magic Emblem','Magic Logs','Magnet','Manta Ray','Maple Logs','Mars Rock','Metal Detector','Mimic','Mineral Necklace','Minerals','Miners','Missions','Moon Stone','Mystery Gem Box','Nopal','Oak Logs','Ocean Shark','Offhand Iron Dagger','Oil Platform','Oil Potion','Oxygen Amulet','Oxygen Ring','Oxygen Tank','Pine Logs','Pineapple','Piranhas','Pirates','Pirates Potion','Plasma','Poison Spear','Poison Squid','Poison Tribe','Potato','Promethium','Promethium Armor','Promethium Bars','Promethium Ore','Promethium Potion','Pufferfish','Puzzle Chest','Rainbow Fish','Reaper','Red Mushroom','Red Treasure Chest','Redwood Logs','Reflect Spell','Research','Research Speed Potion','Reset Combat Potion','Road Header','Robot Archer','Robot Mage','Robot Miner','Robot Wheelie','Rocket','Rocket Speed Potion','Rusty Sword','Santa Clause','Sapphire','Sardine','Scorpion','Scythe','Sea Turtle','Secateurs','Seed Finder Potion','Shark','Shark Fin','Shooting Star','Shovel','Shrimp','Silver','Silver Bars','Silver Ore','Silver Scimitar','Star Lamp','Skeleton','Skeleton Cemetery','Skeleton Ghost','Skeleton King','Skeleton Mage','Skeleton Monks','Skeleton Prisoner','Skeleton Shield','Skeleton Sword','Snail','Snake','Snake Armor','Snakeskin Cape','Spells','Squid','Staff','Starfruit','Statue','Stinger','Stone','Stone Amulet','Stone Ring','Strength Potion','Striped Crystal Leaf','Striped Gold Leaf','Striped Green Leaf','Super Bow','Super Compost Potion','Super HP Potion','Super Jungle Shield','Super Poison Arrows','Super Poison Spear','Super Poison Trident','Super Rocket Speed Potion','Swordfish','Teddy Bear','Teleport Spell','Thief','Time Machine','Titanium','Titanium Armor','Titanium Bars','Titanium Ore','Titanium Potion','Tools','Trading Post','Train','Trawler','Treasure Chest','Treasure Map','Tree Downgrade Potion','Tree Roots Potion','Tree Upgrade Potion','Tribe','Trident','Trident Soldier','Trident Soldier Helmet','Voting Card','Weapons','Wells','Whale','Willow Logs','Woodcutting','Zombie','This is an Easter Egg']
let word = '';
let letters = 0;
let tries = 7;
let guessedLetters = ''
let display;

function play(item,sender) {
	//Se precisarem de ajuda
	if (item.startsWith('help')) {
		publishMessage(`Use <b>"!play"</b> to start, <b>"!letter"</b> to make a guess (E.g. "!m" ) or <b>"!word"</b> (E.g. "!lava snake" ) to guess the word`)
	//Se não tiver nenhuma palavra
	} else if (word == '') {
		if (item.startsWith('hangman') || item.startsWith('play') || item.startsWith('word')) {
			word = wordList[Math.floor(Math.random() * (wordList.length + 1))]
			letters = word.length
			tries = 7
			guessedLetters = ''
			display = word.toLowerCase().split('').map(char => (char == ' ' ? char = '-' : guessedLetters.includes(char)) ? char : '_').join(' ');
			publishMessage(`Game started, the word has ${letters} letters:<br><b>${display}</b>`)
		} else {publishMessage('Use !play to start')}
	//Se tiver um jogo em andamento
	} else {
		if (item.startsWith('letters')) {
			let alreadyGuessed = guessedLetters.split('').join(' ')
			publishMessage(`Letters already guessed: <b>${alreadyGuessed}</b><br><b>${display}</b>`)
		} else if (item.startsWith('hangman') || item.startsWith('play') || item.startsWith('word')) {
			publishMessage(`The word has ${letters} letters:<br><b>${display}</b>`)
		//Caso seja um chute
		} else if (item.length == 1) {
			//Se a letra já tiver sido chutada
			if (guessedLetters.includes(item)) {
				publishMessage(`Someone already guessed the letter ${item}<br><b>${display}</b>`)
			} else {
				//Se a letra chutada estiver certa
				if (word.toLowerCase().includes(item)) {
					guessedLetters += item
					display = word.toLowerCase().split('').map(char => (char == ' ' ? char = '-' : guessedLetters.includes(char)) ? char : '_').join(' ');
					//Se tiver acertado todas as letras
					if (!display.includes('_')) {
						publishMessage(`<b>"${word}"</b> is the word! Congrats ${sender}, you will not be hanged, at least for now.`)
						word = ''
					} else {
						publishMessage(`Good choice ${sender}! The letter "${item}" is in the word:<br><b>${display}</b>`)
					}
				//Se o chute estiver errado
				} else {
					//Se ainda tiver tentativas
					if (tries > 1) {
						guessedLetters += item
						tries -= 1
						display = word.toLowerCase().split('').map(char => (char == ' ' ? char = '-' : guessedLetters.includes(char)) ? char : '_').join(' ');
						publishMessage(`Ouch, "${item}" is not in the word, ${sender} is a step closer to death! Remaing tries ${tries}:<br><b>${display}</b>`)
					//Se as tentativas acabaram
					} else {
						publishMessage(`"${item}" was not in the word, ${sender} was hanged for good!<br>The word was: <b>${word}</b>`)
						word = ''
					}
				}
			}
		//Caso chute a palavra inteira corretamente
		} else if (word.toLowerCase().replace(/\s+/g, '') == item) {
			publishMessage(`<b>"${word}"</b> is the word! Congrats ${sender}, you will not be hanged, at least for now.`)
			word = ''
		//Caso chute a palavra inteira incorretamente
		} else {
			publishMessage(`This is not the word ${sender}.`)
		}
	}
}

const setupPubNub = () => {
        // Update this block with your publish/subscribe keys
        pubnub = new PubNub({
            publishKey : "", // Add your publishKey here
            subscribeKey : "", // Add your subscribeKey here
            userId: "chatBot"
        });

        // add listener
        const listener = {
            status: (statusEvent) => {
                if (statusEvent.category === "PNConnectedCategory") {
                    console.log("Connected");
                }
            },
            message: (messageEvent) => {
				if (messageEvent.message.sender !== 'Chat Bot') {
                if (messageEvent.message.description.startsWith("/")) {
					var count = commandList.length;
					var msg = messageEvent.message.description.toLowerCase().replace(/\s+/g, '')
					for (var i=0;i<count;i++) {
						if (msg.includes(commandList[i])) {
							publishMessage(chatCommands(commandList[i]))
							break;
						}
					};
				} else if (messageEvent.message.description.startsWith("!")) {
					play(messageEvent.message.description.toLowerCase().replace(/\s+/g, '').slice(1),messageEvent.message.sender)
				}
				};
            },
        };
        pubnub.addListener(listener);

        // subscribe to a channel
        pubnub.subscribe({
            channels: ["hello_world2"]
        });
};
	
function chatCommands(command) {
	response = ''
	switch(command) {
		case 'ping':
		response = 'pong'
		break;
		case 'hangman':
		case 'game':
		case 'play':
		response = 'Please use !'
		break;
		case 'app':
		case 'apk':
		case 'desktop':
		case 'windows':
		case 'android':
		response = 'https://github.com/Dounford-Felipe/DHM-Idle-Again/releases'
		break;
		case 'wiki':
		response = 'https://diamondhuntmobile.fandom.com/wiki/Diamond_Hunt_Mobile_Wiki'
		break;
		case 'compare':
		case 'comparetool':
		response = 'https://dhmcompare.infinityfreeapp.com/'
		break;
		case 'chart':
		case 'graph':
		case 'stats':
		response = 'https://dhmcompare.infinityfreeapp.com/chart.html'
		break;
		case 'discord':
		response = 'https://discord.gg/JyU4AuEy7D'
		break;
		case 'notification':
		case 'desktopnotification':
		case 'notifications':
		case 'desktopnotifications':
		response = 'https://greasyfork.org/en/scripts/478236-dhm-desktop-notifications'
		break;
		case 'command':
		case 'commands':
		case 'commandlist':
		case 'commandslist':
		case 'help':
		response = '/Compare !Hangman /Apk /Notifications /Desktop /Script /Wiki /Discord /Commands /Chart'
		break;
		case 'script':
		case 'idleagain':
		case 'automation':
		case 'auto':
		response = 'https://greasyfork.org/en/scripts/475537-dhm-idle-again'
		break;
		default:
		response = 'kappa'
	}
	return(response)
}

//Change the channel if needed
const publishMessage = async (message) => {
	pubnub.publish({channel : "hello_world2",message: {description: message,sender: 'Chat Bot'}});
};

setupPubNub();
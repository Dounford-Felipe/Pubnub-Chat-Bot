const fs = require('fs');
const PubNub = require('pubnub');

commandList = ['ping', 'wiki', 'discord', 'notification', 'desktopnotification', 'notifications', 'desktopnotifications', 'command', 'commands', 'commandlist', 'commandslist', 'script', 'idleagain', 'automation','help','auto','app','apk','desktop','windows','android','compare','comparetool','chart','graph','stats','play','game','hangman']

let pubnub;

//Hang Man
const wordListDH = [
'Ancient Bars','Ancient Ore','Ancient Oxygen Tank','Angel','Apple','Artifact Potion','Baby Skeleton','Bait Finder Potion','Bananas','Bone Amulet','Bone Ring','Bonemeal Bin','Bronze Bars','Bronze Star Potion','Cactus','Carnivorous Plant','Castle Knight','Castle Mage','Cave Carrot','Charcoal Foundry','Cheese','Chest','Chicken','Coconuts','Coin Potion','Community Center','Compost Potion','Copper Ore','Crushers','Crystal Leaf','Curious Ghost','Dad Goblin','Daily Chest','Daily Missions','Dark Mage','Desert Lizard','Diamond','Dotted Green Leaf','Dragon','Elephant','Energy','Enriched Geode Potion','Enriched Pirates Potion','Enriched Seed Finder Potion','Ent Logs','Excavators','Explorer Speed Potion','Exploring Speed Ring','Factory','Fertilize Soil Potion','Fire Gloves','Fire Hawk','Fire Mage','Fire Skeleton Cemetery','Fire Spell','Fish Bones','Fishing Rod','Fishing Speed Potion','Freeze Potion','Frozen Bones','Frozen Ent','Fruit Tree Potion','Furnace Speed Potion','Gargoyle','Gem Finder','Gem Goblin','Gem Ring','Geodes','Ghost','Ghost Pack','Ghost Scan Potion','Giant Drill','Goblin Cousin','Gold Apple','Gold Bars','Gold Leaf','Gold Logs','Gold Ore','Gold Refinery','Golem','Gorilla','Green Leaf','Green Treasure Chest','HP Emblem','HP Potion','Haunted Logs','Haunted Painting','Honey','Ice Gloves','Ice Hawk','Ice Skeleton Cemetery','Ignore Defense Potion','Infection Cure Potion','Infinite Combat Potion','Invisibility Amulet','Invisibility Ring','Iron Bars','Iron Dagger','Iron Ore','Jungle Shield','Kindle','Lava Kindle','Lava Logs','Lava Octopus','Lava Plant','Lava Snake','Lava Snake Armor','Lava Snakeskin Cape','Lightbulb','Lime Leaf','Lizard','Lizard Armor','Lizardskin Cape','Lobster','Looting Ring','Looting Ring Wizard','Machete','Magic Emblem','Magic Logs','Magnet','Manta Ray','Maple Logs','Mars Rock','Metal Detector','Mimic','Mineral Necklace','Minerals','Miners','Missions','Moon Stone','Mystery Gem Box','Nopal','Oak Logs','Ocean Shark','Offhand Iron Dagger','Oil Platform','Oil Potion','Oxygen Amulet','Oxygen Ring','Oxygen Tank','Pine Logs','Pineapple','Piranhas','Pirates','Pirates Potion','Plasma','Poison Spear','Poison Squid','Poison Tribe','Potato','Promethium','Promethium Armor','Promethium Bars','Promethium Ore','Promethium Potion','Pufferfish','Puzzle Chest','Rainbow Fish','Reaper','Red Mushroom','Red Treasure Chest','Redwood Logs','Reflect Spell','Research','Research Speed Potion','Reset Combat Potion','Road Header','Robot Archer','Robot Mage','Robot Miner','Robot Wheelie','Rocket','Rocket Speed Potion','Rusty Sword','Santa Clause','Sapphire','Sardine','Scorpion','Scythe','Sea Turtle','Secateurs','Seed Finder Potion','Shark','Shark Fin','Shooting Star','Shovel','Shrimp','Silver','Silver Bars','Silver Ore','Silver Scimitar','Star Lamp','Skeleton','Skeleton Cemetery','Skeleton Ghost','Skeleton King','Skeleton Mage','Skeleton Monks','Skeleton Prisoner','Skeleton Shield','Skeleton Sword','Snail','Snake','Snake Armor','Snakeskin Cape','Spells','Squid','Staff','Starfruit','Statue','Stinger','Stone','Stone Amulet','Stone Ring','Strength Potion','Striped Crystal Leaf','Striped Gold Leaf','Striped Green Leaf','Super Bow','Super Compost Potion','Super HP Potion','Super Jungle Shield','Super Poison Arrows','Super Poison Spear','Super Poison Trident','Super Rocket Speed Potion','Swordfish','Teddy Bear','Teleport Spell','Thief','Time Machine','Titanium','Titanium Armor','Titanium Bars','Titanium Ore','Titanium Potion','Tools','Trading Post','Train','Trawler','Treasure Chest','Treasure Map','Tree Downgrade Potion','Tree Roots Potion','Tree Upgrade Potion','Tribe','Trident','Trident Soldier','Trident Soldier Helmet','Voting Card','Weapons','Wells','Whale','Willow Logs','Woodcutting','Zombie','This is an Easter Egg']
const wordListFood = [
'Acorn Squash','Alfalfa Sprouts','Almond','Anchovy','Anise','Appetite','Appetizer','Apple','Apricot','Artichoke','Asparagus','Aspic','Ate','Avocado','Bacon','Bagel','Bake','Baked Alaska','Bamboo Shoots','Banana','Barbecue','Barley','Basil','Batter','Beancurd','Beans','Beef','Beet','Bell Pepper','Berry','Biscuit','Bitter','Black Beans','Black Tea','Black-Eyed Peas','Blackberry','Bland','Blood Orange','Blueberry','Boil','Bowl','Boysenberry','Bran','Bread','Breadfruit','Breakfast','Brisket','Broccoli','Broil','Brown Rice','Brownie','Brunch','Brussels Sprouts','Buckwheat','Buns','Burrito','Butter','Butter Bean','Cake','Calorie','Candy','Candy Apple','Cantaloupe','Capers','Caramel','Caramel Apple','Carbohydrate','Carrot','Cashew','Cassava','Casserole','Cater','Cauliflower','Caviar','Cayenne Pepper','Celery','Cereal','Chard','Cheddar','Cheese','Cheesecake','Chef','Cherry','Chew','Chick Peas','Chicken','Chili','Chips','Chives','Chocolate','Chopsticks','Chow','Chutney','Cilantro','Cinnamon','Citron','Citrus','Clam','Cloves','Cobbler','Coconut','Cod','Coffee','Coleslaw','Collard Greens','Comestibles','Cook','Cookbook','Cookie','Corn','Cornflakes','Cornmeal','Cottage Cheese','Crab','Crackers','Cranberry','Cream','Cream Cheese','Crepe','Crisp','Crunch','Crust','Cucumber','Cuisine','Cupboard','Cupcake','Curds','Currants','Curry','Custard','Daikon','Daily Bread','Dairy','Dandelion Greens','Danish Pastry','Dates','Dessert','Diet','Digest','Digestive System','Dill','Dine','Diner','Dinner','Dip','Dish','Dough','Doughnut','Dragonfruit','Dressing','Dried','Drink','Dry','Durian','Eat','Edam Cheese','Edible','Egg','Eggplant','Elderberry','Endive','Entree','Fast','Fat','Fava Beans','Feast','Fed','Feed','Fennel','Fig','Fillet','Fire','Fish','Flan','Flax','Flour','Food','Food Pyramid','Foodstuffs','Fork','Freezer','French Fries','Fried','Fritter','Frosting','Fruit','Fry','Garlic','Gastronomy','Gelatin','Ginger','Ginger Ale','Gingerbread','Glasses','Gouda Cheese','Grain','Granola','Grape','Grapefruit','Grated','Gravy','Green Bean','Green Tea','Greens','Grub','Guacamole','Guava','Gyro','Halibut','Ham','Hamburger','Hash','Hazelnut','Herbs','Honey','Honeydew','Horseradish','Hot','Hot Dog','Hot Sauce','Hummus','Hunger','Hungry','Ice','Ice Cream','Ice Cream Cone','Iceberg Lettuce','Iced Tea','Icing','Jackfruit','Jalapeño','Jam','Jelly','Jellybeans','Jicama','Jimmies','Jordan Almonds','Jug','Juice','Julienne','Junk Food','Kale','Kebab','Ketchup','Kettle','Kettle Corn','Kidney Beans','Kitchen','Kiwi','Knife','Kohlrabi','Kumquat','Ladle','Lamb','Lard','Lasagna','Legumes','Lemon','Lemonade','Lentils','Lettuce','Licorice','Lima Beans','Lime','Liver','Loaf','Lobster','Lollipop','Loquat','Lox','Lunch','Lunch Box','Lunchmeat','Lychee','Macaroni','Macaroon','Main Course','Maize','Mandarin Orange','Mango','Maple Syrup','Margarine','Marionberry','Marmalade','Marshmallow','Mashed Potatoes','Mayonnaise','Meat','Meatball','Meatloaf','Melon','Menu','Meringue','Micronutrient','Milk','Milkshake','Millet','Mincemeat','Minerals','Mint','Mints','Mochi','Molasses','Mole Sauce','Mozzarella','Muffin','Mug','Munch','Mushroom','Mussels','Mustard','Mustard Greens','Mutton','Napkin','Nectar','Nectarine','Nibble','Noodles','Nosh','Nourish','Nourishment','Nut','Nutmeg','Nutrient','Nutrition','Nutritious','Oatmeal','Oats','Oil','Okra','Oleo','Olive','Omelet','Omnivore','Onion','Orange','Order','Oregano','Oven','Oyster','Pan','Pancake','Papaya','Parsley','Parsnip','Pasta','Pastry','Pate','Patty','Pattypan Squash','Pea','Pea Pod','Peach','Peanut','Peanut Butter','Pear','Pecan','Pepper','Pepperoni','Persimmon','Pickle','Picnic','Pie','Pilaf','Pineapple','Pita Bread','Pitcher','Pizza','Plate','Platter','Plum','Poached','Pomegranate','Pomelo','Pop','Popcorn','Popovers','Popsicle','Pork','Pork Chops','Pot','Pot Roast','Potato','Preserves','Pretzel','Prime Rib','Protein','Provisions','Prune','Pudding','Pumpernickel','Pumpkin','Punch','Quiche','Quinoa','Radish','Raisin','Raspberry','Rations','Ravioli','Recipe','Refreshments','Refrigerator','Relish','Restaurant','Rhubarb','Ribs','Rice','Roast','Roll','Rolling Pin','Romaine','Rosemary','Rye','Saffron','Sage','Salad','Salami','Salmon','Salsa','Salt','Sandwich','Sauce','Sauerkraut','Sausage','Savory','Scallops','Scrambled','Seaweed','Seeds','Sesame Seed','Shallots','Sherbet','Shish Kebab','Shrimp','Slaw','Slice','Smoked','Snack','Soda','Soda Bread','Sole','Sorbet','Sorghum','Sorrel','Soup','Sour','Sour Cream','Soy','Soy Sauce','Soybeans','Spaghetti','Spareribs','Spatula','Spices','Spicy','Spinach','Split Peas','Spoon','Spork','Sprinkles','Sprouts','Spuds','Squash','Squid','Steak','Stew','Stir-Fry','Stomach','Stove','Straw','Strawberry','String Bean','Stringy','Strudel','Sub Sandwich','Submarine Sandwich','Succotash','Suet','Sugar','Summer Squash','Sundae','Sunflower','Supper','Sushi','Sustenance','Sweet','Sweet Potato','Swiss Chard','Syrup','Taco','Take-Out','Tamale','Tangerine','Tapioca','Taro','Tarragon','Tart','Tea','Teapot','Teriyaki','Thyme','Toast','Toaster','Toffee','Tofu','Tomatillo','Tomato','Torte','Tortilla','Tuber','Tuna','Turkey','Turmeric','Turnip','Ugli Fruit','Unleavened','Utensils','Vanilla','Veal','Vegetable','Venison','Vinegar','Vitamin','Wafer','Waffle','Walnut','Wasabi','Water','Water Chestnut','Watercress','Watermelon','Wheat','Whey','Whipped Cream','Wok','Yam','Yeast','Yogurt','Yolk','Zucchini']
const wordListBody = [
'Abdomen','Adenoids','Adrenal Gland','Anatomy','Ankle','Appendix','Arch','Arm','Artery','Back','Ball Of The Foot','Belly','Belly Button','Big Toe','Bladder','Blood','Blood Vessels','Body','Bone','Brain','Breast','Calf','Capillary','Carpal','Cartilage','Cell','Cervical Vertebrae','Cheek','Chest','Chin','Circulatory System','Clavicle','Coccyx','Collar Bone','Diaphragm','Digestive System','Ear','Ear Lobe','Elbow','Endocrine System','Esophagus','Eye','Eyebrow','Eyelashes','Eyelid','Face','Fallopian Tubes','Feet','Femur','Fibula','Filling','Finger','Fingernail','Follicle','Foot','Forehead','Gallbladder','Glands','Groin','Gums','Hair','Hand','Head','Heart','Heel','Hip','Humerus','Immune System','Index Finger','Instep','Intestines','Iris','Jaw','Kidney','Knee','Larynx','Leg','Ligament','Lip','Liver','Lobe','Lumbar Vertebrae','Lungs','Lymph Node','Mandible','Metacarpal','Metatarsal','Molar','Mouth','Muscle','Nail','Navel','Neck','Nerves','Nipple','Nose','Nostril','Organs','Ovary','Palm','Pancreas','Patella','Pelvis','Phalanges','Pharynx','Pinky','Pituitary','Pore','Pupil','Radius','Rectum','Red Blood Cells','Respiratory System','Ribs','Sacrum','Scalp','Scapula','Senses','Shin','Shoulder','Shoulder Blade','Skeleton','Skin','Skull','Sole','Spinal Column','Spinal Cord','Spine','Spleen','Sternum','Stomach','Tarsal','Teeth','Tendon','Testes','Thigh','Thorax','Throat','Thumb','Thyroid','Tibia','Tissue','Toe','Toenail','Tongue','Tonsils','Tooth','Torso','Trachea','Ulna','Ureter','Urethra','Urinary System','Uterus','Uvula','Vein','Vertebra','Waist','White Blood Cells','Wrist']
const wordListClothes = [
'Abaya','Anorak','Apparel','Apron','Ascot Tie','Attire','Balaclava','Ball Gown','Bandanna','Baseball Cap','Bathing Suit','Battledress','Beanie','Bedclothes','Bell-Bottoms','Belt','Beret','Bermuda Shorts','Bib','Bikini','Blazer','Bloomers','Blouse','Boa','Bonnet','Boot','Bow','Bow Tie','Boxer Shorts','Boxers','Bra','Bracelet','Brassiere','Breeches','Briefs','Buckle','Button','Button-Down Shirt','Caftan','Camisole','Camouflage','Cap','Cap And Gown','Cape','Capris','Cardigan','Chemise','Cloak','Clogs','Clothes','Clothing','Coat','Collar','Corset','Costume','Coveralls','Cowboy Boots','Cowboy Hat','Cravat','Crown','Cuff','Cuff Links','Culottes','Cummerbund','Dashiki','Diaper','Dinner Jacket','Dirndl','Drawers','Dress','Dress Shirt','Duds','Dungarees','Earmuffs','Earrings','Elastic','Evening Gown','Fashion','Fatigues','Fedora','Fez','Flak Jacket','Flannel Nightgown','Flannel Shirt','Flip-Flops','Formal Wear','Frock','Fur','Fur Coat','Gabardine','Gaiters','Galoshes','Garb','Garment','Garters','Gear','Getup','Gilet','Girdle','Glasses','Gloves','Gown','Halter Top','Handbag','Handkerchief','Hat','Hawaiian Shirt','Hazmat Suit','Headscarf','Helmet','Hem','High Heels','Hoodie','Hook And Eye','Hose','Hosiery','Hospital Gown','Houndstooth','Housecoat','Jacket','Jeans','Jersey','Jewelry','Jodhpurs','Jumper','Jumpsuit','Kerchief','Khakis','Kilt','Kimono','Kit','Knickers','Lab Coat','Lapel','Leather Jacket','Leg Warmers','Leggings','Leotard','Life Jacket','Lingerie','Loafers','Loincloth','Long Johns','Long Underwear','Miniskirt','Mittens','Moccasins','Muffler','Muumuu','Neckerchief','Necklace','Nightgown','Nightshirt','Onesies','Outerwear','Outfit','Overalls','Overcoat','Overshirt','Pajamas','Panama Hat','Pants','Pantsuit','Pantyhose','Parka','Pea Coat','Peplum','Petticoat','Pinafore','Pleat','Pocket','Pocketbook','Polo Shirt','Poncho','Poodle Skirt','Pork Pie Hat','Pullover','Pumps','Purse','Raincoat','Ring','Robe','Rugby Shirt','Sandals','Sari','Sarong','Scarf','School Uniform','Scrubs','Shawl','Sheath Dress','Shift','Shirt','Shoe','Shorts','Shoulder Pads','Shrug','Singlet','Skirt','Slacks','Slip','Slippers','Smock','Snaps','Sneakers','Sock','Sombrero','Spacesuit','Stetson Hat','Stockings','Stole','Suit','Sun Hat','Sunbonnet','Sundress','Sunglasses','Suspenders','Sweater','Sweatpants','Sweatshirt','Sweatsuit','Swimsuit','T-Shirt','Tam','Tank Top','Teddy','Threads','Tiara','Tie','Tie Clip','Tights','Toga','Togs','Top','Top Coat','Top Hat','Train','Trench Coat','Trousers','Trunks','Tube Top','Tunic','Turban','Turtleneck','Turtleneck Shirt','Tutu','Tux','Tuxedo','Tweed Jacket','Twill','Twin Set','Umbrella','Underclothes','Undershirt','Underwear','Uniform','Veil','Velcro','Vest','Vestments','Visor','Waders','Waistcoat','Wear','Wedding Gown','Wellingtons','Wetsuit','White Tie','Wig','Windbreaker','Woolens','Wrap','Yoke','Zipper','Zoris']
const wordListVerbs = [
'Accept','Ache','Acknowledge','Act','Add','Admire','Admit','Admonish','Adopt','Advise','Affirm','Afford','Agree','Ail','Alert','Allege','Allow','Allude','Amuse','Analyze','Announce','Annoy','Answer','Apologize','Appeal','Appear','Applaud','Appreciate','Approve','Argue','Arrange','Arrest','Arrive','Articulate','Ask','Assert','Assure','Attach','Attack','Attempt','Attend','Attract','Auction','Avoid','Avow','Awake','Babble','Back','Bake','Balance','Balk','Ban','Bandage','Bang','Bar','Bare','Bargain','Bark','Barrage','Barter','Baste','Bat','Bathe','Battle','Bawl','Be','Beam','Bear','Beat','Become','Befriend','Beg','Begin','Behave','Believe','Bellow','Belong','Bend','Berate','Besiege','Bestow','Bet','Bid','Bite','Bleach','Bleed','Bless','Blind','Blink','Blot','Blow','Blurt','Blush','Boast','Bob','Boil','Bolt','Bomb','Book','Bore','Borrow','Bounce','Bow','Box','Brag','Brake','Branch','Brand','Break','Breathe','Breed','Bring','Broadcast','Broil','Bruise','Brush','Bubble','Build','Bump','Burn','Burnish','Bury','Buy','Buzz','Cajole','Calculate','Call','Camp','Care','Carry','Carve','Catch','Cause','Caution','Challenge','Change','Chant','Charge','Chase','Cheat','Check','Cheer','Chew','Chide','Chip','Choke','Chomp','Choose','Chop','Claim','Clap','Clean','Clear','Climb','Clip','Close','Coach','Coil','Collect','Color','Comb','Come','Comfort','Command','Comment','Communicate','Compare','Compete','Complain','Complete','Concede','Concentrate','Concern','Conclude','Concur','Confess','Confide','Confirm','Connect','Consent','Consider','Consist','Contain','Contend','Continue','Cook','Copy','Correct','Cost','Cough','Count','Counter','Cover','Covet','Crack','Crash','Crave','Crawl','Criticize','Croak','Crochet','Cross','Cross-Examine','Crowd','Crush','Cry','Cure','Curl','Curse','Curve','Cut','Cycle','Dam','Damage','Dance','Dare','Deal','Debate','Decay','Deceive','Decide','Decipher','Declare','Decorate','Delay','Delight','Deliver','Demand','Deny','Depend','Describe','Desert','Deserve','Desire','Deter','Develop','Dial','Dictate','Die','Dig','Digress','Direct','Disclose','Dislike','Dive','Divide','Divorce','Divulge','Do','Dock','Dole','Dote','Double','Doubt','Drag','Drain','Draw','Dream','Dress','Drill','Drink','Drip','Drive','Drone','Drop','Drown','Dry','Dump','Dupe','Dust','Dye','Earn','Eat','Echo','Edit','Educate','Elope','Embarrass','Emigrate','Emit','Emphasize','Employ','Empty','Enchant','Encode','Encourage','End','Enjoin','Enjoy','Enter','Entertain','Enunciate','Envy','Equivocate','Escape','Evacuate','Evaporate','Exaggerate','Examine','Excite','Exclaim','Excuse','Exercise','Exhort','Exist','Expand','Expect','Expel','Explain','Explode','Explore','Extend','Extoll','Face','Fade','Fail','Fall','Falter','Fasten','Favor','Fax','Fear','Feed','Feel','Fence','Fetch','Fight','File','Fill','Film','Find','Fire','Fish','Fit','Fix','Flap','Flash','Flee','Float','Flood','Floss','Flow','Flower','Fly','Fold','Follow','Fool','Force','Foretell','Forget','Forgive','Form','Found','Frame','Freeze','Fret','Frighten','Fry','Fume','Garden','Gasp','Gather','Gaze','Gel','Get','Gild','Give','Glide','Glue','Gnaw','Go','Grab','Grate','Grease','Greet','Grill','Grin','Grip','Groan','Grow','Growl','Grumble','Grunt','Guarantee','Guard','Guess','Guide','Gurgle','Gush','Hail','Hammer','Hand','Handle','Hang','Happen','Harass','Harm','Harness','Hate','Haunt','Have','Head','Heal','Heap','Hear','Heat','Help','Hide','Highlight','Hijack','Hinder','Hint','Hiss','Hit','Hold','Hook','Hoot','Hop','Hope','Hover','Howl','Hug','Hum','Hunt','Hurry','Hurt','Ice','Identify','Ignore','Imagine','Immigrate','Implore','Imply','Impress','Improve','Include','Increase','Infect','Inflate','Influence','Inform','Infuse','Inject','Injure','Inquire','Insist','Inspect','Inspire','Instruct','Intend','Interest','Interfere','Interject','Interrupt','Introduce','Invent','Invest','Invite','Iron','Irritate','Itch','Jab','Jabber','Jail','Jam','Jeer','Jest','Jog','Join','Joke','Jolt','Judge','Juggle','Jump','Keep','Kick','Kill','Kiss','Kneel','Knit','Knock','Knot','Know','Label','Lament','Land','Last','Laugh','Lay','Lead','Lean','Learn','Leave','Lecture','Lend','Let','Level','License','Lick','Lie','Lift','Light','Lighten','Like','List','Listen','Live','Load','Loan','Lock','Long','Look','Loosen','Lose','Love','Lower','Mail','Maintain','Make','Man','Manage','Mar','March','Mark','Marry','Marvel','Mate','Matter','Mean','Measure','Meet','Melt','Memorize','Mend','Mention','Merge','Milk','Mine','Miss','Mix','Moan','Molt','Moor','Mourn','Move','Mow','Mug','Multiply','Mumble','Murder','Mutter','Nag','Nail','Name','Nap','Need','Nest','Nod','Note','Notice','Number','Obey','Object','Observe','Obtain','Occur','Offend','Offer','Ogle','Oil','Omit','Open','Operate','Order','Overflow','Overrun','Owe','Own','Pack','Pad','Paddle','Paint','Pant','Park','Part','Pass','Paste','Pat','Pause','Pay','Peck','Pedal','Peel','Peep','Peer','Peg','Pelt','Perform','Permit','Pester','Pet','Phone','Pick','Pinch','Pine','Place','Plan','Plant','Play','Plead','Please','Pledge','Plow','Plug','Point','Poke','Polish','Ponder','Pop','Possess','Post','Postulate','Pour','Practice','Pray','Preach','Precede','Predict','Prefer','Prepare','Present','Preserve','Press','Pretend','Prevent','Prick','Print','Proceed','Proclaim','Produce','Profess','Program','Promise','Propose','Protect','Protest','Provide','Pry','Pull','Pump','Punch','Puncture','Punish','Push','Put','Question','Quilt','Quit','Quiz','Quote','Race','Radiate','Rain','Raise','Rant','Rate','Rave','Reach','Read','Realize','Rebuff','Recall','Receive','Recite','Recognize','Recommend','Record','Reduce','Reflect','Refuse','Regret','Reign','Reiterate','Reject','Rejoice','Relate','Relax','Release','Rely','Remain','Remember','Remind','Remove','Repair','Repeat','Replace','Reply','Report','Reprimand','Reproduce','Request','Rescue','Retire','Retort','Return','Reveal','Reverse','Rhyme','Ride','Ring','Rinse','Rise','Risk','Roar','Rob','Rock','Roll','Rot','Row','Rub','Ruin','Rule','Run','Rush','Sack','Sail','Satisfy','Save','Savor','Saw','Say','Scare','Scatter','Scoff','Scold','Scoot','Scorch','Scrape','Scratch','Scream','Screech','Screw','Scribble','Seal','Search','See','Sell','Send','Sense','Separate','Serve','Set','Settle','Sever','Sew','Shade','Shampoo','Share','Shave','Shelter','Shift','Shiver','Shock','Shoot','Shop','Shout','Show','Shriek','Shrug','Shut','Sigh','Sign','Signal','Sin','Sing','Singe','Sip','Sit','Skate','Skateboard','Sketch','Ski','Skip','Slap','Sleep','Slice','Slide','Slip','Slow','Smash','Smell','Smile','Smoke','Snap','Snarl','Snatch','Sneak','Sneer','Sneeze','Snicker','Sniff','Snoop','Snooze','Snore','Snort','Snow','Soak','Sob','Soothe','Sound','Sow','Span','Spare','Spark','Sparkle','Speak','Speculate','Spell','Spend','Spill','Spin','Spoil','Spot','Spray','Sprout','Sputter','Squash','Squeeze','Stab','Stain','Stammer','Stamp','Stand','Star','Stare','Start','Stash','State','Stay','Steer','Step','Stipulate','Stir','Stitch','Stop','Store','Storm','Stow','Strap','Stray','Strengthen','Stress','Stretch','Strip','Stroke','Strum','Strut','Stuff','Stun','Stunt','Stutter','Submerge','Succeed','Suffer','Suggest','Suit','Supply','Support','Suppose','Surmise','Surprise','Surround','Suspect','Suspend','Sway','Swear','Swim','Swing','Switch','Swoop','Sympathize','Take','Talk','Tame','Tap','Taste','Taunt','Teach','Tear','Tease','Telephone','Tell','Tempt','Terrify','Test','Testify','Thank','Thaw','Theorize','Think','Threaten','Throw','Thunder','Tick','Tickle','Tie','Time','Tip','Tire','Toast','Toss','Touch','Tour','Tow','Trace','Track','Trade','Train','Translate','Transport','Trap','Travel','Treat','Tremble','Trick','Trickle','Trim','Trip','Trot','Trouble','Trounce','Trust','Try','Tug','Tumble','Turn','Twist','Type','Understand','Undress','Unfasten','Unite','Unlock','Unpack','Untie','Uphold','Upset','Upstage','Urge','Use','Usurp','Utter','Vacuum','Value','Vanish','Vanquish','Venture','Visit','Voice','Volunteer','Vote','Vouch','Wail','Wait','Wake','Walk','Wallow','Wander','Want','Warm','Warn','Wash','Waste','Watch','Water','Wave','Waver','Wear','Weave','Wed','Weigh','Welcome','Whimper','Whine','Whip','Whirl','Whisper','Whistle','Win','Wink','Wipe','Wish','Wobble','Wonder','Work','Worry','Wrap','Wreck','Wrestle','Wriggle','Write','Writhe','X-Ray','Yawn','Yell','Yelp','Yield','Yodel','Zip','Zoom']
let word = '';
let theme = '';
let letters = 0;
let tries = 7;
let guessedLetters = ''
let display;
let scores = JSON.parse(fs.readFileSync('scores.json'));

function play(item,sender) {
	//Se precisarem de ajuda
	if (item.startsWith('help')) {
		publishMessage(`Use <b>"!play"</b> to start, <b>"!letter"</b> to make a guess (E.g. "!m" ) or <b>"!word"</b> (E.g. "!lava snake" ) to guess the word`)
	//Se quiserem saber quantos pontos tem
	} else if (item.startsWith('score')) {
		if (item.includes('food')) {
			if (scores.foods[sender] !== undefined) {
				publishMessage(`<b>${sender}</b> has <b>${scores.foods[sender]} points</b>`)
			} else {
				publishMessage(`<b>${sender}</b> has <b>0 points</b>`)
			}
		} else if (item.includes('clothe')) {
			if (scores.clothes[sender] !== undefined) {
				publishMessage(`<b>${sender}</b> has <b>${scores.clothes[sender]} points</b>`)
			} else {
				publishMessage(`<b>${sender}</b> has <b>0 points</b>`)
			}
		} else if (item.includes('body')) {
			if (scores.body[sender] !== undefined) {
				publishMessage(`<b>${sender}</b> has <b>${scores.body[sender]} points</b>`)
			} else {
				publishMessage(`<b>${sender}</b> has <b>0 points</b>`)
			}
		} else if (item.includes('verb')) {
			if (scores.verbs[sender] !== undefined) {
				publishMessage(`<b>${sender}</b> has <b>${scores.verbs[sender]} points</b>`)
			} else {
				publishMessage(`<b>${sender}</b> has <b>0 points</b>`)
			}
		} else {
			if (scores.dh[sender] !== undefined) {
				publishMessage(`<b>${sender}</b> has <b>${scores.dh[sender]} points</b>`)
			} else {
				publishMessage(`<b>${sender}</b> has <b>0 points</b>`)
			}
		}
	//Se quiserem ver o top
	} else if  (item.startsWith('top')) {
		let sortedScores;
		if (item.includes('food')) {
			sortedScores = Object.entries(scores.foods).sort((a, b) => b[1] - a[1]);
		} else if (item.includes('clothe')) {
			sortedScores = Object.entries(scores.clothes).sort((a, b) => b[1] - a[1]);
		} else if (item.includes('body')) {
			sortedScores = Object.entries(scores.body).sort((a, b) => b[1] - a[1]);
		} else if (item.includes('verb')) {
			sortedScores = Object.entries(scores.verbs).sort((a, b) => b[1] - a[1]);
		} else {
			sortedScores = Object.entries(scores.dh).sort((a, b) => b[1] - a[1]);
		}
		const topFive = sortedScores.slice(0, 5);
		let tops = '<b>Top Scores:</b>';
		topFive.forEach(([sender, points], index) => {
			tops += `<br>${index + 1}. <b>${sender}:</b> ${points} points`;
		});
		publishMessage(tops);
	//Se não tiver nenhuma palavra
	} else if (item.startsWith('theme')) {
		publishMessage(`<b>Available Themes Are:</b> DH, Body, Clothes, Food and Verbs`)
	} else if (word == '') {
		if (item.startsWith('hangman') || item.startsWith('play') || item.startsWith('word')) {
			if (item.includes('food')) {
				word = wordListFood[Math.floor(Math.random() * (wordListFood.length + 1))]
				theme = 'foods'
			} else if (item.includes('body')) {
				word = wordListBody[Math.floor(Math.random() * (wordListBody.length + 1))]
				theme = 'body'
			} else if (item.includes('clothe')) {
				word = wordListClothes[Math.floor(Math.random() * (wordListClothes.length + 1))]
				theme = 'clothes'
			} else if (item.includes('verb')) {
				word = wordListVerbs[Math.floor(Math.random() * (wordListVerbs.length + 1))]
				theme = 'verbs'
			} else {
				word = wordListDH[Math.floor(Math.random() * (wordListDH.length + 1))]
				theme = 'dh'
			}
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
						if (!scores[theme][sender]) {
						  scores[theme][sender] = tries;
						} else {
						  scores[theme][sender] += tries;
						}
						fs.writeFileSync('scores.json', JSON.stringify(scores));
						word = ''
						theme = ''
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
						theme = ''
					}
				}
			}
		//Caso chute a palavra inteira corretamente
		} else if (word.toLowerCase().replace(/\s+/g, '') == item) {
			publishMessage(`<b>"${word}"</b> is the word! Congrats ${sender}, you will not be hanged, at least for now.`)
			if (!scores[theme][sender]) {
			  scores[theme][sender] = tries;
			} else {
			  scores[theme][sender] += tries;
			}
			fs.writeFileSync('scores.json', JSON.stringify(scores));
			word = ''
			theme = ''
		//Caso chute a palavra inteira incorretamente
		} else {
			publishMessage(`This is not the word ${sender}.`)
		}
	}
}

const setupPubNub = () => {
        // Update this block with your publish/subscribe keys
        pubnub = new PubNub({
            publishKey : "",
            subscribeKey : "",
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
            channels: ["hello_world"]
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

const publishMessage = async (message) => {
	pubnub.publish({channel : "hello_world",message: {description: message,sender: 'Chat Bot'}});
};

setupPubNub();

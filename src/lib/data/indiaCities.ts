/**
 * Principal cities and towns (mostly district headquarters) for each state and union territory, so a person picks
 * their state first and then their city from that state's list. A place that is not listed can always be typed in
 * ("Other"), so nobody is ever stuck.
 */
export const CITIES_BY_STATE: Record<string, string[]> = {
  "Andaman and Nicobar Islands": ["Port Blair", "Diglipur", "Mayabunder", "Rangat", "Car Nicobar", "Hut Bay"],
  "Andhra Pradesh": [
    "Visakhapatnam", "Vijayawada", "Guntur", "Nellore", "Kurnool", "Rajahmundry", "Tirupati", "Kakinada", "Kadapa", "Anantapur",
    "Eluru", "Ongole", "Chittoor", "Machilipatnam", "Srikakulam", "Vizianagaram", "Amaravati", "Nandyal", "Hindupur", "Proddatur",
    "Bhimavaram", "Tenali", "Madanapalle", "Dharmavaram", "Tadepalligudem", "Chilakaluripet", "Narasaraopet", "Adoni",
  ],
  "Arunachal Pradesh": ["Itanagar", "Naharlagun", "Pasighat", "Tawang", "Ziro", "Bomdila", "Along", "Tezu", "Changlang", "Roing"],
  Assam: [
    "Guwahati", "Silchar", "Dibrugarh", "Jorhat", "Nagaon", "Tinsukia", "Tezpur", "Bongaigaon", "Dhubri", "Diphu", "North Lakhimpur",
    "Goalpara", "Sivasagar", "Karimganj", "Barpeta", "Golaghat", "Hailakandi", "Kokrajhar", "Mangaldoi", "Nalbari",
  ],
  Bihar: [
    "Patna", "Gaya", "Bhagalpur", "Muzaffarpur", "Purnia", "Darbhanga", "Bihar Sharif", "Arrah", "Begusarai", "Katihar", "Munger",
    "Chhapra", "Danapur", "Saharsa", "Hajipur", "Sasaram", "Dehri", "Siwan", "Motihari", "Nawada", "Bagaha", "Buxar", "Kishanganj",
    "Sitamarhi", "Jamalpur", "Jehanabad", "Aurangabad", "Samastipur", "Madhubani", "Bettiah", "Araria", "Supaul",
  ],
  Chandigarh: ["Chandigarh"],
  Chhattisgarh: [
    "Raipur", "Bhilai", "Bilaspur", "Korba", "Durg", "Rajnandgaon", "Raigarh", "Jagdalpur", "Ambikapur", "Dhamtari", "Mahasamund",
    "Kawardha", "Kanker", "Janjgir", "Naila", "Champa", "Bemetara", "Dalli Rajhara", "Chirmiri",
  ],
  "Dadra and Nagar Haveli and Daman and Diu": ["Daman", "Diu", "Silvassa", "Naroli", "Amli"],
  Delhi: [
    "New Delhi", "Central Delhi", "North Delhi", "South Delhi", "East Delhi", "West Delhi", "North East Delhi", "North West Delhi",
    "South West Delhi", "South East Delhi", "Shahdara", "Dwarka", "Rohini", "Karol Bagh", "Connaught Place", "Saket", "Janakpuri",
    "Laxmi Nagar", "Pitampura", "Mayur Vihar", "Narela", "Najafgarh",
  ],
  Goa: ["Panaji", "Margao", "Vasco da Gama", "Mapusa", "Ponda", "Bicholim", "Curchorem", "Sanquelim", "Canacona", "Pernem", "Quepem", "Valpoi"],
  Gujarat: [
    "Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar", "Jamnagar", "Junagadh", "Gandhinagar", "Anand", "Nadiad", "Morbi",
    "Mehsana", "Bharuch", "Porbandar", "Palanpur", "Valsad", "Vapi", "Navsari", "Surendranagar", "Bhuj", "Godhra", "Patan",
    "Amreli", "Dahod", "Veraval", "Botad", "Gondal", "Ankleshwar", "Himmatnagar", "Dwarka", "Somnath", "Kalol", "Modasa",
  ],
  Haryana: [
    "Gurugram", "Faridabad", "Panipat", "Ambala", "Yamunanagar", "Rohtak", "Hisar", "Karnal", "Sonipat", "Panchkula", "Bhiwani",
    "Sirsa", "Bahadurgarh", "Jind", "Thanesar", "Kaithal", "Rewari", "Narnaul", "Pundri", "Kosli", "Palwal", "Fatehabad", "Nuh",
    "Charkhi Dadri", "Jhajjar", "Mahendragarh", "Hansi", "Safidon",
  ],
  "Himachal Pradesh": [
    "Shimla", "Dharamshala", "Solan", "Mandi", "Kullu", "Manali", "Hamirpur", "Una", "Bilaspur", "Chamba", "Nahan", "Kangra",
    "Palampur", "Baddi", "Nalagarh", "Sundernagar", "Paonta Sahib", "Rampur", "Keylong", "Kinnaur", "Reckong Peo", "Parwanoo",
  ],
  "Jammu and Kashmir": [
    "Srinagar", "Jammu", "Anantnag", "Baramulla", "Sopore", "Kathua", "Udhampur", "Punch", "Rajouri", "Kupwara", "Budgam", "Pulwama",
    "Handwara", "Bandipora", "Ganderbal", "Kulgam", "Shopian", "Doda", "Kishtwar", "Reasi", "Samba", "Ramban", "Akhnoor", "Katra",
  ],
  Jharkhand: [
    "Ranchi", "Jamshedpur", "Dhanbad", "Bokaro Steel City", "Deoghar", "Hazaribagh", "Giridih", "Ramgarh", "Medininagar", "Chirkunda",
    "Phusro", "Dumka", "Chaibasa", "Sahibganj", "Lohardaga", "Gumla", "Pakur", "Godda", "Chatra", "Jhumri Telaiya", "Simdega",
  ],
  Karnataka: [
    "Bengaluru", "Mysuru", "Hubballi", "Dharwad", "Mangaluru", "Belagavi", "Kalaburagi", "Davanagere", "Ballari", "Vijayapura",
    "Shivamogga", "Tumakuru", "Raichur", "Bidar", "Hosapete", "Udupi", "Hassan", "Gadag", "Mandya", "Chitradurga", "Kolar",
    "Chikkamagaluru", "Madikeri", "Karwar", "Bagalkot", "Haveri", "Koppal", "Ramanagara", "Chikkaballapur", "Yadgir", "Sirsi",
  ],
  Kerala: [
    "Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur", "Kollam", "Kannur", "Alappuzha", "Palakkad", "Kottayam", "Malappuram",
    "Manjeri", "Thalassery", "Ponnani", "Kasaragod", "Pathanamthitta", "Idukki", "Wayanad", "Kalpetta", "Guruvayur", "Muvattupuzha",
    "Changanassery", "Kayamkulam", "Neyyattinkara", "Attingal", "Taliparamba", "Vatakara",
  ],
  Ladakh: ["Leh", "Kargil", "Nubra", "Zanskar", "Drass"],
  Lakshadweep: ["Kavaratti", "Agatti", "Minicoy", "Amini", "Andrott", "Kalpeni"],
  "Madhya Pradesh": [
    "Indore", "Bhopal", "Jabalpur", "Gwalior", "Ujjain", "Sagar", "Dewas", "Satna", "Ratlam", "Rewa", "Murwara", "Singrauli", "Burhanpur",
    "Khandwa", "Bhind", "Chhindwara", "Guna", "Shivpuri", "Vidisha", "Chhatarpur", "Damoh", "Mandsaur", "Khargone", "Neemuch", "Pithampur",
    "Hoshangabad", "Itarsi", "Sehore", "Betul", "Seoni", "Datia", "Nagda", "Morena", "Katni", "Mhow", "Dhar", "Balaghat", "Shahdol",
    "Panna", "Tikamgarh", "Sidhi", "Ashoknagar", "Raisen", "Jhabua", "Barwani",
  ],
  Maharashtra: [
    "Mumbai", "Pune", "Nagpur", "Nashik", "Thane", "Aurangabad", "Solapur", "Kolhapur", "Amravati", "Navi Mumbai", "Sangli", "Jalgaon",
    "Akola", "Latur", "Dhule", "Ahmednagar", "Chandrapur", "Parbhani", "Ichalkaranji", "Jalna", "Ambarnath", "Bhiwandi", "Nanded",
    "Malegaon", "Kalyan", "Dombivli", "Vasai-Virar", "Mira-Bhayandar", "Pimpri-Chinchwad", "Satara", "Ratnagiri", "Wardha", "Yavatmal",
    "Beed", "Osmanabad", "Gondia", "Bhandara", "Buldhana", "Washim", "Hingoli", "Nandurbar", "Sindhudurg", "Alibag", "Panvel", "Shirdi",
    "Pandharpur", "Baramati", "Lonavala", "Karad", "Bhusawal", "Achalpur",
  ],
  Manipur: ["Imphal", "Thoubal", "Bishnupur", "Churachandpur", "Kakching", "Ukhrul", "Senapati", "Tamenglong", "Jiribam", "Moreh"],
  Meghalaya: ["Shillong", "Tura", "Jowai", "Nongstoin", "Baghmara", "Williamnagar", "Nongpoh", "Mawkyrwat", "Resubelpara"],
  Mizoram: ["Aizawl", "Lunglei", "Champhai", "Serchhip", "Kolasib", "Saiha", "Lawngtlai", "Mamit"],
  Nagaland: ["Kohima", "Dimapur", "Mokokchung", "Tuensang", "Wokha", "Zunheboto", "Phek", "Mon", "Longleng", "Kiphire"],
  Odisha: [
    "Bhubaneswar", "Cuttack", "Rourkela", "Berhampur", "Sambalpur", "Puri", "Balasore", "Bhadrak", "Baripada", "Jharsuguda", "Jeypore",
    "Barbil", "Rayagada", "Bargarh", "Kendujhar", "Angul", "Dhenkanal", "Koraput", "Paradip", "Bolangir", "Talcher", "Jajpur", "Kendrapara",
    "Sundargarh", "Phulbani", "Nabarangpur", "Malkangiri", "Nayagarh", "Khordha", "Konark",
  ],
  Puducherry: ["Puducherry", "Karaikal", "Mahe", "Yanam", "Ozhukarai", "Villianur", "Ariyankuppam"],
  Punjab: [
    "Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Bathinda", "Mohali", "Pathankot", "Hoshiarpur", "Batala", "Moga", "Abohar",
    "Malerkotla", "Khanna", "Phagwara", "Muktsar", "Barnala", "Firozpur", "Kapurthala", "Rajpura", "Zirakpur", "Sangrur", "Faridkot",
    "Gurdaspur", "Fazilka", "Mansa", "Rupnagar", "Nawanshahr", "Tarn Taran", "Fatehgarh Sahib", "Anandpur Sahib", "Dera Bassi",
  ],
  Rajasthan: [
    "Jaipur", "Jodhpur", "Udaipur", "Kota", "Ajmer", "Bikaner", "Bhilwara", "Alwar", "Sikar", "Bharatpur", "Pali", "Sri Ganganagar",
    "Hanumangarh", "Tonk", "Kishangarh", "Beawar", "Chittorgarh", "Jhunjhunu", "Hindaun", "Churu", "Barmer", "Jaisalmer", "Sawai Madhopur",
    "Nagaur", "Dausa", "Banswara", "Bundi", "Baran", "Dungarpur", "Jhalawar", "Karauli", "Dholpur", "Sirohi", "Rajsamand", "Pratapgarh",
    "Khatu Shyam Ji", "Nathdwara", "Pushkar", "Mount Abu", "Fatehpur", "Ramgarh", "Salasar", "Bhiwadi", "Neemrana", "Kuchaman City",
    "Didwana", "Ladnun", "Makrana", "Sujangarh", "Ratangarh",
  ],
  Sikkim: ["Gangtok", "Namchi", "Gyalshing", "Mangan", "Rangpo", "Singtam", "Jorethang", "Ravangla", "Pelling"],
  "Tamil Nadu": [
    "Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem", "Tirunelveli", "Tiruppur", "Erode", "Vellore", "Thoothukudi",
    "Dindigul", "Thanjavur", "Ranipet", "Sivakasi", "Karur", "Udhagamandalam", "Hosur", "Nagercoil", "Kanchipuram", "Kumbakonam",
    "Rajapalayam", "Pudukkottai", "Ambur", "Tiruvannamalai", "Pollachi", "Cuddalore", "Namakkal", "Karaikudi", "Neyveli", "Nagapattinam",
    "Krishnagiri", "Dharmapuri", "Ariyalur", "Perambalur", "Ramanathapuram", "Tenkasi", "Virudhunagar", "Theni", "Tiruvarur", "Villupuram",
    "Rameswaram", "Kodaikanal", "Chengalpattu", "Mayiladuthurai",
  ],
  Telangana: [
    "Hyderabad", "Warangal", "Nizamabad", "Karimnagar", "Khammam", "Ramagundam", "Mahbubnagar", "Nalgonda", "Adilabad", "Suryapet",
    "Siddipet", "Miryalaguda", "Jagtial", "Mancherial", "Kothagudem", "Secunderabad", "Sangareddy", "Medak", "Vikarabad", "Bhongir",
    "Kamareddy", "Nirmal", "Wanaparthy", "Gadwal", "Jangaon", "Peddapalli", "Sircilla", "Mahabubabad",
  ],
  Tripura: ["Agartala", "Udaipur", "Dharmanagar", "Kailasahar", "Belonia", "Ambassa", "Khowai", "Teliamura", "Bishalgarh", "Sabroom"],
  "Uttar Pradesh": [
    "Lucknow", "Kanpur", "Ghaziabad", "Agra", "Varanasi", "Meerut", "Prayagraj", "Bareilly", "Aligarh", "Moradabad", "Saharanpur", "Gorakhpur",
    "Noida", "Greater Noida", "Firozabad", "Jhansi", "Muzaffarnagar", "Mathura", "Vrindavan", "Budaun", "Rampur", "Shahjahanpur", "Farrukhabad",
    "Ayodhya", "Maunath Bhanjan", "Hapur", "Etawah", "Mirzapur", "Bulandshahr", "Sambhal", "Amroha", "Hardoi", "Fatehpur", "Raebareli",
    "Orai", "Sitapur", "Bahraich", "Modinagar", "Unnao", "Jaunpur", "Lakhimpur", "Hathras", "Banda", "Pilibhit", "Barabanki", "Mughalsarai",
    "Khurja", "Gonda", "Mainpuri", "Lalitpur", "Etah", "Deoria", "Ujhani", "Ghazipur", "Sultanpur", "Azamgarh", "Bijnor", "Basti",
    "Chandausi", "Akbarpur", "Ballia", "Mau", "Kasganj", "Kannauj", "Auraiya", "Chitrakoot", "Sonbhadra", "Baghpat", "Shamli", "Kushinagar",
  ],
  Uttarakhand: [
    "Dehradun", "Haridwar", "Roorkee", "Haldwani", "Rudrapur", "Kashipur", "Rishikesh", "Nainital", "Pithoragarh", "Almora", "Mussoorie",
    "Kotdwara", "Ramnagar", "Pauri", "Tehri", "Chamoli", "Uttarkashi", "Bageshwar", "Champawat", "Srinagar", "Sitarganj", "Jaspur", "Kedarnath",
    "Badrinath",
  ],
  "West Bengal": [
    "Kolkata", "Howrah", "Durgapur", "Asansol", "Siliguri", "Bardhaman", "Malda", "Baharampur", "Habra", "Kharagpur", "Shantipur", "Dankuni",
    "Dhulian", "Ranaghat", "Haldia", "Raiganj", "Krishnanagar", "Nabadwip", "Medinipur", "Jalpaiguri", "Balurghat", "Basirhat", "Bankura",
    "Chakdaha", "Darjeeling", "Alipurduar", "Purulia", "Jangipur", "Bolpur", "Bangaon", "Cooch Behar", "Kalyani", "Barasat", "Barrackpore",
    "Kalimpong", "Tamluk", "Contai", "Digha", "Sainthia", "Suri",
  ],
};

/** The marker for a place that is not in the list: the person types it in. */
export const OTHER_CITY = "Other (type your city)";

/** The cities to offer for a state (empty when the state has no list). */
export const citiesFor = (state: string): string[] => CITIES_BY_STATE[state] ?? [];

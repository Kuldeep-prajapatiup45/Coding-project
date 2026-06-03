
/* --- THE COMPACT DATA OBJECT WITH ONLY PASSIVE RECON AS CHAPTER 1 --- */
const chaptersData = [
    {
        id: "ch1",
        title: "Chapter 1: Passive Reconnaissance Labs",
        subtopics: [
            {
                id: "recon_whois",
                title: "1. WHOIS Verification",
                intro: "WHOIS एक ऐसा प्रोटोकॉल है जिसका इस्तेमाल किसी भी डोमेन की 'जन्मकुंडली' यानी उसकी रजिस्ट्रेशन डिटेल्स निकालने के लिए किया जाता है। इससे हमें यह पता चलता है कि डोमेन को किस कंपनी (Registrar) से खरीदा गया है, और यह कब एक्सपायर होने वाला है।",
                info: "🔍 <b>हम क्या ढूंढते हैं?</b><br>• Registrar प्रदाता कंपनी का नाम।<br>• Creation और Expiry की सही तारीखें।",
                example: "🌍 Real-world Example: जैसे सरकारी रजिस्ट्री ऑफिस जाकर आप किसी जमीन के असली कागजात की जानकारी निकाल सकते हैं, वैसे ही इंटरनेट पर WHOIS के जरिए किसी डोमेन के रजिस्ट्रेशन पेपर्स देखे जाते हैं।",
                command: "# Linux टर्मिनल पर किसी भी डोमेन का WHOIS डेटा निकालने के लिए:\n$ whois certifiedhacker.com\n\n# टास्क: इस कमांड को चलाकर देखें कि certifiedhacker का Registrar कौन है!",
                isCtf: false
            },
            {
                id: "recon_rdap",
                title: "2. RDAP (Modern WHOIS)",
                intro: "RDAP पुराना WHOIS का एक एकदम आधुनिक और एडवांस अपग्रेड है। पुराना WHOIS डेटा को प्लेन टेक्स्ट में देता था जिससे पार्सिंग (डेटा निकालना) मुश्किल थी, लेकिन RDAP हमें सारा डेटा एकदम आर्किटेक्चरल तरीके से <b>JSON Format</b> में देता है।",
                info: "💡 साइबर सिक्योरिटी टूल्स और ऑटोमेशन स्क्रिप्ट्स (Python/Bash) में RDAP का सबसे ज्यादा इस्तेमाल किया जाता है क्योंकि JSON डेटा को रीयुज करना बेहद आसान होता है।",
                example: "🌍 Real-world Example: पुराना WHOIS एक हाथ से लिखा हुआ पुराना सरकारी रजिस्टर है, जबकि RDAP एक कंप्यूटराइज्ड सेंट्रलाइज्ड डिजिटल डेटाबेस है जहाँ से एक क्लिक में सॉर्टेड डेटा मिल जाता है।",
                command: "# Verisign के RDAP सर्वर से डेटा निकाल कर 'jq' टूल से सुंदर JSON फॉर्मेट में देखने के लिए:\n$ curl https://rdap.verisign.com/com/v1/domain/certifiedhacker.com | jq\n\n# इसमें आपको Domain Name, Registrar, Status और Nameservers आसानी से दिख जाएंगे।",
                isCtf: false
            },
            {
                id: "recon_dns",
                title: "3. DNS Records Mapping",
                intro: "DNS (Domain Name System) इंटरनेट की फोनबुक है। जब हम पैसिव रेकॉन करते हैं, तो डोमेन के अलग-अलग रेकॉर्ड्स निकाल कर हम टारगेट के इंफ्रास्ट्रक्चर (जैसे उनके वेब सर्वर्स, ईमेल सर्वर्स) का पूरा नक्शा बना लेते हैं बिना उनको टच किए।",
                info: "📌 <b>मुख्य रेकॉर्ड्स:</b> A Record (IPv4 Mapping), MX Record (Mail Servers Lookup), TXT Record (SPF/Security Configuration)।",
                example: "🌍 Real-world Example: A Record एक दुकान का जीपीएस कोआर्डिनेट्स है, MX Record उस दुकान का लेटरबॉक्स (डाकघर) है, and TXT Record दुकान का सरकारी लाइसेंस सर्टिफिकेट है।",
                command: "# 1. IP एड्रेस (A Record) पता करने के लिए:\n$ dig certifiedhacker.com A\n\n# 2. मेल सर्वर्स (MX Record) और उनकी प्रायोरिटी जानने के लिए:\n$ dig certifiedhacker.com MX\n\n# 3. Security Verification Records (TXT) देखने के लिए:\n$ dig certifiedhacker.com TXT",
                isCtf: false
            },
            {
                id: "recon_ns",
                title: "4. Name Servers (NS)",
                intro: "Name Servers (NS) रेकॉर्ड्स यह बताते हैं कि उस पर्टिकुलर डोमेन के सारे DNS रेकॉर्ड्स किस सर्वर पर स्टोर और मैनेज हो रहे हैं। इससे हमें यह हिंट मिलता है कि टारगेट कंपनी अपनी सिक्योरिटी और नेटवर्क मैनेजमेंट के लिए किस थर्ड-पार्टी क्लाउड का इस्तेमाल कर रही है।",
                info: "🎯 <b>हैकर माइंडसेट:</b> अगर NS में Cloudflare दिखता है, तो समझ जाओ कि टारगेट डायरेक्ट IP पर नहीं बल्कि एक सिक्योर प्रॉक्सी और WAF (Web Application Firewall) के पीछे छुपा हुआ है।",
                example: "🌍 Real-world Example: जैसे एक बड़ी कंपनी अपनी सुरक्षा और गेटकीपिंग के लिए किसी नामी सिक्योरिटी एजेंसी को हायर करती है, वैसे ही डोमेन अपने ट्रैफिक को रूट करने के लिए Name Servers का उपयोग करते हैं।",
                command: "# टारगेट डोमेन के अधिकृत नेम सर्वर्स की लिस्ट निकालने के लिए:\n$ dig certifiedhacker.com NS\n\n# आउटपुट में देखें: क्या वहां अमेज़न या किसी अन्य क्लाउड प्रदाता के सर्वर्स दिख रहे हैं?",
                isCtf: false
            },
            {
                id: "recon_subdomains",
                title: "5. Subdomain Discovery",
                intro: "मुख्य डोमेन के अलावा कंपनियां अपने अंदरुनी काम के लिए कई सबडोमेन बनाती हैं (जैसे admin.domain.com, vpn.domain.com)। अक्सर डेवलपर्स इन सबडोमेन्स को बनाकर भूल जाते हैं, जिनमें पुरानी वल्नरेबिलिटी मिल सकती हैं।",
                info: "🛠️ <b>टूल्स:</b> 1. DNSDumpster (पब्लिक एसेट मैपर) 2. crt.sh (सर्टिफिकेट ट्रांसपेरेंसी लॉग्स)",
                example: "🌍 Real-world Example: मुख्य डोमेन एक बंगले का मेन गेट है, और सबडोमेन्स उस बंगले के पीछे के छोटे दरवाजे या खिड़कियां हैं जिन्हें अक्सर लोग खुला छोड़ देते हैं।",
                command: "# crt.sh वेबसाइट पर जाकर वाइल्डकार्ड सर्च करने का तरीका:\nवेबसाइट खोलें और सर्च बॉक्स में लिखें: %.certifiedhacker.com\n\n# इससे वो सबडोमेन्स भी मिल जाएंगे जो पब्लिकली हिडन रखने की कोशिश की गई थी!",
                isCtf: false
            },
            {
                id: "recon_shodan",
                title: "6. Shodan & Censys Systems",
                intro: "Shodan और Censys सामान्य गूगल सर्च इंजन नहीं हैं। गूगल केवल वेब पेजेस को क्रॉल करता है, लेकिन Shodan पूरे इंटरनेट के राउटर्स, सर्वर्स, और ओपन पोर्ट्स को लगातार स्कैन करके उनका डेटा कलेक्ट करता है। इसे 'हैकर्स का गूगल' भी कहा जाता है।",
                info: "🔥 <b>पैसिव रेकॉन उपयोग:</b> टारगेट को बिना छुए, Shodan पर उसका आईपी या डोमेन डालकर ओपन पोर्ट्स (22, 80, 443) और सॉफ़्टवेयर बैनर्स की जानकारी कलेक्ट करना।",
                example: "🌍 Real-world Example: गूगल एक सुपरमार्केट की कैटलॉग बुक है जो सामान दिखाती है, जबकि Shodan उस सुपरमार्केट में लगे सुरक्षा कैमरों और तालों की लिस्ट है कि कौन सा ताला कमजोर या खुला है।",
                command: "# Shodan सर्च बार में टारगेट के सर्वर्स ढूंढने के लिए यह फ़िल्टर लगाएं:\nhostname:certifiedhacker.com\n\n# Censys पर जाकर सीधे डोमेन नाम डालकर सर्च करें और उनकी ऑपरेटिंग सर्विसेज देखें।",
                isCtf: false
            },
            {
                id: "recon_ctf",
                title: "⚡ Live Practical Exam",
                intro: "अब समय है अपनी स्किल्स को टेस्ट करने का कुलदीप! नीचे एक लाइव रेकॉन चैलेंज फॉर्म है। तुम्हारा टारगेट है <b>tesla.com</b>। तुम्हें बिना टेस्ला के सर्वर्स को छुए, केवल ऊपर बताए गए पैसिव टूल्स और वेबसाइट्स का इस्तेमाल करके सही जानकारी जुटानी है और इस फॉर्म को भरना है।",
                info: "⚠️ <b>नियम:</b> सभी जवाबों को ध्यान से ओएसइंट (OSINT) टूल्स से निकालें। फॉर्म सबमिट करने पर स्क्रिप्ट आपके ढूंढे गए आंसर्स को रियल-टाइम मास्टर डेटा से वैलिडेट करेगी। प्लेसहोल्डर्स सिर्फ उदाहरण के लिए हैं, वो जवाब नहीं हैं!",
                isCtf: true
            }
        ]
    }
];

/* --- 6. STATE MANAGEMENT --- */
let currentChapterIndex = 0;
let currentSubtopicIndex = 0;
let flatTopicsList = [];

function updateFlatList() {
    flatTopicsList = [];
    chaptersData.forEach((ch, chIdx) => {
        ch.subtopics.forEach((sub, subIdx) => {
            flatTopicsList.push({
                chapterIdx: chIdx,
                subtopicIdx: subIdx,
                ...sub
            });
        });
    });
}

/* --- 6.5 MOBILE SIDEBAR HELPER --- */
function toggleSidebar(open) {
    const sidebar = document.getElementById('sidebar-nav');
    const overlay = document.getElementById('sidebar-overlay');
    if (open) {
        sidebar.classList.add('active');
        overlay.classList.add('active');
    } else {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
    }
}

/* --- 7. RENDER FUNCTIONS --- */
function renderSidebar() {
    const target = document.getElementById('chapters-list-target');
    target.innerHTML = '';

    chaptersData.forEach((chapter, chIdx) => {
        const chapterDiv = document.createElement('div');
        chapterDiv.className = `chapter-container ${chIdx === currentChapterIndex ? 'open' : ''}`;
        chapterDiv.id = `ch-container-${chIdx}`;

        const header = document.createElement('div');
        header.className = 'chapter-header';
        header.onclick = () => toggleChapter(chIdx);

        const title = document.createElement('span');
        title.className = 'chapter-title';
        title.innerText = chapter.title;

        const arrow = document.createElement('span');
        arrow.className = 'arrow-icon';
        arrow.innerText = '▼';

        header.appendChild(title);
        header.appendChild(arrow);
        chapterDiv.appendChild(header);

        const subtopicsList = document.createElement('div');
        subtopicsList.className = 'subtopics-list';

        chapter.subtopics.forEach((subtopic, subIdx) => {
            const item = document.createElement('div');
            item.className = `subtopic-item ${(chIdx === currentChapterIndex && subIdx === currentSubtopicIndex) ? 'active' : ''}`;
            item.innerText = subtopic.title;
            item.onclick = (e) => {
                e.stopPropagation();
                loadContent(chIdx, subIdx);
                toggleSidebar(false); // Mobile: Close sidebar
            };
            subtopicsList.appendChild(item);
        });

        chapterDiv.appendChild(subtopicsList);
        target.appendChild(chapterDiv);
    });
}

function loadContent(chIdx, subIdx) {
    currentChapterIndex = chIdx;
    currentSubtopicIndex = subIdx;

    renderSidebar();

    const topicData = chaptersData[chIdx].subtopics[subIdx];
    const target = document.getElementById('display-card-target');

    if (!topicData.isCtf) {
        target.innerHTML = `
                    <div class="topic-meta">${chaptersData[chIdx].title}</div>
                    <h2 class="topic-title">${topicData.title}</h2>
                    
                    <div class="content-section">
                        <p>${topicData.intro}</p>
                    </div>

                    <div class="info-box">
                        ${topicData.info}
                    </div>

                    <div class="example-box">
                        <h4>💡 Concept Explanation</h4>
                        <p>${topicData.example}</p>
                    </div>

                    <div class="command-block">
                        ${topicData.command.replace(/\n/g, '<br>')}
                    </div>
                `;
    } else {
        // Live CTF Form for Tesla
        target.innerHTML = `
                    <div class="topic-meta">${chaptersData[chIdx].title}</div>
                    <h2 class="topic-title">${topicData.title}</h2>
                    <p style="color:#cbd5e0; margin-bottom: 20px; line-height:1.6;">
                        <b>टारगेट वेबसाइट:</b> <span style="color:#ff0033; font-family:monospace; font-weight:bold;">tesla.com</span><br>
                        टर्मिनल पर कमांड्स चलाकर या <a href="https://dnsdumpster.com" target="_blank" style="color:#0077ff; text-decoration:underline;">DNSDumpster</a> जैसी OSINT वेबसाइट्स का उपयोग करके आंसर्स निकालो और नीचे सबमिट करो!
                    </p>
                    
                    <div class="info-box" style="border-color:#00ff66; background:rgba(0,255,102,0.05)">
                        ℹ️ <b>Note:</b> प्लेसहोल्डर में लिखे टेक्स्ट सिर्फ फॉर्मेट समझाने के लिए काल्पनिक उदाहरण हैं, वो असली उत्तर नहीं हैं।
                    </div>

                    <form class="ctf-form" onsubmit="validateCtf(event)">
                        <div class="form-group">
                            <label>1. WHOIS Lookup (Registrar)</label>
                            <span>कमांड: whois tesla.com (डेटाबेस्ड प्रोवाइडर कंपनी का नाम दर्ज करें)</span>
                            <input type="text" id="ans-registrar" class="ctf-input" placeholder="Type name here (e.g., DomainCorp)" required>
                        </div>

                        <div class="form-group">
                            <label>2. DNS Provider (Name Servers)</label>
                            <span>कमांड: dig tesla.com NS (नेम सर्वर्स किस नेटवर्क पर एलाइन्ड हैं?)</span>
                            <input type="text" id="ans-dns" class="ctf-input" placeholder="Type provider name (e.g., NetworkSolutions)" required>
                        </div>

                        <div class="form-group">
                            <label>3. Email Provider (MX Record)</label>
                            <span>कमांड: dig tesla.com MX (इनका मेल सर्वर गेटवे कौन संभालता है?)</span>
                            <input type="text" id="ans-mx" class="ctf-input" placeholder="Type mail system (e.g., ProtonMail)" required>
                        </div>

                        <div class="form-group">
                            <label>4. Discover Subdomain (DNSDumpster / crt.sh)</label>
                            <span>टेस्ला का कोई एक क्रेडिबल, लाइव सबडोमेन लिखें:</span>
                            <input type="text" id="ans-subdomain" class="ctf-input" placeholder="Enter valid asset (e.g., test.example.com)" required>
                        </div>

                        <button type="submit" class="verify-btn">⚡ Verify Target Assets</button>
                    </form>

                    <div id="ctf-result"></div>
                `;
    }

    updateArrowButtons();
}

function toggleChapter(chIdx) {
    const container = document.getElementById(`ch-container-${chIdx}`);
    container.classList.toggle('open');
}

function updateArrowButtons() {
    const currentFlatIndex = flatTopicsList.findIndex(
        t => t.chapterIdx === currentChapterIndex && t.subtopicIdx === currentSubtopicIndex
    );

    document.getElementById('prev-btn').disabled = (currentFlatIndex === 0);
    document.getElementById('next-btn').disabled = (currentFlatIndex === flatTopicsList.length - 1);
}

function navigateTopic(direction) {
    updateFlatList();
    const currentFlatIndex = flatTopicsList.findIndex(
        t => t.chapterIdx === currentChapterIndex && t.subtopicIdx === currentSubtopicIndex
    );

    const targetFlatIndex = currentFlatIndex + direction;

    if (targetFlatIndex >= 0 && targetFlatIndex < flatTopicsList.length) {
        const targetTopic = flatTopicsList[targetFlatIndex];

        currentChapterIndex = targetTopic.chapterIdx;
        currentSubtopicIndex = targetTopic.subtopicIdx;

        loadContent(targetTopic.chapterIdx, targetTopic.subtopicIdx);
    }
}

/* --- CTF VALIDATION ENGINE --- */
function validateCtf(event) {
    event.preventDefault();

    const registrar = document.getElementById('ans-registrar').value.trim().toLowerCase();
    const dns = document.getElementById('ans-dns').value.trim().toLowerCase();
    const mx = document.getElementById('ans-mx').value.trim().toLowerCase();
    const subdomain = document.getElementById('ans-subdomain').value.trim().toLowerCase();

    const resultPanel = document.getElementById('ctf-result');
    resultPanel.style.display = "block";

    // Live infrastructure verification for tesla.com
    const isRegistrarCorrect = registrar.includes("markmonitor");
    const isDnsCorrect = dns.includes("akamai") || dns.includes("cscdns") || dns.includes("tesla");
    const isMxCorrect = mx.includes("microsoft") || mx.includes("outlook") || mx.includes("pps.reap");

    const validSubdomains = [
        "auth.tesla.com", "shop.tesla.com", "energy.tesla.com",
        "vpn.tesla.com", "developer.tesla.com", "service.tesla.com",
        "api.tesla.com", "sso.tesla.com"
    ];
    const isSubdomainCorrect = validSubdomains.includes(subdomain) || (subdomain.endsWith(".tesla.com") && !subdomain.includes("example"));

    if (isRegistrarCorrect && isDnsCorrect && isMxCorrect && isSubdomainCorrect) {
        resultPanel.className = "success-panel";
        resultPanel.innerHTML = "🎯 ACCESS GRANTED! पैसिव रेकॉन रिपोर्ट मैच हो गई है। शानदार काम कुलदीप! आपकी ओएसइंट स्किल्स एकदम शार्प हैं। 🟩";
    } else {
        resultPanel.className = "failed-panel";
        resultPanel.innerHTML = "❌ ACCESS DENIED! कुछ आंसर्स गलत हैं या डेटा मैच नहीं हुआ। कृपया टर्मिनल पर कमांड्स दोबारा चलाएं और सही स्पेलिंग चेक करें! 🟥";
    }
}

/* --- INITIALIZATION ON LOAD --- */
window.onload = () => {
    updateFlatList();
    loadContent(0, 0); // Opens Passive Recon as Chapter 1 directly
};

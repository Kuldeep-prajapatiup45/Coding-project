
/* --- 5. THE CORE DATA OBJECT --- */
const chaptersData = [
    {
        id: "ch1",
        title: "Chapter 1: Network Basics & Core Protocols",
        subtopics: [
            {
                id: "ip_address",
                title: "IP Address Kya Hota Hai?",
                intro: "IP (Internet Protocol) Address kisi bhi device ki internet ya network par unique identity hoti hai. Jaise har ghar ka ek unique postal address hota hai taaki chitti sahi jagah pahunche, waise hi internet par sahi data packet sahi machine tak pahunche, iske liye IP Address kaam karta hai.",
                example: "🌍 Real-world Example: Maan lo tum browser me Google open karte ho. Tumhara computer ek packet banta hai jisme tumhara IP (Source) aur Google ka IP (Destination) hota hai. Router is address ko dekhkar request sahi server tak pahunchata hai.",
                command: "// Apni Machine ka IP check karne ke liye command:\n$ ipconfig  # (Windows ke liye)\n$ ifconfig  # (Linux/Mac ke liye)",
                diagramTitle: "[Image: IP Packet Routing Interaction]",
                diagramMock: "+-----------------+    Request Packet     +-----------------+\n|  Your Computer  | --------------------> |  Google Server  |\n|  192.168.1.10   | <-------------------- |  142.250.190.46 |\n+-----------------+      Response Data     +-----------------+"
            },
            {
                id: "ipv4_structure",
                title: "IPv4 Architecture & Bits",
                intro: "IPv4 ka full form Internet Protocol Version 4 hai. Ye ek 32-bit addressing system hai, jiska matlab hai ki isme total $2^{32}$ (lagbhag 4.3 Billion) unique addresses ban sakte hain. Ise hum 4 parts (octets) me likhte hain jo dots (.) se separate hote hain.",
                example: "📝 Structure Breakout:\nEk standard address lo: 192.168.1.101\nHar decimal number ke piche 8-bits ki binary hoti hai. Isliye har segment ko 'Octet' bolte hain.",
                command: "# Binary Structure Structure:\n192      . 168      . 1        . 101\n11000000 . 10101000 . 00000001 . 01100101  => [Total 32 Bits]\n# Range: Har octet ki value hamesha 0 se 255 ke beech hogi.",
                diagramTitle: "[Image: IPv4 Header and Octet Structure]",
                diagramMock: "+----------+----------+----------+----------+\n| Octet 1  | Octet 2  | Octet 3  | Octet 4  |\n| (8 bits) | (8 bits) | (8 bits) | (8 bits) |\n+----------+----------+----------+----------+\n|   192    |   168    |    1     |   101    |\n+----------+----------+----------+----------+"
            },
            {
                id: "public_vs_private",
                title: "Public IP vs Private IP",
                intro: "Public IP pure World Wide Web (Internet) par unique hoti hai aur ise Global ISPs control karte hain. Private IP sirf tumhare ghar ke local network (LAN) ke andar use hoti hai (jaise tumhara Wi-Fi router tumhare mobile aur laptop ko deta hai).",
                example: "🏢 Real-world Example: Private IP ek hotel ke andar ka 'Room Number' hai, jo sirf andar chalega. Public IP us puri building ka 'Main Road Address' hai jo bahar ki duniya ko dikhta hai.",
                command: "# Private IP Ranges Table (Must Remember):\nClass A: 10.0.0.0      - 10.255.255.255\nClass B: 172.16.0.0    - 172.31.255.255\nClass C: 192.168.0.0   - 192.168.255.255",
                diagramTitle: "[Image: Local Network vs World Wide Internet Split]",
                diagramMock: "[Laptop: 192.168.1.5] ----+ \n                          |---> [Router] ===(Public IP: 103.45.67.89)===> [Internet]\n[Mobile: 192.168.1.6] ----+"
            },
            {
                id: "dhcp_protocol",
                title: "DHCP: Automatic Configuration",
                intro: "DHCP ka full form Dynamic Host Configuration Protocol hai. Iska kaam network me aane wale naye devices ko automatically IP Address, Subnet Mask aur Default Gateway assign karna hai, taaki tumhe manually configuration na karni pade.",
                example: "🔄 Real-world Example: Jaise hi tum kisi cafe ke Wi-Fi se connect hote ho, tumhara phone DHCP Server ko request bhejta hai aur server bina kisi human help ke ek khali IP tumhare device ko 'Lease Time' (kuch ghanto) ke liye de deta hai.",
                command: "# Linux par naya IP lease lene ke liye DHCP client command:\n$ sudo dhclient -r  # Purana IP release karne ke liye\n$ sudo dhclient     # Naya fresh dynamic IP assign karne ke liye",
                diagramTitle: "[Image: DHCP 4-Step DORA Process Interaction]",
                diagramMock: "Client Device                                   DHCP Server\n    | ------- Discover (Mujhe IP chahiye) -------> |\n    | <------ Offer (Ye wala IP le lo) ----------- |\n    | ------- Request (Theek hai, lock kar do) --> |\n    | <------ Acknowledge (Done! IP tumhara हुआ) - |"
            },
            {
                id: "nat_translation",
                title: "NAT (Network Address Translation)",
                intro: "NAT ek aisi technique hai jiska use karke router tumhare local network ke saare Private IPs ko ek hi single Public IP address me convert karke internet par bhejta hai. Ye IPv4 addresses ki kami ko bachane aur security badhane ke liye bhot zaroori hai.",
                example: "🛡️ Real-world Example: Jab tumhare ghar me 4 log ek sath local network par YouTube chalate hain, to internet server ko sirf router ki Public IP dikhti hai. Router NAT Table me yaad rakhta hai ki kis computer ne kaun sa video manga tha.",
                command: "# Linux IPTables me NAT Configuration Rule masquerade karne ke liye:\n$ sudo iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE",
                diagramTitle: "[Image: NAT Table Routing Mechanism]",
                diagramMock: "Source Private IP      NAT Router (Translation)       Target Public Destination\n 192.168.1.10:4321  ->  [Change to: 103.45.67.89:99] ->   8.8.8.8:53 (Google DNS)"
            },
            {
                id: "ports_services",
                title: "Ports & Common Services",
                intro: "IP Address agar kisi building ka address hai, to Ports us building ke Flat Numbers hain. Ek single IP par chalne wali alag-alag services (jaise Web, SSH, Database) ko uniquely identity karne ke liye ports (0-65535) ka use hota hai.",
                example: "🔑 Key Target Ports to Memorize:\n- 22: SSH (Secure Shell for Remote Login)\n- 53: DNS (Domain Name System Resolution)\n- 80: HTTP (Unencrypted Web Traffic)\n- 443: HTTPS (Secure Encrypted Web Traffic)",
                command: "# Apni machine par chal rahe open ports aur sockets check karne ke liye:\n$ netstat -tunlp\n# Ya fir modern command:\n$ ss -tulpn",
                diagramTitle: "[Image: IP Address combined with specific Port Numbers]",
                diagramMock: "Target: 192.168.1.10\n  ├── Port 22  --> [ SSH Service Access ]\n  ├── Port 80  --> [ HTTP Unsecure Web ]\n  └── Port 443 --> [ HTTPS Secure Web ]"
            },
            {
                id: "nmap_scanning",
                title: "Nmap Network Scanning",
                intro: "Nmap (Network Mapper) ek cybersecurity open-source tool hai jiska use network auditing, active host discovery, aur target machine par open ports aur service versions ka pata lagane ke liye kiya jata hai. Ek security learner ke liye ye basic tool hai.",
                example: "🔍 Practice Workflow: Hacking/Auditing phase me recon ke liye sabse pehle Nmap chalaya jata hai taaki attack surface pata chal sake.",
                command: "# Target machine par aggressive scan karne ke liye (OS, Ports aur Version details):\n$ nmap -A -T4 192.168.1.10\n\n# Output Example:\n# PORT    STATE SERVICE VERSION\n# 22/tcp  open  ssh     OpenSSH 8.2p1\n# 80/tcp  open  http    Apache httpd 2.4.41",
                diagramTitle: "[Image: Nmap Packet Probing and Port Scanning Banner Grabbing]",
                diagramMock: "[Your Attacker Machine] ---- (SYN Packet Probe) ----> [Target Host]\n[Your Attacker Machine] <--- (SYN+ACK or RST Response) -- [Target Host]"
            },
            {
                id: "tcp_three_way_handshake",
                title: "TCP Three-Way Handshake",
                intro: "TCP (Transmission Control Protocol) ek connection-oriented aur reliable protocol hai. Data transmission suru karne se pehle client aur server aapas me 3 steps me sync banate hain jise Three-Way Handshake bolte hain.",
                example: "🤝 Real-world Example: \n1. Client bolta hai: 'Hello Server, kya hum connect ho sakte hain? (SYN)'\n2. Server bolta hai: 'Haan bilkul, mujhe tumhari request mil gayi, kya tum taiyar ho? (SYN+ACK)'\n3. Client bolta hai: 'Haan mai taiyar hu, chalo shuru karte hain! (ACK)'",
                command: "# WireShark tool me filters laga kar tum in live flags ko dekh sakte ho:\nFilter: tcp.flags.syn == 1 or tcp.flags.ack == 1",
                diagramTitle: "[Image: Detailed TCP Handshake Flag Exchange Sequence]",
                diagramMock: "  Client                                     Server\n    | ---------- SYN (Seq=0) -------------> |\n    | <--------- SYN + ACK (Seq=0, Ack=1) - |\n    | ---------- ACK (Seq=1, Ack=1) ------> |\n    [ CONNECTION ESTABLISHED STATE ]"
            },
            {
                id: "osi_7_layers",
                title: "OSI Model: 7 Layers of Internet",
                intro: "OSI (Open Systems Interconnection) Model ek theoretical framework hai jo yeh samajhata hai ki data ek network se dusre network par kaise travel karta hai. Isme 7 dedicated layers hoti hain aur har layer ka ek fix kaam hota hai.",
                example: "💡 Remembrance Trick (Top to Bottom):\nAll (Application) People (Presentation) Seem (Session) To (Transport) Need (Need -> Network) Data (Data Link) Processing (Physical).",
                command: "# Layer 3 (Network) check karne ke liye ping use hota hai:\n$ ping 8.8.8.8\n# Layer 7 (Application) testing ke liye curl use hota hai:\n$ curl -I https://google.com",
                diagramTitle: "[Image: OSI Model 7 Layers Architecture Block]",
                diagramMock: "[7. Application] -> [6. Presentation] -> [5. Session] -> \n[4. Transport]   -> [3. Network]      -> [2. Data Link] -> [1. Physical]"
            }
        ]
    }
];

/* --- 6. STATE MANAGEMENT --- */
let currentChapterIndex = 0;
let currentSubtopicIndex = 0;

// Flatten subtopics for easy next/prev linear navigation
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

/* --- 6.5 MOBILE NAVIGATION HELPER --- */
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

// Render left sidebar layout according to rules
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
                toggleSidebar(false); // Mobile: Close sidebar after selection
            };
            subtopicsList.appendChild(item);
        });

        chapterDiv.appendChild(subtopicsList);
        target.appendChild(chapterDiv);
    });
}

// Load active subtopic data inside the center viewport
function loadContent(chIdx, subIdx) {
    currentChapterIndex = chIdx;
    currentSubtopicIndex = subIdx;

    const allItems = document.querySelectorAll('.subtopic-item');
    allItems.forEach(i => i.classList.remove('active'));

    renderSidebar();

    const topicData = chaptersData[chIdx].subtopics[subIdx];
    const target = document.getElementById('display-card-target');

    target.innerHTML = `
                <div class="topic-meta">${chaptersData[chIdx].title}</div>
                <h2 class="topic-title">${topicData.title}</h2>
                
                <div class="content-section">
                    <p>${topicData.intro}</p>
                </div>

                <div class="example-box">
                    <h4>💡 Live Concept Explanation</h4>
                    <p>${topicData.example}</p>
                </div>

                <div class="command-block">
                    ${topicData.command.replace(/\n/g, '<br>')}
                </div>

                <div class="concept-image-container">
                    <strong>📊 ${topicData.diagramTitle}</strong><br>
                    <div class="concept-image-mock">${topicData.diagramMock}</div>
                </div>
            `;

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
        loadContent(targetTopic.chapterIdx, targetTopic.subtopicIdx);
    }
}

/* --- 8. INITIALIZATION ON LOAD --- */
window.onload = () => {
    updateFlatList();
    loadContent(0, 0);
};

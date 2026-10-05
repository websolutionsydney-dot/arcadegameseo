export type Faq = { question: string; answer: string };
export type Service = {
  slug: string; shortTitle: string; title: string; meta: string; kicker: string;
  headline: string; intro: string; image: string; overviewTitle: string; overview: string;
  benefits: { title: string; text: string }[]; checklist: string[]; faqs: Faq[]; cta: string;
};
export const services: Service[] = [
  {
    "slug": "arcade-machine-hire",
    "shortTitle": "Arcade machine hire",
    "title": "Arcade Machine Hire Sydney",
    "meta": "Arcade game hire in Sydney for parties, weddings and corporate events. Find planning advice on machines, hire costs, delivery and setup. Request a quote.",
    "kicker": "An event with a little extra play",
    "headline": "YOUR EVENT.\nNEXT LEVEL.",
    "intro": "Arcade machine hire in Sydney for birthdays, weddings, corporate events and parties. Give your guests a game to gather around—and a high score to beat.",
    "image": "arcade-hero",
    "overviewTitle": "Less small talk. More high scores.",
    "overview": "A good games corner gets people involved without needing a full event schedule. Friends can challenge each other, colleagues can break the ice, and guests can drop in for a quick game between other activities. Start with your date, location and audience; the machine choice and delivery plan follow from there.",
    "benefits": [
      {
        "title": "Birthdays & private parties",
        "text": "Choose around the people playing: their ages, favourite game styles and how much time they have. A small group and a busy party need different setups."
      },
      {
        "title": "Corporate events",
        "text": "Make room for casual play during breaks or a shared activity in the programme. Keep the games close enough to join in without interrupting presentations."
      },
      {
        "title": "Weddings & celebrations",
        "text": "Give guests something to enjoy between the main moments. The playing area, sound and collection time should fit the rest of your celebration."
      }
    ],
    "checklist": [
      "Event date, hire duration and preferred delivery window",
      "Venue suburb, floor level and loading access",
      "Available floor space, doorway widths and power",
      "Guest numbers, age range and game preferences"
    ],
    "faqs": [
      {
        "question": "How much does arcade machine hire in Sydney cost?",
        "answer": "The main factors are the machine, number of units, hire period and delivery requirements. A ground-floor booking and one involving stairs or restricted loading can have different costs. Send your date and venue details for a quote with the inclusions set out."
      },
      {
        "question": "Are delivery and setup included?",
        "answer": "Delivery, setup and collection are arranged with your booking. Include stairs, lifts, loading access and venue time restrictions in the enquiry so the quote covers the work needed."
      },
      {
        "question": "Which arcade games can I hire?",
        "answer": "Tell us the game style you want and your event date to check current options. Website images are illustrative; they are not a live stock list."
      },
      {
        "question": "Can I hire a machine for one day or a longer event?",
        "answer": "Send the start and finish dates you need. Availability and transport are checked against the whole hire period, including when the venue can receive and release the equipment."
      }
    ],
    "cta": "Get an arcade hire quote"
  },
  {
    "slug": "claw-machine-hire",
    "shortTitle": "Claw machine hire",
    "title": "Claw Machine Hire Sydney",
    "meta": "Claw machine hire in Sydney for parties, weddings and events. Plan prizes, space and delivery, find out what affects the hire price, and request a quote.",
    "kicker": "A little suspense. A lot of smiles.",
    "headline": "GET A GRIP\nON GOOD TIMES.",
    "intro": "Hire a claw machine for your Sydney party, wedding, workplace event or promotion. Pick your moment, plan the prizes and let your guests have a go.",
    "image": "claw-machine",
    "overviewTitle": "The game everyone gathers around.",
    "overview": "There is something about watching a claw hover over a prize that draws a crowd. For an event, the details behind that moment matter too: who is playing, what goes inside the machine and how the activity fits your space. Your enquiry can start with a date and a prize idea—you do not need to know the model.",
    "benefits": [
      {
        "title": "Parties & weddings",
        "text": "Add an activity guests can return to throughout the celebration. Match the prize idea to the occasion and the ages of the people playing."
      },
      {
        "title": "Workplace events",
        "text": "Bring a game into the office party or staff celebration. Before choosing its position, check the route through the building and nearby power."
      },
      {
        "title": "Promotions",
        "text": "Have a product or gift in mind? Its size and weight affect whether it will work as a prize. Include those details with any branding request."
      }
    ],
    "checklist": [
      "Event location, date and operating hours",
      "Proposed prizes, quantities and approximate dimensions",
      "Space around the machine for players and spectators",
      "Delivery access, power and venue requirements"
    ],
    "faqs": [
      {
        "question": "Are prizes included in claw machine hire?",
        "answer": "That depends on your quote. It should identify whether prizes are included, supplied separately or provided by you, along with the quantity."
      },
      {
        "question": "Can I put my own prizes in a claw machine?",
        "answer": "Possibly—the items need to suit the actual machine. Send their dimensions, weight and packaging details before ordering a large quantity."
      },
      {
        "question": "How much space and power does a claw machine need?",
        "answer": "Use the specifications of the model offered. Allow extra room for players, spectators and opening the cabinet, as well as a suitable power point."
      },
      {
        "question": "Can you provide claw machine hire outside Sydney?",
        "answer": "Yes, we welcome enquiries from the Central Coast, Wollongong and Illawarra, and other NSW locations. Send the suburb or postcode so availability and travel costs can be checked."
      }
    ],
    "cta": "Get a claw machine hire quote"
  },
  {
    "slug": "arcade-machine-placement",
    "shortTitle": "Venue machine placement",
    "title": "Arcade & Claw Machine Placement Sydney & NSW",
    "meta": "Commercial arcade and claw machine placement for Sydney and NSW pubs, clubs, RSLs, shopping centres, cinemas and play centres. Discuss your venue.",
    "kicker": "Put a little more play in your place",
    "headline": "YOUR SPACE.\nTHEIR HAPPY PLACE.",
    "intro": "Commercial arcade and claw machine placement for pubs, clubs, RSLs, shopping centres, cinemas, play centres and other venues across Sydney and NSW.",
    "image": "claw-machine",
    "overviewTitle": "Make your games corner part of the experience.",
    "overview": "An ongoing games area becomes part of how visitors use your venue. The starting point is your audience and the space available: where people pause, where queues could form and who looks after the area each day. From there, a placement proposal can address the equipment, installation and commercial terms.",
    "benefits": [
      {
        "title": "Pubs, clubs & RSLs",
        "text": "Build the games area around your patrons and existing entertainment. Position, sound and supervision all influence how comfortably it fits."
      },
      {
        "title": "Shopping centres & cinemas",
        "text": "Plan for busy periods, guest movement and site approvals. Installation access may need to work around trading or screening times."
      },
      {
        "title": "Play & entertainment centres",
        "text": "Choose a position that works alongside the activities already on offer. Allow room for the players, accompanying adults and staff access."
      }
    ],
    "checklist": [
      "Venue type, location, opening hours and typical audience",
      "A floor plan or description of the proposed games area",
      "Power, access, security and any approval requirements",
      "Preferred arrangement and servicing expectations"
    ],
    "faqs": [
      {
        "question": "How does arcade machine placement work?",
        "answer": "Start with the venue, audience and proposed space. A placement arrangement covers the machine choice, commercial terms, installation and ongoing responsibilities before equipment is put in place."
      },
      {
        "question": "Is machine placement free or based on revenue share?",
        "answer": "The commercial arrangement is specific to the venue. Any fees or revenue share need to be set out in the written proposal; free placement is not a standard promise on this website."
      },
      {
        "question": "Who handles servicing and prize replenishment?",
        "answer": "The placement agreement sets out who handles faults, servicing and prizes. It should also identify the venue contact and how to request help."
      },
      {
        "question": "Can a small venue enquire about placement?",
        "answer": "Yes. A compact space can still be worth assessing. Send the usable dimensions and access details, together with a description of the venue and its visitors."
      }
    ],
    "cta": "Discuss venue placement"
  },
  {
    "slug": "arcade-machines-for-sale",
    "shortTitle": "Arcade machine sales",
    "title": "Arcade Machines for Sale Sydney",
    "meta": "Arcade machines for sale in Sydney and NSW. Get buying advice on cabinet size, condition, commercial use, delivery and support, then enquire about current stock.",
    "kicker": "Make room for your very own arcade",
    "headline": "THE NEXT HIGH SCORE?\nMAKE IT YOURS.",
    "intro": "Buying an arcade machine for a home games room or commercial venue? Start here for arcade machine sales in Sydney and NSW, with practical guidance on choosing and getting it into place.",
    "image": "arcade-hero",
    "overviewTitle": "Buy for the way you want to play.",
    "overview": "The machine you enjoy playing is only part of the purchase. It also has to fit the room, reach its final position and suit the way you will use it. Tell us the game style, budget and destination you have in mind to find out about current sales options.",
    "benefits": [
      {
        "title": "Home games rooms",
        "text": "Think about the games you will return to, the space for players and the route into the house. Measure tight doorways before choosing a cabinet."
      },
      {
        "title": "Commercial venues",
        "text": "Match the equipment to the expected use, operating hours and payment requirements. Ownership also means planning for support and upkeep."
      },
      {
        "title": "Know what you are buying",
        "text": "Use the actual model, condition, specifications and written inclusions to compare options. A generic photograph cannot tell you those details."
      }
    ],
    "checklist": [
      "Home or commercial use and the games you have in mind",
      "Budget range, preferred timing and destination suburb",
      "Machine dimensions, condition and included features",
      "Delivery, installation, warranty and support terms"
    ],
    "faqs": [
      {
        "question": "Which arcade machines are currently for sale?",
        "answer": "Use the sales enquiry to request current options. There is no live inventory on this website, and the illustrative images do not represent specific units in stock."
      },
      {
        "question": "Do you sell new or used arcade machines?",
        "answer": "Availability changes. For any machine offered, the proposal should state whether it is new, used or refurbished, with its condition and any work completed."
      },
      {
        "question": "Can you deliver an arcade machine in Sydney?",
        "answer": "Delivery and installation can form part of the sales proposal. Include your suburb, floor level and access route so the transport requirements can be priced."
      },
      {
        "question": "What should I check before buying an arcade machine?",
        "answer": "Check the model, condition, dimensions, weight, power, game features and intended use. Then look at what the price includes, the delivery route and the warranty or support terms."
      }
    ],
    "cta": "Enquire about arcade machine sales"
  },
  {
    "slug": "amusement-machine-supply-installation",
    "shortTitle": "Supply & installation",
    "title": "Amusement Machine Supply & Installation NSW",
    "meta": "Amusement machine supply and installation in Sydney and NSW. Plan equipment, coin-operated setups, delivery access, positioning and handover. Request a quote.",
    "kicker": "From the first idea to the final position",
    "headline": "PLAN THE SPACE.\nBRING THE PLAY.",
    "intro": "Amusement machine supply and installation for Sydney and NSW venues. Plan the equipment, layout and delivery route together, whether you need one machine or a dedicated games area.",
    "image": "arcade-hero",
    "overviewTitle": "Good setups start before delivery day.",
    "overview": "A cabinet that fits the floor plan still needs to get through the door. A row of games also needs room for people to play, pass by and reach the equipment. Bringing those details into the project early makes it easier to choose machines that work in the actual space.",
    "benefits": [
      {
        "title": "Equipment selection",
        "text": "Start with your visitors and intended use. Compare the proposed machines by their playing experience, dimensions and operating requirements."
      },
      {
        "title": "Access & layout",
        "text": "Trace the route from the loading point to the games area. Door widths, turns, stairs and lift limits can all affect the installation plan."
      },
      {
        "title": "Setup & handover",
        "text": "Set out the delivery window, positioning, operating checks and handover. Identify any venue preparation or work by other trades before the day."
      }
    ],
    "checklist": [
      "Venue address, floor plan and equipment requirements",
      "Doorway widths, lift details, stairs and loading access",
      "Available power and any venue approvals",
      "Installation timing and the agreed handover scope"
    ],
    "faqs": [
      {
        "question": "What does amusement machine installation include?",
        "answer": "The quote defines the scope, including the agreed transport, positioning, setup and handover checks. Building alterations or separate electrical work need their own arrangements."
      },
      {
        "question": "Can you help plan a games area?",
        "answer": "Yes—send a floor plan or room dimensions, the audience and the machines you have in mind. Include doors, access points and nearby power so the layout discussion starts with the actual site."
      },
      {
        "question": "Is servicing included after installation?",
        "answer": "Support and servicing depend on the equipment and agreement. Check the written warranty, maintenance arrangements and contact process before ordering."
      },
      {
        "question": "Do you supply machines across NSW?",
        "answer": "We welcome NSW supply enquiries. Send the town or postcode and project requirements so equipment availability, travel and installation can be assessed for the destination."
      }
    ],
    "cta": "Discuss supply & installation"
  }
];
export const regions = [
  {
    "slug": "sydney",
    "name": "Sydney metropolitan",
    "description": "For Sydney deliveries, let us know about loading zones, lifts and the times your building accepts equipment. The event start time alone may not leave enough time for setup."
  },
  {
    "slug": "western-sydney",
    "name": "Western Sydney",
    "description": "Include the suburb and proposed machine position with your enquiry. A photo of the entry route can help identify narrow doors or turns before delivery."
  },
  {
    "slug": "south-west-sydney",
    "name": "South-West Sydney",
    "description": "For an event, include collection as well as delivery times. For a permanent games area, a floor plan and opening hours are a useful starting point."
  },
  {
    "slug": "north-west-sydney",
    "name": "North-West Sydney",
    "description": "Check the full route into the room, especially stairs, lifts and tight turns. The doorway can be the limiting measurement even when there is plenty of floor space."
  },
  {
    "slug": "illawarra",
    "name": "Wollongong & Illawarra",
    "description": "Include the exact suburb and your setup and collection windows. Transport needs to fit the whole booking, including any time restrictions at the venue."
  },
  {
    "slug": "central-coast",
    "name": "Central Coast",
    "description": "Add the venue’s equipment access times as well as the hours guests will be there. For claw hire, include any prizes you want to supply."
  },
  {
    "slug": "nsw",
    "name": "Greater NSW",
    "description": "Start with your town, postcode and dates. Delivery and installation are assessed for the actual destination; regional travel is quoted for each project."
  }
];
export const homeFaqs: Faq[] = [
  {
    "question": "Can I hire a machine for a party or corporate event?",
    "answer": "Yes. Arcade and claw machine hire are available to enquire about for parties, weddings and corporate events. Send the date, venue suburb and guest numbers to check suitable options."
  },
  {
    "question": "Do you offer ongoing machine placement for venues?",
    "answer": "Yes. Commercial arcade and claw placement is one of our main services, covering pubs, clubs, RSLs, shopping centres, cinemas, play centres and other venues. Equipment and commercial terms are agreed for each site."
  },
  {
    "question": "Which areas do you cover?",
    "answer": "Our enquiry areas are metropolitan Sydney, Western Sydney, South-West Sydney, North-West Sydney, Wollongong and Illawarra, the Central Coast and greater NSW. Include your exact suburb or postcode to check delivery and availability."
  },
  {
    "question": "How much does arcade hire cost?",
    "answer": "The quote depends on the machines, hire period, location and delivery access. Equipment, delivery, setup and collection should be clear in the booking before you commit."
  },
  {
    "question": "What do you need to prepare a quote?",
    "answer": "Start with the service you need and your suburb or postcode. Add dates, guest numbers or venue details if you have them. You do not need a finished plan to get in touch."
  }
];

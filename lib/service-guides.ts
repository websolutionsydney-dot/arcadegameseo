import type { Faq } from "@/lib/content";
type GuideSection = { id: string; heading: string; paragraphs: string[]; items?: { title: string; text: string }[] };
type ServiceGuide = { seoTitle: string; sections: GuideSection[]; faqs: Faq[] };
export const serviceGuides: Record<string, ServiceGuide> = {
  "arcade-machine-hire": {
    "seoTitle": "Arcade Game Hire Sydney",
    "sections": [
      {
        "id": "events-and-parties",
        "heading": "Arcade game hire for parties, weddings & corporate events",
        "paragraphs": [
          "Arcade machine rental can suit a birthday, wedding or work event, but the best setup depends on how guests will use it. A game in a reception area needs to be easy to join between conversations. A dedicated games corner can allow more time for each turn.",
          "Think about the number of people likely to play at once. That is more useful for choosing machine numbers than the total guest count alone. When comparing amusement game hire options, ask for the actual models available for your date and a description of the playing experience."
        ]
      },
      {
        "id": "hire-cost-and-delivery",
        "heading": "What goes into an arcade machine hire quote?",
        "paragraphs": [
          "Your quote needs to cover the machine and the journey to your venue. Hire duration, the number of units, stairs, loading restrictions and collection timing can all affect the total. Compare the same inclusions: equipment, delivery, setup, collection, applicable taxes and any bond.",
          "Give the venue’s delivery window separately from the event start time. For example, a room booked for an evening party may only become available after an earlier function. Knowing that early helps avoid a setup plan that cannot work on the day."
        ]
      },
      {
        "id": "planning-your-games-space",
        "heading": "Plan the games space before the event",
        "paragraphs": [
          "Measure the delivery route as well as the playing area. A cabinet can fit comfortably in a room and still be too wide for a doorway or tight corridor turn. Use the dimensions and weight of the proposed machine, including any lift limits.",
          "Leave space for players and people walking past, with suitable power nearby. Flag an outdoor or exposed setting before choosing equipment. Your booking should also name an on-site contact and explain the arrangements for faults, changes and collection."
        ]
      }
    ],
    "faqs": [
      {
        "question": "Is arcade machine rental available for weddings and birthday parties?",
        "answer": "Yes. Include the occasion, date, venue and guest ages in your enquiry. For weddings, add when the games will be used around the ceremony, meal and other activities."
      },
      {
        "question": "How much space does an arcade machine need?",
        "answer": "Use the actual model’s dimensions, then allow room for players and movement around it. Measure the delivery route too; the final room is only one part of the fit."
      },
      {
        "question": "Can I hire arcade games near me in NSW?",
        "answer": "Our enquiry areas cover metropolitan Sydney, Western Sydney, South-West Sydney, North-West Sydney, Wollongong and Illawarra, the Central Coast and greater NSW. Send your postcode to check the equipment and delivery options for your location."
      }
    ]
  },
  "claw-machine-hire": {
    "seoTitle": "Claw Machine Hire Sydney",
    "sections": [
      {
        "id": "skill-tester-and-prize-machine-hire",
        "heading": "Claw machine rental, skill testers & prize games",
        "paragraphs": [
          "Claw machine rental gives guests a prize game they can return to during the event. The player positions a grabber over the prize area and tries to collect an item. The cabinet, controls and prizes need to suit the people taking part.",
          "If you are looking for skill tester hire or prize machine hire in Sydney, send a photo or description of the game you mean. Those names are sometimes used for claw games and sometimes for other equipment. Identifying the game early avoids ordering the wrong thing."
        ]
      },
      {
        "id": "prizes-and-event-planning",
        "heading": "Plan the prizes as carefully as the machine",
        "paragraphs": [
          "A prize that looks right may still be too heavy, awkwardly shaped or too large for the machine’s prize exit. Before buying gifts or products in bulk, share their dimensions, weight and packaging so they can be checked against the proposed model.",
          "For weddings and parties, think about who will play and how many prizes you want available. For a promotion, add your product and branding ideas to the enquiry. Custom wraps or machine alterations need a separate agreement; they are not assumed to be part of ordinary hire."
        ]
      },
      {
        "id": "claw-hire-price",
        "heading": "Claw machine hire price & delivery details",
        "paragraphs": [
          "The full claw machine hire price depends on the equipment, dates, prizes and transport. Look for a quote that identifies each inclusion, along with collection timing and any extra-time or bond conditions.",
          "A busy event also needs a practical plan for the machine while it is in use. Decide who will supervise play, where waiting guests can stand and who will replenish prizes under the agreed arrangement. That keeps the activity manageable for your event team."
        ]
      }
    ],
    "faqs": [
      {
        "question": "How much does claw machine hire cost?",
        "answer": "The main factors are the machine, hire period, prize arrangements and delivery access. A useful quote separates those inclusions so you can compare the total cost."
      },
      {
        "question": "Is skill tester hire the same as claw machine hire?",
        "answer": "Sometimes, but the names can refer to other prize games too. A photo or brief description helps identify the equipment you are looking for."
      },
      {
        "question": "Can I hire a claw machine for a wedding?",
        "answer": "Yes. Include the wedding date, venue, guest numbers and prize idea. The machine, prizes and delivery timing need to fit the celebration."
      }
    ]
  },
  "arcade-machine-placement": {
    "seoTitle": "Arcade & Claw Placement Sydney",
    "sections": [
      {
        "id": "machines-for-your-venue",
        "heading": "Commercial placement for your type of venue",
        "paragraphs": [
          "The same machine can work very differently in a pub, cinema foyer or play centre. Start with the people who visit and the way they move through the building. These are useful considerations for each venue type."
        ],
        "items": [
          {
            "title": "Pubs",
            "text": "Position the game where patrons can find it without crowding dining or seating areas. Sound and supervision are worth considering alongside the cabinet’s footprint."
          },
          {
            "title": "Clubs",
            "text": "A club may have several activity areas with different audiences. The games corner needs a visible position, room to play and an installation route that works through the building."
          },
          {
            "title": "RSLs",
            "text": "Match the proposed games area to the expected visitors and existing entertainment. Include the venue’s approval process and operating requirements in the brief."
          },
          {
            "title": "Shopping centres",
            "text": "Identify whether the machines will sit inside a tenancy or in a common area. Centre approvals, trading hours and access windows can affect both placement and ongoing visits."
          },
          {
            "title": "Cinemas",
            "text": "Allow for the peaks before and after screenings. Queues, cabinet sound and access to cinema entrances all matter when choosing a foyer position."
          },
          {
            "title": "Play centres & other venues",
            "text": "Consider visitor ages, accompanying adults and the activities already in the space. Leave room for people to watch or help a player without blocking neighbouring attractions."
          }
        ]
      },
      {
        "id": "operator-and-venue-responsibilities",
        "heading": "Agree operator and venue responsibilities",
        "paragraphs": [
          "When choosing between arcade machine operators or amusement machine operators, look at the ongoing arrangement as closely as the equipment. Your proposal should identify ownership, access to settings, fault reporting and any included support. A claw machine also needs an agreed plan for prize supply and replenishment.",
          "For a paid game, establish who collects payments, what records are available and how any venue share is calculated. The agreement also needs to cover installation, removal, site access, damage responsibilities and what happens if either party wants to end or change the placement."
        ]
      },
      {
        "id": "placement-costs-and-returns",
        "heading": "Assess the commercial fit before placement",
        "paragraphs": [
          "Placement is an ongoing venue arrangement. Event hire has a defined hire period, while a purchase gives you ownership under the sale terms. A placement offer may have its own fees or revenue arrangement, so compare the whole proposal before deciding which approach suits the venue.",
          "There is no standard income figure for an arcade or claw machine. Visitor numbers, interest in the game, play pricing, operating time and expenses all affect the result. Use your venue’s information to assess a proposal, including any agreed share and costs—not just a headline revenue estimate."
        ]
      }
    ],
    "faqs": [
      {
        "question": "How much money can an arcade or claw machine make?",
        "answer": "Returns depend on the venue, use of the machine, play pricing and expenses. Assess the full arrangement, including any agreed venue share and operating costs. A revenue estimate is not a guarantee of profit."
      },
      {
        "question": "Can placement include both arcade and claw machines?",
        "answer": "Yes. Arcade and claw machines can be considered together, with the mix based on your visitors, space and the available equipment."
      },
      {
        "question": "Is placement the same as event hire?",
        "answer": "Placement is an ongoing venue arrangement. Event hire covers a defined booking period. Buying gives you ownership under the sale agreement. Each option has different costs and responsibilities."
      }
    ]
  },
  "arcade-machines-for-sale": {
    "seoTitle": "Arcade Machines for Sale Sydney",
    "sections": [
      {
        "id": "buying-an-arcade-machine",
        "heading": "How to buy an arcade machine for home or business",
        "paragraphs": [
          "An arcade machine is a cabinet or dedicated unit built around a game and its controls. A video arcade cabinet and a prize-based amusement machine offer different experiences. Start with the game style you enjoy, the intended users and whether the machine is for home or business.",
          "For arcade machines for sale in Sydney, compare the actual units offered: model, game features, controls, condition and accessories. A particular game or cabinet style may be essential to you. Put that in the enquiry rather than assuming it is included in every machine."
        ]
      },
      {
        "id": "purchase-price-and-condition",
        "heading": "Arcade machine prices: compare the full purchase",
        "paragraphs": [
          "An arcade machine’s purchase price reflects the model, condition, features and included equipment. Add delivery, positioning and any site preparation to understand the full cost. Warranty and support terms should say what is covered and how to get help.",
          "For a used or refurbished unit, look for recent photographs, a description of its condition and details of any work carried out. A demonstration, where available, can help you assess the controls and playing experience. Current stock is provided through a sales enquiry; website images are illustrative."
        ]
      },
      {
        "id": "commercial-machines-and-delivery",
        "heading": "Commercial arcade machines & delivery planning",
        "paragraphs": [
          "Commercial arcade machine sales need to account for the venue’s hours, expected use and payment requirements. If you need coin-operated arcade machines, identify the required configuration in your brief. Home-use and commercial equipment can have different features and support arrangements.",
          "Before arranging delivery, check the cabinet’s weight and dimensions against every doorway, turn, stairway and lift on the route. Include the destination suburb or postcode so transport and installation can be included in the proposal for your Sydney or NSW property."
        ]
      }
    ],
    "faqs": [
      {
        "question": "How much does an arcade machine cost to buy?",
        "answer": "There is no single price that represents every cabinet. The model, condition, features, delivery and support terms all affect the purchase. Request current options within your budget for a meaningful comparison."
      },
      {
        "question": "How heavy is an arcade machine?",
        "answer": "It depends on the model and cabinet. Use its documented weight and dimensions when planning transport or lift access, rather than a general estimate for arcade machines."
      },
      {
        "question": "How much electricity does an arcade machine use?",
        "answer": "Use the machine’s average power consumption and operating hours: watts divided by 1,000, multiplied by hours, gives kilowatt-hours. Multiply that by your electricity tariff to estimate cost. A maximum power rating may be higher than typical use; the equipment documentation is the starting point."
      }
    ]
  },
  "amusement-machine-supply-installation": {
    "seoTitle": "Amusement Machine Supply & Installation",
    "sections": [
      {
        "id": "choosing-an-amusement-machine-supplier",
        "heading": "Choosing an amusement machine supplier in Sydney & NSW",
        "paragraphs": [
          "Give an amusement equipment supplier a picture of the job: the venue, visitors, floor space and opening hours. Include the games you have in mind and how people will use them. This makes the brief more useful than a list of cabinet names alone.",
          "For each proposed machine, you need its dimensions, weight, power requirements and operating features. Video arcade games, claw machines and other amusement formats have different space needs. Choose the equipment before finalising the layout, using current availability rather than a generic catalogue image."
        ]
      },
      {
        "id": "coin-operated-and-venue-equipment",
        "heading": "Coin-operated amusement machines & venue setup",
        "paragraphs": [
          "If you need coin-operated amusement machines, include the payment requirements in the project brief. The equipment configuration, access to controls and responsibility for collections all need to fit the way your venue operates.",
          "Place machines where people can play without blocking a route through the venue. Leave access for cabinet doors and service panels where required. Suitable power and any separate electrical or building work should be arranged before delivery, with the installation scope clearly set out."
        ]
      },
      {
        "id": "arcade-machine-installation",
        "heading": "Arcade machine installation: access, setup & handover",
        "paragraphs": [
          "The delivery plan connects the loading point to the final position. Measure doorways and tight turns, identify stairs or level changes, and check the lift’s size and load limit if one is needed. Add the venue’s delivery window and the person who will provide access.",
          "At handover, work through the agreed positioning, setup and operating checks. Keep the equipment documentation and the contact details for support together. Clear responsibilities matter after delivery too, including any warranty conditions and maintenance arrangements."
        ]
      }
    ],
    "faqs": [
      {
        "question": "Can I enquire about a single amusement machine?",
        "answer": "Yes. Include the machine type, intended use and location. The delivery route, power and setup requirements still matter for a single unit."
      },
      {
        "question": "Can I request coin-operated arcade machines?",
        "answer": "Yes. Put the payment method and venue requirements in your brief so the available configuration can be checked against them."
      },
      {
        "question": "What is the difference between supply, sales and placement?",
        "answer": "Sales covers purchasing the equipment. Supply and installation also deals with choosing and setting up equipment for the project. Placement is an ongoing venue arrangement with its own ownership and commercial terms."
      }
    ]
  }
};

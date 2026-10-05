export type GuideSection = {
  id: string;
  heading: string;
  paragraphs: string[];
  bullets?: string[];
  table?: { headings: string[]; rows: string[][] };
};
export type Article = {
  slug: string;
  title: string;
  shortTitle: string;
  seoTitle: string;
  description: string;
  category: string;
  intro: string;
  serviceSlugs: string[];
  sections: GuideSection[];
};

export const articlePublished = "2026-09-27";
export const articles: Article[] = [
  {
    slug: "arcade-machine-hire-costs",
    title: "What goes into an arcade machine hire quote?",
    shortTitle: "Arcade hire costs",
    seoTitle: "Arcade Machine Hire Costs: Comparing Quotes",
    description: "Understand arcade hire costs, delivery, hire duration and venue access. Use a practical comparison checklist before booking machines for a Sydney or NSW event.",
    category: "Event planning",
    intro: "A machine’s advertised hire price is only one part of an event budget. To compare quotes properly, put the equipment, delivery arrangements and collection time side by side. Here is what to look for before you book.",
    serviceSlugs: ["arcade-machine-hire", "claw-machine-hire"],
    sections: [
      {
        id: "equipment-and-duration",
        heading: "Start with the equipment and the time you need it",
        paragraphs: [
          "Ask for the machine type, quantity and hire period to appear together in the quote. A single cabinet for a birthday party is a different job from several machines for a corporate event. If a particular game matters, have the model or agreed alternative written down rather than relying on a general description such as ‘arcade package’.",
          "Separate playing time from the time equipment occupies the venue. A four-hour celebration might need an earlier delivery because the room closes to suppliers before guests arrive. Collection might have to wait until the following morning. Give the supplier both the event schedule and the venue’s access window."
        ]
      },
      {
        id: "delivery-and-access",
        heading: "Make delivery and collection part of the comparison",
        paragraphs: [
          "Provide the full address and postcode, even when the venue is within a listed service region. Across Sydney and regional NSW, the destination, access route and delivery timing need to be considered together. A service-area listing does not by itself confirm an available delivery slot or an included transport charge.",
          "Photographs of the unloading point, entrance and any tight turns help explain the job. Flag stairs, lifts and restricted loading times before accepting the quote. Ask who is responsible for arranging access and whether setup, demonstration and collection are included."
        ],
        bullets: ["Delivery address and the actual unloading entrance", "Earliest setup time and latest collection time", "Doorways, turns, steps and lift access", "On-site contact who can let the delivery team in"]
      },
      {
        id: "compare-quotes",
        heading: "Compare the same inclusions",
        paragraphs: ["Use this list for each supplier. A blank entry is a question to resolve before booking; it is not automatically a free inclusion."],
        table: { headings: ["Part of the quote", "What to check"], rows: [
          ["Machines", "Type, quantity, condition and agreed alternatives"],
          ["Hire period", "Delivery, playing time and collection date"],
          ["Transport and setup", "Each charge and any access assumptions"],
          ["Claw-machine prizes", "Who supplies them, quantity and refill arrangements"],
          ["During the event", "Support contact and any staffing included"],
          ["Total and terms", "Total payable, GST treatment, deposit, changes and cancellation"]
        ]}
      },
      {
        id: "budget-decisions",
        heading: "Spend on the part guests will use",
        paragraphs: [
          "Think about how the games fit into the event. During a seated dinner, guests may only play in short breaks. At an informal party, people may return throughout the evening. Share the guest numbers and schedule so the equipment discussion reflects the time available to play.",
          "If you have a budget ceiling, say so early. Ask which available setup can work within it and which items change the total. This makes it easier to compare a smaller equipment selection with a longer hire period, or a different collection arrangement. Do not assume that extra machines or extra hours are included."
        ]
      },
      {
        id: "quote-brief",
        heading: "A short brief you can send",
        paragraphs: [
          "‘We are planning [event type] for [guest numbers] at [venue and postcode] on [date]. Guests arrive at [time]. Suppliers can access the room from [time], and collection must happen [when]. We are interested in [machines or experience] with a budget of [amount, if known]. The access route includes [details]. Please show equipment, delivery, setup, collection and any other charges.’",
          "Arcade Game Australia quotes are prepared for the specific enquiry. This guide explains the questions to ask; it does not publish a fixed hire rate or imply that every inclusion is available for every booking."
        ]
      }
    ]
  },
  {
    slug: "claw-machine-prize-planning",
    title: "Planning prizes for a hired claw machine",
    shortTitle: "Planning claw-machine prizes",
    seoTitle: "Claw Machine Hire: Prize Planning Guide",
    description: "Plan prizes for a hired claw machine: check fit, samples, quantities, refills and presentation before a party, wedding or corporate event.",
    category: "Claw machines",
    intro: "The prizes shape the experience, but they also have to work with the machine. Before ordering a box of toys, gifts or branded products, agree the prize plan with the hire supplier. A sample can save a much bigger problem on event day.",
    serviceSlugs: ["claw-machine-hire"],
    sections: [
      {
        id: "start-with-the-guests",
        heading: "Start with your guests and the purpose of the game",
        paragraphs: [
          "For a party, the aim may be a fun activity with a small keepsake. At a wedding, a prize might form part of the guest experience. At a business event, it could introduce a product or encourage a conversation. Decide what a successful interaction looks like before choosing the contents.",
          "Consider the ages of the people playing. Ask the prize supplier about suitability for the intended age group and any product warnings. If guests include young children, plan who will supervise and help with the activity. A machine and a box of prizes do not replace that decision."
        ]
      },
      {
        id: "test-a-sample",
        heading: "Check a sample with the actual machine",
        paragraphs: [
          "Send the hire supplier the item’s dimensions, weight and packaging, along with photographs. The question is not just whether it fits inside the cabinet. The claw, prize bed and exit chute also need to suit it. Items that look similar can behave differently because of their shape or packaging.",
          "Ask whether a sample can be checked before you commit to a bulk order. Confirm whether the item will be used loose, in a capsule or in other packaging. Avoid replacing an agreed prize with a different size or weight at the last minute without checking again. Do not assume that any machine can accept your own products."
        ],
        bullets: ["Item and package dimensions", "Weight and material", "Photographs of the item from more than one side", "A physical sample if requested", "Confirmation of the final presentation inside the machine"]
      },
      {
        id: "quantity-and-refills",
        heading: "Plan the quantity and who will refill it",
        paragraphs: [
          "Guest numbers alone do not tell you how many prizes to order. The length of the activity, the expected number of turns and the agreed event format also matter. Discuss the intended experience with the supplier; do not promise every guest a prize unless a separate arrangement makes that possible.",
          "Clarify the starting fill, spare stock and refill responsibility. Decide where spare prizes will be kept and who is permitted to open or operate the cabinet. Staff should follow the supplier’s handover instructions. If you want everyone to leave with a gift, a separate gift table may be easier to plan than making the entire distribution depend on game results."
        ]
      },
      {
        id: "branding-and-position",
        heading: "Keep presentation and placement in the same plan",
        paragraphs: [
          "For a promotion, share the brand artwork, prize idea and event brief together. Ask which branding options are actually available, what the artwork requirements are and when approval is needed. Branding, custom fills and attendants should each be confirmed in the quote rather than assumed.",
          "Think about the queue as well as the cabinet. People need room to watch, play and leave with their prize without blocking another activity. Agree the final location with the venue and supplier, including the power arrangement, before the room is dressed."
        ]
      },
      {
        id: "prize-brief",
        heading: "Send one clear prize brief",
        paragraphs: [
          "Include your event date, venue, guest ages, approximate numbers, planned activity times and the prize you want to use. Say whether you already own the prizes or need to discuss sourcing them. Add any branding requirements and your deadline for ordering stock.",
          "For Arcade Game Australia enquiries, prize inclusions, customisation and refill arrangements are confirmed for the particular booking. The illustrated claw machine on this site is not a promise of a specific model or prize package."
        ]
      }
    ]
  },
  {
    slug: "arcade-machine-placement-vs-buying",
    title: "Arcade machine placement or buying: a venue planning guide",
    shortTitle: "Placement or buying?",
    seoTitle: "Arcade Machine Placement vs Buying for Venues",
    description: "Compare arcade machine placement and ownership for pubs, clubs, RSLs and other venues. Review responsibilities, costs, income assumptions and trial questions.",
    category: "Commercial venues",
    intro: "A venue games area has two decisions: which machines suit the audience, and who will own and operate them. Commercial placement and buying can divide the work differently. Compare the actual proposal before deciding which arrangement fits your venue.",
    serviceSlugs: ["arcade-machine-placement", "arcade-machines-for-sale"],
    sections: [
      {
        id: "responsibilities",
        heading: "Write down who does what",
        paragraphs: [
          "In a placement proposal, ask who owns the equipment and which tasks the operator takes on. The name ‘placement’ does not tell you whether there is an upfront cost, a fixed fee or a share of takings. It also does not establish who supplies prizes, handles refunds or responds when a machine stops working.",
          "When you buy, the machine becomes part of your own equipment planning. You still need to establish the delivery, installation, support and warranty arrangements. Outsourced servicing may be an option, but it should be confirmed rather than treated as part of every sale."
        ],
        table: { headings: ["Responsibility", "Ask in either arrangement"], rows: [
          ["Equipment", "Who owns it and approves changes?"],
          ["Money and reporting", "Who collects takings and how are totals checked?"],
          ["Prizes and supplies", "Who orders, pays for and replenishes them?"],
          ["Faults and refunds", "Who is contacted and what response is agreed?"],
          ["Changes or removal", "What happens if the layout or arrangement ends?"]
        ]}
      },
      {
        id: "income-and-costs",
        heading: "Separate takings from the venue’s return",
        paragraphs: [
          "‘How much do arcade machines make?’ has no useful single answer without a location, equipment selection and operating arrangement. Foot traffic alone is not enough: people must notice the game, want to play it and have time to do so. A trial should record actual use rather than rely on a supplier’s best-case example.",
          "For planning, start with paid plays multiplied by the price per play to estimate gross takings. Then apply the proposal’s agreed deductions and share calculation. Account for the costs your venue carries, such as power, staff time, prizes or servicing. The order of deductions matters, so ask whether any percentage is calculated before or after them.",
          "For example, 300 paid plays at $2 would produce $600 in gross takings. That is a hypothetical arithmetic example, not a forecast or a statement of this business’s prices. The amount left for a venue would depend on its actual costs and written arrangement."
        ]
      },
      {
        id: "venue-fit",
        heading: "Give the machines a workable place in the venue",
        paragraphs: [
          "In a pub, club or RSL, consider the relationship between the games, seating, food service and staff visibility. For a cinema or play centre, think about when visitors arrive and how long they wait. In a shopping centre, clarify the proposed footprint and how it will interact with nearby businesses and pedestrian movement.",
          "These are questions for the individual venue, not assumptions that a particular type of site will earn more. Take measurements and discuss noise, player space, nearby activities and the access needed for servicing. Make the games area part of the floor plan before ordering equipment."
        ]
      },
      {
        id: "trial-review",
        heading: "Agree how you will review the arrangement",
        paragraphs: [
          "If a trial is offered, agree its length, reporting method and review date. Record machine availability, plays, takings, faults, staff involvement and customer feedback. Decide in advance what would justify keeping the layout, changing the machines or ending the trial.",
          "Arcade Game Australia considers placement enquiries for pubs, clubs, RSLs, shopping centres, cinemas, play centres and other venues. Revenue shares, free-placement offers and service commitments are not standard promises on this site; they must be set out in the proposal for your venue."
        ]
      }
    ]
  },
  {
    slug: "buying-an-arcade-machine",
    title: "Buying an arcade machine: what to check before you commit",
    shortTitle: "Buying an arcade machine",
    seoTitle: "Buying an Arcade Machine: Price & Inspection Guide",
    description: "A practical arcade machine buying checklist covering the exact model, condition, total cost, dimensions, games, support, delivery and installation.",
    category: "Buying and ownership",
    intro: "Start with the machine you will actually receive. A photograph and a headline price cannot tell you its condition, game setup, access requirements or what happens after delivery. A few specific questions make different offers much easier to compare.",
    serviceSlugs: ["arcade-machines-for-sale", "amusement-machine-supply-installation"],
    sections: [
      {
        id: "choose-for-use",
        heading: "Choose for the people who will play it",
        paragraphs: [
          "A home games room and a commercial venue may need different things from the same style of cabinet. List the games or experience you want, the likely players and the space available. If it will be used commercially, tell the seller how it will operate and ask about the suitability of the equipment and payment setup.",
          "Request the exact model, photographs of the offered machine and a clear description of its condition. ‘New’, ‘used’ and ‘refurbished’ should lead to follow-up questions about what has been inspected, replaced or tested. A large advertised game count is less useful than knowing whether your preferred games and controls work as expected."
        ]
      },
      {
        id: "inspection",
        heading: "Inspect the controls, display and game setup",
        paragraphs: [
          "Where possible, see the machine operating or request a demonstration of the offered unit. Try the controls used by the games you care about. Check the display and audio, and ask the seller to show how the machine starts, selects games and returns to its normal menu.",
          "Ask what software, game documentation and any relevant permissions come with the machine for your intended use. Keep the seller’s answers with the invoice and model information. Also ask what keys, manuals and accessories are supplied; a missing cabinet key or unavailable part can complicate ownership."
        ],
        bullets: ["Photographs of the actual unit, including visible wear", "A demonstration of the controls and games you intend to use", "A written account of repairs or refurbishment", "Keys, manuals, included accessories and software information", "Model details and a contact for after-sales questions"]
      },
      {
        id: "total-cost",
        heading: "Compare the installed cost, not just the sale price",
        paragraphs: [
          "The amount needed to put a machine into use may include transport, access handling, installation and agreed setup work as well as the cabinet. Ask for those items to be shown separately. For a used machine, discuss any known work needed immediately rather than leaving it outside the budget.",
          "Running costs also depend on the model and use. Ask for the manufacturer’s power information and whether typical consumption has been measured. To estimate electricity, divide average watts by 1,000 and multiply by operating hours to get kilowatt-hours, then apply your electricity tariff. A maximum nameplate rating is not necessarily the same as average use."
        ]
      },
      {
        id: "delivery-and-support",
        heading: "Check access and support before paying",
        paragraphs: [
          "Get the cabinet dimensions and weight in the form it will be delivered. Measure the whole route into the room, including turns and lifts, rather than only the final space. Ask the delivery team to assess anything uncertain; do not plan to dismantle or move heavy equipment yourself to make an unsuitable route work.",
          "Read the written warranty and support terms for the actual sale. Ask what is covered, how a fault is reported, who pays transport costs and whether parts or service are available for that model. Keep these answers alongside the delivery agreement. An attractive price is easier to assess when the follow-up arrangements are clear."
        ]
      },
      {
        id: "purchase-enquiry",
        heading: "What to put in your purchase enquiry",
        paragraphs: [
          "Send your location, intended use, approximate budget and the machine style or games you have in mind. Add the room dimensions and access photographs if available. Say whether you need supply only or help with delivery, installation and handover.",
          "Arcade Game Australia’s sales page is an enquiry service, not a live stock catalogue. Available machines, condition, specifications, prices and support are confirmed for each offer. Images on the site illustrate the subject and do not identify current stock."
        ]
      }
    ]
  },
  {
    slug: "arcade-machine-delivery-checklist",
    title: "An arcade machine delivery checklist for venues and events",
    shortTitle: "Delivery and space checklist",
    seoTitle: "Arcade Machine Delivery & Space Checklist",
    description: "Plan arcade machine delivery and installation with a checklist for access, room layout, power, handover and collection at Sydney and NSW venues.",
    category: "Delivery and installation",
    intro: "The machine needs to fit twice: through the building and into the finished layout. Use this checklist with your venue contact and equipment supplier before delivery, whether you are hiring for a night or planning a permanent games area.",
    serviceSlugs: ["amusement-machine-supply-installation", "arcade-machine-hire", "claw-machine-hire"],
    sections: [
      {
        id: "equipment-details",
        heading: "1. Get the details of the selected machine",
        paragraphs: [
          "Ask for width, depth, height and weight for the machine in its delivery configuration. A photograph is not a reliable guide to size. Some designs also need clearance for a player, an open cabinet door or the operator’s servicing access. The supplier should confirm the requirements of the particular unit.",
          "Keep those details with the venue plan. If the equipment selection changes, recheck access and the final layout rather than assuming that a replacement will have the same dimensions."
        ],
        bullets: ["Confirmed model and quantity", "Delivery dimensions and weight", "Player and servicing clearances", "Power requirements supplied by the operator"]
      },
      {
        id: "walk-the-route",
        heading: "2. Walk the route from unloading to the room",
        paragraphs: [
          "Start where the delivery vehicle can actually unload. Follow the route through gates, doors, corridors, turns and lifts to the planned position. Note steps, changes of level and any surfaces the delivery team should assess. Give the supplier photographs and measurements of the restrictive points.",
          "For a lift, ask the venue for its usable dimensions and capacity, then have the supplier assess the complete delivery arrangement. A cabinet that fits through the entrance may still be difficult to turn inside the building. Let the delivery team resolve handling questions in advance."
        ],
        bullets: ["Unloading location and loading-bay booking", "Door openings and tight corners", "Steps, slopes, thresholds and surface changes", "Lift details and booking requirements", "A named venue contact for access queries"]
      },
      {
        id: "plan-the-room",
        heading: "3. Plan the space people will use",
        paragraphs: [
          "There is no single floor-space answer for every arcade machine. Start with its footprint, then allow the model’s required player and service space. Include the people who stop to watch or wait for a turn. Check the proposed layout with the venue so circulation and exits remain clear.",
          "Show where the machine will sit in relation to food, drinks, seating, other attractions and power. Ask the supplier and venue to agree the electrical arrangement and any cable management. Outdoor or exposed positions need explicit confirmation that the selected equipment and site arrangements are suitable."
        ]
      },
      {
        id: "handover-and-collection",
        heading: "4. Give setup and collection enough room in the schedule",
        paragraphs: [
          "Agree when the room becomes available, who receives the equipment and when guests arrive. Allow for positioning, setup and a demonstration before the activity starts. The person receiving the machine should know the operating instructions, support contact and what to do if something is wrong.",
          "For hire, make collection a separate appointment in the event plan. Confirm who will be present, whether the access route will still be clear and how the equipment is kept between the end of the event and collection. For a permanent installation, agree the handover and future service access instead."
        ],
        bullets: ["Delivery and collection windows", "On-site contact and access arrangements", "Agreed final position and clear route", "Demonstration and operating handover", "Fault-reporting contact and collection responsibility"]
      },
      {
        id: "share-the-brief",
        heading: "5. Share one version of the plan",
        paragraphs: [
          "Send the supplier and venue the same address, floor plan, access photographs and schedule. Include the full postcode for Sydney metropolitan, Western Sydney, South-West Sydney, North-West Sydney, Wollongong/Illawarra, Central Coast or other NSW enquiries. Actual transport arrangements are confirmed for the destination.",
          "This checklist helps organise the conversation. The final handling method, machine clearances, power requirements and venue approvals need to come from the supplier and venue for the equipment being delivered."
        ]
      }
    ]
  }
];

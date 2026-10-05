export const regionGuides: Record<string, string> = {
  "sydney": "Planning arcade machine hire in Sydney? Tell us whether the games are for a party, wedding or work event, and how many people will play. For a venue that needs games throughout the year, start with commercial arcade or claw machine placement. Buying a machine or fitting out a games area uses the same starting point: the equipment you need and the space it will occupy.",
  "western-sydney": "Arcade game hire in Western Sydney starts with the event, its guests and the room. Claw hire also needs a prize plan. For pubs, clubs, RSLs and other venues, an ongoing placement or equipment purchase raises a different set of questions: who will use the machines, where they will sit and how the area will run each day.",
  "south-west-sydney": "For arcade machine hire in South-West Sydney, a clear setup and collection window helps the booking fit around your event. Claw machine hire is another option for parties and promotions. If you are creating a permanent games area, use the placement, sales or supply and installation service to describe what your venue needs over the longer term.",
  "north-west-sydney": "A home games room and a busy venue have different priorities. For arcade hire in North-West Sydney, start with the occasion and the people playing. For a machine purchase or venue placement, consider how it will be used over time. Claw hire enquiries can begin with the event date and your prize idea.",
  "illawarra": "Arcade machine hire in Wollongong and Illawarra covers enquiries for parties, weddings and corporate events, alongside claw hire. For a commercial venue, the options also include arcade and claw placement, machine sales, supply and installation. Give us the destination and project timing so the transport requirements can be considered from the start.",
  "central-coast": "For arcade game hire on the Central Coast, include the venue and how long the equipment is needed. With claw machine hire, add any gifts or products you want to use as prizes. For a year-round games area, the placement and sales pages explain the different arrangements; supply and installation covers the practical setup.",
  "nsw": "Have an event or venue project elsewhere in NSW? Send the town, postcode and service required. Regional enquiries can cover arcade or claw machine hire, commercial placement, sales, supply and installation. The actual destination matters for transport and scheduling, so use the full location rather than the region alone."
};

export const regionalPlanning: Record<string, { heading: string; questions: string[]; guideSlug: string; guideLabel: string }> = {
  "sydney": {
    heading: "Planning delivery to a city venue",
    questions: ["Does your building require a loading-bay booking, lift reservation or supplier check-in?", "Can the machines be set up before guest access closes, and who will receive them?"],
    guideSlug: "arcade-machine-delivery-checklist", guideLabel: "Check access and setup requirements"
  },
  "western-sydney": {
    heading: "Choosing games for a busy event",
    questions: ["Will guests play throughout the event or mainly during breaks in the schedule?", "Is the proposed games area inside the venue, and how much player and queue space is available?"],
    guideSlug: "arcade-machine-hire-costs", guideLabel: "Compare the full event hire quote"
  },
  "south-west-sydney": {
    heading: "Fitting hire around the venue booking",
    questions: ["When does the room become available to suppliers, and when must equipment be removed?", "If collection is the next day, who will provide access and look after the equipment overnight?"],
    guideSlug: "arcade-machine-delivery-checklist", guideLabel: "Prepare the delivery and collection plan"
  },
  "north-west-sydney": {
    heading: "Buying for a games room or venue",
    questions: ["Is the equipment for home or commercial use, and which games or experience matter most?", "Have you measured the route into the room as well as the final cabinet position?"],
    guideSlug: "buying-an-arcade-machine", guideLabel: "Use the arcade machine buying checklist"
  },
  "illawarra": {
    heading: "Building delivery into the event brief",
    questions: ["What is the full destination and postcode, including the actual unloading entrance?", "Can setup and collection windows be confirmed with the venue before the equipment quote is finalised?"],
    guideSlug: "arcade-machine-hire-costs", guideLabel: "Understand equipment and transport costs"
  },
  "central-coast": {
    heading: "Preparing a claw-machine event",
    questions: ["Do you want to discuss prize supply or use gifts and products you already have?", "Can a sample be checked before you order the complete prize quantity?"],
    guideSlug: "claw-machine-prize-planning", guideLabel: "Plan prizes, quantities and refills"
  },
  "nsw": {
    heading: "Planning an ongoing regional installation",
    questions: ["Who will be responsible for day-to-day operation, prizes and fault reporting?", "What access and support arrangements need to be agreed for the particular town and venue?"],
    guideSlug: "arcade-machine-placement-vs-buying", guideLabel: "Compare placement and ownership"
  },
};

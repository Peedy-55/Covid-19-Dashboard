
# Covid19 Dashboard Project

## Overview

In this project, I've crafted a **Covid19 Dashboard** using React, incorporating concepts from our React course. The app fetches data from an internal server, employing class components, component lifecycle methods, routing, and ensuring responsiveness.

## Prerequisites

### UI Prerequisites

- Utilized Figma, a web-based vector graphics editor, for design purposes.
- Created a Figma account as guided in [this video](https://www.youtube.com/watch?v=hrHL2VLMl7g).
- Checked CSS in Figma following [this guide](https://youtu.be/B242nuM3y2s?t=80).
- Exported images from Figma using [this video tutorial](https://www.youtube.com/watch?v=NpzL1MONwaw).

### Design Files

- Explored design files for different devices [here](https://www.figma.com/file/lGl9tRXcsmxicjTITM2A8P/Covid19_Dashboard?node-id=0%3A1).

## Set Up Instructions

- Downloaded dependencies with `npm install`.
- Started up the app using `npm start`.

## Completion Instructions

### Functionalities

- Users can navigate to Home and About routes using links in the Navbar.
- The website is responsive on various devices.

#### Home Route

- HTTP GET request fetches data from the Home Route API URL.
- Displayed loader while fetching data.
- After successful data retrieval:
  - Displayed stats for **Confirmed**, **Active**, **Recovered**, **Deceased** cases for **India**.
  - Listed State/UT data with corresponding case counts.
  - Implemented sorting based on State/UT name in both ascending and descending orders.
- Footer displayed as per Figma design.

#### Search Functionality

- Implemented case-insensitive search functionality.
- Displayed matched State/UT names when searching.
- Clicking on a State/UT navigates to its specific page.

#### State-Specific Route

- HTTP GET request fetches data from the State-Specific Route API URL.
- Displayed loader while fetching data.
- After successful data retrieval:
  - Displayed State name, last updated date, and case counts.
  - Provided sorting options for Top Districts based on different cases.
  - Displayed a bar graph with the last 10 days of Covid19 cases data.
- Footer displayed as per Figma design.

#### Not Found Route

- Navigates to the Not Found Route for random paths.

#### About Route

- HTTP GET request fetches data from the About Route API URL.
- Displayed loader while fetching data.
- After successful data retrieval:
  - Displayed FAQs.
- Footer displayed as per Figma design.

#### Header

- Implemented navigation links in the header.

#### Footer

- Implemented the Footer component with social icons.

### Quick Tips

- Utilized code samples for converting object items to array items, implementing React Charts, and using React Select.

## Important Note

- Used specific test ids for various HTML elements to ensure passing test cases.
- Avoided the use of third-party packages other than those mentioned in the Quick Tips.

## Resources

- Included data fetch URLs for Home, State-Specific, and About routes.

## Stretch Goals

Implemented additional features if the main project functionalities were completed:

- Users can switch between Light and Dark themes in the Navbar.
- India Map with a highlighted specific State in the State-Specific Route.
- Added a **Vaccination Details Route** with more functionalities and corresponding data fetch URLs.

## Project Submission Instructions

- Submitted test cases at my own pace and frequently published code using `Step - 4` in the Instructions tab.

---

I hope this layout is more visually appealing and easier to follow. Let me know if there's anything else I can refine!

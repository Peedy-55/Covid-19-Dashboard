Hey there! So, in this project, I've put together a Covid19 Dashboard using the concepts we've covered in our React course. This app fetches data from an internal server using a class component, and I've incorporated features like displaying data, utilizing component lifecycle methods, understanding routing concepts, and ensuring responsiveness.

Let's break down what the project entails:

Prerequisites
UI Prerequisites
I utilized Figma, a web-based vector graphics editor and prototyping tool. You can check it out here.
Created a free account in Figma, following the instructions provided in this video up to 00:55.
Learned how to check CSS in Figma by following this video.
Exported images from Figma, following the instructions in this video.
Design Files
You can explore the Design Files for different devices here.
Set Up Instructions
Downloaded dependencies with npm install.
Started up the app using npm start.
Completion Instructions
I ensured the app has the following functionalities:

Users can navigate to Home and About routes using links in the Navbar.
The website is responsive on various devices, thanks to Media Queries.
Home Route
An HTTP GET request fetches data from the Home Route API URL.
Displayed loader while fetching data.
After successful data retrieval:
Displayed stats for Confirmed, Active, Recovered, Deceased cases for India.
Listed State/UT data with corresponding case counts.
Implemented sorting based on State/UT name in both ascending and descending orders.
Footer displayed as per Figma design.
Search Functionality
Implemented case-insensitive search functionality.
Displayed matched State/UT names when searching.
Clicking on a State/UT navigates to its specific page.
State-Specific Route
An HTTP GET request fetches data from the State-Specific Route API URL.
Displayed loader while fetching data.
After successful data retrieval:
Displayed State name, last updated date, and case counts.
Provided sorting options for Top Districts based on different cases.
Displayed a bar graph with the last 10 days of Covid19 cases data.
Footer displayed as per Figma design.
Not Found Route
Navigates to the Not Found Route for random paths.
About Route
An HTTP GET request fetches data from the About Route API URL.
Displayed loader while fetching data.
After successful data retrieval:
Displayed FAQs.
Footer displayed as per Figma design.
Header
Implemented navigation links in the header.
Footer
Implemented the Footer component with social icons.
Quick Tips
Utilized code samples for converting object items to array items, implementing React Charts, and using React Select.
Important Note
Used specific test ids for various HTML elements to ensure passing test cases.
Avoided the use of third-party packages other than those mentioned in the Quick Tips.
Resources
Included data fetch URLs for Home, State-Specific, and About routes.
Stretch Goals
Implemented additional features if the main project functionalities were completed:

Users can switch between Light and Dark themes in the Navbar.
India Map with a highlighted specific State in the State-Specific Route.
Added a Vaccination Details Route with more functionalities and corresponding data fetch URLs.
Project Submission Instructions
Submitted test cases at my own pace and frequently published code using Step - 4 in the Instructions tab.
I hope this gives you a clear picture of what I've accomplished in this project! If you have any questions or need further clarification, feel free to ask.

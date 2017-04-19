# Front-End Boot Camp Group Project

Welcome to the Group Project! You should know your group, and the following group preparation work should have been completed...

- Appoint a Team Captain
- Choose a Name for the Group
- Select a Team Mascot from Google Images
- Take a Group Picture

## Objective

Build a complete CRUD application using HTML/CSS/JS and the libraries React and Redux

## Requirements

- Determine a data set which will permit you to create a form with following controls:

    - Input - Text
    - Input - Number
    - Input - Date
    - Input - Color
    - TextArea
    - Select - Drop Down
    - Select - List Box + Multi-Select

Load the data set into db.json, then commence programming.

- The application should contain the following UI elements

    - A table of data
    - A form for adding new data
    - A header, and a footer

- Table Specifications

    - Clicking the column header will sort the data in that column
    - A text box positioned above the table will filter on one hard-coded column (optionally, provide a drop down to select the column)
    - Each row will have an 'Edit' and 'Delete' button in the last column
    - Clicking 'Edit' will switch the row to edit mode with form controls for editing data
    - Clicking 'Delete' will delete the row (optionally, include a delete confirmation UI element, no window.confirm boxes)
    - On the Edit Row, there will be two buttons, 'Save' and 'Cancel'
    - Clicking 'Save' will save the row, and return to view mode
    - Clicking 'Cancel' will not save any changes, and return to view mode

- Form for Adding New Data Specifications

    - Use at least one of each control above
    - Implement validation for any three of the controls
    - If a control is invalid display some kind of indicator
    - Optionally, display a validation summary

- The theme of the web site should match the color sheme of the mascot image. The mascot image should be displayed in the header.

- Add an 'About' link on the header which displays popup with your team name and picture displayed. Also, include some kind of motivational team slogan statement.

- Concerning state, use Redux to manage application state, use React to manage form control state. Please use React-Redux to connect React and Redux, and use Redux-Thunk for handling asychronous operations.

- Where possible use stateless functions and pure components.

- Each component and other classes should be in their own files.


## Conditions of Victory

- All four CRUD operations work from the UI
- There are no errors in the console
- All of the requirements are met, and implement one optional requirement
- Each member of the team made a significant contribution, and can describe to the instructor what they coded
- The application looks good. There will be some evidence of effort to make it look good and use the color theme.